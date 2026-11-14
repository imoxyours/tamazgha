"use client";
import { useEffect, useRef, useState } from "react";
export default function CultureImage({ src }: { src: string }) {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-line">
      {failed ? (
        <span className="absolute inset-0 flex items-center justify-center p-4 text-center text-base text-muted">ضع صورتك هنا</span>
      ) : (
        <img ref={ref} src={src} alt="" width={1200} height={900} loading="lazy" onError={() => setFailed(true)} className="h-full w-full object-cover" />
      )}
    </div>
  );
}