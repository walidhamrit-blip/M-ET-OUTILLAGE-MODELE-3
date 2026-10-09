import { db } from "@/db";
import { categories, products, type Product } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";
import { asc, eq, ilike, or } from "drizzle-orm";

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

export async function getProductsByCategory(categoryId: number): Promise<Product[]> {
  return db.select().from(products).where(eq(products.categoryId, categoryId)).orderBy(asc(products.id));
}

export async function getProductBySlug(slug: string) {
  await ensureSeeded();
  const rows = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
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
