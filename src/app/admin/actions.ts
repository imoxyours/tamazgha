"use server";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import { del, put } from "@vercel/blob";
import { checkPassword, checkTotp, isAdmin, limited, sign } from "@/lib/auth";
import { approveContribution, removeContribution, dbEnabled, deleteArticle, deletePlace, REGIONS, saveArticle, savePlace } from "@/lib/content";
export async function login(_: string | null, f: FormData) {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  if (limited(ip)) return "limit";
  const okPw = checkPassword(String(f.get("password") ?? "")), okCode = checkTotp(String(f.get("code") ?? "").trim());
  if (!okPw || !okCode) { console.warn("admin login failed"); return "bad"; }
  (await cookies()).set("admin", sign(), { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 3600 });
  redirect("/admin");
}
export async function logout() { (await cookies()).delete({ name: "admin", path: "/" }); redirect("/admin"); }
async function guard() {
  if (!isAdmin((await cookies()).get("admin")?.value)) redirect("/admin");
  if (!dbEnabled) redirect("/admin?err=db");
}
const s = (f: FormData, k: string) => String(f.get(k) ?? "").trim();
const done = () => { revalidatePath("/", "layout"); redirect("/admin"); };
export async function saveArticleAction(f: FormData) {
  await guard();
  const a = { slug: s(f, "slug"), title: s(f, "title"), region: s(f, "region"), excerpt: s(f, "excerpt"), body: s(f, "body") };
  const bad = !/^[a-z0-9-]{2,60}$/.test(a.slug) || !a.title || a.title.length > 120 || !REGIONS.includes(a.region) || !a.excerpt || a.excerpt.length > 300 || !a.body || a.body.length > 20000;
  if (bad) redirect(`/admin/articles/${a.slug || "new"}?err=1`);
  await saveArticle(a); done();
}
export async function deleteArticleAction(slug: string) { await guard(); await deleteArticle(slug); done(); }
export async function savePlaceAction(f: FormData) {
  await guard();
  const p = { id: s(f, "id"), name: s(f, "name"), region: s(f, "region"), desc: s(f, "desc"), lat: Number(s(f, "lat")), lng: Number(s(f, "lng")), image: s(f, "currentImage") || "atlas.webp" };
  const bad = !/^[a-z0-9-]{2,60}$/.test(p.id) || !p.name || p.name.length > 80 || !REGIONS.includes(p.region) || !p.desc || p.desc.length > 600 || !(p.lat >= 20 && p.lat <= 37) || !(p.lng >= -18 && p.lng <= 0);
  if (bad) redirect(`/admin/places/${p.id || "new"}?err=1`);
  const file = f.get("image");
  if (file instanceof File && file.size > 0) {
    const ext = { "image/webp": "webp", "image/jpeg": "jpg", "image/png": "png" }[file.type];
    if (!ext || file.size > 200 * 1024 || !process.env.BLOB_READ_WRITE_TOKEN) redirect(`/admin/places/${p.id}?err=img`);
    p.image = (await put(`places/${randomUUID()}.${ext}`, file, { access: "public" })).url;
  }
  await savePlace(p); done();
}
export async function deletePlaceAction(id: string) { await guard(); await deletePlace(id); done(); }
export async function approveContributionAction(id: string) { await guard(); await approveContribution(id); done(); }
export async function rejectContributionAction(id: string) {
  await guard(); const img = await removeContribution(id);
  if (img.startsWith("http")) await del(img).catch(() => {});
  done();
}
