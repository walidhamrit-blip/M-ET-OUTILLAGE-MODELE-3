import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { CartProvider } from "@/components/cart-context";
import { LangProvider } from "@/components/lang-context";
import { dirOf } from "@/lib/i18n";
import { getLang } from "@/lib/lang";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "TRIPO-TECK — Matériaux & Outillage · طرابلس، ليبيا",
  description:
    "TRIPO-TECK : vente de matériaux de construction et d'outillage professionnel à Tripoli, Libye. Ciment, outillage électroportatif, peinture, plomberie et plus — livraison rapide.",
};

// Runs before first paint so the saved (or system) theme applies without a flash.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark");}catch(e){}})();`;

export default async function RootLayout({ children }: { children: ReactNode }) {
  const lang = await getLang();
  return (
    <html lang={lang} dir={dirOf(lang)} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-[#f4f4f4] text-slate-900 antialiased">
        <LangProvider initialLang={lang}>
          <CartProvider>{children}</CartProvider>
        </LangProvider>
      </body>
    </html>
  );
}
