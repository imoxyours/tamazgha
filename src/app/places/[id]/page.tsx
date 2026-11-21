import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { CalendarDays, Eye, Lightbulb, Route, type LucideIcon } from "lucide-react";
import Link from "@/components/LocLink";
import Breadcrumb from "@/components/Breadcrumb";
import CultureImage from "@/components/CultureImage";
import PlaceCard from "@/components/PlaceCard";
import PlaceMapDialog from "@/components/PlaceMapDialog";
import { getPlace, getPlaces, TBD } from "@/lib/content";
import { getLocale } from "@/lib/locale";
import { u } from "@/i18n/ui";
import { t, imgSrc, regionLabel } from "@/lib/utils";
import guideData from "@/data/place-guide.json";

type Guide = { see: string[]; bestTime: string; howToReach: string; tips: string[] };
const GUIDE = guideData as unknown as Record<string, Guide>;
const hasTifinagh = (s: string) => /[\u2D30-\u2D7F]/.test(s);

function Items({ items }: { items: string[] }) {
  if (items.length === 0 || (items.length === 1 && items[0] === TBD)) {
    return <p className="text-base text-muted">{TBD}</p>;
  }
  return (
    <ul className="flex flex-col gap-2 text-base">
      {items.map((x) => (
        <li key={x} className="list-inside list-disc">{x}</li>
      ))}
    </ul>
  );
}
function Para({ value }: { value: string }) {
  return <p className={`text-base ${value === TBD ? "text-muted" : ""}`}>{value}</p>;
}
function Block({ id, title, icon: Icon, children }: { id: string; title: string; icon: LucideIcon; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="card scroll-mt-24 p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-line text-primary">
          <Icon size={22} aria-hidden />
        </span>
        <h3 id={`${id}-title`} className="text-2xl">{title}</h3>
      </div>
      {children}
    </section>
  );
}

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

  const g = GUIDE[p.slug];
  const see = g?.see?.length ? g.see : [TBD];
  const bestTime = g?.bestTime || p.bestTime;
  const howToReach = g?.howToReach || p.howToReach;
  const tips = g?.tips?.length ? g.tips : [TBD];
  const sections: { id: string; title: string; icon: LucideIcon }[] = [
    { id: "see", title: "ماذا ترى", icon: Eye },
    { id: "best-time", title: "أفضل وقت للزيارة", icon: CalendarDays },
    { id: "how-to-reach", title: "كيف تصل", icon: Route },
    { id: "tips", title: "نصائح عملية", icon: Lightbulb },
  ];
  const extra: [string, string][] = [
    [u("where_to_sleep", l), p.whereToSleep],
    [u("distance", l), p.distance],
  ];
  const extraShown = extra.filter(([, v]) => v !== TBD);

  return (
    <article dir="rtl" lang="ar" className="mx-auto max-w-[1200px] px-4 py-16">
      <Breadcrumb items={[{ label: t("nav_home", l), href: "/" }, { label: t("nav_places", l), href: "/places" }, { label: p.nameAr }]} />
      <header className="mb-16 max-w-[720px]">
        <p className="mb-2 text-base text-clay">{regionLabel(p.region, l)}</p>
        <h1 className="mb-4 text-[40px]">
          {p.nameAr}
          {hasTifinagh(p.nameTifinagh) && (
            <span className="tifinagh ms-4 text-primary" lang="zgh">{p.nameTifinagh}</span>
          )}
        </h1>
        <p className="text-lg">{p.description}</p>
        <div className="mt-6">
          <PlaceMapDialog name={p.nameAr} region={regionLabel(p.region, l)} description={p.description} />
        </div>
      </header>

      <section aria-labelledby="gallery" className="mb-16">
        <h2 id="gallery" className="mb-4 text-2xl">{u("gallery", l)}</h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2">
          {photos.map((src, i) => (
            <li key={i} className="overflow-hidden rounded-xl">
              <CultureImage src={imgSrc(src)} alt={`${p.nameAr} ${i + 1}`} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="practical" className="mb-16">
        <h2 id="practical" className="mb-4 text-2xl">{u("place_info", l)}</h2>
        <nav aria-label={u("place_info", l)} className="mb-6 flex flex-wrap gap-3">
          {sections.map(({ id: sid, title, icon: Icon }) => (
            <a key={sid} href={`#${sid}`} className="btn-outline">
              <Icon size={20} aria-hidden />
              {title}
            </a>
          ))}
        </nav>
        <div className="grid gap-6 sm:grid-cols-2">
          <Block id="see" title="ماذا ترى" icon={Eye}><Items items={see} /></Block>
          <Block id="best-time" title="أفضل وقت للزيارة" icon={CalendarDays}><Para value={bestTime} /></Block>
          <Block id="how-to-reach" title="كيف تصل" icon={Route}><Para value={howToReach} /></Block>
          <Block id="tips" title="نصائح عملية" icon={Lightbulb}><Items items={tips} /></Block>
        </div>
        {extraShown.length > 0 && (
          <div className="card mt-6 p-6">
            <dl className="grid gap-6 sm:grid-cols-2">
              {extraShown.map(([label, value]) => (
                <div key={label}>
                  <dt className="mb-1 text-base text-clay">{label}</dt>
                  <dd className="text-base">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related" className="mb-16">
          <h2 id="related" className="mb-4 text-2xl">{u("related_places", l)}</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">{related.map((x) => <PlaceCard key={x.slug} p={x} />)}</ul>
        </section>
      )}

      <section aria-labelledby="cta" className="mb-16 flex flex-col items-center gap-4 rounded-xl border border-line bg-surface p-8 text-center">
        <h2 id="cta" className="text-2xl">{u("liked_place", l)}</h2>
        <p className="text-lg text-muted">{u("liked_place_text", l)}</p>
        <Link href="/places" className="btn-gold">{u("discover_places", l)}</Link>
      </section>

      <Link href="/places" className="btn-outline">{t("back", l)}</Link>
    </article>
  );
}