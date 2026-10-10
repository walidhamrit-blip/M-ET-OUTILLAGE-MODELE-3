"use client";

import Link from "next/link";
import { useLang } from "@/components/lang-context";
import type { Category } from "@/db/schema";
import type { SiteSettings } from "@/lib/data";
import { categoryName } from "@/lib/localize";

export function Footer({ categories, settings }: { categories: Category[]; settings: SiteSettings }) {
  const { lang, t } = useLang();
  const year = new Date().getFullYear();
  const services = [
    { icon: "🚚", title: t("svcDelivery"), sub: t("svcDeliverySub") },
    { icon: "💵", title: t("svcPayment"), sub: t("svcPaymentSub") },
    { icon: "🛡️", title: t("svcQuality"), sub: t("svcQualitySub") },
    { icon: "📞", title: t("svcSupport"), sub: settings.phone },
  ];

  return (
    <footer className="mt-12 bg-[#333e48] text-gray-300">
      {/* Services strip */}
      <div className="bg-white border-t border-gray-200">
        <div className="mx-auto max-w-[1326px] px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {services.map((s) => (
            <div key={s.title} className="flex flex-col items-center gap-1">
              <span className="text-3xl">{s.icon}</span>
              <span className="font-bold text-gray-900 text-sm">{s.title}</span>
              <span className="text-xs text-gray-500" dir="ltr">{s.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-[#e31e25]">
        <div className="mx-auto max-w-[1326px] px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white font-bold text-lg">{t("newsletterText")}</div>
          <form className="flex w-full md:w-auto">
            <input
              type="email"
              required
              placeholder={t("emailPlaceholder")}
              className="h-11 px-4 rounded-s-md bg-white text-sm text-gray-800 outline-none w-full md:w-72"
            />
            <button className="h-11 px-5 rounded-e-md bg-black text-white text-sm font-semibold hover:bg-gray-900 transition-colors">
              {t("subscribe")}
            </button>
          </form>
        </div>
      </div>

      {/* Columns */}
      <div className="mx-auto max-w-[1326px] px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <span className="bg-[#e31e25] text-white font-extrabold text-xl px-3 py-1 rounded-md border-2 border-white inline-block" dir="ltr">
            {settings.shopName}
          </span>
          <p className="mt-4 text-gray-400 leading-relaxed">{t("footerDesc")}</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">{t("colDepartments")}</h4>
          <ul className="space-y-2">
            {categories.slice(0, 6).map((c) => (
              <li key={c.id}>
                <Link href={`/categorie/${c.slug}`} className="hover:text-white transition-colors">
                  {categoryName(c, lang)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">{t("colInfo")}</h4>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-white transition-colors">{t("aboutUs")}</Link></li>
            <li><Link href="/" className="hover:text-white transition-colors">{t("deliveryReturns")}</Link></li>
            <li><Link href="/" className="hover:text-white transition-colors">{t("terms")}</Link></li>
            <li><Link href="/" className="hover:text-white transition-colors">{t("businessService")}</Link></li>
            <li><Link href="/" className="hover:text-white transition-colors">{t("recruit")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">{t("colContact")}</h4>
          <ul className="space-y-2 text-gray-400">
            <li>📍 {settings.address}</li>
            <li dir="ltr">☎ {settings.phone}</li>
            {settings.email && <li>✉ {settings.email}</li>}
            <li>🕐 {t("hours")}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-600/50">
        <div className="mx-auto max-w-[1326px] px-4 py-4 text-xs text-gray-400 flex flex-col md:flex-row justify-between gap-2">
          <span>{t("copyright", { year, shop: settings.shopName })}</span>
          <span>{t("payments")}</span>
        </div>
      </div>
    </footer>
  );
}
