import { t, type Locale } from "@/lib/utils";
export default function Subtitle({ l, className }: { l: Locale; className?: string }) {
  return (<span className={className}>{t("tagline_sub", l)} - <span lang="zgh" className="tifinagh">ⵜⴰⵎⵓⵔⵜ ⵏ ⵉⵎⴰⵣⵉⵖⵏ</span></span>);
}
