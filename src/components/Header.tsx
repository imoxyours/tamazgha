import Link from "./LocLink";
import Subtitle from "./Subtitle";
import LangSwitch from "./LangSwitch";
import { t } from "@/lib/utils";
import { getLocale } from "@/lib/locale";
const links = [["/", "nav_home"], ["/culture", "nav_culture"], ["/places", "nav_places"], ["/articles", "nav_articles"], ["/gallery", "nav_gallery"], ["/community", "nav_community"], ["/share", "nav_share"], ["/contact", "nav_contact"]] as const;
export default async function Header() {
  const l = await getLocale();
  return (
    <header className="border-b border-line">
      <nav className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-4 py-4" aria-label="Main">
        <Link href="/" className="flex flex-col leading-tight"><span className="tifinagh text-2xl text-primary">ⵜⴰⵎⴰⵣⵖⴰ</span><Subtitle l={l} className="text-sm text-muted" /></Link>
        <ul className="flex flex-wrap gap-4 text-base">{links.map(([href, key]) => (<li key={href}><Link href={href} className="hover:text-primary">{t(key, l)}</Link></li>))}</ul>
        <LangSwitch />
      </nav>
    </header>
  );
}
