"use client";

import { useState } from "react";
import { inputCls, labelCls } from "@/components/admin/styles";

/** Champ image : saisie d'une URL ou téléversement d'un fichier (stocké en base). */
export function ImageInput({ name, defaultValue, label }: { name: string; defaultValue?: string; label: string }) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [status, setStatus] = useState<string | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setStatus("Envoi en cours…");
    const body = new FormData();
    body.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) {
        setStatus(data.error ?? "Erreur lors de l'envoi");
        return;
      }
      setValue(data.url);
      setStatus("Image téléversée ✔");
    } catch {
      setStatus("Erreur réseau, réessayez.");
    }
  }

  return (
    <div className="space-y-2">
      <label className={labelCls}>{label}</label>
      <input
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="/images/exemple.jpg ou https://…"
        className={inputCls}
        required
      />
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={onFile}
        className="text-xs text-slate-600"
      />
      {status && <p className="text-xs text-slate-600">{status}</p>}
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="h-24 rounded border border-slate-200 object-cover" />
      )}
    </div>
  );
}
