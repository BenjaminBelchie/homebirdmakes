import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import type { Id } from "./_generated/dataModel";

function isDirectImageUrl(value: string) {
  return value.startsWith("http://") || value.startsWith("https://") || value.startsWith("/");
}

export const list = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query("collections").collect();

    return Promise.all(
      rows.map(async (row) => {
        let image = row.image;

        // Allow either a direct URL/path or a Convex storage file ID.
        if (!isDirectImageUrl(row.image)) {
          const resolvedUrl = await ctx.storage.getUrl(row.image as Id<"_storage">);
          if (resolvedUrl) {
            image = resolvedUrl;
          }
        }

        return {
          id: row._id,
          image,
          category: row.category,
          etsy_link: row.etsy_link,
        };
      })
    );
  },
});

export const create = mutation({
  args: {
    image: v.string(),
    category: v.string(),
    etsy_link: v.string(),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("collections", {
      image: args.image,
      category: args.category,
      etsy_link: args.etsy_link,
    });
  },
});
