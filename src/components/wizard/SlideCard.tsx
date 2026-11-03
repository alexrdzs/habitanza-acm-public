import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { SectionChip } from './SectionChip';

interface SlideProps {
  chip: string;
  chipVariant?: 'brand' | 'neutral';
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

// One "slide" of the reveal: chip, big title, subtitle, then content (usually
// SlideBullets). Shared by every chapter so they read as one deck.
export function SlideCard({ chip, chipVariant, title, subtitle, children }: SlideProps) {
  return (
    <div className="space-y-6 rounded-card-lg border border-neutral-200/70 bg-parchment-card/80 p-6 text-left backdrop-blur-md md:space-y-8 md:p-10">
      <div className="space-y-3">
        <SectionChip label={chip} variant={chipVariant} />
        <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-neutral-900 md:text-4xl">{title}</h3>
        {subtitle && <p className="text-base leading-relaxed text-neutral-500 md:text-xl">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

export interface SlideBullet {
  icon: LucideIcon;
  title: string;
  detail: string;
  // Optional headline figure shown on the right (stat bullets).
  value?: string;
}

export function SlideBullets({ items }: { items: SlideBullet[] }) {
  return (
    <ul className="space-y-5 md:space-y-6">
      {items.map(({ icon: Icon, title, detail, value }) => (
        <li key={title} className="flex items-start gap-4">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-deep/10 text-emerald-deep md:h-14 md:w-14 md:rounded-2xl">
            <Icon className="h-5 w-5 md:h-7 md:w-7" strokeWidth={1.75} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-base font-bold text-neutral-900 md:text-xl">{title}</p>
            <p className="mt-0.5 text-sm leading-relaxed text-neutral-500 md:text-base">{detail}</p>
          </div>
          {value && (
            <p className="max-w-[45%] text-right text-xl font-extrabold tabular-nums text-neutral-900 md:text-3xl">{value}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
