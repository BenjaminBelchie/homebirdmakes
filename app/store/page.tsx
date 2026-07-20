import { redirect } from "next/navigation";
import { unstable_cache } from "next/cache";
import type { Metadata } from "next";
import { initFlagsmith } from "../../lib/flagsmith";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import stripe from "../../lib/stripe";
import type Stripe from "stripe";
import AddToCartButton from "../../components/AddToCartButton";

export const dynamic = "force-dynamic";

const ETSY_URL = "https://www.etsy.com/uk/shop/homebirdmakes";

export const metadata: Metadata = {
  title: "Shop",
  description: "Handmade home accessories, crafted with love in Staffordshire.",
};

const getStripeProducts = unstable_cache(
  async () => {
    const response = await stripe.products.list({
      active: true,
      expand: ["data.default_price"],
    });
    return response.data;
  },
  ["stripe-products"],
  { revalidate: 60 }
);

function formatPrice(price: Stripe.Price | null): string {
  if (!price || price.unit_amount == null) return "";
  const amount = (price.unit_amount / 100).toFixed(2);
  const symbol = price.currency === "gbp" ? "£" : price.currency.toUpperCase() + " ";
  return `${symbol}${amount}`;
}

export default async function StorePage() {
  const flagsmith = await initFlagsmith();

  if (!flagsmith.hasFeature("store_page")) {
    redirect(ETSY_URL);
  }

  const [stripeProducts, productMeta] = await Promise.all([
    getStripeProducts(),
    fetchQuery(api.products.list),
  ]);

  // Merge Stripe data with Convex metadata, sort by displayOrder
  const metaMap = new Map(productMeta.map((p) => [p.stripeProductId, p]));
  const products = stripeProducts
    .map((p) => ({ stripe: p, meta: metaMap.get(p.id) ?? null }))
    .sort((a, b) => (a.meta?.displayOrder ?? 999) - (b.meta?.displayOrder ?? 999));

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PageHeader />

      <section className="px-6 pb-16 pt-10">
        <h1 className="mb-8 text-center text-xs tracking-[0.25em] text-muted-foreground">SHOP</h1>

        {products.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">No products available yet.</p>
        ) : (
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 lg:grid-cols-3">
            {products.map(({ stripe: product, meta }) => {
              const price = product.default_price as Stripe.Price | null;
              const image = product.images[0] ?? null;

              return (
                <div key={product.id} className="group flex flex-col">
                  <div className="relative aspect-square overflow-hidden rounded-[var(--radius)] bg-muted shadow-sm">
                    {image && (
                      <img
                        src={image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    {meta?.featured && (
                      <span className="absolute left-3 top-3 rounded-full bg-primary px-2 py-0.5 text-[10px] tracking-widest text-primary-foreground">
                        FEATURED
                      </span>
                    )}
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-2">
                    <p className="text-sm font-medium leading-snug">{product.name}</p>
                    <p className="shrink-0 text-sm text-muted-foreground">{formatPrice(price)}</p>
                  </div>
                  {product.description && (
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{product.description}</p>
                  )}
                  {price?.id && price.unit_amount != null && (
                    <div className="mt-3">
                      <AddToCartButton
                        stripePriceId={price.id}
                        stripeProductId={product.id}
                        name={product.name}
                        image={image}
                        unitAmount={price.unit_amount}
                        currency={price.currency}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
