"use client";

import { useRef } from "react";
import { ProductCard } from "@/components/product-card";
import { useLang } from "@/components/lang-context";
import type { Product } from "@/db/schema";

/** Rangée horizontale défilante de cartes produits avec flèches ‹ ›,
 *  comme les carrousels de promotions Mytek. */
export function ProductCarousel({ products }: { products: Product[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { dir } = useLang();
  const isRtl = dir === "rtl";

  // Le défilement natif (scrollBy) est physique : en RTL, les articles
  // suivants se trouvent à gauche, donc le delta est inversé.
  const scroll = (nextPage: boolean) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.9;
    const physical = nextPage ? (isRtl ? -amount : amount) : isRtl ? amount : -amount;
    el.scrollBy({ left: physical, behavior: "smooth" });
  };

  if (products.length === 0) return null;

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth pb-1"
      >
        {products.map((p) => (
          <div key={p.id} className="w-[calc(50%-6px)] sm:w-[calc(33.333%-8px)] lg:w-[calc(25%-9px)] shrink-0">
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      {products.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => scroll(false)}
            aria-label={isRtl ? "السابق" : "Previous"}
            className="absolute start-0 top-1/2 -translate-y-1/2 z-10 h-14 w-8 bg-white border border-gray-300 text-gray-500 text-xl flex items-center justify-center hover:text-[#e31e25] hover:border-[#e31e25] transition-colors"
          >
            {isRtl ? "›" : "‹"}
          </button>
          <button
            type="button"
            onClick={() => scroll(true)}
            aria-label={isRtl ? "التالي" : "Next"}
            className="absolute end-0 top-1/2 -translate-y-1/2 z-10 h-14 w-8 bg-white border border-gray-300 text-gray-500 text-xl flex items-center justify-center hover:text-[#e31e25] hover:border-[#e31e25] transition-colors"
          >
            {isRtl ? "‹" : "›"}
          </button>
        </>
      )}
    </div>
  );
}
