import { cookies } from "next/headers";
import Link from "next/link";
import { isAdmin } from "@/lib/auth";
import { getArticles, getPlaces, getContributions, dbEnabled, type Contribution } from "@/lib/content";
import { approveContributionAction, rejectContributionAction, deleteArticleAction, deletePlaceAction, logout } from "./actions";
import LoginForm from "./LoginForm";
import { t } from "@/lib/utils";
export const metadata = { title: "Admin", robots: { index: false, follow: false } };
const wrap = "mx-auto max-w-[1200px] px-4 py-16";
function Row({ title, sub, edit, del }: { title: string; sub: string; edit: string; del: () => Promise<void> }) {
  return (<li className="card flex flex-wrap items-center justify-between gap-4 p-4"><div><p className="text-base">{title}</p><p className="text-sm text-muted">{sub}</p></div>
    <div className="flex items-center gap-4"><Link href={edit} className="text-primary underline">تعديل</Link>
      <details><summary className="cursor-pointer text-sm">مسح</summary><form action={del}><button className="btn mt-2" style={{ background: "#9B2C1F", color: "#FAF5EA" }}>تأكيد المسح</button></form></details></div></li>);
}
function Contrib({ c, pending }: { c: Contribution; pending: boolean }) {
  return (<li className="card flex flex-wrap gap-4 p-4"><img src={c.image} alt={c.place} width={160} height={120} className="h-[120px] w-[160px] rounded-lg object-cover" />
    <div className="flex-1"><p className="text-base">{c.place} · {c.region}</p><p className="text-sm text-muted">{c.name || "—"}</p><p className="text-sm">{c.desc}</p></div>
    <div className="flex items-start gap-2">{pending && <form action={approveContributionAction.bind(null, c.id)}><button className="btn btn-primary">قبول</button></form>}
      <form action={rejectContributionAction.bind(null, c.id)}><button className="btn" style={{ background: "#9B2C1F", color: "#FAF5EA" }}>{pending ? "رفض" : "مسح"}</button></form></div></li>);
}
export default async function Admin({ searchParams }: { searchParams: Promise<{ err?: string }> }) {
  const ok = isAdmin((await cookies()).get("admin")?.value);
  const { err } = await searchParams;
  if (!ok) return (<div className={wrap}><h1 className="mb-8 text-[40px]">{t("admin_title")}</h1><LoginForm /></div>);
  const [articles, places, pending, approved] = await Promise.all([getArticles(), getPlaces(), getContributions("pending"), getContributions("approved")]);
  return (
    <div className={wrap}>
      <div className="mb-8 flex items-center justify-between"><h1 className="text-[40px]">{t("admin_title")}</h1><form action={logout}><button className="btn">{t("logout")}</button></form></div>
      {(!dbEnabled || err === "db") && <p role="alert" className="card mb-8 p-4">قاعدة البيانات ما مربوطاش (DATABASE_URL). الإضافة والتعديل والمسح موقوفين.</p>}
      <section className="mb-12"><div className="mb-4 flex items-center justify-between"><h2 className="text-2xl">المقالات ({articles.length})</h2><Link href="/admin/articles/new" className="btn btn-primary">مقال جديد</Link></div>
        <ul className="flex flex-col gap-4">{articles.map((a) => <Row key={a.slug} title={a.title} sub={a.region} edit={`/admin/articles/${a.slug}`} del={deleteArticleAction.bind(null, a.slug)} />)}</ul></section>
      <section><div className="mb-4 flex items-center justify-between"><h2 className="text-2xl">الأماكن ({places.length})</h2><Link href="/admin/places/new" className="btn btn-primary">مكان جديد</Link></div>
        <ul className="flex flex-col gap-4">{places.map((p) => <Row key={p.id} title={p.name} sub={p.region} edit={`/admin/places/${p.id}`} del={deletePlaceAction.bind(null, p.id)} />)}</ul></section>
      <section className="mt-12"><h2 className="mb-4 text-2xl">مساهمات معلقة ({pending.length})</h2>
        <ul className="flex flex-col gap-4">{pending.map((c) => <Contrib key={c.id} c={c} pending />)}</ul></section>
      <section className="mt-12"><h2 className="mb-4 text-2xl">مساهمات مقبولة ({approved.length})</h2>
        <ul className="flex flex-col gap-4">{approved.map((c) => <Contrib key={c.id} c={c} pending={false} />)}</ul></section>
    </div>
  );
}
