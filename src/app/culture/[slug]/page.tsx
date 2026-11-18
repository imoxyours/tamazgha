import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/components/LocLink";
import CultureImage from "@/components/CultureImage";
import culture from "@/data/culture.json";
import { getLocale } from "@/lib/locale";
import { u } from "@/i18n/ui";
type Theme = (typeof culture)[number];
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const x = culture.find((c) => c.slug === slug);
  return x ? { title: `${x.title} | تامزغا`, description: x.summary } : {};
}
export default async function ThemePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = await getLocale();
  const x = culture.find((c) => c.slug === slug);
  if (!x) notFound();
  const related = x.related.map((s) => culture.find((c) => c.slug === s)).filter((c): c is Theme => Boolean(c));
  return (
    <article dir="rtl" lang="ar">
      <header className="mx-auto grid max-w-[1200px] items-center gap-8 px-4 py-12 md:grid-cols-2">
        <div>
          <p className="tifinagh mb-2 text-[clamp(32px,6vw,56px)] leading-tight text-primary" lang="zgh" aria-hidden>{x.tifinagh}</p>
          <h1 className="mb-4 text-[40px]">{x.title}</h1>
          <p className="text-lg text-muted">{x.summary}</p>
        </div>
        <div className="overflow-hidden rounded-xl"><CultureImage src={`/assets/${x.image}`} alt={x.title} /></div>
      </header>
      <div className="mx-auto max-w-[720px] px-4 pb-16">
        <div className="mb-12 flex flex-col gap-4 text-lg">{x.intro.map((p, i) => <p key={i}>{p}</p>)}</div>
        {x.sections.map((s) => (
          <section key={s.title} className="mb-10">
            <h2 className="mb-3 text-2xl">{s.title}</h2>
            <p className="text-lg">{s.text}</p>
          </section>
        ))}
        <section aria-labelledby="facts" className="card mb-10 p-6">
          <h2 id="facts" className="mb-4 text-2xl">{u("facts_title", l)}</h2>
          <ul className="flex flex-col gap-3 text-lg">{x.facts.map((f) => <li key={f} className="list-inside list-disc">{f}</li>)}</ul>
        </section>
        <section aria-labelledby="learn" className="mb-10">
          <h2 id="learn" className="mb-4 text-2xl">{u("learn_title", l)}</h2>
          <ul className="flex flex-col gap-3 text-lg">{x.learn.map((f) => <li key={f} className="list-inside list-disc">{f}</li>)}</ul>
        </section>
        {related.length > 0 && (
          <section aria-labelledby="related" className="mb-12">
            <h2 id="related" className="mb-4 text-2xl">{u("related_themes", l)}</h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/culture/${r.slug}`} className="card block p-6 transition-transform duration-200 hover:-translate-y-0.5">
                    <span className="tifinagh mb-1 block text-xl text-primary" lang="zgh" aria-hidden>{r.tifinagh}</span>
                    <span className="mb-1 block text-xl">{r.title}</span>
                    <span className="block text-base text-muted">{r.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
        <Link href="/culture" className="btn-gold">{u("back_culture", l)}</Link>
      </div>
    </article>
  );
}