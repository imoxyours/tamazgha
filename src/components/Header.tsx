import Link from "./LocLink";
import LangSwitch from "./LangSwitch";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";
import StickyHeader from "./StickyHeader";
import Subtitle from "./Subtitle";
import { t } from "@/lib/utils";
import { u } from "@/i18n/ui";
import { getLocale } from "@/lib/locale";
const links = [["/", "nav_home"], ["/culture", "nav_culture"], ["/places", "nav_places"], ["/articles", "nav_articles"], ["/gallery", "nav_gallery"], ["/soon", "nav_soon"]] as const;
export default async function Header() {
  const l = await getLocale();
  const items = links.map(([href, key]) => ({ href, label: t(key, l) }));
  return (
    <StickyHeader>
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-3 text-[#EFE6D4]" aria-label="Main">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="tifinagh text-2xl text-[#E3B04B]">ⵜⴰⵎⴰⵣⵖⴰ</span>
          <Subtitle l={l} className="text-base text-[#EBCB9B]" />
        </Link>
        <NavLinks items={items} className="hidden items-center gap-2 md:flex" />
        <div className="flex items-center gap-3">
          <LangSwitch />
          <MobileMenu items={items} openLabel={u("menu", l)} closeLabel={u("close_menu", l)} />
        </div>
      </nav>
    </StickyHeader>
  );
}