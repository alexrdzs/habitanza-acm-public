import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(value);
}

// "527298885497" or "55 3049 4822" -> "+52 729 888 5497"
export function formatPhone(raw: string) {
  const d = raw.replace(/\D/g, '');
  const n = d.length > 10 && d.startsWith('52') ? d.slice(2) : d;
  return `+52 ${n.slice(0, -7)} ${n.slice(-7, -4)} ${n.slice(-4)}`;
}
