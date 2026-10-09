"use client";

import { useCart } from "@/components/cart-context";

export function CartToast() {
  const { lastAdded } = useCart();
  if (!lastAdded) return null;
  return (
    <div className="anim-toast fixed bottom-6 right-6 z-50 bg-[#333e48] text-white text-sm px-5 py-3 rounded shadow-xl border-l-4 border-[#e31e25] max-w-xs">
      ✔ <span className="font-semibold">Ajouté au panier :</span>
      <div className="truncate text-gray-300">{lastAdded}</div>
    </div>
  );
}
