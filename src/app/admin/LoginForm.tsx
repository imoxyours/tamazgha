"use client";
import { useActionState } from "react";
import { login } from "./actions";
import { t } from "@/lib/utils";
const f = "rounded-xl border border-line bg-surface px-4 py-3 text-base";
export default function LoginForm() {
  const [err, action] = useActionState(login, null);
  return (
    <form action={action} className="flex max-w-[400px] flex-col gap-4">
      <label htmlFor="password">{t("password")}</label>
      <input id="password" name="password" type="password" autoComplete="current-password" className={f} required />
      <label htmlFor="code">رمز 2FA (6 أرقام)</label>
      <input id="code" name="code" inputMode="numeric" autoComplete="one-time-code" maxLength={6} className={f} required />
      {err && <p role="alert" style={{ color: "#9B2C1F" }}>{err === "limit" ? "محاولات كثيرة، عاود من بعد." : t("login_error")}</p>}
      <button className="btn btn-primary self-start">{t("login")}</button>
    </form>
  );
}
