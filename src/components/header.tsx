"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/cart-context";
import { useLang } from "@/components/lang-context";
import { LangSwitcher } from "@/components/lang-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Category } from "@/db/schema";
import type { SiteSettings } from "@/lib/data";
import { categoryName } from "@/lib/localize";

export function Header({ categories, settings }: { categories: Category[]; settings: SiteSettings }) {
  const { count } = useCart();
  const { lang, t } = useLang();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    if (q.trim()) router.push(`/recherche?q=${encodeURIComponent(q.trim())}`);
  }

  const phoneHref = `tel:${settings.phone.replace(/[^+\d]/g, "")}`;

  return (
    <header className="w-full bg-white">
      {/* ---- Top dark bar ---- */}
      <div className="bg-[#333e48] text-gray-300 text-xs">
        <div className="mx-auto max-w-[1326px] px-4 h-9 flex items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span>📍 {settings.address}</span>
            <span className="hidden md:inline">{t("topLocation")}</span>
          </div>
          <div className="flex items-center gap-3">
            <a href={phoneHref} className="hover:text-white transition-colors" dir="ltr">
              ☎ {settings.phone}
            </a>
            <span className="hidden sm:inline text-gray-500">|</span>
            <ThemeToggle />
            <span className="hidden sm:inline text-gray-500">|</span>
            <LangSwitcher />
          </div>
        </div>
      </div>

      {/* ---- Main bar: logo / search / account / cart ---- */}
      <div className="bg-[#333e48] pb-4 pt-1">
        <div className="mx-auto max-w-[1326px] px-4 flex items-center gap-6 flex-wrap">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="bg-[#e31e25] text-white font-extrabold text-2xl px-3 py-1.5 rounded-md border-2 border-white tracking-tight" dir="ltr">
              {settings.shopName}
            </span>
            <span className="hidden lg:flex flex-col leading-tight">
              <span className="text-white font-bold text-sm">{t("tagline")}</span>
              <span className="text-gray-400 text-[11px]">Tripoli — Libye · طرابلس</span>
            </span>
          </Link>

          <form onSubmit={submitSearch} className="flex-1 min-w-[220px] flex">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="flex-1 h-11 px-4 rounded-s-md bg-white text-sm text-gray-800 outline-none placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="h-11 px-5 rounded-e-md bg-[#e31e25] text-white font-semibold text-sm hover:bg-[#c21920] transition-colors"
              aria-label={t("searchAria")}
            >
              🔍
            </button>
          </form>

          <div className="flex items-center gap-5 text-white shrink-0">
            <Link href="/panier" className="hidden md:flex flex-col items-center text-xs hover:text-gray-300 transition-colors">
              <span className="text-xl">👤</span>
              <span>{t("account")}</span>
            </Link>
            <Link href="/panier" className="relative flex flex-col items-center text-xs hover:text-gray-300 transition-colors">
              <span className="text-xl">🛒</span>
              <span>{t("cart")}</span>
              <span className="absolute -top-2 -end-2 bg-[#e31e25] text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                {count}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* ---- Nav bar with mega menu ---- */}
      <div className="bg-white border-b border-gray-200 relative z-30">
        <div className="mx-auto max-w-[1326px] px-4 flex items-stretch">
          {/* ALL DEPARTMENTS — overlapping box */}
          <div
            className={`mega-wrap relative -mt-7 z-40 ${menuOpen ? "open" : ""}`}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="h-[72px] w-[240px] bg-white shadow-[0_0_12px_rgba(0,0,0,0.12)] flex items-center justify-between px-5 font-bold text-[15px] text-gray-900 tracking-wide"
            >
              {t("allDepartments")}
              <span className="text-[#e31e25] text-xl leading-none">≡</span>
            </button>
            <div className="mega-panel absolute start-0 top-full w-[300px] bg-white shadow-xl border border-gray-100">
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
                        {categoryName(c, lang)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Horizontal links */}
          <nav className="hidden lg:flex items-stretch text-[15px] flex-1">
            <Link href="/categorie/outillage-electro" className="flex items-center px-5 bg-red-50 text-gray-900 hover:text-[#e31e25] border-e border-gray-200 transition-colors">
              {t("navPromo")}
            </Link>
            <Link href="/categorie/gros-oeuvre" className="flex items-center px-5 text-gray-900 hover:text-[#e31e25] border-e border-gray-200 transition-colors">
              {t("navCement")}
            </Link>
            <Link href="/categorie/securite-chantier" className="flex items-center px-5 text-gray-900 hover:text-[#e31e25] border-e border-gray-200 transition-colors">
              {t("navService")}
            </Link>
            <Link href="/" className="flex items-center px-5 text-gray-900 hover:text-[#e31e25] border-e border-gray-200 transition-colors">
              {t("navOnline")}
            </Link>
            <Link href="/" className="flex items-center px-5 text-gray-900 hover:text-[#e31e25] border-e border-gray-200 transition-colors">
              {t("navRecruit")}
            </Link>
            <Link href="/" className="flex items-center px-5 text-gray-900 hover:text-[#e31e25] transition-colors">
              {t("navContact")}
            </Link>
            <span className="flex-1" />
            <Link href="/" className="flex items-center px-5 bg-[#e31e25] text-white font-bold hover:bg-[#c21920] transition-colors">
              {t("help")}
            </Link>
          </nav>
        </div>
      </div>

      {/* ---- Red promo strip ---- */}
      <Link href="/categorie/gros-oeuvre" className="block bg-[#e31e25]">
        <div className="mx-auto max-w-[1326px] px-4 h-[66px] flex items-center justify-center lg:justify-between gap-4 overflow-hidden">
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <span className="text-white font-extrabold italic text-2xl md:text-3xl tracking-tight drop-shadow">
              {t("promoNew")}
            </span>
            <span className="bg-[#ffe600] text-black font-extrabold italic text-2xl md:text-3xl px-3 py-0.5 -skew-x-6 border-2 border-black">
              {t("promoStore")}
            </span>
            <span className="text-white font-bold text-xl md:text-2xl">{t("promoPresent")}</span>
            <span className="hidden sm:inline-flex items-center border-2 border-white rounded-md px-3 py-1 text-white font-extrabold italic text-xl" dir="ltr">
              {settings.shopName}
            </span>
          </div>
          <span className="shine-wrap hidden lg:inline-flex items-center bg-black text-white text-sm font-semibold px-6 py-2 rounded-full anim-blink">
            {t("promoCta")}
          </span>
        </div>
      </Link>
    </header>
  );
}
