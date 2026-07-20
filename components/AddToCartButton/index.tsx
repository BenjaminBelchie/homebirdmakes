"use client";

import { useCart } from "../../lib/cart";
import type { CartItem } from "../../lib/cart";
import { Button } from "../ui/button";
import { IconShoppingBagPlus } from "@tabler/icons-react";

type Props = Omit<CartItem, "quantity">;

export default function AddToCartButton(props: Props) {
  const addItem = useCart((s) => s.addItem);

  return (
    <Button
      onClick={() => addItem(props)}
      variant="default"
      size="sm"
      className="w-full"
    >
      <IconShoppingBagPlus size={15} />
      Add to bag
    </Button>
  );
}
