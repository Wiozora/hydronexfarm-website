import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function SectionBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary-dark)]",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)] shadow-[0_0_10px_rgba(242,169,59,0.75)]"></span>
      {children}
    </span>
  );
}
