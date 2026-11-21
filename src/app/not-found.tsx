import Link from "@/components/LocLink";
import { getLocale } from "@/lib/locale";
import { u } from "@/i18n/ui";
import { t } from "@/lib/utils";
export default async function NotFound() {
  const l = await getLocale();
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-16 text-center">
      <p className="tifinagh mb-4 text-[clamp(48px,12vw,96px)] leading-none text-primary" aria-hidden>ⵜⴰⵎⴰⵣⵖⴰ</p>
      <h1 className="mb-4 text-[40px]">{t("nf_title", l)}</h1>
      <p className="mx-auto mb-8 max-w-[60ch] text-lg text-muted">{u("nf_text", l)}</p>
      <Link href="/" className="btn-gold">{t("nf_back", l)}</Link>
    </div>
  );
}