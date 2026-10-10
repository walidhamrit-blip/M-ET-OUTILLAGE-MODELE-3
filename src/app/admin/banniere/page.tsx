import { redirect } from "next/navigation";
import { deleteSlideAction, saveSlideAction } from "@/app/admin/actions";
import { ImageInput } from "@/components/admin/image-input";
import { btnCls, btnGhostCls, cardCls, inputCls, labelCls } from "@/components/admin/styles";
import { isAdmin } from "@/lib/admin-auth";
import { getHeroSlides } from "@/lib/data";
import type { HeroSlide } from "@/db/schema";

export const dynamic = "force-dynamic";

function SlideFields({ slide }: { slide?: HeroSlide }) {
  return (
    <>
      <input type="hidden" name="id" value={slide?.id ?? "new"} />
      <ImageInput name="image" label="Image (URL ou fichier)" defaultValue={slide?.image} />
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className={labelCls}>Texte alternatif (FR)</label>
          <input name="alt" defaultValue={slide?.alt ?? ""} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Texte alternatif (AR)</label>
          <input name="altAr" defaultValue={slide?.altAr ?? ""} className={inputCls} dir="rtl" />
        </div>
        <div>
          <label className={labelCls}>Texte alternatif (EN)</label>
          <input name="altEn" defaultValue={slide?.altEn ?? ""} className={inputCls} />
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4 items-end">
        <div>
          <label className={labelCls}>Lien au clic</label>
          <input name="href" defaultValue={slide?.href ?? "/"} className={inputCls} dir="ltr" />
        </div>
        <div>
          <label className={labelCls}>Ordre d&apos;affichage</label>
          <input name="sortOrder" type="number" defaultValue={slide?.sortOrder ?? 0} className={inputCls} />
        </div>
        <label className="flex items-center gap-2 text-sm pb-2">
          <input type="checkbox" name="active" defaultChecked={slide?.active ?? true} className="h-4 w-4" />
          Visible sur le site
        </label>
      </div>
    </>
  );
}

export default async function BannerPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  if (!(await isAdmin())) redirect("/admin");
  const { saved, error } = await searchParams;
  const slides = await getHeroSlides(true);

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-extrabold">Bannière principale</h1>
      <p className="text-sm text-slate-600">
        Les diapositives tournent automatiquement sur la page d&apos;accueil. Utilisez des images larges
        (environ 1600 × 600 px, 4 Mo maximum).
      </p>
      {saved && <p className="text-sm text-green-700">Modifications enregistrées ✔</p>}
      {error === "image" && <p className="text-sm text-red-600">Une image est obligatoire.</p>}

      {slides.map((slide) => (
        <div key={slide.id} className={cardCls}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold">Diapositive #{slide.id}</h2>
            <span className={`text-xs font-semibold ${slide.active ? "text-green-700" : "text-slate-400"}`}>
              {slide.active ? "Active" : "Masquée"}
            </span>
          </div>
          <form action={saveSlideAction} className="space-y-4">
            <SlideFields slide={slide} />
            <button type="submit" className={btnCls}>Enregistrer</button>
          </form>
          <form action={deleteSlideAction} className="mt-3">
            <input type="hidden" name="id" value={slide.id} />
            <button type="submit" className={btnGhostCls}>Supprimer cette diapositive</button>
          </form>
        </div>
      ))}

      <div className={cardCls}>
        <h2 className="font-bold mb-4">Ajouter une diapositive</h2>
        <form action={saveSlideAction} className="space-y-4">
          <SlideFields />
          <button type="submit" className={btnCls}>Ajouter</button>
        </form>
      </div>
    </div>
  );
}
