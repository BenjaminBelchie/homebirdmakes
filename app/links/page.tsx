import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";
import { absoluteUrl } from "../../lib/site";

export const metadata: Metadata = {
  title: "Useful Links",
  description: "Find Homebird Makes social channels, shop destinations, and related links.",
  alternates: {
    canonical: "/links",
  },
  openGraph: {
    title: "Useful Links | Homebird Makes",
    description: "Find Homebird Makes social channels, shop destinations, and related links.",
    url: absoluteUrl("/links"),
  },
};

export default async function LinksPage() {
  const links = await fetchQuery(api.links.list);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PageHeader />
      <main className="flex flex-1 flex-col items-center px-6 py-8">
        <div className="w-full max-w-2xl">
          <span className="text-xs tracking-[0.25em] text-muted-foreground">USEFUL LINKS</span>
          <h1 className="mt-3 text-4xl sm:text-5xl">Find me here.</h1>
          <div className="mt-12 flex flex-col divide-y divide-border">
            {links.map((link, i) => (
              <a
                key={link.id}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-6 py-6 transition-colors hover:text-primary"
              >
                <span className="w-8 text-right text-xs text-muted-foreground tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-lg">{link.display_text}</span>
                <span className="text-muted-foreground transition-transform group-hover:translate-x-1">→</span>
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
