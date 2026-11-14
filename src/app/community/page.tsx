import CommunityGallery from "@/components/CommunityGallery";
import { getContributions } from "@/lib/content";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/utils";
export const metadata = { title: "مساهمات الجمهور | تامزغا", description: "صور شاركها الزوار من الثقافة الأمازيغية بالمغرب." };
export default async function Community() {
  const l = await getLocale();
  return (<div className="mx-auto max-w-[1200px] px-4 py-16"><h1 className="mb-8 text-[40px]">{t("community_title", l)}</h1><CommunityGallery items={await getContributions("approved")} /></div>);
}
