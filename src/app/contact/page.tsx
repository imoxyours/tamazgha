"use client";
import { useActionState } from "react";
import { send } from "./actions";
import { t } from "@/lib/utils";
import { useLocale } from "@/components/LocaleProvider";
const field = "w-full rounded-xl border border-line bg-surface px-4 py-3 text-base";
export default function Contact() {
  const l = useLocale();
  const [s, action, pending] = useActionState(send, null);
  const err = s && !s.ok ? (s.error === "limit" ? "share_err_limit" : s.error === "send" ? "contact_err_send" : "err_required") : null;
  return (
    <div className="mx-auto max-w-[600px] px-4 py-16">
      <h1 className="mb-8 text-[40px]">{t("contact_title", l)}</h1>
      <form action={action} className="flex flex-col gap-4" noValidate>
        <label htmlFor="name">{t("name", l)}</label><input id="name" name="name" className={field} maxLength={80} defaultValue={s?.v?.name} required />
        <label htmlFor="email">{t("email", l)}</label><input id="email" name="email" type="email" className={field} defaultValue={s?.v?.email} required />
        <label htmlFor="message">{t("message", l)}</label><textarea id="message" name="message" rows={5} className={field} maxLength={2000} defaultValue={s?.v?.message} required />
        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -start-[9999px]" />
        {err && <p role="alert" className="text-base" style={{ color: "#9B2C1F" }}>{t(err, l)}</p>}
        {s?.ok && <p role="status" className="text-base text-primary">{t("sent", l)}</p>}
        <button className="btn btn-primary self-start" disabled={pending}>{pending ? "..." : t("send", l)}</button>
      </form>
    </div>
  );
}
