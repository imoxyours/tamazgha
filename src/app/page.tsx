import Link from "@/components/LocLink";
import Subtitle from "@/components/Subtitle";
import HeroBackground from "@/components/HeroBackground";
import CultureImage from "@/components/CultureImage";
import { getLocale } from "@/lib/locale";
import themes from "@/data/themes.json";
import { u } from "@/i18n/ui";
import { t } from "@/lib/utils";
export default async function Home() {
  const l = await getLocale();
  return (
    <>
      <section className="relative isolate flex min-h-[70vh] items-center justify-center overflow-hidden px-4 py-16 text-center">
        <HeroBackground />
        <div className="mx-auto max-w-[1200px]">
          <p data-hero className="tifinagh mb-4 text-[clamp(48px,12vw,96px)] leading-none text-[#E3B04B]" aria-hidden>ⵜⴰⵎⴰⵣⵖⴰ</p>
          <p data-hero className="mb-4 text-lg text-[#EBCB9B]"><Subtitle l={l} /></p>
          <h1 data-hero className="mb-4 text-[clamp(32px,5vw,48px)] text-[#FAF5EA]">{t("hero_title", l)}</h1>
          <p data-hero className="mx-auto mb-8 max-w-[60ch] text-lg text-[#EFE6D4]">{t("hero_text", l)}</p>
          <div data-hero className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/places" className="btn-gold">{t("cta_places", l)}</Link>
            <Link href="/soon" className="btn-gold">{t("nav_share", l)}</Link>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-[1200px] px-4">
        <section aria-labelledby="themes" className="py-16">
          <h2 id="themes" data-reveal className="mb-4 text-2xl">{t("themes", l)}</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {themes.map((x) => {
              const slug = x.image.replace("culture-", "").replace(".webp", "");
              return (
                <li key={x.name.en} data-reveal className="card flex overflow-hidden">
                  <Link href={`/culture/${slug}`} className="flex flex-1 flex-col">
                    <CultureImage src={`/assets/${x.image}`} />
                    <div className="flex flex-1 flex-col p-6">
                      <p className="tifinagh mb-2 text-xl text-primary" aria-hidden>{x.title}</p>
                      <h3 className="mb-2 text-xl">{x.name[l]}</h3>
                      <p className="mb-6 flex-1 text-base text-muted">{x.text[l]}</p>
                      <span className="btn-ghost self-start">{u("explore", l)}</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </>
  );
}