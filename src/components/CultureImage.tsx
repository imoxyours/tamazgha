"use client";
import { useEffect, useRef, useState } from "react";
export default function CultureImage({ src, alt = "" }: { src: string; alt?: string }) {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !el.complete) return;
    if (el.naturalWidth === 0) setFailed(true);
    else setLoaded(true);
  }, []);
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-line">
      {failed ? (
        <span className="absolute inset-0 flex items-center justify-center p-4 text-center text-base text-muted">ضع صورتك هنا</span>
      ) : (
        <img
          ref={ref}
          src={src}
          alt={alt}
          width={1200}
          height={900}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover transition-opacity duration-300 ease-out ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}