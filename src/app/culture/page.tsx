import Link from "@/components/LocLink";
import CultureImage from "@/components/CultureImage";
import culture from "@/data/culture.json";
import { getLocale } from "@/lib/locale";
import { u } from "@/i18n/ui";
import { t } from "@/lib/utils";
export const metadata = { title: "الثقافة الأمازيغية | تامزغا", description: "اللغة والتاريخ والموسيقى والأكل والحرف ويناير." };
export default async function Culture() {
  const l = await getLocale();
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-16">
      <h1 className="mb-4 text-[40px]">{t("culture_title", l)}</h1>
      <p className="mb-12 max-w-[60ch] text-lg text-muted">{t("culture_intro", l)}</p>
      <ul className="flex flex-col gap-12">
        {culture.map((x, i) => (
          <li key={x.slug} data-reveal className="grid items-center gap-8 md:grid-cols-2">
            <div className={`overflow-hidden rounded-xl ${i % 2 === 1 ? "md:order-2" : ""}`}>
              <CultureImage src={`/assets/${x.image}`} />
            </div>
            <div dir="rtl" lang="ar">
              <p className="tifinagh mb-2 text-2xl text-primary" aria-hidden>{x.tifinagh}</p>
              <h2 className="mb-2 text-2xl">{x.title}</h2>
              <p className="mb-6 text-base text-muted">{x.summary}</p>
              <Link href={`/culture/${x.slug}`} className="btn-gold">{u("explore", l)}</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}