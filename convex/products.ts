import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db.query("products").collect();
  },
});

export const upsert = mutation({
  args: {
    stripeProductId: v.string(),
    featured: v.boolean(),
    displayOrder: v.number(),
    slug: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("products")
      .withIndex("by_stripeProductId", (q) => q.eq("stripeProductId", args.stripeProductId))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        featured: args.featured,
        displayOrder: args.displayOrder,
        slug: args.slug,
      });
    } else {
      await ctx.db.insert("products", args);
    }
  },
});

export const remove = mutation({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
