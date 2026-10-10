"use client";

import { useCart } from "@/components/cart-context";
import { useLang } from "@/components/lang-context";
import type { Product } from "@/db/schema";
import { toCartItem } from "@/lib/localize";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { t } = useLang();
  return (
    <button
      onClick={() => addItem(toCartItem(product))}
      className="w-full md:w-auto bg-[#e31e25] text-white font-bold px-10 py-3 hover:bg-[#c21920] transition-colors"
    >
      {t("addToCart")}
    </button>
  );
}
