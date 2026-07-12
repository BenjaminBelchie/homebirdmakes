import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  collections: defineTable({
    image: v.string(),
    category: v.string(),
    etsy_link: v.string(),
  }).index("by_category", ["category"]),

  links: defineTable({
    display_text: v.string(),
    link: v.string(),
  }),
});
