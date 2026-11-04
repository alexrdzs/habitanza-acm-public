import { ChevronDown, UserCheck } from 'lucide-react';
import { COPY } from '@shared/copy';
import { ALL_BROKERS } from '../../lib/broker';
import type { Advisor } from '@shared/advisors';

interface Props {
  value: Advisor | null;
  onChange: (advisor: Advisor) => void;
}

// Event mode only, outside the flow: who is working the stand. Native select
// so iPad shows its own picker.
export function BrokerPicker({ value, onChange }: Props) {
  return (
    <label className="z-10 mb-2 flex w-fit self-end lg:absolute lg:right-0 lg:top-2 lg:mb-0 lg:self-auto items-center gap-2 rounded-pill border border-neutral-200/70 bg-parchment-card/80 py-2 pl-3 pr-2 text-sm font-medium text-neutral-600 shadow-sm backdrop-blur-md">
      <UserCheck className="h-4 w-4 text-brand-600" />
      {COPY.event.broker.label}
      <span className="relative">
        <select
          value={value?.name ?? ''}
          onChange={(e) => {
            const picked = ALL_BROKERS.find((b) => b.name === e.target.value);
            if (picked) onChange(picked);
          }}
          className={`appearance-none bg-transparent py-0.5 pl-1 pr-6 font-bold focus:outline-none ${value ? 'text-neutral-900' : 'text-brand-600'}`}
        >
          {!value && <option value="">{COPY.event.broker.placeholder}</option>}
          {ALL_BROKERS.map((b) => (
            <option key={b.name} value={b.name}>
              {b.name}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
      </span>
    </label>
  );
}
