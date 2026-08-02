"use server";

import { auth } from "@clerk/nextjs/server";
import stripe from "@/lib/stripe";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2, R2_BUCKET, R2_PUBLIC_URL } from "@/lib/r2";

async function requireAdmin() {
  const { sessionClaims } = await auth();
  if (sessionClaims?.metadata?.role !== "admin") {
    throw new Error("Unauthorized");
  }
}

export type MigrationResult = {
  total: number;
  migrated: number;
  skipped: number;
  errors: string[];
};

export async function migrateProductsToR2(): Promise<MigrationResult> {
  await requireAdmin();

  const result: MigrationResult = { total: 0, migrated: 0, skipped: 0, errors: [] };

  // Fetch all Stripe products (paginate if needed)
  const stripeProducts = await stripe.products.list({ limit: 100 });
  result.total = stripeProducts.data.length;

  for (const product of stripeProducts.data) {
    if (!product.images.length) {
      result.skipped++;
      continue;
    }

    const convexImages = product.images.filter(
      (url) => url.includes("convex.cloud") || url.includes("convex.site")
    );

    if (!convexImages.length) {
      result.skipped++;
      continue;
    }

    const newImages: string[] = [];
    let hadError = false;

    for (const imageUrl of product.images) {
      if (!imageUrl.includes("convex.cloud") && !imageUrl.includes("convex.site")) {
        // Already an R2 or external URL — keep as-is
        newImages.push(imageUrl);
        continue;
      }

      try {
        const response = await fetch(imageUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const contentType = response.headers.get("content-type") ?? "image/jpeg";
        const buffer = await response.arrayBuffer();
        const extension = contentType.split("/")[1]?.replace("jpeg", "jpg") ?? "jpg";
        const key = `products/${product.id}-${Date.now()}.${extension}`;

        await r2.send(
          new PutObjectCommand({
            Bucket: R2_BUCKET,
            Key: key,
            Body: Buffer.from(buffer),
            ContentType: contentType,
          })
        );

        newImages.push(`${R2_PUBLIC_URL}/${key}`);
      } catch (err) {
        result.errors.push(
          `${product.name} (${imageUrl}): ${err instanceof Error ? err.message : String(err)}`
        );
        hadError = true;
        newImages.push(imageUrl); // keep original on error
      }
    }

    if (!hadError) {
      await stripe.products.update(product.id, { images: newImages });
      result.migrated++;
    }
  }

  return result;
}
