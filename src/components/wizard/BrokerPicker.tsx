import { useEffect, useRef, useState } from 'react';
import { ChevronDown, UserCheck } from 'lucide-react';
import { COPY } from '@shared/copy';
import { ALL_BROKERS } from '../../lib/broker';
import type { Advisor } from '@shared/advisors';

interface Props {
  value: Advisor | null;
  onChange: (advisor: Advisor) => void;
}

// Shown in this order in the list.
const ORDER = ['Tere', 'Rogelio', 'André', 'Martina'];
const BROKERS = [...ALL_BROKERS].sort((a, b) => ORDER.findIndex((n) => a.name.startsWith(n)) - ORDER.findIndex((n) => b.name.startsWith(n)));

function Avatar({ broker }: { broker: Advisor }) {
  return <img src={broker.imageUrl} alt="" className="h-7 w-7 shrink-0 rounded-full object-cover" />;
}

// Event mode only, outside the flow: who is working the stand. Custom list
// (a native select can't show photos). Pinned to the top-right corner.
export function BrokerPicker({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [open]);

  return (
    <div ref={ref} className="fixed right-3 top-3 z-40 md:right-5 md:top-5">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-pill border border-neutral-200/70 bg-parchment-card/80 py-1.5 pl-2 pr-3 text-sm font-medium text-neutral-600 shadow-sm backdrop-blur-md"
      >
        {value ? <Avatar broker={value} /> : <UserCheck className="ml-1 h-4 w-4 text-brand-600" />}
        <span className="hidden sm:inline">{COPY.event.broker.label}</span>
        <span className={`font-bold ${value ? 'text-neutral-900' : 'text-brand-600'}`}>
          {value ? value.name.split(' ')[0] : COPY.event.broker.placeholder}
        </span>
        <ChevronDown className="h-4 w-4 text-neutral-400" />
      </button>
      {open && (
        <ul className="absolute right-0 mt-2 w-60 animate-in overflow-hidden rounded-2xl border border-neutral-200/70 bg-parchment-card p-1 shadow-lg duration-150 fade-in">
          {BROKERS.map((b) => (
            <li key={b.name}>
              <button
                type="button"
                onClick={() => {
                  onChange(b);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-semibold text-neutral-900 hover:bg-neutral-100 ${value?.name === b.name ? 'bg-brand-50' : ''}`}
              >
                <Avatar broker={b} />
                {b.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
