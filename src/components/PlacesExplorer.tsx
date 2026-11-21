"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import PlaceCard, { Place } from "./PlaceCard";
import SearchBar from "./SearchBar";
import RegionFilter from "./RegionFilter";
import EmptyState from "./EmptyState";
const MoroccoMap = dynamic(() => import("./MoroccoMap"), { ssr: false, loading: () => <div className="card mb-8 h-[420px]" /> });
export default function PlacesExplorer({ places }: { places: Place[] }) {
  const [region, setRegion] = useState("");
  const [q, setQ] = useState("");
  const list = places.filter((p) => (!region || p.region === region) && (p.name + p.desc).includes(q.trim()));
  const reset = () => { setRegion(""); setQ(""); };
  return (
    <div>
      <SearchBar value={q} onChange={setQ} />
      <RegionFilter value={region} onChange={setRegion} />
      <MoroccoMap places={list} />
      {list.length === 0 ? (
        <EmptyState onReset={reset} />
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <PlaceCard key={p.id} p={p} />)}</ul>
      )}
    </div>
  );
}