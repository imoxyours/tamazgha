"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger);
const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export default function Motion() {
  const path = usePathname();
  useEffect(() => {
    if (reduced()) return;
    const lenis = new Lenis({ duration: 1 }); // touch scrolling stays native
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);
  useEffect(() => {
    if (reduced()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-hero]", { y: 24, opacity: 0, duration: 0.6, ease: "power3.out", stagger: 0.06, clearProps: "transform,opacity" });
      ScrollTrigger.batch("[data-reveal]", { start: "top 90%", once: true,
        onEnter: (els) => gsap.from(els, { y: 12, opacity: 0, duration: 0.3, ease: "power3.out", stagger: 0.05, overwrite: true, clearProps: "transform,opacity" }) });
    });
    return () => ctx.revert();
  }, [path]);
  return null;
}