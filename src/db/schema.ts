import {
  boolean,
  customType,
  doublePrecision,
  integer,
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";

const bytea = customType<{ data: Buffer; driverData: Buffer }>({
  dataType() {
    return "bytea";
  },
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameAr: text("name_ar").notNull().default(""),
  nameEn: text("name_en").notNull().default(""),
  slug: text("slug").notNull().unique(),
  icon: text("icon").notNull().default("🧱"),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameAr: text("name_ar").notNull().default(""),
  nameEn: text("name_en").notNull().default(""),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull().default(""),
  descriptionAr: text("description_ar").notNull().default(""),
  descriptionEn: text("description_en").notNull().default(""),
  price: doublePrecision("price").notNull(),
  oldPrice: doublePrecision("old_price"),
  image: text("image").notNull(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => categories.id),
  badge: text("badge"),
  rating: integer("rating").notNull().default(4),
  reviews: integer("reviews").notNull().default(0),
  isTopSale: boolean("is_top_sale").notNull().default(false),
  isPromo: boolean("is_promo").notNull().default(false),
  inStock: boolean("in_stock").notNull().default(true),
});

/** Paramètres généraux du site (nom, téléphone, WhatsApp…), une ligne par clé. */
export const siteSettings = pgTable("site_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull().default(""),
});

/** Diapositives de la bannière principale. */
export const heroSlides = pgTable("hero_slides", {
  id: serial("id").primaryKey(),
  image: text("image").notNull(),
  alt: text("alt").notNull().default(""),
  altAr: text("alt_ar").notNull().default(""),
  altEn: text("alt_en").notNull().default(""),
  href: text("href").notNull().default("/"),
  sortOrder: integer("sort_order").notNull().default(0),
  active: boolean("active").notNull().default(true),
});

/** Images téléversées depuis l'admin, stockées en base (Vercel n'a pas de disque persistant). */
export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  contentType: text("content_type").notNull(),
  data: bytea("data").notNull(),
});

export type Category = typeof categories.$inferSelect;
export type Product = typeof products.$inferSelect;
export type HeroSlide = typeof heroSlides.$inferSelect;
