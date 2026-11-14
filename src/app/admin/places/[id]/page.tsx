import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { getPlace } from "@/lib/content";
import { savePlaceAction } from "../../actions";
import { Field, RegionSelect, box } from "../../Field";
export const metadata = { title: "Admin", robots: { index: false, follow: false } };
export default async function EditPlace({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ err?: string }> }) {
  if (!isAdmin((await cookies()).get("admin")?.value)) redirect("/admin");
  const { id } = await params, { err } = await searchParams;
  const p = id === "new" ? null : await getPlace(id);
  if (id !== "new" && !p) notFound();
  return (
    <div className="mx-auto max-w-[720px] px-4 py-16">
      <h1 className="mb-8 text-[40px]">{p ? "تعديل مكان" : "مكان جديد"}</h1>
      {err && <p role="alert" className="mb-4" style={{ color: "#9B2C1F" }}>{err === "img" ? "التصويرة: webp/jpg/png، أقل من 200KB، ويلزم BLOB_READ_WRITE_TOKEN." : "عمر كل الخانات بشكل صحيح."}</p>}
      <form action={savePlaceAction} className="flex flex-col gap-4">
        <input type="hidden" name="currentImage" value={p?.image ?? ""} />
        <Field name="id" label="الرابط (حروف لاتينية صغيرة، أرقام و -)" defaultValue={p?.id} readOnly={!!p} required pattern="[a-z0-9\-]{2,60}" />
        <Field name="name" label="الاسم" defaultValue={p?.name} required />
        <RegionSelect value={p?.region} />
        <Field name="desc" label="الوصف" defaultValue={p?.desc} area required />
        <div className="grid grid-cols-2 gap-4">
          <Field name="lat" label="Latitude (خط العرض)" type="number" step="any" defaultValue={p?.lat} required />
          <Field name="lng" label="Longitude (خط الطول)" type="number" step="any" defaultValue={p?.lng} required />
        </div>
        <div className="flex flex-col gap-2"><label htmlFor="image">التصويرة</label><input id="image" name="image" type="file" accept="image/webp,image/jpeg,image/png" className={box} /></div>
        <button className="btn btn-primary self-start">حفظ</button>
      </form>
    </div>
  );
}
