import ArticleList from "@/components/ArticleList";
import { getArticles } from "@/lib/content";
import { getLocale } from "@/lib/locale";
import { u } from "@/i18n/ui";
import { t } from "@/lib/utils";
export const metadata = { title: "مقالات | تامزغا", description: "مقالات عن الثقافة الأمازيغية بالمغرب." };
export default async function Articles() {
  const l = await getLocale();
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-16">
      <h1 className="mb-4 text-[40px]">{t("articles_title", l)}</h1>
      <p className="mb-16 max-w-[60ch] text-lg text-muted">{u("articles_intro", l)}</p>
      <ArticleList items={await getArticles()} />
    </div>
  );
}