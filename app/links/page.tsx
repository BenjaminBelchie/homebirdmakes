import type { Metadata } from "next";
import { preloadQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";
import LinksList from "../../components/LinksList";
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
  const preloadedLinks = await preloadQuery(api.links.list);
  return (
    <div className="flex flex-col items-center justify-center">
      <PageHeader />
      <div className="mt-[55px] flex w-full max-w-[930px] flex-col items-center justify-center">
        <h1 style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}>
          Homebird Makes Links
        </h1>
        <LinksList preloadedLinks={preloadedLinks} />
        <div className="mt-6">
          <Footer />
        </div>
      </div>
    </div>
  );
}
