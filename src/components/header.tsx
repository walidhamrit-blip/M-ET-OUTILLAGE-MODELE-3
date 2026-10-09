"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/cart-context";
import type { Category } from "@/db/schema";

export function Header({ categories }: { categories: Category[] }) {
  const { count } = useCart();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    if (q.trim()) router.push(`/recherche?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <header className="w-full bg-white">
      {/* ---- Top dark bar ---- */}
      <div className="bg-[#333e48] text-gray-300 text-xs">
        <div className="mx-auto max-w-[1326px] px-4 h-9 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span>📍 Tripoli — Souk Al Joumaa, Libye</span>
            <span className="hidden md:inline">طرابلس · ليبيا</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+218214445566" className="hover:text-white transition-colors">
              ☎ +218 21 444 55 66
            </a>
            <span className="hidden sm:inline text-gray-500">|</span>
            <Link href="/panier" className="hidden sm:inline hover:text-white transition-colors">
              Suivi de commande
            </Link>
          </div>
        </div>
      </div>

      {/* ---- Main bar: logo / search / account / cart ---- */}
      <div className="bg-[#333e48] pb-4 pt-1">
        <div className="mx-auto max-w-[1326px] px-4 flex items-center gap-6 flex-wrap">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="bg-[#e31e25] text-white font-extrabold italic text-2xl px-3 py-1.5 rounded-md border-2 border-white tracking-tight">
              Ma<span className="not-italic">𝕋</span>EK
            </span>
            <span className="hidden lg:flex flex-col leading-tight">
              <span className="text-white font-bold text-sm">Matériaux & Outillage</span>
              <span className="text-gray-400 text-[11px]">Tripoli — Libye · طرابلس</span>
            </span>
          </Link>

          <form onSubmit={submitSearch} className="flex-1 min-w-[220px] flex">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Rechercher un produit, une marque, une catégorie…"
              className="flex-1 h-11 px-4 rounded-l-md bg-white text-sm text-gray-800 outline-none placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="h-11 px-5 rounded-r-md bg-[#e31e25] text-white font-semibold text-sm hover:bg-[#c21920] transition-colors"
              aria-label="Rechercher"
            >
              🔍
            </button>
          </form>

          <div className="flex items-center gap-5 text-white shrink-0">
            <Link href="/panier" className="hidden md:flex flex-col items-center text-xs hover:text-gray-300 transition-colors">
              <span className="text-xl">👤</span>
              <span>Mon Compte</span>
            </Link>
            <Link href="/panier" className="relative flex flex-col items-center text-xs hover:text-gray-300 transition-colors">
              <span className="text-xl">🛒</span>
              <span>Mon Panier</span>
              <span className="absolute -top-2 -right-2 bg-[#e31e25] text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                {count}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* ---- Nav bar with mega menu ---- */}
      <div className="bg-white border-b border-gray-200 relative z-30">
        <div className="mx-auto max-w-[1326px] px-4 flex items-stretch">
          {/* TOUS NOS RAYONS — overlapping box */}
          <div
            className={`mega-wrap relative -mt-7 z-40 ${menuOpen ? "open" : ""}`}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="h-[72px] w-[240px] bg-white shadow-[0_0_12px_rgba(0,0,0,0.12)] flex items-center justify-between px-5 font-bold text-[15px] text-gray-900 tracking-wide"
            >
              TOUS NOS RAYONS
              <span className="text-[#e31e25] text-xl leading-none">≡</span>
            </button>
            <div className="mega-panel absolute left-0 top-full w-[300px] bg-white shadow-xl border border-gray-100">
              <ul className="py-2">
                {categories.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/categorie/${c.slug}`}
                      className="flex items-center justify-between px-5 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-[#e31e25] transition-colors border-b border-gray-50 last:border-0"
                      onClick={() => setMenuOpen(false)}
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-lg">{c.icon}</span>
                        {c.name}
                      </span>
                      <span className="text-[11px] text-gray-400">{c.nameAr}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Horizontal links */}
          <nav className="hidden lg:flex items-stretch text-[15px] flex-1">
            <Link
              href="/categorie/outillage-electro"
              className="flex items-center px-5 bg-red-50 text-gray-900 hover:text-[#e31e25] border-r border-gray-200 transition-colors"
            >
              Promo Chantier
            </Link>
            <Link href="/categorie/gros-oeuvre" className="flex items-center px-5 text-gray-900 hover:text-[#e31e25] border-r border-gray-200 transition-colors">
              Ciment & Gros Œuvre
            </Link>
            <Link href="/categorie/securite-chantier" className="flex items-center px-5 text-gray-900 hover:text-[#e31e25] border-r border-gray-200 transition-colors">
              Service Entreprise
            </Link>
            <Link href="/" className="flex items-center px-5 text-gray-900 hover:text-[#e31e25] border-r border-gray-200 transition-colors">
              Vente En Ligne
            </Link>
            <Link href="/" className="flex items-center px-5 text-gray-900 hover:text-[#e31e25] border-r border-gray-200 transition-colors">
              Matek Recrute
            </Link>
            <Link href="/" className="flex items-center px-5 text-gray-900 hover:text-[#e31e25] transition-colors">
              Nous Contacter
            </Link>
            <span className="flex-1" />
            <Link href="/" className="flex items-center px-5 bg-[#e31e25] text-white font-bold hover:bg-[#c21920] transition-colors">
              Aide ?
            </Link>
          </nav>
        </div>
      </div>

      {/* ---- Red promo strip ---- */}
      <Link href="/categorie/gros-oeuvre" className="block bg-[#e31e25]">
        <div className="mx-auto max-w-[1326px] px-4 h-[66px] flex items-center justify-center lg:justify-between gap-4 overflow-hidden">
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <span className="text-white font-extrabold italic text-2xl md:text-3xl tracking-tight drop-shadow">
              NOUVEAU
            </span>
            <span className="bg-[#ffe600] text-black font-extrabold italic text-2xl md:text-3xl px-3 py-0.5 -skew-x-6 border-2 border-black">
              MAGASIN
            </span>
            <span className="text-white font-bold text-xl md:text-2xl" dir="rtl">
              تفرّحكم بـ
            </span>
            <span className="hidden sm:inline-flex items-center border-2 border-white rounded-md px-3 py-1 text-white font-extrabold italic text-xl">
              Ma𝕋EK
            </span>
          </div>
          <span className="shine-wrap hidden lg:inline-flex items-center bg-black text-white text-sm font-semibold px-6 py-2 rounded-full anim-blink">
            Cliquez ici
          </span>
        </div>
      </Link>
    </header>
  );
}
