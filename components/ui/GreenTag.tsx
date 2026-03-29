import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function GreenTag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("tag-green inline-flex items-center gap-1", className)}>
      <span className="w-1.5 h-1.5 rounded-full bg-[#22FF88] shadow-[0_0_5px_#22FF88]"></span>
      {children}
    </span>
  );
}
