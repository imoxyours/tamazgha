import PlacesExplorer from "@/components/PlacesExplorer";
import { getPlaces } from "@/lib/content";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/utils";
export const metadata = { title: "دليل الأماكن | تامزغا", description: "أماكن أمازيغية فسوس والأطلس والريف والجنوب الشرقي." };
export default async function Places() {
  const l = await getLocale();
  return (<div className="mx-auto max-w-[1200px] px-4 py-16"><h1 className="mb-8 text-[40px]">{t("places_title", l)}</h1><PlacesExplorer places={await getPlaces()} /></div>);
}
