"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "./LocLink";
import { t } from "@/lib/utils";
import { useLocale } from "./LocaleProvider";
const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
export default function CookieBanner() {
  const l = useLocale();
  const [c, setC] = useState<string | null | undefined>(undefined);
  useEffect(() => { try { setC(localStorage.getItem("consent")); } catch { setC(null); } }, []);
  const set = (v: string) => { try { localStorage.setItem("consent", v); } catch {} setC(v); };
  return (
    <>
      {c === "yes" && domain && <Script defer data-domain={domain} src="https://plausible.io/js/script.js" />}
      {c === null && (
        <div role="region" aria-label="Cookies" className="card fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-[600px] flex-wrap items-center justify-between gap-4 p-4">
          <p className="text-base">{t("cookie_text", l)} <Link href="/privacy" className="underline underline-offset-4">{t("privacy", l)}</Link></p>
          <div className="flex gap-3">
            <button type="button" className="btn-gold" onClick={() => set("yes")}>{t("cookie_yes", l)}</button>
            <button type="button" className="btn-outline" onClick={() => set("no")}>{t("cookie_no", l)}</button>
          </div>
        </div>
      )}
    </>
  );
}