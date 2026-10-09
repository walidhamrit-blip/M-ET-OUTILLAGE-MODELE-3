import {
  boolean,
  doublePrecision,
  integer,
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameAr: text("name_ar").notNull().default(""),
  slug: text("slug").notNull().unique(),
  icon: text("icon").notNull().default("🧱"),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull().default(""),
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

export type Category = typeof categories.$inferSelect;
export type Product = typeof products.$inferSelect;
