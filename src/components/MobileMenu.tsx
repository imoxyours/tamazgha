"use client";
import { useRef } from "react";
import { Menu, X } from "lucide-react";
import NavLinks, { type NavItem } from "./NavLinks";
export default function MobileMenu({ items, openLabel, closeLabel }: { items: NavItem[]; openLabel: string; closeLabel: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = () => {
    document.body.style.overflow = "hidden";
    ref.current?.showModal();
  };
  const close = () => ref.current?.close();
  return (
    <>
      <button type="button" onClick={open} aria-haspopup="dialog" aria-label={openLabel} className="btn-outline btn-icon md:hidden">
        <Menu size={24} aria-hidden />
      </button>
      <dialog
        ref={ref}
        aria-label={openLabel}
        data-lenis-prevent
        onClose={() => { document.body.style.overflow = ""; }}
        onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-[#EFE6D4] backdrop:bg-[#211A12]/80"
      >
        <div className="ms-auto flex h-full w-[min(86vw,360px)] flex-col gap-6 bg-[#2E2418] p-6">
          <div className="flex justify-end">
            <button type="button" onClick={close} aria-label={closeLabel} className="btn-outline btn-icon">
              <X size={24} aria-hidden />
            </button>
          </div>
          <nav aria-label={openLabel}>
            <NavLinks items={items} onNavigate={close} className="flex flex-col gap-2" />
          </nav>
        </div>
      </dialog>
    </>
  );
}