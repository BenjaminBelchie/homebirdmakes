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
          isFeatured: row.isFeatured ?? false,
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
    isFeatured: v.boolean(),
  },
  handler: async (ctx, args) => {
    const { isFeatured, ...rest } = args;
    if (isFeatured) {
      const all = await ctx.db.query("collections").collect();
      await Promise.all(
        all
          .filter((row) => row.isFeatured)
          .map((row) => ctx.db.patch(row._id, { isFeatured: false }))
      );
    }
    return ctx.db.insert("collections", { ...rest, isFeatured });
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const update = mutation({
  args: {
    id: v.id("collections"),
    image: v.optional(v.string()),
    category: v.string(),
    etsy_link: v.string(),
    isFeatured: v.boolean(),
  },
  handler: async (ctx, args) => {
    const { id, image, isFeatured, ...rest } = args;
    if (isFeatured) {
      const all = await ctx.db.query("collections").collect();
      await Promise.all(
        all
          .filter((row) => row.isFeatured && row._id !== id)
          .map((row) => ctx.db.patch(row._id, { isFeatured: false }))
      );
    }
    await ctx.db.patch(id, {
      ...rest,
      isFeatured,
      ...(image !== undefined ? { image } : {}),
    });
  },
});

export const remove = mutation({
  args: {
    id: v.id("collections"),
  },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});
