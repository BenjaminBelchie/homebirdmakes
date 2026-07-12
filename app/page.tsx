import type { Metadata } from "next";
import { preloadQuery } from "convex/nextjs";
import { api } from "../convex/_generated/api";
import PageHeader from "../components/PageHeader";
import InstagramFeed from "../components/InstagramFeed";
import Footer from "../components/Footer";
import CollectionsList from "../components/CollectionsList";
import { SITE_DESCRIPTION, absoluteUrl } from "../lib/site";

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
  const preloadedCollections = await preloadQuery(api.collections.list);
  return (
    <div className="flex flex-col items-center justify-center">
      <PageHeader />

      <h1 className="mt-8 text-2xl">
        COLLECTIONS
      </h1>
      <CollectionsList preloadedCollections={preloadedCollections} />

      <InstagramFeed />
      <Footer />
    </div>
  );
}
