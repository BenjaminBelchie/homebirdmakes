"use server";

import { headers } from "next/headers";
import { auth, currentUser } from "@clerk/nextjs/server";
import stripe from "../../lib/stripe";
import { initFlagsmith } from "../../lib/flagsmith";

type CheckoutItem = {
  stripePriceId: string;
  quantity: number;
  name: string;
  unitAmount: number;
};

export async function createCheckoutSession(
  items: CheckoutItem[]
): Promise<{ url: string }> {
  if (items.length === 0) throw new Error("Cart is empty");

  const headersList = await headers();
  const host = headersList.get("host")!;
  const proto = headersList.get("x-forwarded-proto") ?? "http";
  const baseUrl = `${proto}://${host}`;

  const flagsmith = await initFlagsmith();
  if (!flagsmith.hasFeature("store_page")) {
    throw new Error("Store is not currently available");
  }

  const { userId } = await auth();
  const user = userId ? await currentUser() : null;
  const customerEmail = user?.emailAddresses[0]?.emailAddress;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    ...(customerEmail ? { customer_email: customerEmail } : {}),
    line_items: items.map((item) => ({
      price: item.stripePriceId,
      quantity: item.quantity,
    })),
    shipping_address_collection: {
      allowed_countries: ["GB"],
    },
    // TODO: Add shipping_options once you have created shipping rates in the
    // Stripe dashboard (Products → Shipping rates) and have the rate IDs:
    // shipping_options: [{ shipping_rate: "shr_xxx" }],
    metadata: {
      clerkUserId: userId ?? "",
      items: JSON.stringify(
        items.map((i) => ({ n: i.name, q: i.quantity, a: i.unitAmount }))
      ),
    },
    success_url: `${baseUrl}/store/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/store/cancel`,
  });

  if (!session.url) throw new Error("Failed to create Stripe Checkout session");
  return { url: session.url };
}
