"use client";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Place } from "./PlaceCard";
import { t, imgSrc, regionLabel, type Locale } from "@/lib/utils";
import { useLocale } from "./LocaleProvider";
function popup(p: Place, l: Locale) {
  const el = document.createElement("div");
  el.dir = l === "ar" ? "rtl" : "ltr"; el.style.width = "200px";
  const frame = document.createElement("div");
  frame.style.cssText = "position:relative;width:100%;aspect-ratio:4/3;border-radius:8px;overflow:hidden;background:#DCCFB5";
  const img = Object.assign(document.createElement("img"), { src: imgSrc(p.image), alt: p.name, loading: "lazy", width: 800, height: 600 });
  img.style.cssText = "display:block;width:100%;height:100%;object-fit:cover";
  img.onerror = () => {
    img.remove();
    const m = document.createElement("span");
    m.textContent = "ضع صورتك هنا";
    m.style.cssText = "position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:8px;text-align:center;font-size:14px;color:#6B5B47";
    frame.append(m);
  };
  frame.append(img);
  const h = Object.assign(document.createElement("strong"), { textContent: p.name }); h.style.cssText = "display:block;margin-top:8px;font-size:16px";
  const r = Object.assign(document.createElement("span"), { textContent: regionLabel(p.region, l) }); r.style.cssText = "display:block;font-size:14px";
  const a = Object.assign(document.createElement("a"), { href: `${l === "ar" ? "" : "/" + l}/places/${p.id}`, textContent: t("details", l) }); a.style.cssText = "display:inline-block;margin-top:8px;font-size:14px;text-decoration:underline";
  el.append(frame, h, r, a);
  return el;
}
export default function MoroccoMap({ places }: { places: Place[] }) {
  const l = useLocale();
  const box = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const layer = useRef<L.LayerGroup | null>(null);
  useEffect(() => {
    if (!box.current || map.current) return;
    map.current = L.map(box.current, { scrollWheelZoom: false }).setView([31.8, -6.5], 5);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, attribution: "© OpenStreetMap" }).addTo(map.current);
    layer.current = L.layerGroup().addTo(map.current);
    return () => { map.current?.remove(); map.current = null; };
  }, []);
  useEffect(() => {
    if (!map.current || !layer.current) return;
    layer.current.clearLayers();
    const icon = L.divIcon({ html: '<span class="pin"></span>', className: "", iconSize: [20, 20] });
    places.forEach((p) => L.marker([p.lat, p.lng], { icon, title: p.name }).bindPopup(popup(p, l)).addTo(layer.current!));
    if (places.length) map.current.fitBounds(L.latLngBounds(places.map((p) => [p.lat, p.lng] as [number, number])), { padding: [48, 48], maxZoom: 9 });
  }, [places, l]);
  return <div ref={box} role="region" aria-label={t("map_label", l)} className="card mb-8 h-[420px] w-full overflow-hidden" />;
}