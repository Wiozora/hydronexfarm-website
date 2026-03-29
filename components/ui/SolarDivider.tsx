import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function SolarDivider({ className }: { className?: string }) {
  return (
    <div className={cn("solar-divider w-full max-w-sm mx-auto", className)} />
  );
}
