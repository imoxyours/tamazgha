"use client";
import Link from "./LocLink";
import CultureImage from "./CultureImage";
import { t, regionLabel } from "@/lib/utils";
import { useLocale } from "./LocaleProvider";
import type { Article } from "@/lib/content";
export type { Article } from "@/lib/content";
const SLUG_IMAGE: Record<string, string> = { "silver-tiznit": "article-silver.webp" };
export default function ArticleCard({ a }: { a: Article }) {
  const l = useLocale();
  const image = (a as Article & { image?: string }).image || SLUG_IMAGE[a.slug] || `article-${a.slug}.webp`;
  return (
    <li className="card flex flex-col overflow-hidden">
      <CultureImage src={`/assets/${image}`} />
      <div className="flex flex-1 flex-col p-6">
        <p className="mb-2 text-sm text-clay">{regionLabel(a.region, l)}</p>
        <h3 dir="auto" className="mb-2 text-xl">{a.title}</h3>
        <p dir="auto" className="mb-4 flex-1 text-base text-muted">{a.excerpt}</p>
        <Link href={`/articles/${a.slug}`} className="text-primary underline">{t("read_more", l)}</Link>
      </div>
    </li>
  );
}