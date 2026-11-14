import { notFound } from "next/navigation";
import { getArticle } from "@/lib/content";
export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) notFound();
  return (<article dir="rtl" lang="ar" className="mx-auto max-w-[720px] px-4 py-16"><p className="mb-2 text-sm text-clay">{a.region}</p><h1 className="mb-8 text-[40px]">{a.title}</h1><p className="text-lg">{a.body}</p></article>);
}
