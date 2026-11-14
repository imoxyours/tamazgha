"use client";
import { useEffect, useRef, useState } from "react";
const FALLBACK = "/assets/atlas.webp";
export default function HeroBackground() {
  const [src, setSrc] = useState("/assets/hero.webp");
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setSrc(FALLBACK);
  }, []);
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <img ref={ref} src={src} alt="" width={1920} height={1080} fetchPriority="high" onError={() => setSrc(FALLBACK)}
        className="h-full w-full object-cover" style={{ filter: "blur(3px)", transform: "scale(1.05)" }} />
      <div className="absolute inset-0" style={{ background: "rgba(33, 26, 18, 0.55)" }} />
    </div>
  );
}