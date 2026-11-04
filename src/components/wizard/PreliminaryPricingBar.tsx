import { ChevronDown } from 'lucide-react';
import { COPY } from '@shared/copy';
import type { PreliminaryEstimate } from '@shared/pricing';
import { formatCurrency } from '../../lib/utils';

// A red-yellow-green-yellow-red bar that shows a RANGE, never a single price.
//   1. The whole coloured bar is the plausible market range. The red zones at
//      each end are "fuera de mercado"; Mín / Máx (= low / high) sit right at
//      the inner edge of that red, so past them is visibly out of market.
//   2. The frosted glass "pill" is the likely band, centered in the range. It
//      is deliberately NOT tied to the aprox: this screen is a first approach
//      that sells the meeting, so it must not read as a final number.
const RANGE_MIN = 14; // % where Mín (low) sits, just inside the left red zone
const RANGE_MAX = 86; // % where Máx (high) sits, just inside the right red zone
const PILL_WIDTH = 0.5 * (RANGE_MAX - RANGE_MIN); // likely band = 50% of the range
const PILL_LEFT = RANGE_MIN + (RANGE_MAX - RANGE_MIN - PILL_WIDTH) / 2;

interface Props {
  estimate: PreliminaryEstimate;
}

function Tick({ pos, value, label, delay }: { pos: number; value: number; label: string; delay: string }) {
  return (
    <div
      className={`animate-in fade-in fill-mode-both absolute duration-400 ${delay}`}
      style={{ left: `${pos}%`, top: '12px', transform: 'translateX(-50%)' }}
    >
      <div className="mx-auto h-2.5 w-0.5 rounded-full bg-neutral-300" />
      <div className="mt-1.5 flex flex-col items-center whitespace-nowrap">
        <span className="text-sm font-extrabold tabular-nums text-neutral-900 md:text-lg lg:text-2xl">{formatCurrency(value)}</span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">{label}</span>
      </div>
    </div>
  );
}

export function PreliminaryPricingBar({ estimate }: Props) {
  return (
    // Bottom padding: the Mín/Máx labels and the "fuera de mercado" note are
    // absolutely positioned (they add no height), so the container reserves
    // their space.
    <div className="pb-20 pt-16 lg:pb-24">
      <div className="relative mx-1">
        {/* Draws in from the left: reads as being plotted. */}
        <div
          className="animate-draw-line h-2 rounded-full shadow-inner"
          style={{
            background: `linear-gradient(90deg, #dc2626 0%, #dc2626 6%, #fbbf24 ${RANGE_MIN}%, #34d399 50%, #fbbf24 ${RANGE_MAX}%, #dc2626 94%, #dc2626 100%)`,
          }}
        />

        {/* Frosted glass likely-band pill. */}
        <div
          className="animate-in fade-in fill-mode-both absolute rounded-full border border-brand-500/40 bg-white/50 shadow-[0_4px_12px_-4px_rgba(22,163,74,0.3)] backdrop-blur-[3px] duration-500 delay-300"
          style={{ left: `${PILL_LEFT}%`, width: `${PILL_WIDTH}%`, top: '-9px', height: '28px' }}
        />

        {/* Center label over the band: where the ideal price sits (no number),
            with a down-pointing indicator aimed at the glass band. */}
        <div
          className="animate-in fade-in fill-mode-both absolute left-1/2 flex -translate-x-1/2 flex-col items-center duration-500 delay-500"
          style={{ bottom: '10px' }}
        >
          <p className="whitespace-nowrap text-xs font-extrabold text-neutral-900 md:text-sm">
            {COPY.reveal.bar.idealLabel}
          </p>
          <ChevronDown className="-mb-0.5 mt-0.5 h-5 w-5 text-brand-600" strokeWidth={3} />
        </div>

        <Tick pos={RANGE_MIN} value={estimate.low} label={COPY.reveal.bar.minLabel} delay="delay-300" />
        <Tick pos={RANGE_MAX} value={estimate.high} label={COPY.reveal.bar.maxLabel} delay="delay-500" />

        <div
          className="animate-in fade-in fill-mode-both absolute left-1/2 top-[72px] -translate-x-1/2 duration-400 delay-700 lg:top-[88px]"
        >
          <span className="flex items-center gap-1.5 whitespace-nowrap text-[10px] font-medium text-neutral-500 md:text-xs">
            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500" />
            {COPY.reveal.bar.outOfMarketNote}
          </span>
        </div>
      </div>
    </div>
  );
}
