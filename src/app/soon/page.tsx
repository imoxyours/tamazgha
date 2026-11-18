import Link from "@/components/LocLink";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/utils";
export const metadata = { title: "قريبا | تامزغا", robots: { index: false, follow: true } };
export default async function Soon() {
  const l = await getLocale();
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-24 text-center">
      <h1 className="mb-4 text-[40px]">{t("soon_title", l)}</h1>
      <p className="mx-auto mb-8 max-w-[60ch] text-lg text-muted">{t("soon_text", l)}</p>
      <Link href="/" className="btn-gold">{t("nf_back", l)}</Link>
    </div>
  );
}