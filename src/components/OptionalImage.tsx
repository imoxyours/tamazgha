"use client";
import { useEffect, useRef, useState } from "react";
export default function OptionalImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLImageElement>(null);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setHidden(true);
  }, []);
  if (hidden) return null;
  return <img ref={ref} src={src} alt={alt} width={800} height={600} loading="lazy" onError={() => setHidden(true)} className={className} />;
}