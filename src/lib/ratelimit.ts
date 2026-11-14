import { headers } from "next/headers";
const m = new Map<string, { n: number; t: number }>();
export function rateLimit(key: string, max: number, windowMs: number) {
  const now = Date.now();
  if (m.size > 5000) for (const [k, v] of m) if (now - v.t > windowMs) m.delete(k);
  const r = m.get(key);
  if (!r || now - r.t > windowMs) { m.set(key, { n: 1, t: now }); return false; }
  return ++r.n > max;
}
export async function clientIp() { return (await headers()).get("x-forwarded-for")?.split(",")[0].trim() || "unknown"; }
