"use client";
import { usePathname } from "next/navigation";
import Link from "./LocLink";
export type NavItem = { href: string; label: string };
export default function NavLinks({ items, className, onNavigate }: { items: NavItem[]; className?: string; onNavigate?: () => void }) {
  const pathname = usePathname();
  const path = pathname.replace(/^\/(fr|en)(?=\/|$)/, "") || "/";
  return (
    <ul className={className}>
      {items.map(({ href, label }) => {
        const active = href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`);
        return (
          <li key={href}>
            <Link
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`inline-flex min-h-11 items-center rounded-xl px-2 text-base transition-colors duration-150 ease-out ${
                active ? "font-semibold text-[#E3B04B] underline underline-offset-8" : "text-[#EFE6D4] hover:text-[#E3B04B]"
              }`}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}