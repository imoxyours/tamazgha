"use client";
import { REGIONS } from "@/lib/regions";
import { regionLabel, t } from "@/lib/utils";
import { useLocale } from "./LocaleProvider";
export default function RegionFilter({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const l = useLocale();
  return (
    <div className="mb-8 flex flex-wrap gap-3" role="group" aria-label={t("region_label", l)}>
      {["", ...REGIONS].map((r) => (
        <button key={r || "all"} type="button" onClick={() => onChange(r)} aria-pressed={r === value} className="btn-outline">
          {r ? regionLabel(r, l) : t("r_all", l)}
        </button>
      ))}
    </div>
  );
}