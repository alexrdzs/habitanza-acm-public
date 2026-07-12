import { Sparkles, CheckCircle2, Hammer } from 'lucide-react';
import type { PropertyCondition } from '@shared/validation';
import { COPY } from '@shared/copy';
import { cn } from '../../lib/utils';

// A 3-choice quick picker for the public wizard (Nueva / Buen estado /
// "Necesita renovación") that still stores one of the 4 canonical
// PropertyCondition strings -- "Necesita renovación" maps to 'Para
// reformar' so a broker later sees the same familiar value used across
// the authenticated ACM tool. 'Remodelada' is intentionally not offered
// here; a quick public form doesn't need that level of nuance. Labels and
// details come from COPY.basics.conditionOptions; value/icon/color stay
// here since they're tied to validation and design, not copy.
const OPTIONS: { value: PropertyCondition; icon: typeof Sparkles; activeClasses: string; copyKey: keyof typeof COPY.basics.conditionOptions }[] = [
  { value: 'Nueva', icon: Sparkles, activeClasses: 'border-sky-400 bg-sky-400', copyKey: 'nueva' },
  { value: 'Buen estado', icon: CheckCircle2, activeClasses: 'border-brand-500 bg-brand-500', copyKey: 'buenEstado' },
  { value: 'Para reformar', icon: Hammer, activeClasses: 'border-amber-500 bg-amber-500', copyKey: 'necesitaRenovacion' },
];

interface Props {
  value: string;
  onChange: (val: PropertyCondition) => void;
  label?: string;
}

export function ConditionQuickPicker({ value, onChange, label }: Props) {
  return (
    <div>
      {label && <p className="mb-2 block text-sm font-medium text-neutral-700">{label}</p>}
      <div className="flex items-stretch gap-2">
        {OPTIONS.map((opt) => {
          const isActive = value === opt.value;
          const Icon = opt.icon;
          const { label, detail } = COPY.basics.conditionOptions[opt.copyKey];
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={cn(
                'flex flex-col items-center gap-1 rounded-input border px-2 py-3 text-center transition-all duration-300 ease-out',
                isActive
                  ? `flex-[1.7] shadow-sm ${opt.activeClasses}`
                  : 'flex-1 scale-[0.96] border-neutral-200 opacity-55 hover:opacity-90'
              )}
            >
              <Icon className={cn('h-5 w-5 transition-transform duration-300', isActive ? 'scale-110 text-white' : 'text-neutral-400')} />
              <span className={cn('text-[13px] font-semibold leading-tight', isActive ? 'text-white' : 'text-neutral-500')}>
                {label}
              </span>
              {isActive && <span className="text-[10.5px] leading-snug text-white/80">{detail}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
