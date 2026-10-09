import { db } from "@/db";
import { categories, products } from "@/db/schema";

const CATEGORIES = [
  { name: "Gros Œuvre & Ciment", nameAr: "مواد البناء", slug: "gros-oeuvre", icon: "🧱" },
  { name: "Outillage Électroportatif", nameAr: "عدد كهربائية", slug: "outillage-electro", icon: "🔌" },
  { name: "Outillage à Main", nameAr: "عدد يدوية", slug: "outillage-main", icon: "🔧" },
  { name: "Peinture & Finition", nameAr: "دهانات", slug: "peinture-finition", icon: "🎨" },
  { name: "Plomberie & Sanitaire", nameAr: "سباكة", slug: "plomberie", icon: "🚿" },
  { name: "Électricité & Éclairage", nameAr: "كهرباء وإضاءة", slug: "electricite", icon: "💡" },
  { name: "Quincaillerie & Fixation", nameAr: "مسامير وتثبيت", slug: "quincaillerie", icon: "🔩" },
  { name: "Sécurité & Chantier", nameAr: "معدات السلامة", slug: "securite-chantier", icon: "🦺" },
];

const px = (id: number, file?: string) =>
  `https://images.pexels.com/photos/${id}/${file ?? `pexels-photo-${id}.jpeg`}?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;

const PRODUCTS = [
  {
    name: "Perceuse Visseuse Sans Fil 18V Li-Ion + 2 Batteries",
    slug: "perceuse-visseuse-18v",
    description:
      "Perceuse visseuse sans fil 18V avec moteur haute performance, 2 batteries Lithium-Ion 2.0Ah, chargeur rapide et coffret de transport. Idéale pour tous vos travaux de perçage et vissage sur chantier à Tripoli.",
    price: 329.0, oldPrice: 429.0, image: px(8130011), category: "outillage-electro",
    badge: "PROMO", rating: 5, reviews: 42, isTopSale: true, isPromo: true,
  },
  {
    name: "Meuleuse d'Angle 230mm 2200W Professionnelle",
    slug: "meuleuse-angle-230",
    description:
      "Meuleuse d'angle 230mm 2200W avec poignée anti-vibration, carter de protection réglable et démarrage progressif. Pour la coupe du métal, de la pierre et du béton.",
    price: 275.0, oldPrice: 340.0, image: px(10290627), category: "outillage-electro",
    badge: "PROMO", rating: 4, reviews: 28, isTopSale: true, isPromo: true,
  },
  {
    name: "Perceuse à Percussion Filaire 850W Mandrin 13mm",
    slug: "perceuse-percussion-850w",
    description:
      "Perceuse à percussion 850W avec mandrin auto-serrant 13mm, variateur de vitesse et butée de profondeur. Perce le béton, le bois et le métal.",
    price: 189.0, oldPrice: null, image: px(6790090), category: "outillage-electro",
    badge: "TOP VENTE", rating: 5, reviews: 65, isTopSale: true, isPromo: false,
  },
  {
    name: "Coffret Forets HSS & Tarauds 46 Pièces",
    slug: "coffret-forets-hss",
    description:
      "Coffret complet de 46 forets HSS et tarauds pour le perçage et le filetage du métal. Acier haute vitesse rectifié, précision professionnelle.",
    price: 95.0, oldPrice: 120.0, image: px(46793, "taps-thread-drill-milling-46793.jpeg"), category: "outillage-main",
    badge: "PROMO", rating: 4, reviews: 19, isTopSale: false, isPromo: true,
  },
  {
    name: "Caisse à Outils Mécanicien Complète 108 Pièces",
    slug: "caisse-outils-108",
    description:
      "Caisse à outils complète 108 pièces : clés, douilles, tournevis, pinces et accessoires chromés vanadium. Livrée en mallette renforcée.",
    price: 245.0, oldPrice: null, image: px(8470683), category: "outillage-main",
    badge: "TOP VENTE", rating: 5, reviews: 51, isTopSale: true, isPromo: false,
  },
  {
    name: "Tronçonneuse à Métaux 355mm 2300W",
    slug: "tronconneuse-metaux-355",
    description:
      "Tronçonneuse à métaux 355mm 2300W avec étau à serrage rapide et butée d'angle 0-45°. Coupe nette des profilés acier, tubes et cornières.",
    price: 420.0, oldPrice: 520.0, image: px(5846138), category: "outillage-electro",
    badge: "PROMO", rating: 4, reviews: 12, isTopSale: false, isPromo: true,
  },
  {
    name: "Visseuse Filaire Pro 650W Spécial Placo",
    slug: "visseuse-filaire-650",
    description:
      "Visseuse filaire 650W spécial plaquiste avec embrayage réglable et butée de profondeur. Cadence élevée pour la pose de plaques de plâtre.",
    price: 155.0, oldPrice: null, image: px(6474194), category: "outillage-electro",
    badge: null, rating: 4, reviews: 8, isTopSale: false, isPromo: false,
  },
  {
    name: "Poste de Travail Atelier Acier + Étagères",
    slug: "poste-travail-atelier",
    description:
      "Établi d'atelier en acier renforcé avec étagères de rangement et plateau de travail robuste. Charge maximale 500 kg.",
    price: 680.0, oldPrice: 790.0, image: px(8489874), category: "outillage-main",
    badge: "PROMO", rating: 5, reviews: 6, isTopSale: false, isPromo: true,
  },
  {
    name: "Ciment Portland CEM II 42.5 — Sac 50kg",
    slug: "ciment-portland-50kg",
    description:
      "Ciment Portland CEM II/A-L 42.5N en sac de 50kg. Conforme aux normes, idéal pour béton, mortier et tous travaux de maçonnerie. Disponible en gros à Tripoli.",
    price: 28.5, oldPrice: 34.0, image: px(6473974), category: "gros-oeuvre",
    badge: "PROMO", rating: 5, reviews: 120, isTopSale: true, isPromo: true,
  },
  {
    name: "Mortier Colle Carrelage C2 — Sac 25kg",
    slug: "mortier-colle-25kg",
    description:
      "Mortier colle amélioré C2 pour carrelage intérieur et extérieur. Sac de 25kg, haute adhérence sur tous supports.",
    price: 22.0, oldPrice: null, image: px(29519165), category: "gros-oeuvre",
    badge: "TOP VENTE", rating: 4, reviews: 77, isTopSale: true, isPromo: false,
  },
  {
    name: "Ciment Prise Rapide — Palette 40 Sacs",
    slug: "ciment-rapide-palette",
    description:
      "Palette de 40 sacs de ciment à prise rapide pour scellements et petits travaux urgents. Livraison par camion-grue partout à Tripoli.",
    price: 980.0, oldPrice: 1150.0, image: px(29817952), category: "gros-oeuvre",
    badge: "PROMO", rating: 5, reviews: 15, isTopSale: false, isPromo: true,
  },
  {
    name: "Ciment Blanc 42.5 — Sac 25kg",
    slug: "ciment-blanc-25kg",
    description:
      "Ciment blanc 42.5 pour enduits décoratifs, joints de carrelage et travaux de finition. Blancheur exceptionnelle.",
    price: 19.5, oldPrice: null, image: px(11700775), category: "gros-oeuvre",
    badge: null, rating: 4, reviews: 33, isTopSale: false, isPromo: false,
  },
  {
    name: "Briques Rouges 12 Trous — Palette 250 Unités",
    slug: "briques-rouges-palette",
    description:
      "Palette de 250 briques rouges 12 trous pour murs porteurs et cloisons. Production locale de qualité, résistance certifiée.",
    price: 450.0, oldPrice: 495.0, image: px(35281188), category: "gros-oeuvre",
    badge: "PROMO", rating: 5, reviews: 48, isTopSale: true, isPromo: true,
  },
  {
    name: "Peinture Acrylique Blanche Mat — Seau 20L",
    slug: "peinture-blanche-20l",
    description:
      "Peinture acrylique blanche mate haute couvrance pour murs et plafonds intérieurs. Seau de 20 litres, séchage rapide, sans odeur.",
    price: 145.0, oldPrice: 175.0, image: px(6474309), category: "peinture-finition",
    badge: "PROMO", rating: 5, reviews: 89, isTopSale: true, isPromo: true,
  },
  {
    name: "Plâtre de Construction — Lot 10 Sacs 40kg",
    slug: "platre-construction-lot",
    description:
      "Lot de 10 sacs de plâtre de construction 40kg pour enduits et travaux de plâtrerie. Finition lisse et durable.",
    price: 185.0, oldPrice: null, image: px(6474201), category: "gros-oeuvre",
    badge: null, rating: 4, reviews: 21, isTopSale: false, isPromo: false,
  },
  {
    name: "Kit Sécurité Chantier : Casque + Gilet + Gants",
    slug: "kit-securite-chantier",
    description:
      "Kit complet de sécurité chantier : casque certifié, gilet haute visibilité, gants renforcés et lunettes de protection.",
    price: 65.0, oldPrice: 85.0, image: px(40059290), category: "securite-chantier",
    badge: "PROMO", rating: 5, reviews: 37, isTopSale: true, isPromo: true,
  },
];

let seeded = false;

export async function ensureSeeded() {
  if (seeded) return;
  const existing = await db.select({ id: categories.id }).from(categories).limit(1);
  if (existing.length > 0) {
    seeded = true;
    return;
  }
  await db.insert(categories).values(CATEGORIES).onConflictDoNothing();
  const allCats = await db.select().from(categories);
  const bySlug = new Map(allCats.map((c) => [c.slug, c.id]));
  await db.insert(products).values(
    PRODUCTS.map((p) => ({
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: p.price,
      oldPrice: p.oldPrice,
      image: p.image,
      categoryId: bySlug.get(p.category)!,
      badge: p.badge,
      rating: p.rating,
      reviews: p.reviews,
      isTopSale: p.isTopSale,
      isPromo: p.isPromo,
    }))
  ).onConflictDoNothing();
  seeded = true;
}
