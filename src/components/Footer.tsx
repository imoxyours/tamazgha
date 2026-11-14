import Link from "./LocLink";
import { t } from "@/lib/utils";
import { getLocale } from "@/lib/locale";
export default async function Footer() {
  const l = await getLocale();
  return (<footer className="mt-24 border-t border-line py-12 text-center text-sm text-muted"><p className="mb-4">{t("footer", l)}</p>
    <p className="flex justify-center gap-6"><Link href="/privacy" className="underline">{t("privacy", l)}</Link><Link href="/terms" className="underline">{t("terms", l)}</Link><Link href="/contact" className="underline">{t("nav_contact", l)}</Link></p></footer>);
}
