import type { ReactNode } from "react";
import { CartToast } from "@/components/cart-toast";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getCategories, getSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ShopLayout({ children }: { children: ReactNode }) {
  const [categories, settings] = await Promise.all([getCategories(), getSettings()]);
  return (
    <>
      <Header categories={categories} settings={settings} />
      <main className="min-h-[60vh]">{children}</main>
      <Footer categories={categories} settings={settings} />
      <CartToast />
    </>
  );
}
