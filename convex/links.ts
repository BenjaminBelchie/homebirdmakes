import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query("links").collect();

    return rows
      .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))
      .map((row, fallbackIndex) => ({
        id: row._id,
        display_text: row.display_text,
        link: row.link,
        order: row.order ?? fallbackIndex,
      }));
  },
});

export const create = mutation({
  args: {
    display_text: v.string(),
    link: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("links").collect();
    const maxOrder = existing.reduce((max, row) => Math.max(max, row.order ?? 0), -1);
    return ctx.db.insert("links", {
      display_text: args.display_text,
      link: args.link,
      order: maxOrder + 1,
    });
  },
});

export const reorder = mutation({
  args: {
    ids: v.array(v.id("links")),
  },
  handler: async (ctx, { ids }) => {
    await Promise.all(ids.map((id, index) => ctx.db.patch(id, { order: index })));
  },
});

export const update = mutation({
  args: {
    id: v.id("links"),
    display_text: v.string(),
    link: v.string(),
  },
  handler: async (ctx, { id, ...fields }) => {
    await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
  args: {
    id: v.id("links"),
  },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});
