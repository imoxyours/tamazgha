"use client";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "./LocaleProvider";
const langs = ["ar", "fr", "en"] as const;
export default function LangSwitch() {
  const p = usePathname(), l = useLocale();
  const base = p.replace(/^\/(fr|en)(?=\/|$)/, "") || "/";
  return (<ul className="flex gap-2 text-sm" aria-label="Language">{langs.map((c) => (
    <li key={c}><NextLink href={c === "ar" ? base : `/${c}${base === "/" ? "" : base}`} lang={c} hrefLang={c} aria-current={c === l ? "true" : undefined} className={c === l ? "text-primary underline" : ""}>{c.toUpperCase()}</NextLink></li>))}</ul>);
}
