import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { Logo } from '../Logo';
import { COPY } from '@shared/copy';
import { formatCurrency } from '../../lib/utils';

interface Props {
  nombre: string;
  tipoPropiedad: string;
  colonia: string;
  low: number;
  high: number;
  // Short lines like "3 recámaras", already formatted.
  features: string[];
  brokerName: string;
  brokerRole: string;
  brokerPhone: string;
  // Data URL (a remote photo would render blank). Without it: the initial.
  brokerPhoto?: string | null;
}

// The image that gets shared. Fixed 360px, solid colors only (no blur, no
// transparency): html-to-image renders those badly. The "glass" pill is a
// solid white pill with a thin green border.
export const ValuationShareCard = forwardRef<HTMLDivElement, Props>(function ValuationShareCard(
  { nombre, tipoPropiedad, colonia, low, high, features, brokerName, brokerRole, brokerPhone, brokerPhoto },
  ref
) {
  return (
    <div ref={ref} style={{ width: 360 }} className="bg-white p-6 text-neutral-900">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="break-words text-xl font-extrabold leading-tight">{nombre}</p>
          <p className="mt-1 break-words text-sm font-semibold text-neutral-500">
            {tipoPropiedad} · {colonia}
          </p>
        </div>
        <Logo className="h-6 shrink-0 text-neutral-900" />
      </div>

      {features.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {features.map((f) => (
            <li key={f} className="rounded-full bg-[#F5F5F4] px-3 py-1 text-xs font-semibold text-neutral-700">
              {f}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 rounded-2xl bg-[#F0FDF4] px-4 pb-4 pt-5">
        <p className="text-center text-[11px] font-bold uppercase tracking-wider text-[#15803D]">{COPY.share.chip}</p>
        <div className="mt-3 flex flex-col items-center">
          <p className="whitespace-nowrap rounded-full border border-[#86EFAC] bg-white px-3 py-1.5 text-xs font-extrabold">
            {COPY.reveal.bar.idealLabel}
          </p>
          <ChevronDown className="mt-0.5 h-5 w-5 text-[#16A34A]" strokeWidth={3} />
        </div>
        <div className="h-2.5 rounded-full bg-gradient-to-r from-[#86EFAC] to-[#16A34A]" />
        <div className="mt-3 flex justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">{COPY.share.low}</p>
            <p className="text-lg font-extrabold tabular-nums">{formatCurrency(low)}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">{COPY.share.high}</p>
            <p className="text-lg font-extrabold tabular-nums">{formatCurrency(high)}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3 border-t border-neutral-200 pt-4">
        {brokerPhoto ? (
          <img src={brokerPhoto} alt="" className="h-14 w-14 shrink-0 rounded-full border-2 border-[#16A34A] object-cover" />
        ) : (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-xl font-extrabold text-[#15803D]">
            {brokerName[0]}
          </div>
        )}
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#15803D]">{COPY.share.attended}</p>
          <p className="break-words text-sm font-bold leading-tight">{brokerName}</p>
          <p className="text-xs text-neutral-500">{brokerRole}</p>
          <p className="text-xs font-semibold text-neutral-700">{brokerPhone}</p>
        </div>
      </div>

      <p className="mt-4 text-[10px] leading-snug text-neutral-400">{COPY.share.disclaimer}</p>
    </div>
  );
});
