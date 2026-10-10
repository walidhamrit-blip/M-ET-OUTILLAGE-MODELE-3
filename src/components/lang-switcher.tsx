"use client";

import { LANGS, type Lang } from "@/lib/i18n";
import { useLang } from "@/components/lang-context";

const LABELS: Record<Lang, string> = { ar: "العربية", en: "English" };

export function LangSwitcher() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language">
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`px-2 py-0.5 rounded-sm text-xs transition-colors ${
            lang === l ? "bg-[#e31e25] text-white font-bold" : "text-gray-300 hover:text-white"
          }`}
        >
          {LABELS[l]}
        </button>
      ))}
    </div>
  );
}
