"use client";
import { REGIONS } from "@/lib/regions";
import { regionLabel, t } from "@/lib/utils";
import { useLocale } from "./LocaleProvider";
export default function RegionFilter({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const l = useLocale();
  return (<div className="mb-8 flex flex-wrap gap-2" role="group" aria-label={t("region_label", l)}>
    {["", ...REGIONS].map((r) => (<button key={r} onClick={() => onChange(r)} aria-pressed={r === value}
      className={`rounded-full border border-line px-4 py-2 text-sm ${r === value ? "bg-primary text-primary-ink" : "bg-surface"}`}>{r ? regionLabel(r, l) : t("r_all", l)}</button>))}
  </div>);
}
