import { neon } from "@neondatabase/serverless";
import seedPlaces from "@/data/places.json";
import seedArticles from "@/data/articles.json";
export type Article = { slug: string; title: string; region: string; excerpt: string; body: string };
export type Place = { id: string; name: string; region: string; desc: string; lat: number; lng: number; image: string };
export { REGIONS } from "./regions";
export type Contribution = { id: string; name: string; place: string; region: string; desc: string; image: string; status: string };
export const dbEnabled = !!process.env.DATABASE_URL;
const sql = dbEnabled ? neon(process.env.DATABASE_URL!) : null;
let ready: Promise<void> | null = null;
function init() {
  ready ??= (async () => {
    const q = sql!;
    await q`CREATE TABLE IF NOT EXISTS articles (slug text PRIMARY KEY, title text NOT NULL, region text NOT NULL, excerpt text NOT NULL, body text NOT NULL, created_at timestamptz DEFAULT now())`;
    await q`CREATE TABLE IF NOT EXISTS places (id text PRIMARY KEY, name text NOT NULL, region text NOT NULL, description text NOT NULL, lat double precision NOT NULL, lng double precision NOT NULL, image text NOT NULL, created_at timestamptz DEFAULT now())`;
    await q`CREATE TABLE IF NOT EXISTS contributions (id text PRIMARY KEY, name text NOT NULL DEFAULT '', place text NOT NULL, region text NOT NULL, description text NOT NULL, image text NOT NULL, status text NOT NULL DEFAULT 'pending', created_at timestamptz DEFAULT now())`;
    const [{ n }] = await q`SELECT count(*)::int AS n FROM articles`;
    if (n === 0) for (const a of seedArticles) await q`INSERT INTO articles (slug,title,region,excerpt,body) VALUES (${a.slug},${a.title},${a.region},${a.excerpt},${a.body}) ON CONFLICT DO NOTHING`;
    const [{ m }] = await q`SELECT count(*)::int AS m FROM places`;
    if (m === 0) for (const p of seedPlaces) await q`INSERT INTO places (id,name,region,description,lat,lng,image) VALUES (${p.id},${p.name},${p.region},${p.desc},${p.lat},${p.lng},${p.image}) ON CONFLICT DO NOTHING`;
  })();
  return ready;
}
export async function getArticles(): Promise<Article[]> {
  if (!sql) return seedArticles as Article[];
  await init(); return (await sql`SELECT slug,title,region,excerpt,body FROM articles ORDER BY created_at, slug`) as Article[];
}
export async function getArticle(slug: string) { return (await getArticles()).find((a) => a.slug === slug) ?? null; }
export async function getPlaces(): Promise<Place[]> {
  if (!sql) return seedPlaces as Place[];
  await init(); return (await sql`SELECT id,name,region,description AS "desc",lat,lng,image FROM places ORDER BY created_at, id`) as Place[];
}
export async function getPlace(id: string) { return (await getPlaces()).find((p) => p.id === id) ?? null; }
export async function saveArticle(a: Article) {
  await init(); await sql!`INSERT INTO articles (slug,title,region,excerpt,body) VALUES (${a.slug},${a.title},${a.region},${a.excerpt},${a.body}) ON CONFLICT (slug) DO UPDATE SET title=${a.title},region=${a.region},excerpt=${a.excerpt},body=${a.body}`;
}
export async function deleteArticle(slug: string) { await init(); await sql!`DELETE FROM articles WHERE slug=${slug}`; }
export async function savePlace(p: Place) {
  await init(); await sql!`INSERT INTO places (id,name,region,description,lat,lng,image) VALUES (${p.id},${p.name},${p.region},${p.desc},${p.lat},${p.lng},${p.image}) ON CONFLICT (id) DO UPDATE SET name=${p.name},region=${p.region},description=${p.desc},lat=${p.lat},lng=${p.lng},image=${p.image}`;
}
export async function deletePlace(id: string) { await init(); await sql!`DELETE FROM places WHERE id=${id}`; }
export async function addContribution(c: Omit<Contribution, "status">) {
  await init(); await sql!`INSERT INTO contributions (id,name,place,region,description,image) VALUES (${c.id},${c.name},${c.place},${c.region},${c.desc},${c.image})`;
}
export async function getContributions(status: "pending" | "approved"): Promise<Contribution[]> {
  if (!sql) return [];
  await init(); return (await sql`SELECT id,name,place,region,description AS "desc",image,status FROM contributions WHERE status=${status} ORDER BY created_at DESC`) as Contribution[];
}
export async function approveContribution(id: string) { await init(); await sql!`UPDATE contributions SET status='approved' WHERE id=${id}`; }
export async function removeContribution(id: string) {
  await init(); const r = await sql!`DELETE FROM contributions WHERE id=${id} RETURNING image`; return (r[0]?.image as string) ?? "";
}
