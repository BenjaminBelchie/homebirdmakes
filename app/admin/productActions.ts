"use server";

import { auth } from "@clerk/nextjs/server";
import stripe from "@/lib/stripe";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import type Stripe from "stripe";

async function requireAdmin() {
  const { sessionClaims } = await auth();
  if (sessionClaims?.metadata?.role !== "admin") {
    throw new Error("Unauthorized");
  }
}

export type AdminProduct = {
  stripeProductId: string;
  name: string;
  description: string | null;
  images: string[];
  active: boolean;
  priceInPence: number | null;
  priceId: string | null;
  currency: string | null;
  convexId: Id<"products"> | null;
  featured: boolean;
  displayOrder: number;
  slug: string | undefined;
};

export async function listAdminProducts(): Promise<AdminProduct[]> {
  await requireAdmin();

  const [stripeResponse, convexProducts] = await Promise.all([
    stripe.products.list({ limit: 100, expand: ["data.default_price"] }),
    fetchQuery(api.products.list),
  ]);

  const metaMap = new Map(convexProducts.map((p) => [p.stripeProductId, p]));

  return stripeResponse.data
    .map((p) => {
      const meta = metaMap.get(p.id);
      const price = p.default_price as Stripe.Price | null;
      return {
        stripeProductId: p.id,
        name: p.name,
        description: p.description,
        images: p.images,
        active: p.active,
        priceInPence: price?.unit_amount ?? null,
        priceId: price?.id ?? null,
        currency: price?.currency ?? null,
        convexId: (meta?._id ?? null) as Id<"products"> | null,
        featured: meta?.featured ?? false,
        displayOrder: meta?.displayOrder ?? 999,
        slug: meta?.slug,
      };
    });
}

export async function getAdminProduct(stripeProductId: string): Promise<AdminProduct | null> {
  await requireAdmin();

  const [stripeProduct, convexProducts] = await Promise.all([
    stripe.products.retrieve(stripeProductId, { expand: ["default_price"] }),
    fetchQuery(api.products.list),
  ]);

  const meta = convexProducts.find((p) => p.stripeProductId === stripeProductId);
  const price = stripeProduct.default_price as Stripe.Price | null;

  return {
    stripeProductId: stripeProduct.id,
    name: stripeProduct.name,
    description: stripeProduct.description,
    images: stripeProduct.images,
    active: stripeProduct.active,
    priceInPence: price?.unit_amount ?? null,
    priceId: price?.id ?? null,
    currency: price?.currency ?? null,
    convexId: (meta?._id ?? null) as Id<"products"> | null,
    featured: meta?.featured ?? false,
    displayOrder: meta?.displayOrder ?? 999,
    slug: meta?.slug,
  };
}

export async function createProduct(data: {
  name: string;
  description: string;
  priceInPence: number;
  orderedImages: Array<{ type: "new"; storageId: string }>;
  featured: boolean;
  displayOrder: number;
  slug?: string;
}): Promise<void> {
  await requireAdmin();

  const imageUrls: string[] = [];
  for (const img of data.orderedImages) {
    const url = await fetchQuery(api.products.resolveImageUrl, { storageId: img.storageId });
    if (url) imageUrls.push(url);
  }

  const product = await stripe.products.create({
    name: data.name,
    description: data.description || undefined,
    images: imageUrls,
    active: true,
  });

  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: data.priceInPence,
    currency: "gbp",
  });

  await stripe.products.update(product.id, { default_price: price.id });

  await fetchMutation(api.products.upsert, {
    stripeProductId: product.id,
    featured: data.featured,
    displayOrder: data.displayOrder,
    slug: data.slug,
  });
}

export async function updateProduct(data: {
  stripeProductId: string;
  convexId: Id<"products"> | null;
  name: string;
  description: string;
  priceInPence: number;
  currentPriceInPence: number | null;
  currentPriceId: string | null;
  orderedImages: Array<{ type: "existing"; url: string } | { type: "new"; storageId: string }>;
  featured: boolean;
  displayOrder: number;
  slug?: string;
}): Promise<void> {
  await requireAdmin();

  const finalImages: string[] = [];
  for (const img of data.orderedImages) {
    if (img.type === "existing") {
      finalImages.push(img.url);
    } else {
      const url = await fetchQuery(api.products.resolveImageUrl, { storageId: img.storageId });
      if (url) finalImages.push(url);
    }
  }

  await stripe.products.update(data.stripeProductId, {
    name: data.name,
    description: data.description || undefined,
    images: finalImages,
  });

  if (data.priceInPence !== data.currentPriceInPence) {
    const newPrice = await stripe.prices.create({
      product: data.stripeProductId,
      unit_amount: data.priceInPence,
      currency: "gbp",
    });
    await stripe.products.update(data.stripeProductId, {
      default_price: newPrice.id,
    });
    if (data.currentPriceId) {
      await stripe.prices.update(data.currentPriceId, { active: false });
    }
  }

  await fetchMutation(api.products.upsert, {
    stripeProductId: data.stripeProductId,
    featured: data.featured,
    displayOrder: data.displayOrder,
    slug: data.slug,
  });
}

export async function archiveProduct(data: {
  stripeProductId: string;
  convexId: Id<"products"> | null;
}): Promise<void> {
  await requireAdmin();

  await stripe.products.update(data.stripeProductId, { active: false });

  if (data.convexId) {
    await fetchMutation(api.products.remove, { id: data.convexId });
  }
}

export async function restoreProduct(stripeProductId: string): Promise<void> {
  await requireAdmin();

  await stripe.products.update(stripeProductId, { active: true });
}
