"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLocale } from "./LocaleProvider";
import { regionLabel, t } from "@/lib/utils";
export type GalleryItem = {
  id: string; src: string; alt?: string; title: string; place: string;
  region?: string; photographer?: string; optional: boolean;
};
const ORDER = ["", "الأطلس", "سوس", "الجنوب الشرقي", "الريف"];
const TXT = {
  ar: { close: "إغلاق", prev: "الصورة السابقة", next: "الصورة التالية", by: "تصوير", open: "عرض بحجم كبير", dialog: "عارض الصور", filter: "المنطقة", brand: "تامزغا" },
  fr: { close: "Fermer", prev: "Photo précédente", next: "Photo suivante", by: "Photo", open: "Agrandir", dialog: "Visionneuse de photos", filter: "Région", brand: "Tamazgha" },
  en: { close: "Close", prev: "Previous photo", next: "Next photo", by: "Photo by", open: "View larger", dialog: "Photo viewer", filter: "Region", brand: "Tamazgha" },
} as const;
function Tile({ item, label, onOpen, onFail }: { item: GalleryItem; label: string; onOpen: (id: string) => void; onFail: (id: string) => void }) {
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) onFail(item.id);
  }, [item.id, onFail]);
  return (
    <button type="button" onClick={() => onOpen(item.id)} aria-label={`${label}: ${item.title}`} className="group block w-full text-start">
      <span className="photo-frame block rounded-xl">
        <img ref={ref} src={item.src} alt={item.alt ?? item.title} width={1200} height={900} loading="lazy"
          onError={() => onFail(item.id)} className="transition-transform duration-200 group-hover:scale-[1.03]" />
      </span>
      <span dir="auto" className="mt-2 block text-sm text-muted">{item.title}</span>
    </button>
  );
}
export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const l = useLocale();
  const tx = TXT[l];
  const rtl = l === "ar";
  const dlg = useRef<HTMLDialogElement>(null);
  const [region, setRegion] = useState("");
  const [failed, setFailed] = useState<Record<string, true>>({});
  const [openId, setOpenId] = useState<string | null>(null);
  const fail = useCallback((id: string) => setFailed((s) => (s[id] ? s : { ...s, [id]: true })), []);

  const filtered = items.filter((i) => !region || i.region === region);
  const shown = filtered.filter((i) => !(i.optional && failed[i.id]));
  const nav = shown.filter((i) => !failed[i.id]);
  const current = openId ? items.find((i) => i.id === openId) ?? null : null;
  const idx = current ? nav.findIndex((i) => i.id === current.id) : -1;

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (openId && !d.open) d.showModal();
    if (!openId && d.open) d.close();
  }, [openId]);
  useEffect(() => {
    if (!openId) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [openId]);

  function go(delta: number) {
    if (nav.length < 2 || idx < 0) return;
    setOpenId(nav[(idx + delta + nav.length) % nav.length].id);
  }
  function onKey(e: React.KeyboardEvent<HTMLDialogElement>) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const forward = rtl ? e.key === "ArrowLeft" : e.key === "ArrowRight";
    go(forward ? 1 : -1);
  }
  const PrevIcon = rtl ? ChevronRight : ChevronLeft;
  const NextIcon = rtl ? ChevronLeft : ChevronRight;
  const arrow = "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#BDB296] bg-[#2E2418]/80 text-[#FAF5EA] disabled:opacity-40";

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label={tx.filter}>
        {ORDER.map((r) => (
          <button key={r || "all"} type="button" onClick={() => setRegion(r)} aria-pressed={r === region}
            className={`rounded-full border border-line px-4 py-2 text-sm ${r === region ? "bg-primary text-primary-ink" : "bg-surface"}`}>
            {r ? regionLabel(r, l) : t("r_all", l)}
          </button>
        ))}
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((item) => (
          <li key={item.id}>
            {failed[item.id] ? (
              <div>
                <div className="photo-frame rounded-xl"><span className="photo-missing">ضع صورتك هنا</span></div>
                <p dir="auto" className="mt-2 text-sm text-muted">{item.title}</p>
              </div>
            ) : (
              <Tile item={item} label={tx.open} onOpen={setOpenId} onFail={fail} />
            )}
          </li>
        ))}
      </ul>

      <dialog
        ref={dlg}
        aria-label={tx.dialog}
        data-lenis-prevent
        onClose={() => setOpenId(null)}
        onKeyDown={onKey}
        onClick={(e) => { if (e.target === e.currentTarget) setOpenId(null); }}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-[#FAF5EA] backdrop:bg-[#211A12]/90"
      >
        {current && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setOpenId(null); }}>
            <div className="flex w-full max-w-[1100px] items-center justify-between">
              <p className="text-sm text-[#EFE6D4]" aria-live="polite">{idx >= 0 ? `${idx + 1} / ${nav.length}` : ""}</p>
              <button type="button" onClick={() => setOpenId(null)} aria-label={tx.close}
                className="inline-flex items-center gap-2 rounded-xl border border-[#BDB296] px-4 py-2 text-base text-[#FAF5EA]">
                <X size={20} aria-hidden /> {tx.close}
              </button>
            </div>
            <div className="flex w-full max-w-[1100px] items-center gap-2 sm:gap-4"
              onClick={(e) => { if (e.target === e.currentTarget) setOpenId(null); }}>
              <button type="button" onClick={() => go(-1)} disabled={nav.length < 2} aria-label={tx.prev} className={arrow}><PrevIcon size={24} aria-hidden /></button>
              <figure className="min-w-0 flex-1 text-center">
                <img src={current.src} alt={current.alt ?? current.title} width={1200} height={900} loading="lazy" decoding="async"
                  onError={() => { fail(current.id); setOpenId(null); }}
                  className="mx-auto h-auto max-h-[65vh] w-auto max-w-full rounded-xl object-contain" />
                <figcaption className="mt-3">
                  <p dir="auto" className="text-xl">{current.title}</p>
                  <p dir="auto" className="text-base text-[#EBCB9B]">{current.place}{current.region ? ` · ${regionLabel(current.region, l)}` : ""}</p>
                  <p dir="auto" className="text-sm text-[#BDB296]">{tx.by}: {current.photographer ?? tx.brand}</p>
                </figcaption>
              </figure>
              <button type="button" onClick={() => go(1)} disabled={nav.length < 2} aria-label={tx.next} className={arrow}><NextIcon size={24} aria-hidden /></button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}