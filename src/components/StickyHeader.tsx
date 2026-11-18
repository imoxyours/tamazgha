"use client";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
export default function StickyHeader({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`sticky top-0 z-40 border-b border-[#43372A] transition-colors duration-200 ${scrolled ? "bg-[#2E2418]/80 backdrop-blur-md" : "bg-[#2E2418]"}`}>
      {children}
    </header>
  );
}