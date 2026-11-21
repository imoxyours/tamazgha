"use client";
import { useLocale } from "./LocaleProvider";
import { u } from "@/i18n/ui";
export default function EmptyState({ onReset }: { onReset: () => void }) {
  const l = useLocale();
  return (
    <div role="status" className="flex flex-col items-center gap-4 rounded-xl border border-line bg-surface p-8 text-center">
      <p className="text-xl">{u("no_results", l)}</p>
      <button type="button" onClick={onReset} className="btn-outline">{u("reset_filter", l)}</button>
    </div>
  );
}