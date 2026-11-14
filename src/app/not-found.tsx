import Link from "@/components/LocLink";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/utils";
export default async function NotFound() {
  const l = await getLocale();
  return (<div className="mx-auto max-w-[1200px] px-4 py-24 text-center"><h1 className="mb-4 text-[40px]">{t("nf_title", l)}</h1><Link href="/" className="btn btn-primary">{t("nf_back", l)}</Link></div>);
}
