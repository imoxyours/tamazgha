"use client";
import { usePathname } from "next/navigation";
import { useLocale } from "./LocaleProvider";
const langs = ["ar", "fr", "en"] as const;
export default function LangSwitch() {
  const pathname = usePathname();
  const activeLang = useLocale();
  const base = pathname.replace(/^\/(fr|en)(?=\/|$)/, "") || "/";
  const href = (c: string) => (c === "ar" ? base : `/${c}${base === "/" ? "" : base}`);
  return (
    <ul className="flex gap-3 text-sm" aria-label="Language">
      {langs.map((c) => (
        <li key={c}>
          <a href={href(c)} lang={c} hrefLang={c} aria-current={c === activeLang ? "true" : undefined}
            className={c === activeLang ? "font-semibold text-[#E3B04B] underline underline-offset-4" : "text-[#BDB296] hover:text-[#EFE6D4]"}>
            {c.toUpperCase()}
          </a>
        </li>
      ))}
    </ul>
  );
}