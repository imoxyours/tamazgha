import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/components/LocLink";
import CultureImage from "@/components/CultureImage";
import PlaceCard from "@/components/PlaceCard";
import PlaceMapDialog from "@/components/PlaceMapDialog";
import { getPlace, getPlaces, TBD } from "@/lib/content";
import { getLocale } from "@/lib/locale";
import { u } from "@/i18n/ui";
import { t, imgSrc, regionLabel } from "@/lib/utils";
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = await getPlace(id);
  return p ? { title: `${p.nameAr} | تامزغا`, description: p.description } : {};
}
export default async function PlacePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const l = await getLocale();
  const [p, all] = await Promise.all([getPlace(id), getPlaces()]);
  if (!p) notFound();
  const photos = Array.from({ length: 4 }, (_, i) => p.images[i] ?? (i === 0 ? `${p.slug}.webp` : `${p.slug}-${i + 1}.webp`));
  const related = all.filter((x) => x.slug !== p.slug && x.region === p.region).slice(0, 2);
  const info: [string, string][] = [
    [u("best_time", l), p.bestTime],
    [u("how_to_reach", l), p.howToReach],
    [u("where_to_sleep", l), p.whereToSleep],
    [u("distance", l), p.distance],
  ];
  return (
    <article dir="rtl" lang="ar" className="mx-auto max-w-[1200px] px-4 py-16">
      <header className="mb-10 max-w-[720px]">
        <p className="mb-2 text-sm text-clay">{regionLabel(p.region, l)}</p>
        <h1 className="mb-2 text-[40px]">{p.nameAr}</h1>
        {p.nameTifinagh !== TBD && <p className="tifinagh mb-4 text-3xl text-primary" lang="zgh">{p.nameTifinagh}</p>}
        <p className="text-lg">{p.description}</p>
        <div className="mt-6">
          <PlaceMapDialog name={p.nameAr} region={regionLabel(p.region, l)} description={p.description} />
        </div>
      </header>
      <section aria-labelledby="gallery" className="mb-12">
        <h2 id="gallery" className="mb-6 text-2xl">{u("gallery", l)}</h2>
        <ul className="grid gap-6 sm:grid-cols-2">
          {photos.map((src, i) => (
            <li key={i} className="overflow-hidden rounded-xl">
              <CultureImage src={imgSrc(src)} alt={`${p.nameAr} ${i + 1}`} />
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="info" className="card mb-12 p-6">
        <h2 id="info" className="mb-6 text-2xl">{u("place_info", l)}</h2>
        <dl className="grid gap-6 sm:grid-cols-2">
          {info.map(([label, value]) => (
            <div key={label}>
              <dt className="mb-1 text-sm text-clay">{label}</dt>
              <dd className={`text-base ${value === TBD ? "text-muted" : ""}`}>{value}</dd>
            </div>
          ))}
        </dl>
      </section>
      {related.length > 0 && (
        <section aria-labelledby="related" className="mb-12">
          <h2 id="related" className="mb-6 text-2xl">{u("related_places", l)}</h2>
          <ul className="grid gap-6 sm:grid-cols-2">{related.map((x) => <PlaceCard key={x.slug} p={x} />)}</ul>
        </section>
      )}
      <Link href="/places" className="btn-gold">{t("back", l)}</Link>
    </article>
  );
}