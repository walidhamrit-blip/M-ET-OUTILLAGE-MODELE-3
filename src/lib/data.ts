import { db } from "@/db";
import { categories, heroSlides, media, products, siteSettings, type HeroSlide } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";
import { asc, eq, ilike, or } from "drizzle-orm";

// ---------- Paramètres du site ----------

export const SETTING_DEFAULTS = {
  shopName: "TRIPO-TECK",
  phone: "+218 91 344 2640",
  whatsapp: "218913442640",
  address: "Souk Al Joumaa — Tripoli, Libye",
  email: "",
};

export type SiteSettings = typeof SETTING_DEFAULTS;

export async function getSettings(): Promise<SiteSettings> {
  const rows = await db.select().from(siteSettings);
  const stored = new Map(rows.map((r) => [r.key, r.value]));
  const result = { ...SETTING_DEFAULTS };
  for (const key of Object.keys(SETTING_DEFAULTS) as (keyof SiteSettings)[]) {
    const value = stored.get(key);
    if (value !== undefined && value.trim() !== "") result[key] = value;
  }
  return result;
}

export async function saveSettings(values: Partial<Record<keyof SiteSettings, string>>) {
  for (const [key, value] of Object.entries(values)) {
    const v = value ?? "";
    await db
      .insert(siteSettings)
      .values({ key, value: v })
      .onConflictDoUpdate({ target: siteSettings.key, set: { value: v } });
  }
}

// ---------- Catégories et produits ----------

export async function getCategories() {
  await ensureSeeded();
  return db.select().from(categories).orderBy(asc(categories.id));
}

export async function getAllProducts() {
  await ensureSeeded();
  return db.select().from(products).orderBy(asc(products.id));
}

export async function getCategoryBySlug(slug: string) {
  await ensureSeeded();
  const rows = await db.select().from(categories).where(eq(categories.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function getProductsByCategory(categoryId: number) {
  return db.select().from(products).where(eq(products.categoryId, categoryId)).orderBy(asc(products.id));
}

export async function getProductBySlug(slug: string) {
  await ensureSeeded();
  const rows = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function getProductById(id: number) {
  const rows = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function searchProducts(q: string) {
  await ensureSeeded();
  const term = `%${q}%`;
  return db
    .select()
    .from(products)
    .where(or(ilike(products.name, term), ilike(products.description, term)))
    .orderBy(asc(products.id));
}

export type ProductInput = {
  name: string;
  nameAr: string;
  nameEn: string;
  slug: string;
  description: string;
  descriptionAr: string;
  descriptionEn: string;
  price: number;
  oldPrice: number | null;
  image: string;
  categoryId: number;
  badge: string | null;
  rating: number;
  reviews: number;
  isTopSale: boolean;
  isPromo: boolean;
  inStock: boolean;
};

export async function createProduct(input: ProductInput) {
  await db.insert(products).values(input);
}

export async function updateProduct(id: number, input: ProductInput) {
  await db.update(products).set(input).where(eq(products.id, id));
}

export async function deleteProduct(id: number) {
  await db.delete(products).where(eq(products.id, id));
}

export async function updateCategory(
  id: number,
  input: { name: string; nameAr: string; nameEn: string; icon: string }
) {
  await db.update(categories).set(input).where(eq(categories.id, id));
}

// ---------- Bannière principale ----------

const DEFAULT_SLIDES: Omit<HeroSlide, "id">[] = [
  {
    image: "/images/hero1.jpg",
    alt: "Méga promo outillage",
    altAr: "عرض خاص على العدد الكهربائية",
    altEn: "Power tools mega deal",
    href: "/categorie/outillage-electro",
    sortOrder: 1,
    active: true,
  },
  {
    image: "/images/hero2.jpg",
    alt: "Livraison gratuite à Tripoli",
    altAr: "توصيل مجاني داخل طرابلس",
    altEn: "Free delivery in Tripoli",
    href: "/categorie/gros-oeuvre",
    sortOrder: 2,
    active: true,
  },
  {
    image: "/images/hero3.jpg",
    alt: "Peinture et finition",
    altAr: "الدهانات والتشطيب",
    altEn: "Paint & finishing",
    href: "/categorie/peinture-finition",
    sortOrder: 3,
    active: true,
  },
];

let heroSeeded = false;

async function ensureHeroSeeded() {
  if (heroSeeded) return;
  const flag = await db.select().from(siteSettings).where(eq(siteSettings.key, "hero_seeded")).limit(1);
  if (flag.length === 0) {
    const existing = await db.select({ id: heroSlides.id }).from(heroSlides).limit(1);
    if (existing.length === 0) await db.insert(heroSlides).values(DEFAULT_SLIDES);
    await db.insert(siteSettings).values({ key: "hero_seeded", value: "1" }).onConflictDoNothing();
  }
  heroSeeded = true;
}

export async function getHeroSlides(includeInactive = false): Promise<HeroSlide[]> {
  await ensureHeroSeeded();
  const rows = await db.select().from(heroSlides).orderBy(asc(heroSlides.sortOrder), asc(heroSlides.id));
  return includeInactive ? rows : rows.filter((r) => r.active);
}

export async function getHeroSlide(id: number) {
  const rows = await db.select().from(heroSlides).where(eq(heroSlides.id, id)).limit(1);
  return rows[0] ?? null;
}

export type SlideInput = Omit<HeroSlide, "id">;

export async function createHeroSlide(input: SlideInput) {
  await db.insert(heroSlides).values(input);
}

export async function updateHeroSlide(id: number, input: SlideInput) {
  await db.update(heroSlides).set(input).where(eq(heroSlides.id, id));
}

export async function deleteHeroSlide(id: number) {
  await db.delete(heroSlides).where(eq(heroSlides.id, id));
}

// ---------- Images téléversées ----------

export async function saveMedia(contentType: string, data: Buffer): Promise<number> {
  const [row] = await db.insert(media).values({ contentType, data }).returning({ id: media.id });
  return row.id;
}

export async function getMedia(id: number) {
  const rows = await db
    .select({ contentType: media.contentType, data: media.data })
    .from(media)
    .where(eq(media.id, id))
    .limit(1);
  return rows[0] ?? null;
}

