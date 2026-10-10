import { redirect } from "next/navigation";
import { saveSettingsAction } from "@/app/admin/actions";
import { btnCls, cardCls, inputCls, labelCls } from "@/components/admin/styles";
import { isAdmin } from "@/lib/admin-auth";
import { getSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function SettingsPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  if (!(await isAdmin())) redirect("/admin");
  const { saved } = await searchParams;
  const s = await getSettings();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-extrabold mb-6">Paramètres du site</h1>
      <form action={saveSettingsAction} className={`${cardCls} space-y-4`}>
        <div>
          <label className={labelCls} htmlFor="shopName">Nom de la boutique</label>
          <input id="shopName" name="shopName" defaultValue={s.shopName} className={inputCls} />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls} htmlFor="phone">Téléphone (affiché sur le site)</label>
            <input id="phone" name="phone" defaultValue={s.phone} className={inputCls} dir="ltr" />
          </div>
          <div>
            <label className={labelCls} htmlFor="whatsapp">Numéro WhatsApp (chiffres, avec indicatif)</label>
            <input id="whatsapp" name="whatsapp" defaultValue={s.whatsapp} className={inputCls} dir="ltr" />
            <p className="text-[11px] text-slate-500 mt-1">Exemple Libye : 218913442640 (sans +, sans espaces).</p>
          </div>
        </div>
        <div>
          <label className={labelCls} htmlFor="address">Adresse</label>
          <input id="address" name="address" defaultValue={s.address} className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="email">E-mail (facultatif)</label>
          <input id="email" name="email" type="email" defaultValue={s.email} className={inputCls} dir="ltr" />
        </div>

        {saved && <p className="text-sm text-green-700">Paramètres enregistrés ✔</p>}
        <button type="submit" className={btnCls}>Enregistrer</button>
      </form>
    </div>
  );
}
