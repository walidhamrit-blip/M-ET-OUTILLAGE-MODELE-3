"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-context";
import { useLang } from "@/components/lang-context";
import type { Product } from "@/db/schema";
import { priceAmount } from "@/lib/format";
import { productName, toCartItem } from "@/lib/localize";

/** Carte produit façon Mytek : titre bleu en haut, image centrée,
 *  ancien prix barré rouge puis grand prix rouge en bas. */
export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { lang, t } = useLang();
  const name = productName(product, lang);

  return (
    <div className="product-card group relative bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full anim-up">
      {product.badge && (
        <span
          className={`absolute top-2 start-2 z-10 text-[10px] font-bold text-white px-1.5 py-0.5 ${
            product.badge === "PROMO" ? "bg-[#e31e25]" : "bg-[#333e48]"
          }`}
        >
          {product.badge === "PROMO" ? t("badgePromo") : product.badge === "TOP VENTE" ? t("badgeTop") : product.badge}
        </span>
      )}

      {/* Titre en haut, bleu foncé, deux lignes */}
      <Link
        href={`/produit/${product.slug}`}
        className="block px-3 pt-3 text-[13px] font-bold text-[#1b2a6b] leading-snug line-clamp-2 min-h-[38px] hover:text-[#e31e25] transition-colors"
      >
        {name}
      </Link>

      {/* Image centrée sur fond blanc */}
      <Link href={`/produit/${product.slug}`} className="card-img block overflow-hidden px-3 py-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={name} className="w-full h-40 sm:h-44 object-contain" loading="lazy" />
      </Link>

      {/* Prix en bas : ancien prix barré + grand prix rouge */}
      <div className="px-3 pb-3 mt-auto flex flex-col">
        {product.oldPrice && (
          <span
            className="text-gray-900 text-sm font-semibold line-through decoration-[#e31e25] decoration-2"
            dir="ltr"
          >
            {priceAmount(product.oldPrice)}
            <span className="text-[11px] ms-1">DL</span>
          </span>
        )}
        <span className="text-[#e31e25] font-extrabold text-2xl leading-tight" dir="ltr">
          {priceAmount(product.price)}
          <span className="text-sm font-extrabold ms-1">DL</span>
        </span>

        <div className="card-actions pt-2">
          <button
            onClick={() => addItem(toCartItem(product))}
            className="w-full bg-[#e31e25] text-white text-sm font-semibold py-2 hover:bg-[#c21920] transition-colors"
          >
            {t("addToCart")}
          </button>
        </div>
      </div>
    </div>
  );
}
