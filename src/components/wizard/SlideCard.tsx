import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { SectionChip } from './SectionChip';
import { cn } from '../../lib/utils';

interface SlideProps {
  chip: string;
  chipVariant?: 'brand' | 'neutral';
  title: string;
  subtitle?: string;
  // Smaller type and padding, for cards that share a row (2-column grid).
  compact?: boolean;
  children?: ReactNode;
}

// One "slide" of the reveal: chip, big title, subtitle, then content (usually
// SlideBullets). Shared by every chapter so they read as one deck.
export function SlideCard({ chip, chipVariant, title, subtitle, compact = false, children }: SlideProps) {
  return (
    <div
      className={cn(
        'space-y-6 rounded-card-lg border border-neutral-200/70 bg-parchment-card/80 p-6 text-left backdrop-blur-md md:space-y-8 md:p-10',
        compact && 'space-y-4 p-5 md:space-y-5 md:p-6'
      )}
    >
      <div className="space-y-3">
        <SectionChip label={chip} variant={chipVariant} />
        <h3
          className={cn(
            'text-2xl font-extrabold leading-tight tracking-tight text-neutral-900 md:text-4xl',
            compact && 'text-xl md:text-2xl'
          )}
        >
          {title}
        </h3>
        {subtitle && (
          <p className={cn('text-base leading-relaxed text-neutral-500 md:text-xl', compact && 'text-sm md:text-base')}>
            {subtitle}
          </p>
        )}
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

export function SlideBullets({ items, compact = false }: { items: SlideBullet[]; compact?: boolean }) {
  return (
    <ul className={cn('space-y-5 md:space-y-6', compact && 'space-y-4 md:space-y-4')}>
      {items.map(({ icon: Icon, title, detail, value }) => (
        <li key={title} className={cn('flex items-start gap-4', compact && 'gap-3')}>
          <div
            className={cn(
              'flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-deep/10 text-emerald-deep md:h-14 md:w-14 md:rounded-2xl',
              compact && 'h-10 w-10 md:h-10 md:w-10 md:rounded-xl'
            )}
          >
            <Icon className={cn('h-5 w-5 md:h-7 md:w-7', compact && 'h-5 w-5 md:h-5 md:w-5')} strokeWidth={1.75} />
          </div>
          <div className="min-w-0 flex-1">
            <p className={cn('text-base font-bold text-neutral-900 md:text-xl', compact && 'text-sm md:text-base')}>{title}</p>
            <p className={cn('mt-0.5 text-sm leading-relaxed text-neutral-500 md:text-base', compact && 'text-xs md:text-sm')}>{detail}</p>
          </div>
          {value && (
            <p
              className={cn(
                'max-w-[45%] text-right text-xl font-extrabold tabular-nums text-neutral-900 md:text-3xl',
                compact && 'text-lg md:text-xl'
              )}
            >
              {value}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
