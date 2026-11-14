import gallery from "@/data/gallery.json";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/utils";
export const metadata = { title: "معرض الصور | تامزغا", description: "صور من الأطلس وسوس والريف والجنوب الشرقي." };
export default async function Gallery() {
  const l = await getLocale();
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-16">
      <h1 className="mb-2 text-[40px]">{t("gallery_title", l)}</h1>
      <p className="mb-8 text-base text-muted">{t("gallery_note", l)}</p>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {gallery.map((g) => (<li key={g.file}><figure className="card overflow-hidden"><img src={`/assets/${g.file}`} alt={g.alt} loading="lazy" className="aspect-[4/3] w-full bg-line object-cover" /><figcaption className="p-4 text-sm">{g.caption}</figcaption></figure></li>))}
      </ul>
    </div>
  );
}
