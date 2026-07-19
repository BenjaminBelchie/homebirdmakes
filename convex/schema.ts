import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  collections: defineTable({
    image: v.string(),
    category: v.string(),
    etsy_link: v.string(),
    isFeatured: v.optional(v.boolean()),
  }).index("by_category", ["category"]),

  links: defineTable({
    display_text: v.string(),
    link: v.string(),
    order: v.optional(v.number()),
  }),

  contactEmailEvents: defineTable({
    emailId: v.string(),
    eventType: v.string(),
    event: v.any(),
    createdAt: v.number(),
  })
    .index("by_email_id", ["emailId"])
    .index("by_event_type", ["eventType"]),
});
