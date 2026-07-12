import type { Metadata } from "next";
import PopupMenu from "../../../components/PopupMenu";
import PageHeader from "../../../components/PageHeader";
import { absoluteUrl } from "../../../lib/site";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category).replaceAll("_", " ");

  return {
    title: `${decodedCategory} Collection`,
    description: `Browse the ${decodedCategory} collection from Homebird Makes.`,
    alternates: {
      canonical: `/collections/${category}`,
    },
    openGraph: {
      title: `${decodedCategory} Collection | Homebird Makes`,
      description: `Browse the ${decodedCategory} collection from Homebird Makes.`,
      url: absoluteUrl(`/collections/${category}`),
    },
  };
}

export default async function CollectionPage({ params }: Props) {
  const { category } = await params;

  return (
    <div className="flex flex-col items-center justify-center">
      <PageHeader />
      <div
        className="flex h-[300px] w-full items-center justify-center bg-cover bg-center bg-no-repeat bg-blend-overlay"
        style={{
          backgroundImage:
            "url(https://cdn.shopify.com/s/files/1/0014/1269/4073/collections/il_794xN.2560737347_gafl.jpg?v=1613653847}), linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.2))",
        }}
      >
        <h1 className="text-4xl text-white">
          {category}
        </h1>
      </div>
      <div className="m-4 min-w-[1100px]">
        <p className="text-brand-primary">
          This is some test content
        </p>
      </div>
      <hr className="mb-1 w-full border-slate-200" />

      <div className="flex min-w-[1100px] items-center justify-between">
        <PopupMenu
          menuItems={[
            {
              title: "Autumnal Decor",
              value: "Autumnal_Decor",
            },
            {
              title: "Liberty Fabric Pattern",
              value: "Liberty_Fabric_Pattern",
            },
            {
              title: "Liberty Mustard Capel Pumpkin",
              value: "Liberty_Mustard_Capel_Pumpkin",
            },
            {
              title: "Pumpkin Decoration",
              value: "Pumpkin_Decoration",
            },
          ]}
          buttonText="Filter"
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          itemFontSize="12px"
        />

        <p className="text-sm italic">
          X Products
        </p>

        <PopupMenu
          menuItems={[
            {
              title: "Featured",
              value: "Featured",
            },
            {
              title: "Alphabetically A-Z",
              value: "Alphabetically_A_Z",
            },
            {
              title: "Alphabetically Z-A",
              value: "Alphabetically_Z_A",
            },
            {
              title: "Price, Low to High",
              value: "Low_To_High",
            },
            {
              title: "Price, High to Low",
              value: "High_To_Low",
            },
            {
              title: "Date, New to Old",
              value: "New_To_Old",
            },
            {
              title: "Date, Old to New",
              value: "Old_To_New",
            },
          ]}
          buttonText="Sort"
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          itemFontSize="12px"
        />
      </div>
      <hr className="mb-2 mt-1 w-full border-slate-200" />
    </div>
  );
}
