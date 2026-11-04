import { cn } from '../../lib/utils';

interface Props {
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

// Pill-group toggle. The active option is a single green pill (soft top-to-
// bottom gradient) that slides from one option to the next. Options share the
// width equally, so the pill is positioned with plain percentages, no measuring.
export function SegmentedControl({ options, value, onChange, className }: Props) {
  const index = options.indexOf(value);
  return (
    <div className={cn('rounded-full bg-neutral-100 p-1', className)}>
      <div className="relative grid" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-y-0 left-0 rounded-full bg-gradient-to-b from-brand-400 to-brand-500 shadow-[0_2px_8px_-2px_rgba(22,163,74,0.55),inset_0_1px_0_rgba(255,255,255,0.35)] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
            index < 0 && 'opacity-0'
          )}
          style={{ width: `${100 / options.length}%`, transform: `translateX(${Math.max(index, 0) * 100}%)` }}
        />
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            aria-pressed={value === opt}
            onClick={() => onChange(opt)}
            className={cn(
              'relative z-10 min-h-12 rounded-full px-4 py-3 text-base font-semibold transition-colors duration-300 md:min-h-14 md:text-lg',
              value === opt ? 'text-white' : 'text-neutral-500 hover:text-neutral-700'
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
