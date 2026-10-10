import { isAdmin } from "@/lib/admin-auth";
import { saveMedia } from "@/lib/data";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_BYTES = 4 * 1024 * 1024;

export async function POST(req: Request) {
  if (!(await isAdmin())) return Response.json({ error: "Non autorisé" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return Response.json({ error: "Aucun fichier" }, { status: 400 });
  if (!ALLOWED.has(file.type)) {
    return Response.json({ error: "Format non supporté (JPG, PNG, WebP ou GIF)" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return Response.json({ error: "Image trop lourde (4 Mo maximum)" }, { status: 400 });
  }

  const id = await saveMedia(file.type, Buffer.from(await file.arrayBuffer()));
  return Response.json({ url: `/api/media/${id}` });
}
