import { v } from "convex/values";
import { internalMutation, query } from "./_generated/server";
import { resend } from "./resend";

type CartItemMeta = { n: string; q: number; a: number };

export const listForUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    return ctx.db
      .query("orders")
      .withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", identity.subject))
      .order("desc")
      .collect();
  },
});

export const create = internalMutation({
  args: {
    stripeSessionId: v.string(),
    stripePaymentIntentId: v.union(v.string(), v.null()),
    customerEmail: v.union(v.string(), v.null()),
    customerName: v.union(v.string(), v.null()),
    clerkUserId: v.union(v.string(), v.null()),
    amountTotal: v.number(),
    currency: v.string(),
    shippingAddress: v.union(v.any(), v.null()),
    itemsMetadata: v.string(), // JSON string of CartItemMeta[]
  },
  handler: async (ctx, args) => {
    // Idempotency guard — Stripe may retry the webhook
    const existing = await ctx.db
      .query("orders")
      .withIndex("by_stripeSessionId", (q) =>
        q.eq("stripeSessionId", args.stripeSessionId)
      )
      .unique();
    if (existing) return;

    await ctx.db.insert("orders", {
      stripeSessionId: args.stripeSessionId,
      stripePaymentIntentId: args.stripePaymentIntentId ?? undefined,
      customerEmail: args.customerEmail ?? undefined,
      customerName: args.customerName ?? undefined,
      clerkUserId: args.clerkUserId ?? undefined,
      amountTotal: args.amountTotal,
      currency: args.currency,
      shippingAddress: args.shippingAddress ?? undefined,
      status: "paid",
      createdAt: Date.now(),
    });

    if (!args.customerEmail) return;

    const from = process.env.CONTACT_EMAIL_FROM?.trim();
    if (!from) return;

    const brandUrl =
      process.env.CONTACT_EMAIL_BRAND_URL?.trim() ?? "https://homebirdmakes.co.uk";
    const logoUrl =
      process.env.CONTACT_EMAIL_LOGO_URL?.trim() ??
      `${brandUrl.replace(/\/$/, "")}/images/homebirdmakes_logo.png`;

    const formattedTotal = formatPrice(args.amountTotal, args.currency);
    const orderNumber = args.stripeSessionId.slice(-8).toUpperCase();

    let items: CartItemMeta[] = [];
    try {
      items = JSON.parse(args.itemsMetadata);
    } catch {}

    const itemRows = items
      .map(
        (i) =>
          `<tr>
            <td style="padding:6px 0;font-size:14px">${escapeHtml(i.n)}</td>
            <td style="padding:6px 0;font-size:14px;text-align:center">${i.q}</td>
            <td style="padding:6px 0;font-size:14px;text-align:right">${formatPrice(i.a * i.q, args.currency)}</td>
          </tr>`
      )
      .join("");

    const greeting = args.customerName
      ? `Hi ${escapeHtml(args.customerName.split(" ")[0])},`
      : "Hi there,";

    await resend.sendEmail(ctx, {
      from,
      to: args.customerEmail,
      subject: `Your Homebird Makes order #${orderNumber} is confirmed ❤️`,
      text: [
        greeting,
        "",
        `Thank you for your order #${orderNumber}! We've received your payment of ${formattedTotal} and will start preparing your handmade items right away.`,
        "",
        "We'll be in touch once your order is on its way.",
        "",
        "With love, Ali at Homebird Makes",
      ].join("\n"),
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;color:#1f2937;max-width:560px;margin:0 auto">
          <a href="${escapeHtml(brandUrl)}" style="display:inline-block;margin-bottom:20px">
            <img src="${escapeHtml(logoUrl)}" alt="Homebird Makes" width="72" height="72"
              style="display:block;width:72px;height:72px;border-radius:9999px;object-fit:cover;border:1px solid #e2e8f0" />
          </a>
          <h2 style="margin:0 0 4px;font-size:20px">Order confirmed!</h2>
          <p style="margin:0 0 20px;font-size:13px;color:#9ca3af">Order #${orderNumber}</p>
          <p style="margin:0 0 20px;color:#6b7280">${greeting} Thank you for your order.</p>
          ${
            itemRows
              ? `<table style="width:100%;border-collapse:collapse;margin-bottom:16px">
                  <thead>
                    <tr style="border-bottom:1px solid #e5e7eb">
                      <th style="text-align:left;padding-bottom:6px;font-size:12px;color:#6b7280">ITEM</th>
                      <th style="text-align:center;padding-bottom:6px;font-size:12px;color:#6b7280">QTY</th>
                      <th style="text-align:right;padding-bottom:6px;font-size:12px;color:#6b7280">PRICE</th>
                    </tr>
                  </thead>
                  <tbody>${itemRows}</tbody>
                  <tfoot>
                    <tr style="border-top:1px solid #e5e7eb">
                      <td colspan="2" style="padding-top:8px;font-size:14px;font-weight:bold">Total</td>
                      <td style="padding-top:8px;font-size:14px;font-weight:bold;text-align:right">${formattedTotal}</td>
                    </tr>
                  </tfoot>
                </table>`
              : `<p style="margin:0 0 16px"><strong>Total:</strong> ${formattedTotal}</p>`
          }
          <p style="font-size:14px;color:#6b7280">We'll be in touch once your order is on its way.</p>
          <p style="font-size:14px;margin-top:24px">With love,<br /><strong>Ali at Homebird Makes</strong></p>
        </div>
      `,
    });
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db.query("orders").order("desc").collect();
  },
});

function formatPrice(unitAmount: number, currency: string): string {
  const amount = (unitAmount / 100).toFixed(2);
  const symbol = currency === "gbp" ? "£" : currency.toUpperCase() + " ";
  return `${symbol}${amount}`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
