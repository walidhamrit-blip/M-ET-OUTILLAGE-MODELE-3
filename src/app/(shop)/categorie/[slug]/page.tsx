import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { getCategoryBySlug, getProductsByCategory, getSettings } from "@/lib/data";
import { getServerT } from "@/lib/lang";
import { categoryName } from "@/lib/localize";

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();
  const [items, settings, { lang, t }] = await Promise.all([
    getProductsByCategory(category.id),
    getSettings(),
    getServerT(),
  ]);
  const name = categoryName(category, lang);

  return (
    <div className="mx-auto max-w-[1326px] px-4 mt-6">
      <nav className="text-xs text-gray-500 mb-4">
        <Link href="/" className="hover:text-[#e31e25]">{t("home")}</Link>
        <span className="mx-1">›</span>
        <span className="text-gray-800 font-semibold">{name}</span>
      </nav>

      <div className="bg-[#333e48] text-white px-6 py-6 rounded-sm">
        <h1 className="font-extrabold text-2xl flex items-center gap-3">
          <span className="text-3xl">{category.icon}</span> {name}
        </h1>
        <p className="text-gray-300 text-sm mt-1">{t("availableCount", { n: items.length })}</p>
      </div>

      {items.length === 0 ? (
        <div className="bg-white border border-gray-200 p-10 text-center mt-6 text-gray-500">
          {t("noProductInCategory", { phone: settings.phone })}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
