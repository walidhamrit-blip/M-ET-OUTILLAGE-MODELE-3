import Link from "next/link";
import { login } from "@/app/admin/actions";
import { btnCls, cardCls, inputCls, labelCls } from "@/components/admin/styles";
import { isAdmin } from "@/lib/admin-auth";
import { getAllProducts, getCategories, getHeroSlides } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminHome({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;

  if (!(await isAdmin())) {
    const configured = Boolean(process.env.ADMIN_PASSWORD);
    return (
      <div className="max-w-sm mx-auto mt-16">
        <div className={cardCls}>
          <h1 className="text-xl font-extrabold mb-4">Connexion administrateur</h1>
          {!configured ? (
            <p className="text-sm text-red-600">
              La variable d&apos;environnement <code>ADMIN_PASSWORD</code> n&apos;est pas configurée. Ajoutez-la dans
              les réglages du projet (Vercel → Settings → Environment Variables), puis redéployez.
            </p>
          ) : (
            <form action={login} className="space-y-4">
              <div>
                <label className={labelCls} htmlFor="password">Mot de passe</label>
                <input id="password" name="password" type="password" required className={inputCls} autoFocus />
              </div>
              {error && <p className="text-sm text-red-600">Mot de passe incorrect.</p>}
              <button type="submit" className={btnCls}>Se connecter</button>
            </form>
          )}
        </div>
      </div>
    );
  }

  const [products, categories, slides] = await Promise.all([
    getAllProducts(),
    getCategories(),
    getHeroSlides(true),
  ]);

  const cards = [
    { href: "/admin/parametres", title: "Paramètres", text: "Nom de la boutique, téléphone, WhatsApp, adresse." },
    { href: "/admin/banniere", title: "Bannière", text: `${slides.length} diapositive(s) sur la page d'accueil.` },
    { href: "/admin/produits", title: "Produits", text: `${products.length} produit(s) dans le catalogue.` },
    { href: "/admin/categories", title: "Catégories", text: `${categories.length} rayon(s) du magasin.` },
  ];

  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-6">Tableau de bord</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className={`${cardCls} hover:border-[#e31e25] transition-colors`}>
            <div className="font-bold text-lg">{c.title}</div>
            <p className="text-sm text-slate-600 mt-1">{c.text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
