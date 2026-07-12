import { Resend } from "@convex-dev/resend";
import { vOnEmailEventArgs } from "@convex-dev/resend";
import { v } from "convex/values";
import { components, internal } from "./_generated/api";
import { internalMutation, mutation } from "./_generated/server";

export const resend = new Resend(components.resend, {
  testMode: false,
  onEmailEvent: internal.resend.handleContactEmailEvent,
});

export const sendContactEmail = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const trimmedName = args.name.trim();
    const trimmedEmail = args.email.trim();
    const trimmedPhone = (args.phone ?? "").trim();
    const trimmedMessage = args.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      throw new Error("Missing required contact fields");
    }

    const from = normalizeSender(process.env.CONTACT_EMAIL_FROM);
    const to = process.env.CONTACT_EMAIL_TO?.trim();

    if (!from) {
      throw new Error("CONTACT_EMAIL_FROM must be set (e.g. Homebird Makes <noreply@homebirdmakes.co.uk>)");
    }

    if (!isValidFromAddress(from)) {
      throw new Error("CONTACT_EMAIL_FROM must be in email@example.com or Name <email@example.com> format");
    }

    if (!to) {
      throw new Error("CONTACT_EMAIL_TO must be set");
    }

    const brandUrl = process.env.CONTACT_EMAIL_BRAND_URL?.trim() ?? "https://homebirdmakes.co.uk";
    const logoUrl = process.env.CONTACT_EMAIL_LOGO_URL?.trim() ?? `${brandUrl.replace(/\/$/, "")}/images/homebirdmakes_logo.png`;

    await resend.sendEmail(ctx, {
      from,
      to,
      replyTo: [trimmedEmail],
      subject: `Website contact message from ${trimmedName}`,
      text: [
        `Name: ${trimmedName}`,
        `Email: ${trimmedEmail}`,
        `Phone: ${trimmedPhone || "Not provided"}`,
        "",
        trimmedMessage,
      ].join("\n"),
      html: [
        "<div style=\"font-family:Arial,Helvetica,sans-serif;color:#1f2937\">",
        `<a href=\"${escapeHtmlAttr(brandUrl)}\" target=\"_blank\" rel=\"noreferrer\" style=\"text-decoration:none;display:inline-block;margin-bottom:12px\">`,
        `<img src=\"${escapeHtmlAttr(logoUrl)}\" alt=\"Homebird Makes\" width=\"72\" height=\"72\" style=\"display:block;width:72px;height:72px;border-radius:9999px;object-fit:cover;border:1px solid #e2e8f0\" />`,
        "</a>",
        "<h2 style=\"margin:0 0 12px 0;font-size:18px;line-height:1.3\">New contact message</h2>",
        `<p><strong>Name:</strong> ${escapeHtml(trimmedName)}</p>`,
        `<p><strong>Email:</strong> ${escapeHtml(trimmedEmail)}</p>`,
        `<p><strong>Phone:</strong> ${escapeHtml(trimmedPhone || "Not provided")}</p>`,
        "<p><strong>Message:</strong></p>",
        `<p>${escapeHtml(trimmedMessage).replace(/\n/g, "<br />")}</p>`,
        "</div>",
      ].join(""),
    });

    return { ok: true };
  },
});

export const handleContactEmailEvent = internalMutation({
  args: vOnEmailEventArgs,
  handler: async (ctx, args) => {
    await ctx.db.insert("contactEmailEvents", {
      emailId: args.id,
      eventType: args.event.type,
      event: args.event,
      createdAt: Date.now(),
    });
  },
});

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeHtmlAttr(value: string) {
  return escapeHtml(value);
}

function normalizeSender(value: string | undefined) {
  return value?.trim().replace(/^"(.*)"$/, "$1");
}

function isValidFromAddress(value: string) {
  const plainEmail = /^[^<>\s]+@[^<>\s]+\.[^<>\s]+$/;
  const namedEmail = /^[^<>]+<[^<>\s]+@[^<>\s]+\.[^<>\s]+>$/;
  return plainEmail.test(value) || namedEmail.test(value);
}
