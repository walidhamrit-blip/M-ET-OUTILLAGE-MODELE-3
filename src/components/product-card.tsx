"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-context";
import { useLang } from "@/components/lang-context";
import type { Product } from "@/db/schema";
import { formatPrice } from "@/lib/format";
import { productName, toCartItem } from "@/lib/localize";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { lang, t } = useLang();
  const name = productName(product, lang);

  return (
    <div className="product-card group relative bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col anim-up">
      {product.badge && (
        <span
          className={`absolute top-2 start-2 z-10 text-[11px] font-bold text-white px-2 py-0.5 ${
            product.badge === "PROMO" ? "bg-[#e31e25]" : "bg-[#333e48]"
          }`}
        >
          {product.badge === "PROMO" ? t("badgePromo") : product.badge === "TOP VENTE" ? t("badgeTop") : product.badge}
        </span>
      )}
      {product.oldPrice && (
        <span className="absolute top-2 end-2 z-10 text-[11px] font-bold bg-[#ffe600] text-black px-2 py-0.5" dir="ltr">
          -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
        </span>
      )}

      <Link href={`/produit/${product.slug}`} className="card-img block overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={name} className="w-full h-44 object-cover" loading="lazy" />
      </Link>

      <div className="p-3 flex flex-col flex-1">
        <Link
          href={`/produit/${product.slug}`}
          className="text-[13px] text-gray-700 leading-snug line-clamp-2 min-h-[36px] hover:text-[#e31e25] transition-colors"
        >
          {name}
        </Link>

        <div className="mt-1 text-[11px] text-[#ffb400]">
          {"★".repeat(product.rating)}
          <span className="text-gray-300">{"★".repeat(5 - product.rating)}</span>
          <span className="text-gray-400 ms-1">{t("reviews", { n: product.reviews })}</span>
        </div>

        <div className="mt-2">
          <span className="text-[#e31e25] font-bold text-lg" dir="ltr">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="ms-2 text-gray-400 text-sm line-through" dir="ltr">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        <div className="text-[11px] mt-0.5 text-green-600 font-medium">
          {product.inStock ? t("inStock") : t("outOfStock")}
        </div>

        <div className="card-actions mt-auto pt-3">
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
