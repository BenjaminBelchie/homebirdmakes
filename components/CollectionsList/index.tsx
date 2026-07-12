"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import ImageButton from "../ImageButton";

export default function CollectionsList(props: {
  preloadedCollections: Preloaded<typeof api.collections.list>;
}) {
  const collections = usePreloadedQuery(props.preloadedCollections);


  return (
    <div className="mt-[55px] grid grid-cols-1 gap-8 tablet:grid-cols-2 desktop:grid-cols-3">
      {collections.map((item, index) => (
        <div key={item.image} className="flex h-[350px] w-[350px] flex-col">
          <ImageButton key={index} image={`${item.image}`} category={item.category} href={item.etsy_link} />
        </div>
      ))}
    </div>
  );
}
