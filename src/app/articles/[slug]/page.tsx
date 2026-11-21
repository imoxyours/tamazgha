import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/components/LocLink";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumb from "@/components/Breadcrumb";
import CultureImage from "@/components/CultureImage";
import ReadingProgress from "@/components/ReadingProgress";
import ShareButtons from "@/components/ShareButtons";
import { getArticle, getArticles } from "@/lib/content";
import { getLocale } from "@/lib/locale";
import { countWords, publishedLabel, readingTime } from "@/lib/time";
import { t } from "@/lib/utils";
import seed from "@/data/articles.json";
import pages from "@/data/article-pages.json";
import sourcesData from "@/data/article-sources.json";

type Block = { h?: string; p: string[] };
type Section = { id: string; title: string; blocks: Block[] };
type ArticlePage = {
  story: string; sections: Section[]; didYouKnow: string; learn: string[];
  visit: { p: string[]; tip: string }; conclusion: string; sources: string[]; faq: { q: string; a: string }[];
};
type Source = { name: string; url?: string };
const RICH = pages as unknown as Record<string, ArticlePage>;
const SOURCES = sourcesData as unknown as Record<string, Source[]>;
const SEED = seed as { slug: string; publishedAt?: string; image?: string }[];
const SLUG_IMAGE: Record<string, string> = { "silver-tiznit": "article-silver.webp" };
const L = {
  toc: "فهرس المحتويات", dyk: "هل تعلم؟", learn: "ماذا ستتعلم من هذا المقال؟", visit: "ماذا ترى إذا زرت المكان؟",
  tip: "نصيحة للزائر", conclusion: "خاتمة", sources: "المصادر الموثوقة", faq: "أسئلة شائعة",
  read: "وقت القراءة", similar: "مقالات مشابهة", all: "عرض كل المقالات",
  liked: "هل أعجبك هذا المقال؟", likedText: "تابع القراءة واكتشف مقالات أخرى عن الثقافة الأمازيغية.", discover: "اكتشف مقالات أخرى",
  newTab: "(يفتح في تبويب جديد)",
};
function richText(r: ArticlePage): string {
  return [
    r.story,
    ...r.sections.flatMap((s) => s.blocks.flatMap((b) => [b.h ?? "", ...b.p])),
    r.didYouKnow, ...r.learn, ...r.visit.p, r.visit.tip, r.conclusion,
    ...r.faq.flatMap((f) => [f.q, f.a]),
  ].join(" ");
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = await getArticle(slug);
  return a ? { title: `${a.title} | تامزغا`, description: a.excerpt } : {};
}
export default async function ArticleView({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = await getLocale();
  const [a, all] = await Promise.all([getArticle(slug), getArticles()]);
  if (!a) notFound();
  const rich = RICH[slug];
  const seedItem = SEED.find((x) => x.slug === slug);
  const published = a.publishedAt ?? seedItem?.publishedAt;
  const image = (a as typeof a & { image?: string }).image || seedItem?.image || SLUG_IMAGE[slug] || `article-${slug}.webp`;
  const words = countWords(rich ? richText(rich) : a.body);
  const sources: Source[] = SOURCES[slug] ?? rich?.sources.map((name) => ({ name })) ?? [];
  const similar = all
    .filter((x) => x.slug !== slug)
    .sort((x, y) => Number(y.region === a.region) - Number(x.region === a.region))
    .slice(0, 3);
  const toc = rich
    ? [
        ...rich.sections.map((s) => ({ id: s.id, title: s.title })),
        { id: "learn", title: L.learn }, { id: "visit", title: L.visit }, { id: "conclusion", title: L.conclusion },
        { id: "sources", title: L.sources }, { id: "faq", title: L.faq },
      ]
    : [];
  return (
    <>
      <ReadingProgress />
      <article dir="rtl" lang="ar" className="mx-auto max-w-[720px] px-4 pb-16 pt-12">
        <Breadcrumb items={[{ label: t("nav_home", l), href: "/" }, { label: t("articles_title", l), href: "/articles" }, { label: a.title }]} />
        <h1 className="mb-4 text-[40px] leading-tight">{a.title}</h1>
        <p className="mb-6 flex flex-wrap gap-x-6 gap-y-1 text-base text-muted">
          {published && <span>{publishedLabel(published)}</span>}
          <span>{L.read}: {readingTime(words)}</span>
        </p>
        <div className="mb-8 overflow-hidden rounded-xl"><CultureImage src={`/assets/${image}`} alt={a.title} /></div>

        {rich ? (
          <>
            <p className="mb-16 text-xl leading-loose">{rich.story}</p>
            <nav aria-labelledby="toc" className="card mb-16 p-6">
              <h2 id="toc" className="mb-4 text-xl">{L.toc}</h2>
              <ol className="flex list-inside list-decimal flex-col gap-2 text-base">
                {toc.map((i) => (<li key={i.id}><a href={`#${i.id}`} className="underline underline-offset-4 hover:text-primary">{i.title}</a></li>))}
              </ol>
            </nav>
            {rich.sections.map((s) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="mb-16 scroll-mt-24">
                <h2 id={`${s.id}-h`} className="mb-4 text-2xl">{s.title}</h2>
                {s.blocks.map((b, i) => (
                  <div key={i} className="mb-6">
                    {b.h && <h3 className="mb-2 text-xl text-clay">{b.h}</h3>}
                    {b.p.map((p, j) => <p key={j} className="mb-4 text-lg">{p}</p>)}
                  </div>
                ))}
              </section>
            ))}
            <aside aria-labelledby="dyk" className="mb-16 rounded-xl bg-surface p-6" style={{ border: "1px solid var(--border)", borderInlineStart: "4px solid #D9951F" }}>
              <h2 id="dyk" className="mb-2 text-xl">{L.dyk}</h2>
              <p className="text-lg">{rich.didYouKnow}</p>
            </aside>
            <section id="learn" aria-labelledby="learn-h" className="mb-16 scroll-mt-24">
              <h2 id="learn-h" className="mb-4 text-2xl">{L.learn}</h2>
              <ul className="flex flex-col gap-3 text-lg">{rich.learn.map((x) => <li key={x} className="list-inside list-disc">{x}</li>)}</ul>
            </section>
            <section id="visit" aria-labelledby="visit-h" className="mb-16 scroll-mt-24">
              <h2 id="visit-h" className="mb-4 text-2xl">{L.visit}</h2>
              {rich.visit.p.map((p, i) => <p key={i} className="mb-4 text-lg">{p}</p>)}
              <p className="card mt-4 p-4 text-base"><strong>{L.tip}: </strong>{rich.visit.tip}</p>
            </section>
            <section id="conclusion" aria-labelledby="conclusion-h" className="mb-16 scroll-mt-24">
              <h2 id="conclusion-h" className="mb-4 text-2xl">{L.conclusion}</h2>
              <p className="text-xl font-semibold">{rich.conclusion}</p>
            </section>
            <section id="sources" aria-labelledby="sources-h" className="mb-16 scroll-mt-24">
              <h2 id="sources-h" className="mb-4 text-2xl">{L.sources}</h2>
              <ul className="flex flex-col gap-2 text-base">
                {sources.map((s) => (
                  <li key={s.name} className="list-inside list-disc">
                    {s.url ? (
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-primary">
                        {s.name}<span className="sr-only"> {L.newTab}</span>
                      </a>
                    ) : s.name}
                  </li>
                ))}
              </ul>
            </section>
            <section id="faq" aria-labelledby="faq-h" className="mb-16 scroll-mt-24">
              <h2 id="faq-h" className="mb-4 text-2xl">{L.faq}</h2>
              <div className="flex flex-col gap-6">
                {rich.faq.map((f) => (
                  <details key={f.q} className="card p-4">
                    <summary className="cursor-pointer text-lg">{f.q}</summary>
                    <p className="mt-2 text-base">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          </>
        ) : (
          <p className="mb-16 text-lg">{a.body}</p>
        )}

        <div className="border-t border-line pt-8"><ShareButtons title={a.title} /></div>
      </article>

      <section dir="rtl" lang="ar" aria-labelledby="similar" className="mx-auto max-w-[1200px] px-4 pb-16">
        {similar.length > 0 && (
          <div className="mb-16">
            <h2 id="similar" className="mb-4 text-2xl">{L.similar}</h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{similar.map((x) => <ArticleCard key={x.slug} a={x} />)}</ul>
            <div className="mt-6"><Link href="/articles" className="btn-ghost">{L.all}</Link></div>
          </div>
        )}
        <div className="flex flex-col items-center gap-4 rounded-xl border border-line bg-surface p-8 text-center">
          <h2 className="text-2xl">{L.liked}</h2>
          <p className="text-lg text-muted">{L.likedText}</p>
          <Link href="/articles" className="btn-gold">{L.discover}</Link>
        </div>
      </section>
    </>
  );
}