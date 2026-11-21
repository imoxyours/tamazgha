import Link from "./LocLink";
export default function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-base text-muted">
      <ol className="flex flex-wrap items-center gap-x-2">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {it.href ? (
              <Link href={it.href} className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-primary">{it.label}</Link>
            ) : (
              <span aria-current="page" className="text-ink">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}