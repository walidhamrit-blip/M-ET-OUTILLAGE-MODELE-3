import Link from "next/link";
import { HeroCarousel } from "@/components/hero-carousel";
import { ProductCard } from "@/components/product-card";
import { getAllProducts, getCategories } from "@/lib/data";

export const dynamic = "force-dynamic";

function SectionTitle({ title, href }: { title: string; href?: string }) {
  return (
    <div className="flex items-center justify-between border-t-2 border-black pt-3 mb-4">
      <h2 className="font-extrabold text-lg uppercase tracking-wide text-gray-900">
        {title}
        <span className="block h-[3px] w-12 bg-[#e31e25] mt-1" />
      </h2>
      {href && (
        <Link href={href} className="text-sm text-[#e31e25] font-semibold hover:underline">
          Voir tout ›
        </Link>
      )}
    </div>
  );
}

export default async function HomePage() {
  const [products, categories] = await Promise.all([getAllProducts(), getCategories()]);
  const topSales = products.filter((p) => p.isTopSale).slice(0, 10);
  const promos = products.filter((p) => p.isPromo).slice(0, 10);

  return (
    <div>
      <HeroCarousel />

      {/* Category icon strip */}
      <section className="mx-auto max-w-[1326px] px-4 mt-8">
        <SectionTitle title="Tous nos rayons" />
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((c, i) => (
            <Link
              key={c.id}
              href={`/categorie/${c.slug}`}
              className="anim-up bg-white border border-gray-200 hover:border-[#e31e25] hover:shadow-lg transition-all p-4 flex flex-col items-center gap-2 text-center"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="text-3xl">{c.icon}</span>
              <span className="text-xs font-semibold text-gray-800 leading-tight">{c.name}</span>
              <span className="text-[10px] text-gray-400">{c.nameAr}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Top ventes */}
      <section className="mx-auto max-w-[1326px] px-4 mt-10">
        <SectionTitle title="Top Ventes à Tripoli" href="/recherche?q=" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {topSales.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Red CTA strip */}
      <section className="mx-auto max-w-[1326px] px-4 mt-10">
        <div className="bg-gradient-to-r from-[#e31e25] to-[#b3151b] text-white px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 rounded-sm">
          <div>
            <div className="font-extrabold text-2xl italic">
              DEVIS CHANTIER GRATUIT <span className="bg-[#ffe600] text-black not-italic px-2 -skew-x-6 inline-block">-15%</span>
            </div>
            <p className="text-white/85 mt-1 text-sm">
              Entreprises & artisans : tarifs spéciaux sur les commandes en gros à Tripoli — عروض خاصة للمقاولين
            </p>
          </div>
          <Link
            href="/categorie/gros-oeuvre"
            className="shine-wrap bg-black text-white font-bold px-8 py-3 rounded-full hover:bg-gray-900 transition-colors"
          >
            Demander un devis
          </Link>
        </div>
      </section>

      {/* Promotions */}
      <section className="mx-auto max-w-[1326px] px-4 mt-10">
        <SectionTitle title="Promotions du moment" href="/recherche?q=" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {promos.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* All products */}
      <section className="mx-auto max-w-[1326px] px-4 mt-10">
        <SectionTitle title="Tout notre catalogue" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
