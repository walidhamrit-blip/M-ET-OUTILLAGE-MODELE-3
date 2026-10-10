"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { endAdminSession, isAdmin, passwordMatches, startAdminSession } from "@/lib/admin-auth";
import {
  createHeroSlide,
  createProduct,
  deleteHeroSlide,
  deleteProduct,
  saveSettings,
  updateCategory,
  updateHeroSlide,
  updateProduct,
  type ProductInput,
} from "@/lib/data";

async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin");
}

const str = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();
const num = (fd: FormData, key: string, fallback = 0) => {
  const n = Number(str(fd, key).replace(",", "."));
  return Number.isFinite(n) ? n : fallback;
};
const flag = (fd: FormData, key: string) => fd.get(key) === "on";

function refreshSite() {
  revalidatePath("/", "layout");
}

// ---------- Connexion ----------

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!passwordMatches(password)) redirect("/admin?error=1");
  await startAdminSession();
  redirect("/admin");
}

export async function logout() {
  await endAdminSession();
  redirect("/admin");
}

// ---------- Paramètres ----------

export async function saveSettingsAction(fd: FormData) {
  await requireAdmin();
  await saveSettings({
    shopName: str(fd, "shopName"),
    phone: str(fd, "phone"),
    whatsapp: str(fd, "whatsapp").replace(/\D/g, ""),
    address: str(fd, "address"),
    email: str(fd, "email"),
  });
  refreshSite();
  redirect("/admin/parametres?saved=1");
}

// ---------- Bannière ----------

function slideInput(fd: FormData) {
  return {
    image: str(fd, "image"),
    alt: str(fd, "alt"),
    altAr: str(fd, "altAr"),
    altEn: str(fd, "altEn"),
    href: str(fd, "href") || "/",
    sortOrder: num(fd, "sortOrder", 0),
    active: flag(fd, "active"),
  };
}

export async function saveSlideAction(fd: FormData) {
  await requireAdmin();
  const input = slideInput(fd);
  if (!input.image) redirect("/admin/banniere?error=image");
  const id = Number(str(fd, "id"));
  if (Number.isInteger(id) && id > 0) {
    await updateHeroSlide(id, input);
  } else {
    await createHeroSlide(input);
  }
  refreshSite();
  redirect("/admin/banniere?saved=1");
}

export async function deleteSlideAction(fd: FormData) {
  await requireAdmin();
  await deleteHeroSlide(Number(str(fd, "id")));
  refreshSite();
  redirect("/admin/banniere?saved=1");
}

// ---------- Produits ----------

export async function saveProductAction(fd: FormData) {
  await requireAdmin();
  const idRaw = str(fd, "id");
  const oldPriceRaw = str(fd, "oldPrice");
  const input: ProductInput = {
    name: str(fd, "name"),
    nameAr: str(fd, "nameAr"),
    nameEn: str(fd, "nameEn"),
    slug: str(fd, "slug"),
    description: str(fd, "description"),
    descriptionAr: str(fd, "descriptionAr"),
    descriptionEn: str(fd, "descriptionEn"),
    price: num(fd, "price"),
    oldPrice: oldPriceRaw ? num(fd, "oldPrice") : null,
    image: str(fd, "image"),
    categoryId: num(fd, "categoryId"),
    badge: str(fd, "badge") || null,
    rating: Math.min(5, Math.max(0, Math.round(num(fd, "rating", 4)))),
    reviews: Math.max(0, Math.round(num(fd, "reviews", 0))),
    isTopSale: flag(fd, "isTopSale"),
    isPromo: flag(fd, "isPromo"),
    inStock: flag(fd, "inStock"),
  };
  const target = idRaw === "new" ? "new" : idRaw;
  if (!input.name || !input.slug || !input.image || !input.categoryId) {
    redirect(`/admin/produits/${target}?error=missing`);
  }

  let ok = true;
  try {
    if (idRaw === "new") await createProduct(input);
    else await updateProduct(Number(idRaw), input);
  } catch (err) {
    console.error("saveProductAction", err);
    ok = false;
  }
  if (!ok) redirect(`/admin/produits/${target}?error=save`);

  refreshSite();
  redirect("/admin/produits?saved=1");
}

export async function deleteProductAction(fd: FormData) {
  await requireAdmin();
  await deleteProduct(Number(str(fd, "id")));
  refreshSite();
  redirect("/admin/produits?saved=1");
}

// ---------- Catégories ----------

export async function saveCategoryAction(fd: FormData) {
  await requireAdmin();
  const name = str(fd, "name");
  if (!name) redirect("/admin/categories?error=missing");
  await updateCategory(Number(str(fd, "id")), {
    name,
    nameAr: str(fd, "nameAr"),
    nameEn: str(fd, "nameEn"),
    icon: str(fd, "icon") || "📦",
  });
  refreshSite();
  redirect("/admin/categories?saved=1");
}
