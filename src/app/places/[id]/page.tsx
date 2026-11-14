import Link from "@/components/LocLink";
import OptionalImage from "@/components/OptionalImage";
import { getLocale } from "@/lib/locale";
import { notFound } from "next/navigation";
import { getPlace } from "@/lib/content";
import { t, imgSrc } from "@/lib/utils";
export default async function Place({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const l = await getLocale();
  const p = await getPlace(id);
  if (!p) notFound();
  const second = p.image.startsWith("http") ? null : p.image.replace(/\.(\w+)$/, "-2.$1");
  return (
    <article dir="rtl" lang="ar" className="mx-auto max-w-[720px] px-4 py-16">
      <img src={imgSrc(p.image)} alt={p.name} width={800} height={600} className="mb-8 aspect-[4/3] w-full rounded-xl object-cover" />
      <p className="mb-2 text-sm text-clay">{p.region}</p>
      <h1 className="mb-4 text-[40px]">{p.name}</h1>
      <p className="mb-8 text-lg">{p.desc}</p>
      {second && <OptionalImage src={imgSrc(second)} alt={p.name} className="mb-8 aspect-[4/3] w-full rounded-xl object-cover" />}
      <Link href="/places" className="text-primary underline">{t("back", l)}</Link>
    </article>
  );
}