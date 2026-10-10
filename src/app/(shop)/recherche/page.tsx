import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { getAllProducts, searchProducts } from "@/lib/data";
import { getServerT } from "@/lib/lang";

export const dynamic = "force-dynamic";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const [results, { t }] = await Promise.all([
    q.trim() ? searchProducts(q.trim()) : getAllProducts(),
    getServerT(),
  ]);

  return (
    <div className="mx-auto max-w-[1326px] px-4 mt-6">
      <nav className="text-xs text-gray-500 mb-4">
        <Link href="/" className="hover:text-[#e31e25]">{t("home")}</Link>
        <span className="mx-1">›</span>
        <span className="text-gray-800 font-semibold">{t("searchAria")}</span>
      </nav>

      <h1 className="font-extrabold text-xl text-gray-900 border-t-2 border-black pt-3">
        {q.trim() ? t("searchTitle", { q, n: results.length }) : t("allProductsTitle", { n: results.length })}
        <span className="block h-[3px] w-12 bg-[#e31e25] mt-1" />
      </h1>

      {results.length === 0 ? (
        <div className="bg-white border border-gray-200 p-10 text-center mt-6 text-gray-500">{t("noResult")}</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
