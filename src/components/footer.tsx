import Link from "next/link";
import type { Category } from "@/db/schema";

export function Footer({ categories }: { categories: Category[] }) {
  return (
    <footer className="mt-12 bg-[#333e48] text-gray-300">
      {/* Services strip */}
      <div className="bg-white border-t border-gray-200">
        <div className="mx-auto max-w-[1326px] px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: "🚚", title: "Livraison rapide", sub: "Partout à Tripoli & environs" },
            { icon: "💵", title: "Paiement à la livraison", sub: "Espèces ou virement" },
            { icon: "🛡️", title: "Garantie qualité", sub: "Produits certifiés" },
            { icon: "📞", title: "Support 6j/7", sub: "+218 21 444 55 66" },
          ].map((s) => (
            <div key={s.title} className="flex flex-col items-center gap-1">
              <span className="text-3xl">{s.icon}</span>
              <span className="font-bold text-gray-900 text-sm">{s.title}</span>
              <span className="text-xs text-gray-500">{s.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-[#e31e25]">
        <div className="mx-auto max-w-[1326px] px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white font-bold text-lg">
            📧 Inscrivez-vous à notre newsletter — recevez nos promos chantier !
          </div>
          <form className="flex w-full md:w-auto">
            <input
              type="email"
              required
              placeholder="Votre adresse e-mail"
              className="h-11 px-4 rounded-l-md bg-white text-sm text-gray-800 outline-none w-full md:w-72"
            />
            <button className="h-11 px-5 rounded-r-md bg-black text-white text-sm font-semibold hover:bg-gray-900 transition-colors">
              S&apos;inscrire
            </button>
          </form>
        </div>
      </div>

      {/* Columns */}
      <div className="mx-auto max-w-[1326px] px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <span className="bg-[#e31e25] text-white font-extrabold italic text-xl px-3 py-1 rounded-md border-2 border-white inline-block">
            Ma𝕋EK
          </span>
          <p className="mt-4 text-gray-400 leading-relaxed">
            Matériaux de construction & outillage professionnel à Tripoli, Libye.
            Le meilleur rapport qualité/prix pour vos chantiers.
          </p>
          <p className="mt-3 text-gray-400" dir="rtl">
            مواد البناء والعدد — طرابلس، ليبيا
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Nos Rayons</h4>
          <ul className="space-y-2">
            {categories.slice(0, 6).map((c) => (
              <li key={c.id}>
                <Link href={`/categorie/${c.slug}`} className="hover:text-white transition-colors">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Informations</h4>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-white transition-colors">Qui sommes-nous ?</Link></li>
            <li><Link href="/" className="hover:text-white transition-colors">Livraison & retours</Link></li>
            <li><Link href="/" className="hover:text-white transition-colors">Conditions générales</Link></li>
            <li><Link href="/" className="hover:text-white transition-colors">Service entreprise</Link></li>
            <li><Link href="/" className="hover:text-white transition-colors">Matek Recrute</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Contact</h4>
          <ul className="space-y-2 text-gray-400">
            <li>📍 Route de l&apos;Aéroport, Souk Al Joumaa, Tripoli</li>
            <li>☎ +218 21 444 55 66</li>
            <li>✉ contact@matek.ly</li>
            <li>🕐 Sam – Jeu : 8h00 – 19h00</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-600/50">
        <div className="mx-auto max-w-[1326px] px-4 py-4 text-xs text-gray-400 flex flex-col md:flex-row justify-between gap-2">
          <span>© 2026 MaTEK — Matériaux & Outillage, Tripoli, Libye. Tous droits réservés.</span>
          <span>Paiement : 💵 Espèces · 🏦 Virement · 💳 Carte locale</span>
        </div>
      </div>
    </footer>
  );
}
