"use client";
import { useActionState } from "react";
import { submit } from "./actions";
import { REGIONS } from "@/lib/regions";
import { regionLabel, t, type Key } from "@/lib/utils";
import { u } from "@/i18n/ui";
import { useLocale } from "@/components/LocaleProvider";
const box = "min-h-12 w-full rounded-xl border border-line bg-surface px-4 py-3 text-base md:min-h-11";
const errKey: Record<string, Key> = { invalid: "share_err_invalid", file: "share_err_file", limit: "share_err_limit", unavail: "share_err_unavail" };
export default function Share() {
  const l = useLocale();
  const [s, action, pending] = useActionState(submit, null);
  return (
    <div className="mx-auto max-w-[600px] px-4 py-16">
      <h1 className="mb-4 text-[40px]">{t("share_title", l)}</h1>
      <p className="mb-16 text-lg text-muted">{t("share_intro", l)}</p>
      <form action={action} className="flex flex-col gap-4">
        <label htmlFor="name">{t("share_name", l)}</label><input id="name" name="name" maxLength={60} defaultValue={s?.v?.name} className={box} />
        <label htmlFor="place">{t("share_place", l)}</label><input id="place" name="place" maxLength={80} defaultValue={s?.v?.place} className={box} required />
        <label htmlFor="region">{t("region_label", l)}</label>
        <select id="region" name="region" defaultValue={s?.v?.region} className={box} required>{REGIONS.map((r) => <option key={r} value={r}>{regionLabel(r, l)}</option>)}</select>
        <label htmlFor="desc">{t("share_desc", l)}</label><textarea id="desc" name="desc" rows={3} maxLength={300} defaultValue={s?.v?.desc} className={box} required />
        <label htmlFor="image">{t("share_photo", l)}</label><input id="image" name="image" type="file" accept="image/jpeg,image/png,image/webp" className={box} required />
        <label className="flex items-start gap-2 text-base"><input type="checkbox" name="consent" required className="mt-2" />{t("share_consent", l)}</label>
        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -start-[9999px]" />
        {s && !s.ok && s.error && <p role="alert" className="text-base" style={{ color: "#9B2C1F" }}>{t(errKey[s.error], l)}</p>}
        {s?.ok && <p role="status" className="text-base text-primary">{t("share_ok", l)}</p>}
        <button type="submit" className="btn-gold self-start" disabled={pending} aria-busy={pending}>
          {pending ? (<><span className="spinner" aria-hidden />{u("sending", l)}</>) : t("share_send", l)}
        </button>
      </form>
    </div>
  );
}