// Helpers serveur : langue courante (cookie) et fonction de traduction.
import { cookies } from "next/headers";
import { DEFAULT_LANG, LANG_COOKIE, isLang, translate, type Lang, type MessageKey } from "@/lib/i18n";

export async function getLang(): Promise<Lang> {
  const store = await cookies();
  const value = store.get(LANG_COOKIE)?.value;
  return isLang(value) ? value : DEFAULT_LANG;
}

export async function getServerT() {
  const lang = await getLang();
  const t = (key: MessageKey, vars?: Record<string, string | number>) => translate(lang, key, vars);
  return { lang, t };
}
