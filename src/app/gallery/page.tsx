import gallery from "@/data/gallery.json";
import GalleryGrid, { type GalleryItem } from "@/components/GalleryGrid";
import { getPlaces } from "@/lib/content";
import { getLocale } from "@/lib/locale";
import { imgSrc, t } from "@/lib/utils";
export const metadata = { title: "معرض الصور | تامزغا", description: "صور من الأطلس وسوس والريف والجنوب الشرقي." };
const FILE_REGION: Record<string, string> = { "atlas.webp": "الأطلس", "tiznit.webp": "سوس", "carpet.webp": "الجنوب الشرقي", "rif.webp": "الريف" };
const photographer = (o: object) => {
  const v = (o as Record<string, unknown>).photographer;
  return typeof v === "string" && v.trim() ? v : undefined;
};
export default async function Gallery() {
  const l = await getLocale();
  const places = await getPlaces();
  const base: GalleryItem[] = gallery.map((g) => ({
    id: `g-${g.file}`, src: imgSrc(g.file), alt: g.alt, title: g.caption, place: g.caption,
    region: FILE_REGION[g.file], photographer: photographer(g), optional: false,
  }));
  const used = new Set(base.map((b) => b.src));
  const fromPlaces: GalleryItem[] = places.flatMap((p) =>
    p.images.slice(0, 4)
      .map((img, i) => ({
        id: `${p.slug}-${i + 1}`, src: imgSrc(img), title: `${p.nameAr} - الصورة ${i + 1}`, place: p.nameAr,
        region: p.region, photographer: photographer(p), optional: i >= 2,
      }))
      .filter((x) => !used.has(x.src)),
  );
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-16">
      <h1 className="mb-2 text-[40px]">{t("gallery_title", l)}</h1>
      <p className="mb-8 text-base text-muted">{t("gallery_note", l)}</p>
      <GalleryGrid items={[...base, ...fromPlaces]} />
    </div>
  );
}