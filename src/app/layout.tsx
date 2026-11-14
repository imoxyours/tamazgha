import type { Metadata } from "next";
import { Noto_Naskh_Arabic, Noto_Sans_Tifinagh } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Motion from "@/components/Motion";
import CookieBanner from "@/components/CookieBanner";
import { LocaleProvider } from "@/components/LocaleProvider";
import { getLocale, getPath } from "@/lib/locale";
import { SITE_URL } from "@/lib/site";
import { t } from "@/lib/utils";
import "./globals.css";
const arabic = Noto_Naskh_Arabic({ subsets: ["arabic"], variable: "--font-arabic" });
const tifinagh = Noto_Sans_Tifinagh({ subsets: ["tifinagh"], weight: "400", variable: "--font-tifinagh" });
export async function generateMetadata(): Promise<Metadata> {
  const l = await getLocale(), p = await getPath();
  const loc = (c: string) => (c === "ar" ? p : `/${c}${p === "/" ? "" : p}`);
  return {
    metadataBase: new URL(SITE_URL),
    title: `${t("site", l)} | ${t("tagline", l)}`, description: t("hero_text", l), alternates: { canonical: loc(l), ...(p.startsWith("/admin") ? {} : { languages: { ar: loc("ar"), fr: loc("fr"), en: loc("en"), "x-default": loc("ar") } }) },
    openGraph: { siteName: "Tamazgha", locale: { ar: "ar_MA", fr: "fr_FR", en: "en_US" }[l], type: "website", images: ["/og.png"] },
  };
}
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const l = await getLocale();
  return (
    <html lang={l} dir={l === "ar" ? "rtl" : "ltr"} suppressHydrationWarning>
      <body className={`${arabic.variable} ${tifinagh.variable}`} suppressHydrationWarning>
        <LocaleProvider value={l}><Header /><main>{children}</main><Footer /><Motion /><CookieBanner /></LocaleProvider>
      </body>
    </html>
  );
}