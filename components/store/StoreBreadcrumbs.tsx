import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function StoreBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-white/70">
      {items.map((item, index) => (
        <div key={`${item.label}-${index}`} className="flex items-center gap-2">
          {item.href ? (
            <Link href={item.href} className="transition hover:text-[#86f556]">
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-white">{item.label}</span>
          )}
          {index < items.length - 1 ? <FaChevronRight className="text-[0.65rem]" /> : null}
        </div>
      ))}
    </nav>
  );
}
