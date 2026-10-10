import Link from "next/link";
import type { ReactNode } from "react";
import { logout } from "@/app/admin/actions";
import { isAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

const LINKS = [
  { href: "/admin/parametres", label: "Paramètres" },
  { href: "/admin/banniere", label: "Bannière" },
  { href: "/admin/produits", label: "Produits" },
  { href: "/admin/categories", label: "Catégories" },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const ok = await isAdmin();
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {ok && (
        <header className="bg-[#333e48] text-white">
          <div className="mx-auto max-w-6xl px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="font-extrabold text-lg">
                Administration
              </Link>
              <nav className="flex flex-wrap gap-3 text-sm">
                {LINKS.map((l) => (
                  <Link key={l.href} href={l.href} className="hover:text-[#ffe600]">
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/" className="hover:text-[#ffe600]">
                Voir le site ›
              </Link>
              <form action={logout}>
                <button type="submit" className="bg-[#e31e25] px-3 py-1.5 rounded font-semibold hover:bg-[#c21920]">
                  Déconnexion
                </button>
              </form>
            </div>
          </div>
        </header>
      )}
      <div className="mx-auto max-w-6xl p-6">{children}</div>
    </div>
  );
}
