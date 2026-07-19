import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "../convex/_generated/api";
import MailingList from "../components/MailingList";
import InstagramCarousel from "../components/InstagramCarousel";
import Link from "next/link";
import Footer from "../components/Footer";
import { SITE_DESCRIPTION, absoluteUrl } from "../lib/site";
import { initFlagsmith } from "../lib/flagsmith";

export const metadata: Metadata = {
  title: "Handmade Home Accessories",
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Handmade Home Accessories | Homebird Makes",
    description: SITE_DESCRIPTION,
    url: absoluteUrl("/"),
  },
  twitter: {
    title: "Handmade Home Accessories | Homebird Makes",
    description: SITE_DESCRIPTION,
  },
};

export default async function HomePage() {
  const flagsmith = await initFlagsmith();
  console.log("Flagsmith flags:", flagsmith.getAllFlags());

  const collections = await fetchQuery(api.collections.list);

  const featured = collections.find((c) => c.isFeatured) ?? null;
  const rest = featured ? collections.filter((c) => !c.isFeatured) : collections;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex flex-col items-center py-10">
        <Link href="/">
          <img src="/images/homebirdmakes_logo.png" className="h-36 w-auto sm:h-44" alt="Homebird Makes" />
        </Link>
        <nav className="mt-5 flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
          <Link href="/store" className="transition-colors hover:text-foreground">Shop</Link>
          <Link href="/about" className="transition-colors hover:text-foreground">About</Link>
          <Link href="/contact" className="transition-colors hover:text-foreground">Contact</Link>
        </nav>
        <div className="mt-5 h-px w-full bg-border" />
      </header>

      {/* Mosaic collections */}
      <section className="px-6 pb-16">
        <h2 className="mb-6 text-center text-xs tracking-[0.25em] text-muted-foreground">COLLECTIONS</h2>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 lg:grid-cols-3">
          {featured && (
            <a
              href={featured.etsy_link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative col-span-2 row-span-2 overflow-hidden rounded-[var(--radius)] shadow-sm lg:col-span-1"
            >
              <div className="aspect-square lg:aspect-auto lg:h-full">
                <img
                  src={featured.image}
                  alt={featured.category}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-foreground/50 to-transparent p-5">
                <div>
                  <span className="block text-xs tracking-widest text-background/70">FEATURED</span>
                  <span className="text-xl font-medium text-background">{featured.category}</span>
                </div>
              </div>
            </a>
          )}
          {rest.map((item) => (
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

      <div className="h-px w-full bg-border" />

      {/* CTA section */}
      <section className="bg-muted py-16 text-center">
        <h1 className="text-2xl leading-relaxed sm:text-3xl">
          Handmade with love,<br />for the home you love.
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-sm text-muted-foreground">
          Each piece is designed and carefully handcrafted in Staffordshire. Find the perfect gift or treat your home to something special.
        </p>
        <a
          href="https://www.etsy.com/uk/shop/homebirdmakes"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-[var(--radius)] bg-primary px-8 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90"
        >
          Visit the Etsy Shop
        </a>
      </section>

      {/* Instagram strip */}
      <section className="bg-background py-12">
        <p className="mb-6 text-center text-sm tracking-[0.2em] text-muted-foreground">FOLLOW @HOMEBIRD_MAKES</p>
        <InstagramCarousel />
      </section>

      {/* Newsletter section */}
      <section className="bg-muted py-16">
        <div className="mx-auto max-w-md px-6 text-center">
          <h2 className="mb-2 text-xl">Join the Homebird family</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Be the first to hear about new collections, seasonal makes, and exclusive offers.
          </p>
          <MailingList />
        </div>
      </section>

      <Footer />
    </div>
  );
}

