import type { Metadata } from "next";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";
import { absoluteUrl } from "../../lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Meet Ali, the maker behind Homebird Makes and her handmade home accessories studio.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | Homebird Makes",
    description: "Meet Ali, the maker behind Homebird Makes and her handmade home accessories studio.",
    url: absoluteUrl("/about"),
  },
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PageHeader />

      {/* Hero split */}
      <section className="mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-12 px-6 py-10 lg:grid-cols-2">
        <div>
          <span className="text-xs tracking-[0.25em] text-muted-foreground">THE MAKER</span>
          <h1 className="mt-3 text-5xl leading-tight sm:text-6xl">Meet<br />Ali.</h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Designer and maker of handmade home accessories, crafting from her studio in Staffordshire.
          </p>
          <a
            href="https://www.etsy.com/uk/shop/homebirdmakes"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-[var(--radius)] bg-primary px-8 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90"
          >
            Visit the Etsy Shop
          </a>
        </div>
        <div className="overflow-hidden rounded-[var(--radius)] lg:h-96">
          <img src="/images/ali.jpg" alt="Ali in her studio" className="h-full w-full object-cover object-[50%_60%]" />
        </div>
      </section>

      <div className="h-px bg-border" />

      {/* Story sections */}
      <section className="mx-auto w-full max-w-5xl divide-y divide-border px-6">
        <div className="grid grid-cols-1 gap-10 py-16 lg:grid-cols-2">
          <div>
            <span className="text-xs tracking-[0.25em] text-muted-foreground">THE BEGINNING</span>
            <h2 className="mt-3 text-2xl">Hello &amp; welcome</h2>
          </div>
          <p className="self-center text-base leading-relaxed text-muted-foreground">
            I'm Ali and I love to design and create useful and pretty home accessories from my home studio in Staffordshire. I'm originally from Hertfordshire but moved to the Midlands after I was married, over 20 years ago now.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 py-16 lg:grid-cols-2">
          <div>
            <span className="text-xs tracking-[0.25em] text-muted-foreground">THE CRAFT</span>
            <h2 className="mt-3 text-2xl">How it started</h2>
          </div>
          <p className="self-center text-base leading-relaxed text-muted-foreground">
            I started sewing quite a few years ago as a hobby when my children were small, making cushions and gifts for family and friends. After a while I decided to open my own Etsy shop to see if my makes would sell, and I've slowly built it up over the years.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 py-16 lg:grid-cols-2">
          <div>
            <span className="text-xs tracking-[0.25em] text-muted-foreground">THE SHOP</span>
            <h2 className="mt-3 text-2xl">Find me on Etsy</h2>
          </div>
          <p className="self-center text-base leading-relaxed text-muted-foreground">
            You can visit my Etsy shop to see my full range of lovely makes, and read the many 5-star reviews I've received and am really proud of.
          </p>
        </div>
      </section>

      <div className="h-px bg-border" />

      {/* Studio photos */}
      <section className="mx-auto w-full max-w-5xl px-6 py-16">
        <span className="text-xs tracking-[0.25em] text-muted-foreground">THE STUDIO</span>
        <p className="mb-8 mt-3 text-lg">My lovely workroom and I am lucky to have a space to call my own.</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <img src="/images/Room1.jpg" alt="Studio room 1" className="w-full rounded-[var(--radius)] object-cover" />
          <img src="/images/Room2.jpg" alt="Studio room 2" className="w-full rounded-[var(--radius)] object-cover" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
