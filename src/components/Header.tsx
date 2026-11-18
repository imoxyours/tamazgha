import Link from "./LocLink";
import LangSwitch from "./LangSwitch";
import StickyHeader from "./StickyHeader";
import Subtitle from "./Subtitle";
import { t } from "@/lib/utils";
import { getLocale } from "@/lib/locale";
const links = [["/", "nav_home"], ["/culture", "nav_culture"], ["/places", "nav_places"], ["/articles", "nav_articles"], ["/gallery", "nav_gallery"], ["/soon", "nav_soon"]] as const;
export default async function Header() {
  const l = await getLocale();
  return (
    <StickyHeader>
      <nav className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-4 py-4" aria-label="Main">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="tifinagh text-2xl text-[#E3B04B]">ⵜⴰⵎⴰⵣⵖⴰ</span>
          <Subtitle l={l} className="text-sm text-[#BDB296]" />
        </Link>
        <ul className="flex flex-wrap gap-4 text-base">
          {links.map(([href, key]) => (
            <li key={href}><Link href={href} className="text-[#EFE6D4] hover:text-[#E3B04B]">{t(key, l)}</Link></li>
          ))}
        </ul>
        <LangSwitch />
      </nav>
    </StickyHeader>
  );
}