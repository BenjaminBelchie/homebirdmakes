import type { Metadata } from "next";
import ImageButton from "../components/ImageButton";
import PageHeader from "../components/PageHeader";
import InstagramFeed from "../components/InstagramFeed";
import Footer from "../components/Footer";
import { getCollections } from "../lib/convex";
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
  const data = await getCollections();

  return (
    <div className="flex flex-col items-center justify-center">
      <PageHeader />

      <h1 className="mt-8 text-2xl">
        COLLECTIONS
      </h1>
      <div className="mt-[55px] grid grid-cols-1 gap-8 tablet:grid-cols-2 desktop:grid-cols-3">
        {data?.map((item, index) => (
          <div key={item.image} className="flex h-[350px] w-[350px] flex-col">
            <ImageButton key={index} image={`${item.image}`} category={item.category} href={item.etsy_link} />
          </div>
        ))}
      </div>

      <InstagramFeed />
      <Footer />
    </div>
  );
}
