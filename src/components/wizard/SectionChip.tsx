// The chaptered section header from the full ACM report ("02 Análisis de
// Mercado" pill + hairline rule). Using the identical pattern here makes the
// wizard's reveal screen read as a preview of the real document. `brand` is
// for the numbered mini-ACM chapters; `neutral` is for supporting sections
// (metodología, testimonios) that aren't part of the numbered sequence,
// mirroring how the report renders its own non-accent chip.
interface Props {
  label: string;
  variant?: 'brand' | 'neutral';
  center?: boolean;
}

export function SectionChip({ label, variant = 'brand', center = false }: Props) {
  const chipClass =
    variant === 'brand'
      ? 'bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400'
      : 'bg-neutral-100 text-neutral-500';

  return (
    <div className={`flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
      <span
        className={`whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${chipClass}`}
      >
        {label}
      </span>
      {!center && <div className="h-px flex-1 bg-neutral-200" />}
    </div>
  );
}
