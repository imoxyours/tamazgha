import { REGIONS } from "@/lib/content";
export const box = "w-full rounded-xl border border-line bg-surface px-4 py-3 text-base";
type P = { name: string; label: string; defaultValue?: string | number; type?: string; area?: boolean; readOnly?: boolean; required?: boolean; pattern?: string; step?: string };
export function Field({ name, label, area, ...r }: P) {
  return (<div className="flex flex-col gap-2"><label htmlFor={name}>{label}</label>
    {area ? <textarea id={name} name={name} rows={8} className={box} {...r} /> : <input id={name} name={name} className={box} {...r} />}</div>);
}
export function RegionSelect({ value }: { value?: string }) {
  return (<div className="flex flex-col gap-2"><label htmlFor="region">المنطقة</label>
    <select id="region" name="region" defaultValue={value} className={box} required>{REGIONS.map((r) => <option key={r}>{r}</option>)}</select></div>);
}
