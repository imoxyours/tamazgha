import type { MetadataRoute } from "next";
import { getArticles, getPlaces } from "@/lib/content";
import culture from "@/data/culture.json";
import { SITE_URL } from "@/lib/site";
export const revalidate = 3600;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_URL;
  const fixed = ["", "/culture", "/places", "/articles", "/gallery", "/privacy", "/terms"].map((p) => ({ url: base + p }));
  const [a, p] = await Promise.all([getArticles(), getPlaces()]);
  return [
    ...fixed,
    ...culture.map((c) => ({ url: `${base}/culture/${c.slug}` })),
    ...a.map((x) => ({ url: `${base}/articles/${x.slug}` })),
    ...p.map((x) => ({ url: `${base}/places/${x.id}` })),
  ];
}