"use client";
import { useState } from "react";
import RegionFilter from "./RegionFilter";
import { useLocale } from "./LocaleProvider";
import { regionLabel, t } from "@/lib/utils";
import type { Contribution } from "@/lib/content";
export default function CommunityGallery({ items }: { items: Contribution[] }) {
  const l = useLocale();
  const [region, setRegion] = useState("");
  const list = items.filter((c) => !region || c.region === region);
  return (<div><RegionFilter value={region} onChange={setRegion} />
    {list.length === 0 ? <p className="text-base text-muted">{t("community_empty", l)}</p> :
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((c) => (
      <li key={c.id}><figure className="card overflow-hidden"><img src={c.image} alt={c.place} loading="lazy" className="aspect-[4/3] w-full object-cover" />
        <figcaption className="p-4 text-sm"><strong dir="auto" className="block text-base">{c.place}</strong><span className="text-clay">{regionLabel(c.region, l)}</span>
          <span dir="auto" className="mt-2 block text-muted">{c.desc}</span>{c.name && <span dir="auto" className="mt-2 block">{t("by", l)} {c.name}</span>}</figcaption></figure></li>))}</ul>}</div>);
}
