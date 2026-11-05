import { forwardRef } from 'react';
import { Building2, ChevronDown, House, LandPlot, LineChart, Users, type LucideIcon } from 'lucide-react';
import { Logo } from '../Logo';
import { COPY } from '@shared/copy';
import { idealBand } from '@shared/pricing';
import { formatMillions } from '../../lib/utils';

interface Props {
  tipoPropiedad: string;
  colonia: string;
  low: number;
  high: number;
  // The three "Datos del mercado" points, already formatted.
  market: { title: string; value: string }[];
  brokerName: string;
  brokerPhone: string;
  // Data URL (a remote photo would render blank). Without it: the initial.
  brokerPhoto?: string | null;
}

const TYPE_ICONS: Record<string, LucideIcon> = { Casa: House, Departamento: Building2, Terreno: LandPlot };
const MARKET_ICONS: LucideIcon[] = [LineChart, Building2, Users];
const GREEN = '#16A34A';


// The image that gets shared: the same content as the first reveal card (range,
// bar, property sheet) plus the broker. Fixed 400px, solid colors only (no
// blur, no transparency): html-to-image renders those badly.
export const ValuationShareCard = forwardRef<HTMLDivElement, Props>(function ValuationShareCard(p, ref) {
  const ideal = idealBand(p.low, p.high);
  const TypeIcon = TYPE_ICONS[p.tipoPropiedad] ?? House;

  return (
    <div ref={ref} style={{ width: 400 }} className="bg-white p-6 text-neutral-900">
      <p className="flex items-center gap-2 text-xl font-extrabold leading-tight">
        <TypeIcon className="h-5 w-5 shrink-0" style={{ color: GREEN }} strokeWidth={2} />
        <span>{`${p.tipoPropiedad} en ${p.colonia}`}</span>
      </p>
      <div className="mt-4 h-px bg-neutral-200" />

      {/* Range card */}
      <div className="mt-5 text-center">
        <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: '#15803D' }}>{COPY.reveal.panelChip}</p>
        <p className="mt-2 text-[13px] font-medium text-neutral-500">{COPY.reveal.headlinePrefix}</p>
        <p className="mt-1 text-2xl font-bold leading-tight tabular-nums">
          {formatMillions(p.low)} <span className="font-light text-neutral-400">-</span> {formatMillions(p.high)}
        </p>
      </div>

      <div className="mt-4 rounded-2xl bg-[#F0FDF4] px-4 pb-4 pt-4">
        <div className="flex flex-col items-center">
          <div className="rounded-full border border-[#86EFAC] bg-white px-4 py-1.5 text-center">
            <p className="whitespace-nowrap text-xs font-medium text-neutral-600">{COPY.reveal.bar.idealLabel}</p>
            <p className="whitespace-nowrap text-sm font-extrabold tabular-nums">
              {formatMillions(ideal.low)} <span className="font-light text-neutral-400">-</span> {formatMillions(ideal.high)}
            </p>
          </div>
          <ChevronDown className="mt-0.5 h-5 w-5" style={{ color: GREEN }} strokeWidth={3} />
        </div>
        <div className="h-2.5 rounded-full" style={{ background: 'linear-gradient(90deg, #DC2626 0%, #DC2626 6%, #FBBF24 14%, #4ADE80 50%, #FBBF24 86%, #DC2626 94%, #DC2626 100%)' }} />
        <div className="mt-3 flex justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">{COPY.share.low}</p>
            <p className="text-lg font-extrabold tabular-nums">{formatMillions(p.low)}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">{COPY.share.high}</p>
            <p className="text-lg font-extrabold tabular-nums">{formatMillions(p.high)}</p>
          </div>
        </div>
      </div>
      <p className="mt-2 text-center text-[10px] leading-snug text-neutral-400">{COPY.share.disclaimer}</p>

      {/* Datos del mercado: the three points of the reveal's market card */}
      {p.market.length > 0 && (
        <div className="mt-5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">{COPY.reveal.market.statsLabel}</p>
          <div className="mt-2 grid gap-2" style={{ gridTemplateColumns: `repeat(${p.market.length}, minmax(0, 1fr))` }}>
            {p.market.map(({ title, value }, i) => {
              const Icon = MARKET_ICONS[i] ?? LineChart;
              return (
                <div key={title} className="rounded-xl bg-[#F5F5F4] px-3 py-3">
                  <Icon className="h-4 w-4" style={{ color: GREEN }} strokeWidth={1.75} />
                  <p className="mt-2 break-words text-lg font-extrabold leading-tight tabular-nums">{value}</p>
                  <p className="mt-0.5 text-[11px] font-semibold leading-tight text-neutral-600">{title}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Broker signature (left) and logo (right) */}
      <div className="mt-5 flex items-center justify-between gap-4 border-t border-neutral-200 pt-4">
        <div className="flex min-w-0 items-center gap-3">
          {p.brokerPhoto ? (
            <img src={p.brokerPhoto} alt="" className="h-12 w-12 shrink-0 rounded-full object-cover" style={{ border: `2px solid ${GREEN}` }} />
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-lg font-extrabold text-[#15803D]">
              {p.brokerName[0]}
            </div>
          )}
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#15803D]">{COPY.share.attended}</p>
            <p className="break-words text-sm font-bold leading-tight">{p.brokerName}</p>
            <p className="text-xs font-semibold text-neutral-600">{p.brokerPhone}</p>
          </div>
        </div>
        <Logo className="h-6 shrink-0 text-neutral-900" />
      </div>
    </div>
  );
});
