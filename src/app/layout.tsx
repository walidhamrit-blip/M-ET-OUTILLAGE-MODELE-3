import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { CartProvider } from "@/components/cart-context";
import { CartToast } from "@/components/cart-toast";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getCategories } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "MaTEK — Matériaux & Outillage à Tripoli, Libye",
  description:
    "MaTEK : vente de matériaux de construction et d'outillage professionnel à Tripoli, Libye. Ciment, outillage électroportatif, peinture, plomberie et plus — livraison rapide.",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const categories = await getCategories();
  return (
    <html lang="fr">
      <body className="bg-[#f4f4f4] text-slate-900 antialiased">
        <CartProvider>
          <Header categories={categories} />
          <main className="min-h-[60vh]">{children}</main>
          <Footer categories={categories} />
          <CartToast />
        </CartProvider>
      </body>
    </html>
  );
}
