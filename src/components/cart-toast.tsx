"use client";

import { useCart } from "@/components/cart-context";
import { useLang } from "@/components/lang-context";
import { cartItemName } from "@/lib/localize";

export function CartToast() {
  const { lastAdded } = useCart();
  const { lang, t } = useLang();
  if (!lastAdded) return null;
  return (
    <div className="anim-toast fixed bottom-6 end-6 z-50 bg-[#333e48] text-white text-sm px-5 py-3 rounded shadow-xl border-s-4 border-[#e31e25] max-w-xs">
      <span className="font-semibold">{t("addedToCart")}</span>
      <div className="truncate text-gray-300">{cartItemName(lastAdded, lang)}</div>
    </div>
  );
}
