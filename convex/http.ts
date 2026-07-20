import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { resend } from "./resend";

const http = httpRouter();

http.route({
  path: "/resend-webhook",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    return await resend.handleResendEventWebhook(ctx, req);
  }),
});

http.route({
  path: "/webhooks/stripe",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");
    const secret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!signature || !secret) {
      return new Response("Webhook configuration error", { status: 500 });
    }

    const valid = await verifyStripeSignature(body, signature, secret);
    if (!valid) {
      return new Response("Invalid signature", { status: 400 });
    }

    const event = JSON.parse(body);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      if (session.payment_status !== "paid") {
        return new Response("OK", { status: 200 });
      }

      await ctx.runMutation(internal.orders.create, {
        stripeSessionId: session.id,
        stripePaymentIntentId: session.payment_intent ?? null,
        customerEmail: session.customer_details?.email ?? null,
        customerName: session.customer_details?.name ?? null,
        clerkUserId: session.metadata?.clerkUserId || null,
        amountTotal: session.amount_total ?? 0,
        currency: session.currency ?? "gbp",
        shippingAddress: session.shipping_details?.address ?? null,
        itemsMetadata: session.metadata?.items ?? "[]",
      });
    }

    return new Response("OK", { status: 200 });
  }),
});

export default http;

/** Verify a Stripe webhook signature using the Web Crypto API (no Node.js required). */
async function verifyStripeSignature(
  payload: string,
  header: string,
  secret: string
): Promise<boolean> {
  const parts: Record<string, string> = {};
  for (const chunk of header.split(",")) {
    const eq = chunk.indexOf("=");
    if (eq !== -1) parts[chunk.slice(0, eq)] = chunk.slice(eq + 1);
  }

  const t = parts["t"];
  const v1 = parts["v1"];
  if (!t || !v1) return false;

  // Reject webhooks older than 5 minutes to prevent replay attacks
  const tolerance = 300;
  if (Math.abs(Date.now() / 1000 - Number(t)) > tolerance) return false;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const mac = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(`${t}.${payload}`)
  );
  const expected = Array.from(new Uint8Array(mac))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Constant-time comparison to prevent timing-based attacks
  if (expected.length !== v1.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ v1.charCodeAt(i);
  }
  return diff === 0;
}
