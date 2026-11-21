"use client";
import Link from "@/components/LocLink";
import { useLocale } from "@/components/LocaleProvider";
import { t } from "@/lib/utils";
export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  const l = useLocale();
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-16 text-center">
      <h1 className="mb-4 text-[40px]">{t("err500_title", l)}</h1>
      <p className="mx-auto mb-8 max-w-[60ch] text-lg text-muted">{t("err500_text", l)}</p>
      <div className="flex flex-wrap justify-center gap-4">
        <button type="button" onClick={reset} className="btn-gold">{t("err500_retry", l)}</button>
        <Link href="/" className="btn-outline">{t("nf_back", l)}</Link>
      </div>
    </div>
  );
}