import type { Metadata } from "next";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";
import { getLinks } from "../../lib/convex";
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
  const data = await getLinks();

  return (
    <div className="flex flex-col items-center justify-center">
      <PageHeader />
      <div className="mt-[55px] flex w-full max-w-[930px] flex-col items-center justify-center">
        <h1 style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}>
          Homebird Makes Links
        </h1>
        <table className="w-4/5 border-collapse border border-[#e8e9eb]">
          <tbody>
            {data?.map((link) => (
              <tr key={link.id} className="h-[35px] border border-[#e8e9eb] text-center leading-[1.5]">
                <td className="px-[14px] py-[10px] align-middle">
                  <a className="text-[15px] text-[#3d4246] hover:underline" href={link.link}>
                    {link.display_text}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6">
          <Footer />
        </div>
      </div>
    </div>
  );
}
