"use client";
import { Search } from "lucide-react";
import { t } from "@/lib/utils";
import { useLocale } from "./LocaleProvider";
export default function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const l = useLocale();
  return (
    <div className="relative mb-6 max-w-[400px]">
      <label htmlFor="q" className="sr-only">{t("search_label", l)}</label>
      <Search size={20} aria-hidden className="absolute start-4 top-1/2 -translate-y-1/2 text-muted" />
      <input id="q" type="search" value={value} maxLength={80} onChange={(e) => onChange(e.target.value)} placeholder={t("search_label", l)} className="w-full rounded-full border border-line bg-surface py-3 ps-12 pe-4 text-base" />
    </div>
  );
}
