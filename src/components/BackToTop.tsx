"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLocale } from "./LocaleProvider";
import { u } from "@/i18n/ui";
export default function BackToTop() {
  const l = useLocale();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      type="button"
      aria-label={u("back_to_top", l)}
      onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
      className="btn-gold btn-icon fixed bottom-4 end-4 z-40"
    >
      <ArrowUp size={24} aria-hidden />
    </button>
  );
}