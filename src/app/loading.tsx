export default function Loading() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-16" role="status" aria-busy="true">
      <div className="mb-4 h-10 w-2/3 max-w-[480px] rounded-xl bg-line" />
      <div className="mb-16 h-6 w-full max-w-[600px] rounded-xl bg-line" />
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <li key={i} className="card overflow-hidden">
            <div className="aspect-[4/3] w-full bg-line" />
            <div className="p-6">
              <div className="mb-4 h-6 w-1/2 rounded-xl bg-line" />
              <div className="mb-2 h-4 w-full rounded-xl bg-line" />
              <div className="h-4 w-3/4 rounded-xl bg-line" />
            </div>
          </li>
        ))}
      </ul>
      <span className="sr-only">جارٍ التحميل</span>
    </div>
  );
}