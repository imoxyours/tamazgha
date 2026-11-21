"use client";
import { useRef } from "react";
import { MapPin, X } from "lucide-react";
export default function PlaceMapDialog({ name, region, description }: { name: string; region: string; description: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = () => {
    document.body.style.overflow = "hidden";
    ref.current?.showModal();
  };
  const close = () => ref.current?.close();
  return (
    <>
      <button type="button" onClick={open} aria-haspopup="dialog" className="btn-gold">
        <MapPin size={20} aria-hidden /> عرض على الخريطة
      </button>
      <dialog
        ref={ref}
        aria-labelledby="place-dialog-title"
        data-lenis-prevent
        onClose={() => { document.body.style.overflow = ""; }}
        onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        className="m-auto w-[min(92vw,480px)] rounded-xl border border-line bg-surface p-0 text-ink backdrop:bg-[#211A12]/70"
      >
        <div className="p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="mb-1 text-base text-clay">{region}</p>
              <h2 id="place-dialog-title" className="text-2xl">{name}</h2>
            </div>
            <button type="button" onClick={close} aria-label="إغلاق النافذة" className="btn-outline shrink-0">
              <X size={20} aria-hidden /> إغلاق
            </button>
          </div>
          <p className="text-lg">{description}</p>
        </div>
      </dialog>
    </>
  );
}