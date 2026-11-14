"use client";
import Link from "./LocLink";
import { MapPin } from "lucide-react";
import { t, imgSrc, regionLabel } from "@/lib/utils";
import { useLocale } from "./LocaleProvider";
import type { Place } from "@/lib/content";
export type { Place } from "@/lib/content";
export default function PlaceCard({ p }: { p: Place }) {
  const l = useLocale();
  return (
    <li className="card overflow-hidden">
      <img src={imgSrc(p.image)} alt={p.name} loading="lazy" width={800} height={600} className="aspect-[4/3] w-full object-cover" />
      <div className="p-6">
        <p className="mb-2 flex items-center gap-2 text-sm text-clay"><MapPin size={16} aria-hidden />{regionLabel(p.region, l)}</p>
        <h3 dir="auto" className="mb-2 text-xl">{p.name}</h3>
        <p dir="auto" className="mb-4 text-base text-muted">{p.desc}</p>
        <Link href={`/places/${p.id}`} className="text-primary underline">{t("details", l)}</Link>
      </div>
    </li>
  );
}
