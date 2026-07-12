import type { Metadata } from "next";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";
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
  const para1 =
    "Hello and welcome to Homebird Makes, I'm Ali I love to design and create useful and pretty home accessories from my home studio in Staffordshire. I'm orginally from Hertfordshire but moved to the midlands after I was married over 20 years ago now.";
  const para2 =
    "I started sewing quite a few years ago as a hobby when my children were small, I made cushions and gifts for family and friends.  After I while I decided to open my own Etsy shop to see if any of my makes would sell. I have slowly built up my Etsy shop over the years and decided it was time to have my own website along side Etsy.";
  const para3 =
    "You can visit my Etsy shop to see other lovely makes to buy as well as read the lots of 5 star reviews I have received and am proud of.";

  return (
    <div className="max-w-full">
      <div className="flex flex-col items-center justify-center">
        <PageHeader />

        <div className="flex w-full max-w-[930px] flex-col items-center justify-center">
          <h1 className="mb-[55px] mt-[55px] text-2xl">
            About
          </h1>
          <div className="flex w-full flex-col gap-2">
            <div className="max-w-full px-8">
              <p>{para1}</p>
            </div>
            <div className="max-w-full px-8">
              <p>{para2}</p>
            </div>
            <div className="max-w-full px-8">
              <p>{para3}</p>
            </div>
          </div>
          <img className="mb-2 mt-4" src="/images/Ali.jpg" alt="Ali in studio" />
          <p className="px-8">
            My lovely work room, I am lucky to have a space to call my own.
          </p>

          <div className="mt-2 grid w-full grid-cols-1 items-center justify-center gap-2 px-8 md:grid-cols-2">
            <img src="/images/Room1.jpg" alt="Studio room 1" />
            <img src="/images/Room2.jpg" alt="Studio room 2" />
          </div>
        </div>
        <div className="mt-6">
          <Footer />
        </div>
      </div>
    </div>
  );
}
