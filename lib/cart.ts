import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  stripePriceId: string;
  stripeProductId: string;
  name: string;
  image: string | null;
  unitAmount: number; // smallest currency unit (pence)
  currency: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (stripePriceId: string) => void;
  updateQuantity: (stripePriceId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalAmount: () => number;
};

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      addItem: (item) => {
        set((state) => {
          const existing = state.items.find((i) => i.stripePriceId === item.stripePriceId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.stripePriceId === item.stripePriceId ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        });
        get().openCart();
      },
      removeItem: (stripePriceId) =>
        set((state) => ({
          items: state.items.filter((i) => i.stripePriceId !== stripePriceId),
        })),
      updateQuantity: (stripePriceId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.stripePriceId !== stripePriceId)
              : state.items.map((i) =>
                  i.stripePriceId === stripePriceId ? { ...i, quantity } : i
                ),
        })),
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalAmount: () => get().items.reduce((sum, i) => sum + i.unitAmount * i.quantity, 0),
    }),
    {
      name: "homebird-cart",
      partialize: (state) => ({ items: state.items }), // don't persist isOpen
    }
  )
);

export function formatCartPrice(unitAmount: number, currency: string): string {
  const amount = (unitAmount / 100).toFixed(2);
  const symbol = currency === "gbp" ? "£" : currency.toUpperCase() + " ";
  return `${symbol}${amount}`;
}
