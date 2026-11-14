import Link from "@/components/LocLink";
import Subtitle from "@/components/Subtitle";
import HeroBackground from "@/components/HeroBackground";
import CultureImage from "@/components/CultureImage";
import { getLocale } from "@/lib/locale";
import themes from "@/data/themes.json";
import { t } from "@/lib/utils";
export default async function Home() {
  const l = await getLocale();
  return (
    <>
      <section className="relative isolate flex min-h-[70vh] items-center justify-center overflow-hidden px-4 py-24 text-center">
        <HeroBackground />
        <div className="mx-auto max-w-[1200px]">
          <p data-hero className="tifinagh mb-4 text-[clamp(48px,12vw,96px)] leading-none text-[#E3B04B]" aria-hidden>ⵜⴰⵎⴰⵣⵖⴰ</p>
          <p data-hero className="mb-6 text-lg text-[#EBCB9B]"><Subtitle l={l} /></p>
          <h1 data-hero className="mb-6 text-[clamp(32px,5vw,48px)] text-[#FAF5EA]">{t("hero_title", l)}</h1>
          <p data-hero className="mx-auto mb-8 max-w-[60ch] text-lg text-[#EFE6D4]">{t("hero_text", l)}</p>
          <Link data-hero href="/places" className="btn bg-[#D9951F] text-[#211A12]">{t("cta_places", l)}</Link>
        </div>
      </section>
      <div className="mx-auto max-w-[1200px] px-4">
        <section aria-labelledby="themes" className="py-16">
          <h2 id="themes" data-reveal className="mb-8 text-2xl">{t("themes", l)}</h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {themes.map((x) => (
              <li key={x.name.en} data-reveal className="card overflow-hidden">
                <CultureImage src={`/assets/${x.image}`} />
                <div className="p-6">
                  <p className="tifinagh mb-2 text-xl text-accent" aria-hidden>{x.title}</p>
                  <h3 className="mb-2 text-xl">{x.name[l]}</h3>
                  <p className="text-base text-muted">{x.text[l]}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}