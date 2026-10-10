import { redirect } from "next/navigation";
import { saveCategoryAction } from "@/app/admin/actions";
import { btnCls, cardCls, inputCls, labelCls } from "@/components/admin/styles";
import { isAdmin } from "@/lib/admin-auth";
import { getCategories } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  if (!(await isAdmin())) redirect("/admin");
  const { saved, error } = await searchParams;
  const categories = await getCategories();

  return (
    <div className="max-w-4xl space-y-4">
      <h1 className="text-2xl font-extrabold">Catégories (rayons)</h1>
      <p className="text-sm text-slate-600">
        Le slug (identifiant URL) n&apos;est pas modifiable ici, car il sert aux liens existants.
      </p>
      {saved && <p className="text-sm text-green-700">Modifications enregistrées ✔</p>}
      {error === "missing" && <p className="text-sm text-red-600">Le nom (FR) est obligatoire.</p>}

      {categories.map((c) => (
        <form key={c.id} action={saveCategoryAction} className={`${cardCls} grid md:grid-cols-[80px_1fr_1fr_1fr_auto] gap-4 items-end`}>
          <input type="hidden" name="id" value={c.id} />
          <div>
            <label className={labelCls}>Icône</label>
            <input name="icon" defaultValue={c.icon} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Nom (FR)</label>
            <input name="name" required defaultValue={c.name} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Nom (AR)</label>
            <input name="nameAr" defaultValue={c.nameAr} className={inputCls} dir="rtl" />
          </div>
          <div>
            <label className={labelCls}>Nom (EN)</label>
            <input name="nameEn" defaultValue={c.nameEn} className={inputCls} />
          </div>
          <button type="submit" className={btnCls}>Enregistrer</button>
        </form>
      ))}
    </div>
  );
}
