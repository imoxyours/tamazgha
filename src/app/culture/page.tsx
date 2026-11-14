import themes from "@/data/themes.json";
import CultureImage from "@/components/CultureImage";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/utils";
export const metadata = { title: "الثقافة الأمازيغية | تامزغا", description: "اللغة والتاريخ والموسيقى والأكل والحرف ويناير." };
export default async function Culture() {
  const l = await getLocale();
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-16">
      <h1 className="mb-4 text-[40px]">{t("culture_title", l)}</h1>
      <p className="mb-12 max-w-[60ch] text-lg text-muted">{t("culture_intro", l)}</p>
      <ul className="grid gap-6 sm:grid-cols-2">
        {themes.map((x) => (
          <li key={x.name.en} data-reveal className="card overflow-hidden">
            <CultureImage src={`/assets/${x.image}`} />
            <div className="p-8">
              <p className="tifinagh mb-2 text-2xl text-accent" aria-hidden>{x.title}</p>
              <h2 className="mb-2 text-2xl">{x.name[l]}</h2>
              <p className="text-base text-muted">{x.text[l]}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}