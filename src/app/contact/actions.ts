"use server";
import { clientIp, rateLimit } from "@/lib/ratelimit";
export type State = { ok: boolean; error?: "invalid" | "limit" | "send"; v?: Record<string, string> } | null;
export async function send(_: State, f: FormData): Promise<State> {
  const g = (k: string) => String(f.get(k) ?? "").trim();
  const v = { name: g("name"), email: g("email"), message: g("message") };
  if (g("website")) return { ok: true }; // honeypot
  if (rateLimit("contact:" + (await clientIp()), 5, 600_000)) return { ok: false, error: "limit", v };
  if (!v.name || v.name.length > 80 || v.message.length < 5 || v.message.length > 2000 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email)) return { ok: false, error: "invalid", v };
  const key = process.env.RESEND_API_KEY, to = process.env.CONTACT_TO_EMAIL, from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !to || !from) return { ok: false, error: "send", v };
  try {
    const r = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: v.email, subject: `Tamazgha: ${v.name.replace(/[\r\n]+/g, " ")}`.slice(0, 100), text: `${v.name} <${v.email}>\n\n${v.message}` }) });
    if (!r.ok) throw new Error(String(r.status));
  } catch { console.error("contact send failed"); return { ok: false, error: "send", v }; }
  return { ok: true };
}
