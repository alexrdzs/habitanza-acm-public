import { cn } from '../lib/utils';
import type { PropertyCondition } from '@shared/validation';

const OPTIONS: { value: PropertyCondition; emoji: string; inactive: string; active: string }[] = [
  {
    value: 'Para reformar',
    emoji: '🔨',
    inactive: 'border-red-200 text-red-600 hover:border-red-400 hover:bg-red-50',
    active: 'border-red-500 bg-red-500 text-white',
  },
  {
    value: 'Buen estado',
    emoji: '✓',
    inactive: 'border-neutral-300 text-neutral-600 hover:border-neutral-400 hover:bg-neutral-50',
    active: 'border-neutral-700 bg-neutral-700 text-white',
  },
  {
    value: 'Remodelada',
    emoji: '⭐',
    inactive: 'border-blue-200 text-blue-600 hover:border-blue-400 hover:bg-blue-50',
    active: 'border-blue-500 bg-blue-500 text-white',
  },
  {
    value: 'Nueva',
    emoji: '✨',
    inactive: 'border-brand-200 text-brand-600 hover:border-brand-400 hover:bg-brand-50',
    active: 'border-brand-500 bg-brand-500 text-white',
  },
];

interface Props {
  value: string;
  onChange: (val: PropertyCondition) => void;
  label?: string;
}

export function ConditionToggle({ value, onChange, label }: Props) {
  return (
    <div>
      {label && <p className="mb-1.5 block text-sm font-medium text-neutral-700">{label}</p>}
      <div className="flex flex-wrap gap-2">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              'flex items-center gap-1.5 rounded-input border px-3 py-2 text-sm font-semibold transition-all',
              value === opt.value ? opt.active : opt.inactive
            )}
          >
            <span>{opt.emoji}</span>
            <span>{opt.value}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
