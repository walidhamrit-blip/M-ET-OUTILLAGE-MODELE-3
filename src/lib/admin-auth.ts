// Authentification de l'admin : mot de passe dans la variable d'environnement ADMIN_PASSWORD.
// Le cookie de session contient un HMAC du mot de passe, jamais le mot de passe lui-même.
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "admin_session";

function sessionToken(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return createHmac("sha256", password).update("tripo-teck-admin-session-v1").digest("hex");
}

export function passwordMatches(input: string): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  const a = createHmac("sha256", "cmp").update(input).digest();
  const b = createHmac("sha256", "cmp").update(password).digest();
  return timingSafeEqual(a, b);
}

export async function isAdmin(): Promise<boolean> {
  const expected = sessionToken();
  if (!expected) return false;
  const store = await cookies();
  const actual = store.get(ADMIN_COOKIE)?.value;
  if (!actual) return false;
  const a = Buffer.from(actual);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function startAdminSession(): Promise<void> {
  const token = sessionToken();
  if (!token) throw new Error("ADMIN_PASSWORD is not configured");
  const store = await cookies();
  store.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export async function endAdminSession(): Promise<void> {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
}
