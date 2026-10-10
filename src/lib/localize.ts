// Fonctions pures (client + serveur) pour afficher les noms et descriptions selon la langue.
import { catalogCategories, catalogProducts } from "@/lib/catalog-i18n";
import type { Lang } from "@/lib/i18n";

type ProductText = {
  slug: string;
  name: string;
  nameAr: string;
  nameEn: string;
  description: string;
  descriptionAr: string;
  descriptionEn: string;
};

export function productName(p: ProductText, lang: Lang): string {
  const fallback = catalogProducts[p.slug];
  if (lang === "ar") return p.nameAr || fallback?.nameAr || p.name;
  return p.nameEn || fallback?.nameEn || p.name;
}

export function productDescription(p: ProductText, lang: Lang): string {
  const fallback = catalogProducts[p.slug];
  if (lang === "ar") return p.descriptionAr || fallback?.descAr || p.description;
  return p.descriptionEn || fallback?.descEn || p.description;
}

export function categoryName(
  c: { slug: string; name: string; nameAr: string; nameEn: string },
  lang: Lang
): string {
  const fallback = catalogCategories[c.slug];
  if (lang === "ar") return c.nameAr || fallback?.nameAr || c.name;
  return c.nameEn || fallback?.nameEn || c.name;
}

export type CartLine = {
  id: number;
  slug: string;
  name: string;
  nameAr?: string;
  nameEn?: string;
  price: number;
  image: string;
  qty: number;
};

export function cartItemName(item: { name: string; nameAr?: string; nameEn?: string }, lang: Lang): string {
  if (lang === "ar") return item.nameAr || item.name;
  return item.nameEn || item.name;
}

/** Données d'un produit à mettre dans le panier, avec les noms dans les deux langues. */
export function toCartItem(p: ProductText & { id: number; price: number; image: string }) {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    nameAr: productName(p, "ar"),
    nameEn: productName(p, "en"),
    price: p.price,
    image: p.image,
  };
}
