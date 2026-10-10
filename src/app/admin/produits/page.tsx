import Link from "next/link";
import { redirect } from "next/navigation";
import { btnCls, cardCls } from "@/components/admin/styles";
import { isAdmin } from "@/lib/admin-auth";
import { getAllProducts, getCategories } from "@/lib/data";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  if (!(await isAdmin())) redirect("/admin");
  const { saved } = await searchParams;
  const [products, categories] = await Promise.all([getAllProducts(), getCategories()]);
  const catName = new Map(categories.map((c) => [c.id, c.name]));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">Produits ({products.length})</h1>
        <Link href="/admin/produits/new" className={btnCls}>+ Nouveau produit</Link>
      </div>
      {saved && <p className="text-sm text-green-700">Modifications enregistrées ✔</p>}

      <div className={`${cardCls} p-0 overflow-x-auto`}>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600 text-left">
            <tr>
              <th className="p-3">Produit</th>
              <th className="p-3">Rayon</th>
              <th className="p-3">Prix</th>
              <th className="p-3">Stock</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-slate-100">
                <td className="p-3">
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-xs text-slate-500">{p.slug}</div>
                </td>
                <td className="p-3">{catName.get(p.categoryId)}</td>
                <td className="p-3" dir="ltr">{formatPrice(p.price)}</td>
                <td className="p-3">{p.inStock ? "Oui" : "Rupture"}</td>
                <td className="p-3 text-right">
                  <Link href={`/admin/produits/${p.id}`} className="text-[#e31e25] font-semibold hover:underline">
                    Modifier
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
