"use client";

import { useTransition, useEffect, useState } from "react";
import { useFlags } from "@flagsmith/flagsmith/react";
import { useCart, formatCartPrice } from "../../lib/cart";
import type { CartItem } from "../../lib/cart";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { IconMinus, IconPlus, IconTrash, IconShoppingBag } from "@tabler/icons-react";
import { createCheckoutSession } from "../../app/store/actions";

export default function CartDrawer() {
  const flags = useFlags(["store_page"]);
  const { items, isOpen, openCart, closeCart, updateQuantity, removeItem, totalItems, totalAmount } =
    useCart();
  const [isPending, startTransition] = useTransition();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const count = totalItems();
  const total = totalAmount();

  if (!flags.store_page?.enabled) return null;

  function handleCheckout() {
    startTransition(async () => {
      const lineItems = items.map((i) => ({
        stripePriceId: i.stripePriceId,
        quantity: i.quantity,
        name: i.name,
        unitAmount: i.unitAmount,
      }));
      const { url } = await createCheckoutSession(lineItems);
      window.location.href = url;
    });
  }

  return (
    <>
      {/* Cart icon trigger */}
      <button
        onClick={openCart}
        aria-label={`Open cart${mounted && count > 0 ? `, ${count} item${count > 1 ? "s" : ""}` : ""}`}
        className="relative flex items-center text-muted-foreground transition-colors hover:text-foreground"
      >
        <IconShoppingBag size={18} />
        {mounted && count > 0 && (
          <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
            {count > 9 ? "9+" : count}
          </span>
        )}
      </button>

      <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
        <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
          <SheetHeader className="border-b pb-4">
            <SheetTitle>Your Bag ({count})</SheetTitle>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 text-muted-foreground">
              <IconShoppingBag size={40} strokeWidth={1.25} />
              <p className="text-sm">Your bag is empty</p>
            </div>
          ) : (
            <ul className="flex-1 divide-y overflow-y-auto">
              {items.map((item: CartItem) => (
                <li key={item.stripePriceId} className="flex gap-3 py-4 px-6">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 shrink-0 rounded-[var(--radius)] object-cover"
                    />
                  )}
                  <div className="flex flex-1 flex-col gap-1">
                    <p className="text-sm font-medium leading-snug">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatCartPrice(item.unitAmount, item.currency)}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.stripePriceId, item.quantity - 1)}
                        aria-label="Decrease quantity"
                        className="flex h-6 w-6 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <IconMinus size={12} />
                      </button>
                      <span className="w-4 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.stripePriceId, item.quantity + 1)}
                        aria-label="Increase quantity"
                        className="flex h-6 w-6 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <IconPlus size={12} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.stripePriceId)}
                    aria-label={`Remove ${item.name}`}
                    className="self-start text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <IconTrash size={15} />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {items.length > 0 && (
            <SheetFooter className="border-t">
              <div className="flex w-full items-center justify-between text-sm font-medium">
                <span>Subtotal</span>
                <span>{formatCartPrice(total, items[0].currency)}</span>
              </div>
              <p className="text-xs text-muted-foreground">Shipping calculated at checkout</p>
              <Button className="w-full" onClick={handleCheckout} disabled={isPending}>
                {isPending ? "Redirecting…" : "Checkout"}
              </Button>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
