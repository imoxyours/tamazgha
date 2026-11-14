"use server";
import { randomUUID } from "crypto";
import { put } from "@vercel/blob";
import { addContribution, dbEnabled } from "@/lib/content";
import { REGIONS } from "@/lib/regions";
import { clientIp, rateLimit } from "@/lib/ratelimit";
export type ShareState = { ok: boolean; error?: "invalid" | "file" | "limit" | "unavail"; v?: Record<string, string> } | null;
const MAX = 4 * 1024 * 1024; // Vercel rejects serverless request bodies above 4.5MB
function sniff(b: Uint8Array): [string, string] | null {
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return ["jpg", "image/jpeg"];
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return ["png", "image/png"];
  const s = (i: number, n: number) => String.fromCharCode(...b.slice(i, i + n));
  if (s(0, 4) === "RIFF" && s(8, 4) === "WEBP") return ["webp", "image/webp"];
  return null;
}
export async function submit(_: ShareState, f: FormData): Promise<ShareState> {
  const g = (k: string) => String(f.get(k) ?? "").trim();
  const v = { name: g("name"), place: g("place"), region: g("region"), desc: g("desc") };
  if (g("website")) return { ok: true }; // honeypot
  if (rateLimit("share:" + (await clientIp()), 3, 3_600_000)) return { ok: false, error: "limit", v };
  if (f.get("consent") !== "on" || v.name.length > 60 || v.place.length < 2 || v.place.length > 80 || v.desc.length < 5 || v.desc.length > 300 || !REGIONS.includes(v.region)) return { ok: false, error: "invalid", v };
  const file = f.get("image");
  if (!(file instanceof File) || file.size === 0 || file.size > MAX) return { ok: false, error: "file", v };
  const buf = new Uint8Array(await file.arrayBuffer());
  const kind = sniff(buf); // real content check, the browser-sent type is not trusted
  if (!kind) return { ok: false, error: "file", v };
  if (!dbEnabled || !process.env.BLOB_READ_WRITE_TOKEN) return { ok: false, error: "unavail", v };
  try {
    const id = randomUUID();
    const blob = await put(`contributions/${id}.${kind[0]}`, Buffer.from(buf), { access: "public", contentType: kind[1] });
    await addContribution({ id, ...v, image: blob.url });
  } catch { console.error("contribution failed"); return { ok: false, error: "unavail", v }; }
  return { ok: true };
}
