"use client";
import Link from "./LocLink";
import CultureImage from "./CultureImage";
import { MapPin } from "lucide-react";
import { t, imgSrc, regionLabel } from "@/lib/utils";
import { useLocale } from "./LocaleProvider";
import type { Place } from "@/lib/content";
export type { Place } from "@/lib/content";
const hasTifinagh = (s: string) => /[\u2D30-\u2D7F]/.test(s);
export default function PlaceCard({ p }: { p: Place }) {
  const l = useLocale();
  return (
    <li className="card flex flex-col overflow-hidden">
      <CultureImage src={imgSrc(p.image)} alt={p.name} />
      <div className="flex flex-1 flex-col p-6">
        <p className="mb-2 flex items-center gap-2 text-sm text-clay"><MapPin size={16} aria-hidden />{regionLabel(p.region, l)}</p>
        <h3 dir="auto" className="mb-2 text-xl">
          {p.name}
          {hasTifinagh(p.nameTifinagh) && <span className="tifinagh ms-3 text-primary" lang="zgh">{p.nameTifinagh}</span>}
        </h3>
        <p dir="auto" className="mb-6 flex-1 text-base text-muted">{p.desc}</p>
        <div><Link href={`/places/${p.id}`} className="btn-gold" aria-label={`${t("details", l)}: ${p.name}`}>{t("details", l)}</Link></div>
      </div>
    </li>
  );
}