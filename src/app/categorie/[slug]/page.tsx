import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();
  const items = await getProductsByCategory(category.id);

  return (
    <div className="mx-auto max-w-[1326px] px-4 mt-6">
      <nav className="text-xs text-gray-500 mb-4">
        <Link href="/" className="hover:text-[#e31e25]">Accueil</Link>
        <span className="mx-1">›</span>
        <span className="text-gray-800 font-semibold">{category.name}</span>
      </nav>

      <div className="bg-[#333e48] text-white px-6 py-6 rounded-sm flex items-center justify-between">
        <div>
          <h1 className="font-extrabold text-2xl flex items-center gap-3">
            <span className="text-3xl">{category.icon}</span> {category.name}
          </h1>
          <p className="text-gray-300 text-sm mt-1">
            {items.length} produit{items.length > 1 ? "s" : ""} disponible{items.length > 1 ? "s" : ""} à Tripoli
          </p>
        </div>
        <span className="text-xl text-gray-300 hidden sm:block" dir="rtl">{category.nameAr}</span>
      </div>

      {items.length === 0 ? (
        <div className="bg-white border border-gray-200 p-10 text-center mt-6 text-gray-500">
          Aucun produit dans ce rayon pour le moment. Contactez-nous au ☎ +218 21 444 55 66.
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
