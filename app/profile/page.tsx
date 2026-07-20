"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useConvexAuth, useQuery } from "convex/react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useFlags } from "@flagsmith/flagsmith/react";
import { api } from "../../convex/_generated/api";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";
import { IconPackage, IconSettings } from "@tabler/icons-react";

type CartItemMeta = { n: string; q: number; a: number };

function formatPrice(unitAmount: number, currency: string) {
  const symbol = currency === "gbp" ? "£" : currency.toUpperCase() + " ";
  return `${symbol}${(unitAmount / 100).toFixed(2)}`;
}

export default function ProfilePage() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { user } = useUser();
  const { openUserProfile } = useClerk();
  const router = useRouter();
  const flags = useFlags(["store_page"]);
  const orders = useQuery(api.orders.listForUser);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/sign-in");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated || !user) return null;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PageHeader />

      <div className="mx-auto w-full max-w-3xl px-6 py-12">

        {/* Account header */}
        <section className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-5">
            <img
              src={user.imageUrl}
              alt={user.fullName ?? "Profile picture"}
              className="h-16 w-16 rounded-full object-cover"
            />
            <div>
              <h1 className="text-xl font-medium">{user.fullName}</h1>
              <p className="text-sm text-muted-foreground">
                {user.primaryEmailAddress?.emailAddress}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Member since {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-GB", { month: "long", year: "numeric" }) : "—"}
              </p>
            </div>
          </div>
          <button
            onClick={() => openUserProfile()}
            aria-label="Account settings"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <IconSettings size={16} />
            Settings
          </button>
        </section>

        <div className="my-8 h-px w-full bg-border" />

        {/* Orders */}
        {flags.store_page?.enabled && <section>
          <h2 className="mb-6 text-xs tracking-[0.25em] text-muted-foreground">ORDER HISTORY</h2>

          {orders === undefined && (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="h-24 animate-pulse rounded-[var(--radius)] bg-muted" />
              ))}
            </div>
          )}

          {orders?.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-16 text-muted-foreground">
              <IconPackage size={40} strokeWidth={1.25} />
              <p className="text-sm">No orders yet</p>
            </div>
          )}

          {orders && orders.length > 0 && (
            <ul className="space-y-3">
              {orders.map((order) => {
                let items: CartItemMeta[] = [];
                try {
                  const raw = (order as Record<string, unknown>).itemsMetadata;
                  if (typeof raw === "string") items = JSON.parse(raw);
                } catch {}

                return (
                  <li key={order._id} className="rounded-[var(--radius)] border bg-card p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                        {items.length > 0 ? (
                          <ul className="mt-1.5 space-y-0.5">
                            {items.map((item, idx) => (
                              <li key={idx} className="text-sm">
                                {item.n}
                                {item.q > 1 && (
                                  <span className="text-muted-foreground"> ×{item.q}</span>
                                )}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-1 text-sm text-muted-foreground">
                            Order #{order.stripeSessionId.slice(-8).toUpperCase()}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {formatPrice(order.amountTotal, order.currency)}
                        </p>
                        <span className="mt-1 inline-block rounded-full bg-primary/20 px-2 py-0.5 text-[10px] tracking-wide text-foreground">
                          {order.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
)}
        </section>}
      </div>

      <Footer />
    </div>
  );
}
