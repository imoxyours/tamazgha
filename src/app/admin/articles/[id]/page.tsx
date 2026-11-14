import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { getArticle } from "@/lib/content";
import { saveArticleAction } from "../../actions";
import { Field, RegionSelect } from "../../Field";
export const metadata = { title: "Admin", robots: { index: false, follow: false } };
export default async function EditArticle({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ err?: string }> }) {
  if (!isAdmin((await cookies()).get("admin")?.value)) redirect("/admin");
  const { id } = await params, { err } = await searchParams;
  const a = id === "new" ? null : await getArticle(id);
  if (id !== "new" && !a) notFound();
  return (
    <div className="mx-auto max-w-[720px] px-4 py-16">
      <h1 className="mb-8 text-[40px]">{a ? "تعديل مقال" : "مقال جديد"}</h1>
      {err && <p role="alert" className="mb-4" style={{ color: "#9B2C1F" }}>عمر كل الخانات بشكل صحيح.</p>}
      <form action={saveArticleAction} className="flex flex-col gap-4">
        <Field name="slug" label="الرابط (حروف لاتينية صغيرة، أرقام و -)" defaultValue={a?.slug} readOnly={!!a} required pattern="[a-z0-9\-]{2,60}" />
        <Field name="title" label="العنوان" defaultValue={a?.title} required />
        <RegionSelect value={a?.region} />
        <Field name="excerpt" label="ملخص قصير" defaultValue={a?.excerpt} required />
        <Field name="body" label="النص" defaultValue={a?.body} area required />
        <button className="btn btn-primary self-start">حفظ</button>
      </form>
    </div>
  );
}
