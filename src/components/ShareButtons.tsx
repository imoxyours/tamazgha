"use client";
import { useEffect, useRef, useState } from "react";
function legacyCopy(text: string): boolean {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try { ok = document.execCommand("copy"); } catch { ok = false; }
  document.body.removeChild(ta);
  return ok;
}
export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  async function copy() {
    const url = window.location.href;
    let ok = false;
    try { await navigator.clipboard.writeText(url); ok = true; } catch { ok = legacyCopy(url); }
    if (!ok) return;
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2500);
  }
  function whatsapp() {
    const text = `${title} ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }
  return (
    <div className="flex flex-wrap items-center gap-4">
      <button type="button" onClick={copy} className="btn-gold">نسخ الرابط</button>
      <button type="button" onClick={whatsapp} className="btn-gold">مشاركة على واتساب</button>
      <span role="status" aria-live="polite" className="text-base text-primary">{copied ? "تم النسخ بنجاح" : ""}</span>
    </div>
  );
}