import { createHmac, scryptSync, timingSafeEqual } from "crypto";
const secret = () => process.env.ADMIN_SESSION_SECRET ?? "";
const mac = (v: string) => createHmac("sha256", secret()).update(v).digest("hex");
export function sign() { const exp = String(Date.now() + 3600_000); return `${exp}.${mac(exp)}`; }
export function isAdmin(token?: string) {
  if (!token || secret().length < 32) return false; // fail closed
  const [exp, m] = token.split(".");
  if (!exp || !m || Number(exp) < Date.now()) return false;
  const a = Buffer.from(m), b = Buffer.from(mac(exp));
  return a.length === b.length && timingSafeEqual(a, b);
}
export function checkPassword(pw: string) {
  const [salt, hash] = (process.env.ADMIN_PASSWORD_HASH ?? "").split(":");
  if (!salt || !hash || pw.length > 200) return false;
  const h = Buffer.from(hash, "hex");
  return timingSafeEqual(scryptSync(pw, salt, h.length), h);
}
function b32(s: string) {
  const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"; let bits = "";
  for (const c of s.replace(/=+$/, "").toUpperCase()) bits += Math.max(A.indexOf(c), 0).toString(2).padStart(5, "0");
  const out: number[] = []; for (let i = 0; i + 8 <= bits.length; i += 8) out.push(parseInt(bits.slice(i, i + 8), 2));
  return Buffer.from(out);
}
export function checkTotp(code: string) {
  const key = b32(process.env.ADMIN_TOTP_SECRET ?? "");
  if (!key.length || !/^\d{6}$/.test(code)) return false;
  const step = Math.floor(Date.now() / 30000);
  for (const d of [-1, 0, 1]) {
    const b = Buffer.alloc(8); b.writeBigUInt64BE(BigInt(step + d));
    const h = createHmac("sha1", key).update(b).digest(), o = h[19] & 15;
    if (((h.readUInt32BE(o) & 0x7fffffff) % 1000000).toString().padStart(6, "0") === code) return true;
  }
  return false;
}
const tries = new Map<string, { n: number; t: number }>();
export function limited(ip: string) {
  const now = Date.now(), r = tries.get(ip);
  if (!r || now - r.t > 900_000) { tries.set(ip, { n: 1, t: now }); return false; }
  return ++r.n > 5;
}
