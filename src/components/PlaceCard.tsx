"use client";
import Link from "./LocLink";
import CultureImage from "./CultureImage";
import { MapPin } from "lucide-react";
import { t, imgSrc, regionLabel } from "@/lib/utils";
import { useLocale } from "./LocaleProvider";
import type { Place } from "@/lib/content";
export type { Place } from "@/lib/content";
export default function PlaceCard({ p }: { p: Place }) {
  const l = useLocale();
  return (
    <li className="card overflow-hidden">
      <CultureImage src={imgSrc(p.image)} alt={p.name} />
      <div className="p-6">
        <p className="mb-2 flex items-center gap-2 text-sm text-clay"><MapPin size={16} aria-hidden />{regionLabel(p.region, l)}</p>
        <h3 dir="auto" className="mb-2 text-xl">{p.name}</h3>
        <p dir="auto" className="mb-4 text-base text-muted">{p.desc}</p>
        <Link href={`/places/${p.id}`} className="btn-gold">{t("details", l)}</Link>
      </div>
    </li>
  );
}