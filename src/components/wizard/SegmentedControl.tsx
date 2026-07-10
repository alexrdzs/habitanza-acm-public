import { cn } from '../../lib/utils';

interface Props {
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

// Contained pill-group toggle — same pattern the authenticated ACM tool
// uses for its Venta/Renta operation-type switch.
export function SegmentedControl({ options, value, onChange, className }: Props) {
  return (
    <div className={cn('inline-flex flex-wrap gap-1 rounded-xl bg-neutral-100 p-1', className)}>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={cn(
            'rounded-lg px-4 py-2 text-sm font-semibold transition-all',
            value === opt
              ? 'bg-white text-brand-600 shadow-sm ring-1 ring-neutral-200'
              : 'text-neutral-500 hover:text-neutral-700'
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
