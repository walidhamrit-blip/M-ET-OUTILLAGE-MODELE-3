import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { ProductCard } from "@/components/product-card";
import { formatPrice } from "@/lib/format";
import { getCategories, getProductBySlug, getProductsByCategory } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const categories = await getCategories();
  const category = categories.find((c) => c.id === product.categoryId);
  const related = (await getProductsByCategory(product.categoryId))
    .filter((p) => p.id !== product.id)
    .slice(0, 5);

  return (
    <div className="mx-auto max-w-[1326px] px-4 mt-6">
      <nav className="text-xs text-gray-500 mb-4">
        <Link href="/" className="hover:text-[#e31e25]">Accueil</Link>
        <span className="mx-1">›</span>
        {category && (
          <>
            <Link href={`/categorie/${category.slug}`} className="hover:text-[#e31e25]">
              {category.name}
            </Link>
            <span className="mx-1">›</span>
          </>
        )}
        <span className="text-gray-800 font-semibold">{product.name}</span>
      </nav>

      <div className="bg-white border border-gray-200 p-6 grid md:grid-cols-2 gap-8 anim-up">
        <div className="relative overflow-hidden">
          {product.badge && (
            <span
              className={`absolute top-3 left-3 z-10 text-xs font-bold text-white px-3 py-1 ${
                product.badge === "PROMO" ? "bg-[#e31e25]" : "bg-[#333e48]"
              }`}
            >
              {product.badge}
            </span>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[380px] object-cover rounded-sm"
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-2xl font-extrabold text-gray-900 leading-snug">{product.name}</h1>

          <div className="mt-2 text-sm text-[#ffb400]">
            {"★".repeat(product.rating)}
            <span className="text-gray-300">{"★".repeat(5 - product.rating)}</span>
            <span className="text-gray-400 ml-2">({product.reviews} avis)</span>
          </div>

          <div className="mt-4 flex items-end gap-3">
            <span className="text-[#e31e25] font-extrabold text-3xl">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-gray-400 text-lg line-through">{formatPrice(product.oldPrice)}</span>
            )}
            {product.oldPrice && (
              <span className="bg-[#ffe600] text-black text-xs font-bold px-2 py-1">
                -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
              </span>
            )}
          </div>

          <div className="mt-2 text-sm text-green-600 font-semibold">
            {product.inStock ? "✔ En stock — magasin de Tripoli" : "Rupture de stock"}
          </div>

          <p className="mt-4 text-sm text-gray-600 leading-relaxed">{product.description}</p>

          <div className="mt-6">
            <AddToCartButton product={product} />
          </div>

          <ul className="mt-6 text-xs text-gray-500 space-y-1 border-t border-gray-100 pt-4">
            <li>🚚 Livraison à Tripoli sous 24/48h — التوصيل داخل طرابلس</li>
            <li>💵 Paiement à la livraison disponible</li>
            <li>📞 Commande par téléphone : +218 21 444 55 66</li>
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-10">
          <div className="border-t-2 border-black pt-3 mb-4">
            <h2 className="font-extrabold text-lg uppercase tracking-wide text-gray-900">
              Produits similaires
              <span className="block h-[3px] w-12 bg-[#e31e25] mt-1" />
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
