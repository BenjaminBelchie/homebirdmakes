"use server";

import { auth } from "@clerk/nextjs/server";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2, R2_BUCKET, R2_PUBLIC_URL } from "@/lib/r2";
import type { Id } from "@/convex/_generated/dataModel";

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

export async function migrateCollectionsToR2(): Promise<MigrationResult> {
  await requireAdmin();

  const collections = await fetchQuery(api.collections.list);
  const result: MigrationResult = { total: collections.length, migrated: 0, skipped: 0, errors: [] };

  for (const col of collections) {
    // Skip if already on R2 or not a Convex-served URL
    if (!col.image.includes("convex.cloud") && !col.image.includes("convex.site")) {
      result.skipped++;
      continue;
    }

    try {
      const response = await fetch(col.image);
      if (!response.ok) throw new Error(`HTTP ${response.status} fetching ${col.image}`);

      const contentType = response.headers.get("content-type") ?? "image/jpeg";
      const buffer = await response.arrayBuffer();

      const extension = contentType.split("/")[1]?.replace("jpeg", "jpg") ?? "jpg";
      const key = `collections/${Date.now()}-${col.category.replace(/[^a-zA-Z0-9._-]/g, "_")}.${extension}`;

      await r2.send(
        new PutObjectCommand({
          Bucket: R2_BUCKET,
          Key: key,
          Body: Buffer.from(buffer),
          ContentType: contentType,
        })
      );

      const publicUrl = `${R2_PUBLIC_URL}/${key}`;

      await fetchMutation(api.collections.update, {
        id: col.id as Id<"collections">,
        category: col.category,
        etsy_link: col.etsy_link,
        isFeatured: col.isFeatured,
        image: publicUrl,
      });

      result.migrated++;
    } catch (err) {
      result.errors.push(`${col.category}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  return result;
}
