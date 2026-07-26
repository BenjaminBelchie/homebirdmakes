"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useConvexAuth, useQuery } from "convex/react";
import { useUser, useClerk, useAuth } from "@clerk/nextjs";
import { useFlags } from "@flagsmith/flagsmith/react";
import { api } from "../../convex/_generated/api";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";
import { IconPackage, IconSettings, IconShield } from "@tabler/icons-react";
import Link from "next/link";

type CartItemMeta = { n: string; q: number; a: number; i?: string };

function formatPrice(unitAmount: number, currency: string) {
  const symbol = currency === "gbp" ? "£" : currency.toUpperCase() + " ";
  return `${symbol}${(unitAmount / 100).toFixed(2)}`;
}

export default function ProfilePage() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { user } = useUser();
  const { openUserProfile } = useClerk();
  const { sessionClaims } = useAuth();
  const isAdmin = sessionClaims?.metadata?.role === "admin";
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
          <div className="flex min-w-0 items-center gap-4">
            <img
              src={user.imageUrl}
              alt={user.fullName ?? "Profile picture"}
              className="h-12 w-12 shrink-0 rounded-full object-cover"
            />
            <div className="min-w-0">
              <h1 className="text-xl font-medium">{user.fullName}</h1>
              <p className="truncate text-sm text-muted-foreground">
                {user.primaryEmailAddress?.emailAddress}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Member since {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-GB", { month: "long", year: "numeric" }) : "—"}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            {isAdmin && (
              <Link
                href="/admin"
                aria-label="Admin"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <IconShield size={18} />
              </Link>
            )}
            <button
              onClick={() => openUserProfile()}
              aria-label="Account settings"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <IconSettings size={18} />
            </button>
          </div>
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
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                      <div className="flex items-center gap-3">
                        <p className="font-medium">
                          {formatPrice(order.amountTotal, order.currency)}
                        </p>
                        <span className="inline-block rounded-full bg-primary/20 px-2 py-0.5 text-[10px] tracking-wide text-foreground">
                          {order.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    {items.length > 0 ? (
                      <ul className="space-y-3">
                        {items.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-3">
                            {item.i ? (
                              <img
                                src={item.i}
                                alt={item.n}
                                className="h-14 w-14 flex-shrink-0 rounded-[calc(var(--radius)-2px)] object-cover"
                              />
                            ) : (
                              <div className="h-14 w-14 flex-shrink-0 rounded-[calc(var(--radius)-2px)] bg-muted" />
                            )}
                            <div className="min-w-0">
                              <p className="truncate text-sm">{item.n}</p>
                              {item.q > 1 && (
                                <p className="text-xs text-muted-foreground">Qty: {item.q}</p>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Order #{order.stripeSessionId.slice(-8).toUpperCase()}
                      </p>
                    )}
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
