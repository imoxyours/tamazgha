import Link from "./LocLink";
import { t } from "@/lib/utils";
import { getLocale } from "@/lib/locale";
const link = "text-[#E3B04B] underline underline-offset-4 hover:text-[#EBCB9B]";
const legal = "inline-flex min-h-11 items-center text-[#EFE6D4] underline underline-offset-4 hover:text-[#E3B04B]";
export default async function Footer() {
  const l = await getLocale();
  return (
    <footer className="mt-16 bg-[#2E2418] px-4 py-12 text-center text-[#EFE6D4]">
      <p className="tifinagh mb-4 text-3xl text-[#E3B04B]">ⵜⴰⵎⴰⵣⵖⴰ</p>
      <p className="mb-6 text-base">{t("footer", l)}</p>
      <ul className="mb-6 flex flex-wrap items-center justify-center gap-6 text-base">
        <li>{t("social_facebook", l)}: <a href="https://www.facebook.com/share/1MLpDT4c1o/" target="_blank" rel="noopener noreferrer" className={link}><bdi>Imad Yassin</bdi></a></li>
        <li>{t("social_instagram", l)}: <a href="https://www.instagram.com/imadyassin.the_best" target="_blank" rel="noopener noreferrer" className={link}><bdi>imadyassin.the_best</bdi></a></li>
      </ul>
      <p className="mb-2 text-base">{t("footer_rights", l)}</p>
      <p className="mb-6 text-base">{t("footer_made", l)}</p>
      <ul className="flex flex-wrap justify-center gap-x-6 text-base">
        <li><Link href="/privacy" className={legal}>{t("privacy", l)}</Link></li>
        <li><Link href="/terms" className={legal}>{t("terms", l)}</Link></li>
        <li><Link href="/contact" className={legal}>{t("nav_contact", l)}</Link></li>
      </ul>
    </footer>
  );
}