import { cn } from '../../lib/utils';

const WHOLE_OPTIONS = ['1', '2', '3', '4', '5+'];

interface Props {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

// Baños behave like a half-step scale: pick a whole number, then optionally
// add a "medio baño" (½) to land on 1.5, 2.5, 3.5... — the way Mexican
// listings actually count a baño completo plus a medio baño. We deliberately
// keep the same minimal pill language as the recámaras SegmentedControl right
// above it (same track, same active treatment), so nothing new enters the page
// visually; the ½ is just one more stop on the scale, split off by a hairline
// so it reads as a modifier of the chosen number rather than a rival option.
//
// The combined value is stored in the same `banos` string the rest of the flow
// already uses: '', '1'..'4', '2.5', '5+'. "5+" ("5 o más") has no half step.
export function BanosScale({ value, onChange, className }: Props) {
  const isMax = value === '5+';
  const base = isMax ? '5+' : value ? String(Math.floor(Number(value))) : '';
  const half = !isMax && value.endsWith('.5');
  const halfAvailable = base !== '' && !isMax;

  const pillClass = (active: boolean) =>
    cn(
      'flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition-all',
      active
        ? 'bg-white text-brand-600 shadow-sm ring-1 ring-neutral-200 dark:bg-white/10 dark:text-brand-400'
        : 'text-neutral-500 hover:text-neutral-700'
    );

  function selectWhole(opt: string) {
    // "5+" is open-ended, so a half step doesn't apply — drop it.
    if (opt === '5+') {
      onChange('5+');
      return;
    }
    onChange(half ? `${opt}.5` : opt);
  }

  function toggleHalf() {
    if (!halfAvailable) return;
    onChange(half ? base : `${base}.5`);
  }

  return (
    <div className={cn('flex w-full items-stretch gap-1 rounded-xl bg-neutral-100 p-1', className)}>
      <div className="flex flex-1 gap-1">
        {WHOLE_OPTIONS.map((opt) => (
          <button key={opt} type="button" onClick={() => selectWhole(opt)} className={pillClass(opt === base)}>
            {opt}
          </button>
        ))}
      </div>
      <div className="my-1 w-px self-stretch bg-neutral-200" aria-hidden="true" />
      <button
        type="button"
        onClick={toggleHalf}
        disabled={!halfAvailable}
        aria-pressed={half}
        aria-label="Agregar medio baño"
        className={cn(
          'w-11 shrink-0 rounded-lg text-sm font-semibold transition-all',
          !halfAvailable
            ? 'cursor-not-allowed text-neutral-300'
            : half
              ? 'bg-white text-brand-600 shadow-sm ring-1 ring-neutral-200 dark:bg-white/10 dark:text-brand-400'
              : 'text-neutral-500 hover:text-neutral-700'
        )}
      >
        ½
      </button>
    </div>
  );
}
