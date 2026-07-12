import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query("links").collect();

    return rows.map((row) => ({
      id: row._id,
      display_text: row.display_text,
      link: row.link,
    }));
  },
});

export const create = mutation({
  args: {
    display_text: v.string(),
    link: v.string(),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("links", {
      display_text: args.display_text,
      link: args.link,
    });
  },
});
