import { notFound, redirect } from "next/navigation";
import { deleteProductAction, saveProductAction } from "@/app/admin/actions";
import { ImageInput } from "@/components/admin/image-input";
import { btnCls, btnGhostCls, cardCls, inputCls, labelCls } from "@/components/admin/styles";
import { isAdmin } from "@/lib/admin-auth";
import { getCategories, getProductById } from "@/lib/data";

export const dynamic = "force-dynamic";

const BADGES = [
  { value: "", label: "Aucun" },
  { value: "PROMO", label: "PROMO" },
  { value: "TOP VENTE", label: "TOP VENTE" },
];

export default async function ProductEditPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  if (!(await isAdmin())) redirect("/admin");
  const { id } = await params;
  const { error } = await searchParams;
  const isNew = id === "new";

  let product = null;
  if (!isNew) {
    const numeric = Number(id);
    if (!Number.isInteger(numeric)) notFound();
    product = await getProductById(numeric);
    if (!product) notFound();
  }
  const categories = await getCategories();

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-extrabold">{isNew ? "Nouveau produit" : `Modifier : ${product?.name}`}</h1>
      {error === "missing" && <p className="text-sm text-red-600">Nom, identifiant (slug), image et rayon sont obligatoires.</p>}
      {error === "save" && (
        <p className="text-sm text-red-600">Enregistrement impossible. Vérifiez que l&apos;identifiant (slug) n&apos;est pas déjà utilisé.</p>
      )}

      <form action={saveProductAction} className={`${cardCls} space-y-5`}>
        <input type="hidden" name="id" value={isNew ? "new" : String(product?.id)} />

        <fieldset className="grid md:grid-cols-3 gap-4">
          <legend className="font-bold mb-2">Noms</legend>
          <div>
            <label className={labelCls}>Nom (FR)</label>
            <input name="name" required defaultValue={product?.name ?? ""} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Nom (AR)</label>
            <input name="nameAr" defaultValue={product?.nameAr ?? ""} className={inputCls} dir="rtl" />
          </div>
          <div>
            <label className={labelCls}>Nom (EN)</label>
            <input name="nameEn" defaultValue={product?.nameEn ?? ""} className={inputCls} />
          </div>
        </fieldset>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Identifiant URL (slug)</label>
            <input name="slug" required defaultValue={product?.slug ?? ""} className={inputCls} dir="ltr" />
          </div>
          <div>
            <label className={labelCls}>Rayon</label>
            <select name="categoryId" required defaultValue={product?.categoryId ?? categories[0]?.id} className={inputCls}>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <fieldset className="grid md:grid-cols-3 gap-4">
          <legend className="font-bold mb-2">Descriptions</legend>
          <div>
            <label className={labelCls}>Description (FR)</label>
            <textarea name="description" rows={5} defaultValue={product?.description ?? ""} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Description (AR)</label>
            <textarea name="descriptionAr" rows={5} defaultValue={product?.descriptionAr ?? ""} className={inputCls} dir="rtl" />
          </div>
          <div>
            <label className={labelCls}>Description (EN)</label>
            <textarea name="descriptionEn" rows={5} defaultValue={product?.descriptionEn ?? ""} className={inputCls} />
          </div>
        </fieldset>

        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className={labelCls}>Prix (DL)</label>
            <input name="price" required defaultValue={product?.price ?? ""} className={inputCls} dir="ltr" inputMode="decimal" />
          </div>
          <div>
            <label className={labelCls}>Ancien prix (DL)</label>
            <input name="oldPrice" defaultValue={product?.oldPrice ?? ""} className={inputCls} dir="ltr" inputMode="decimal" />
          </div>
          <div>
            <label className={labelCls}>Note (0 à 5)</label>
            <input name="rating" type="number" min={0} max={5} defaultValue={product?.rating ?? 4} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Nombre d&apos;avis</label>
            <input name="reviews" type="number" min={0} defaultValue={product?.reviews ?? 0} className={inputCls} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 items-start">
          <ImageInput name="image" label="Image du produit (URL ou fichier)" defaultValue={product?.image} />
          <div>
            <label className={labelCls}>Badge</label>
            <select name="badge" defaultValue={product?.badge ?? ""} className={inputCls}>
              {BADGES.map((b) => (
                <option key={b.value} value={b.value}>{b.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="isTopSale" defaultChecked={product?.isTopSale ?? false} className="h-4 w-4" />
            Top ventes (accueil)
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="isPromo" defaultChecked={product?.isPromo ?? false} className="h-4 w-4" />
            Promotions (accueil)
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="inStock" defaultChecked={product?.inStock ?? true} className="h-4 w-4" />
            En stock
          </label>
        </div>

        <button type="submit" className={btnCls}>Enregistrer</button>
      </form>

      {product && (
        <form action={deleteProductAction}>
          <input type="hidden" name="id" value={product.id} />
          <button type="submit" className={btnGhostCls}>Supprimer ce produit</button>
        </form>
      )}
    </div>
  );
}
