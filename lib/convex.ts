import { ConvexHttpClient } from "convex/browser";

type RawCollection = {
  _id?: string;
  id?: number | string;
  image: string;
  category: string;
  etsyLink?: string;
  etsy_link?: string;
};

type RawLink = {
  _id?: string;
  id?: number | string;
  display_text?: string;
  displayText?: string;
  link: string;
};

export type Collection = {
  id: string;
  image: string;
  category: string;
  etsy_link: string;
};

export type LinkItem = {
  id: string;
  display_text: string;
  link: string;
};

function getConvexClient() {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) {
    return null;
  }
  return new ConvexHttpClient(url);
}

export async function getCollections(): Promise<Collection[]> {
  const client = getConvexClient();
  if (!client) {
    return [];
  }

  const records = (await client.query("collections:list", {})) as RawCollection[];
  return (records ?? []).map((item) => ({
    id: String(item.id ?? item._id ?? ""),
    image: item.image,
    category: item.category,
    etsy_link: item.etsy_link ?? item.etsyLink ?? "",
  }));
}

export async function getLinks(): Promise<LinkItem[]> {
  const client = getConvexClient();
  if (!client) {
    return [];
  }

  const records = (await client.query("links:list", {})) as RawLink[];
  return (records ?? []).map((item) => ({
    id: String(item.id ?? item._id ?? ""),
    display_text: item.display_text ?? item.displayText ?? "",
    link: item.link,
  }));
}
