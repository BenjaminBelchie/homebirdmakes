import type { Id } from "@/convex/_generated/dataModel";

export type Collection = {
  id: Id<"collections">;
  image: string;
  category: string;
  etsy_link: string;
  isFeatured: boolean;
};

export type LinkItem = {
  id: Id<"links">;
  display_text: string;
  link: string;
  order: number;
};
