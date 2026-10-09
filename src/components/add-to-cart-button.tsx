"use client";

import { useCart } from "@/components/cart-context";
import type { Product } from "@/db/schema";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  return (
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
      className="w-full md:w-auto bg-[#e31e25] text-white font-bold px-10 py-3 hover:bg-[#c21920] transition-colors"
    >
      🛒 Ajouter au panier
    </button>
  );
}
