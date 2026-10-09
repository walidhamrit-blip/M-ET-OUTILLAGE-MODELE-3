"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-context";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/db/schema";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="product-card group relative bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col anim-up">
      {product.badge && (
        <span
          className={`absolute top-2 left-2 z-10 text-[11px] font-bold text-white px-2 py-0.5 ${
            product.badge === "PROMO" ? "bg-[#e31e25]" : "bg-[#333e48]"
          }`}
        >
          {product.badge}
        </span>
      )}
      {product.oldPrice && (
        <span className="absolute top-2 right-2 z-10 text-[11px] font-bold bg-[#ffe600] text-black px-2 py-0.5">
          -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
        </span>
      )}

      <Link href={`/produit/${product.slug}`} className="card-img block overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-44 object-cover"
          loading="lazy"
        />
      </Link>

      <div className="p-3 flex flex-col flex-1">
        <Link
          href={`/produit/${product.slug}`}
          className="text-[13px] text-gray-700 leading-snug line-clamp-2 min-h-[36px] hover:text-[#e31e25] transition-colors"
        >
          {product.name}
        </Link>

        <div className="mt-1 text-[11px] text-[#ffb400]">
          {"★".repeat(product.rating)}
          <span className="text-gray-300">{"★".repeat(5 - product.rating)}</span>
          <span className="text-gray-400 ml-1">({product.reviews})</span>
        </div>

        <div className="mt-2">
          <span className="text-[#e31e25] font-bold text-lg">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="ml-2 text-gray-400 text-sm line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        <div className="text-[11px] mt-0.5 text-green-600 font-medium">
          {product.inStock ? "✔ En stock à Tripoli" : "Rupture de stock"}
        </div>

        <div className="card-actions mt-auto pt-3">
          <button
            onClick={() =>
              addItem({
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                image: product.image,
              })
            }
            className="w-full bg-[#e31e25] text-white text-sm font-semibold py-2 hover:bg-[#c21920] transition-colors"
          >
            🛒 Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}
