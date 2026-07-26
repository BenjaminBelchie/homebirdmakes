import { notFound, redirect } from "next/navigation";
import { unstable_cache } from "next/cache";
import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import stripe from "../../../lib/stripe";
import type Stripe from "stripe";
import Link from "next/link";
import PageHeader from "../../../components/PageHeader";
import Footer from "../../../components/Footer";
import AddToCartButton from "../../../components/AddToCartButton";
import ProductImageCarousel from "./ProductImageCarousel";
import { IconArrowLeft } from "@tabler/icons-react";
import { initFlagsmith } from "../../../lib/flagsmith";

export const dynamic = "force-dynamic";

const ETSY_URL = "https://www.etsy.com/uk/shop/homebirdmakes";

function formatPrice(price: Stripe.Price | null): string {
  if (!price || price.unit_amount == null) return "";
  const amount = (price.unit_amount / 100).toFixed(2);
  const symbol = price.currency === "gbp" ? "£" : price.currency.toUpperCase() + " ";
  return `${symbol}${amount}`;
}

const getStripeProduct = unstable_cache(
  async (productId: string) => {
    try {
      return await stripe.products.retrieve(productId, {
        expand: ["default_price"],
      });
    } catch {
      return null;
    }
  },
  ["stripe-product"],
  { revalidate: 60 },
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getStripeProduct(`prod_${id}`);
  if (!product) return { title: "Product not found" };

  return {
    title: product.name,
    description: product.description ?? undefined,
    openGraph: {
      images: product.images[0] ? [product.images[0]] : [],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const flagsmith = await initFlagsmith();
  if (!flagsmith.hasFeature("store_page")) {
    redirect(ETSY_URL);
  }

  const { id } = await params;
  const stripeId = `prod_${id}`;
  const [product, productMeta] = await Promise.all([
    getStripeProduct(stripeId),
    fetchQuery(api.products.list),
  ]);

  if (!product || product.active === false) notFound();

  const meta = productMeta.find((p) => p.stripeProductId === stripeId) ?? null;
  const price = product.default_price as Stripe.Price | null;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PageHeader />

      <section className="mx-auto w-full max-w-5xl px-6 py-10">
        <Link
          href="/store"
          className="mb-10 inline-flex items-center gap-1.5 text-xs tracking-wide text-muted-foreground transition-colors hover:text-foreground"
        >
          <IconArrowLeft size={14} />
          Back to shop
        </Link>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image carousel */}
          <ProductImageCarousel images={product.images} productName={product.name} />

          {/* Details */}
          <div className="flex flex-col lg:sticky lg:top-24 lg:self-start">
            {meta?.featured && (
              <span className="mb-4 inline-block w-fit rounded-full bg-primary px-3 py-0.5 text-[10px] tracking-widest text-primary-foreground">
                FEATURED
              </span>
            )}

            <h1 className="text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
              {product.name}
            </h1>

            {price && (
              <p className="mt-3 text-xl font-medium">
                {formatPrice(price)}
              </p>
            )}

            {product.description && (
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            )}

            {price?.id && price.unit_amount != null && (
              <div className="mt-8">
                <AddToCartButton
                  stripePriceId={price.id}
                  stripeProductId={product.id}
                  name={product.name}
                  image={product.images[0] ?? null}
                  unitAmount={price.unit_amount}
                  currency={price.currency}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
