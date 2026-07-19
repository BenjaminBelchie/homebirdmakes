import { redirect } from "next/navigation";
import { initFlagsmith } from "../../lib/flagsmith";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";

const ETSY_URL = "https://www.etsy.com/uk/shop/homebirdmakes";

export default async function StorePage() {
  const flagsmith = await initFlagsmith();

  if (!flagsmith.hasFeature("store_page")) {
    redirect(ETSY_URL);
  }

  const collections = await fetchQuery(api.collections.list);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PageHeader />

      <section className="px-6 pb-16 pt-10">
        <h1 className="mb-6 text-center text-xs tracking-[0.25em] text-muted-foreground">SHOP</h1>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 lg:grid-cols-3">
          {collections.map((item) => (
            <a
              key={item.id}
              href={item.etsy_link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-[var(--radius)] shadow-sm"
            >
              <img
                src={item.image}
                alt={item.category}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-foreground/50 to-transparent p-4">
                <span className="text-sm font-medium text-background">{item.category}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
