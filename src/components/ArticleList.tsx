"use client";
import { useState } from "react";
import SearchBar from "./SearchBar";
import ArticleCard, { Article } from "./ArticleCard";
export default function ArticleList({ items }: { items: Article[] }) {
  const [q, setQ] = useState("");
  const list = items.filter((a) => (a.title + a.excerpt).includes(q.trim()));
  return (<div><SearchBar value={q} onChange={setQ} /><ul className="grid gap-6 sm:grid-cols-2">{list.map((a) => <ArticleCard key={a.slug} a={a} />)}</ul></div>);
}
