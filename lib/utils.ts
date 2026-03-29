import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPkr(value: number) {
  return `Rs. ${new Intl.NumberFormat("en-IN").format(value)}`;
}
