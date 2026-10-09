"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart-context";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { items, total, setQty, removeItem, clear } = useCart();
  const [ordered, setOrdered] = useState(false);

  return (
    <div className="mx-auto max-w-[1326px] px-4 mt-6">
      <nav className="text-xs text-gray-500 mb-4">
        <Link href="/" className="hover:text-[#e31e25]">Accueil</Link>
        <span className="mx-1">›</span>
        <span className="text-gray-800 font-semibold">Mon Panier</span>
      </nav>

      <h1 className="font-extrabold text-xl text-gray-900 border-t-2 border-black pt-3 mb-6">
        Mon Panier
        <span className="block h-[3px] w-12 bg-[#e31e25] mt-1" />
      </h1>

      {ordered ? (
        <div className="bg-white border border-gray-200 p-10 text-center anim-up">
          <div className="text-5xl mb-3">✅</div>
          <h2 className="font-extrabold text-2xl text-gray-900">Commande confirmée !</h2>
          <p className="text-gray-500 mt-2 text-sm">
            Merci pour votre confiance. Notre équipe de Tripoli vous contactera sous peu
            pour organiser la livraison. — شكراً لثقتكم
          </p>
          <Link
            href="/"
            className="inline-block mt-6 bg-[#e31e25] text-white font-bold px-8 py-3 hover:bg-[#c21920] transition-colors"
          >
            Continuer mes achats
          </Link>
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white border border-gray-200 p-10 text-center">
          <div className="text-5xl mb-3">🛒</div>
          <p className="text-gray-500">Votre panier est vide.</p>
          <Link
            href="/"
            className="inline-block mt-6 bg-[#e31e25] text-white font-bold px-8 py-3 hover:bg-[#c21920] transition-colors"
          >
            Découvrir nos produits
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 p-4 flex gap-4 items-center anim-up">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-sm" />
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/produit/${item.slug}`}
                    className="text-sm font-semibold text-gray-800 hover:text-[#e31e25] line-clamp-2"
                  >
                    {item.name}
                  </Link>
                  <div className="text-[#e31e25] font-bold mt-1">{formatPrice(item.price)}</div>
                </div>
                <div className="flex items-center border border-gray-300">
                  <button
                    onClick={() => setQty(item.id, item.qty - 1)}
                    className="w-8 h-8 hover:bg-gray-100 font-bold"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-sm font-semibold">{item.qty}</span>
                  <button
                    onClick={() => setQty(item.id, item.qty + 1)}
                    className="w-8 h-8 hover:bg-gray-100 font-bold"
                  >
                    +
                  </button>
                </div>
                <div className="w-28 text-right font-bold text-gray-900 hidden sm:block">
                  {formatPrice(item.price * item.qty)}
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-400 hover:text-[#e31e25] text-lg"
                  aria-label="Supprimer"
                >
                  ✕
                </button>
              </div>
            ))}
            <button onClick={clear} className="text-xs text-gray-500 hover:text-[#e31e25] underline">
              Vider le panier
            </button>
          </div>

          <div className="bg-white border border-gray-200 p-6 h-fit">
            <h2 className="font-bold text-gray-900 uppercase text-sm tracking-wide mb-4">
              Récapitulatif
            </h2>
            <div className="flex justify-between text-sm py-2 border-b border-gray-100">
              <span className="text-gray-500">Sous-total</span>
              <span className="font-semibold">{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-sm py-2 border-b border-gray-100">
              <span className="text-gray-500">Livraison (Tripoli)</span>
              <span className="font-semibold text-green-600">Gratuite</span>
            </div>
            <div className="flex justify-between py-3 text-lg font-extrabold">
              <span>Total</span>
              <span className="text-[#e31e25]">{formatPrice(total)}</span>
            </div>
            <button
              onClick={() => {
                clear();
                setOrdered(true);
              }}
              className="w-full bg-[#e31e25] text-white font-bold py-3 hover:bg-[#c21920] transition-colors"
            >
              Commander — paiement à la livraison
            </button>
            <p className="text-[11px] text-gray-400 mt-3 text-center">
              💵 Paiement en espèces à la livraison partout à Tripoli
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
