"use client";
import { usePathname } from "next/navigation";
import { useLocale } from "./LocaleProvider";
const langs = [["ar", "العربية"], ["fr", "Français"], ["en", "English"]] as const;
export default function LangSwitch() {
  const pathname = usePathname();
  const activeLang = useLocale();
  const base = pathname.replace(/^\/(fr|en)(?=\/|$)/, "") || "/";
  const href = (c: string) => (c === "ar" ? base : `/${c}${base === "/" ? "" : base}`);
  return (
    <ul className="flex gap-1" aria-label="Language">
      {langs.map(([c, name]) => (
        <li key={c}>
          <a
            href={href(c)}
            lang={c}
            hrefLang={c}
            aria-label={name}
            aria-current={c === activeLang ? "true" : undefined}
            className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl px-2 text-base transition-colors duration-150 ease-out ${
              c === activeLang ? "font-semibold text-[#E3B04B] underline underline-offset-4" : "text-[#EFE6D4] hover:text-[#E3B04B]"
            }`}
          >
            {c.toUpperCase()}
          </a>
        </li>
      ))}
    </ul>
  );
}