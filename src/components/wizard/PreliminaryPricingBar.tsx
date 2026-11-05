import { ChevronDown } from 'lucide-react';
import { COPY } from '@shared/copy';
import { idealBand, type PreliminaryEstimate } from '@shared/pricing';
import { formatMillions } from '../../lib/utils';

// A red-yellow-green-yellow-red bar that shows a RANGE, never a single price.
// Mín and Máx sit exactly where the solid red ends, so past them is visibly
// out. The frosted glass pill is the ideal band, with its own numbers (the
// central half of Mín to Máx).
const RANGE_MIN = 6; // % where Mín (low) sits: the edge of the left red zone
const RANGE_MAX = 94; // % where Máx (high) sits: the edge of the right red zone
const PILL_WIDTH = 0.5 * (RANGE_MAX - RANGE_MIN);
const PILL_LEFT = RANGE_MIN + (RANGE_MAX - RANGE_MIN - PILL_WIDTH) / 2;

interface Props {
  estimate: PreliminaryEstimate;
}

// A limit line at the edge of a red zone, with its number and what it means.
// The text block grows inward (away from the red), so it never clips.
function Limit({ side, value, label, delay }: { side: 'left' | 'right'; value: number; label: string; delay: string }) {
  const left = side === 'left';
  return (
    <div
      className={`animate-in fade-in fill-mode-both absolute w-max max-w-[42%] duration-400 ${delay} ${left ? 'text-left' : 'text-right'}`}
      style={{ top: '12px', ...(left ? { left: `${RANGE_MIN}%` } : { right: `${100 - RANGE_MAX}%` }) }}
    >
      <div className={`h-2.5 w-0.5 rounded-full bg-neutral-400 ${left ? '' : 'ml-auto'}`} />
      <p className="mt-1.5 whitespace-nowrap text-sm font-extrabold tabular-nums text-neutral-900 md:text-lg lg:text-2xl">{formatMillions(value)}</p>
      <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">{label}</p>
    </div>
  );
}

export function PreliminaryPricingBar({ estimate }: Props) {
  const ideal = idealBand(estimate.low, estimate.high);
  return (
    // Padding top/bottom: the labels are absolutely positioned (they add no
    // height), so the container reserves their space.
    <div className="pb-20 pt-20 lg:pb-24">
      <div className="relative mx-1">
        {/* Draws in from the left: reads as being plotted. */}
        <div
          className="animate-draw-line h-2 rounded-full shadow-inner"
          style={{
            background: `linear-gradient(90deg, #dc2626 0%, #dc2626 ${RANGE_MIN}%, #fbbf24 ${RANGE_MIN + 8}%, #34d399 50%, #fbbf24 ${RANGE_MAX - 8}%, #dc2626 ${RANGE_MAX}%, #dc2626 100%)`,
          }}
        />

        {/* Frosted glass pill: the band that makes sense. */}
        <div
          className="animate-in fade-in fill-mode-both absolute rounded-full border border-brand-500/40 bg-white/50 shadow-[0_4px_12px_-4px_rgba(22,163,74,0.3)] backdrop-blur-[3px] duration-500 delay-300"
          style={{ left: `${PILL_LEFT}%`, width: `${PILL_WIDTH}%`, top: '-9px', height: '28px' }}
        />

        {/* Over the pill: what makes sense, with its own numbers. */}
        <div
          className="animate-in fade-in fill-mode-both absolute left-1/2 flex -translate-x-1/2 flex-col items-center duration-500 delay-500"
          style={{ bottom: '10px' }}
        >
          <p className="whitespace-nowrap text-xs font-medium text-neutral-600 md:text-sm">{COPY.reveal.bar.idealLabel}</p>
          <p className="whitespace-nowrap text-sm font-extrabold tabular-nums text-neutral-900 md:text-lg">
            {formatMillions(ideal.low)} <span className="font-light text-neutral-400">-</span> {formatMillions(ideal.high)}
          </p>
          <ChevronDown className="-mb-0.5 mt-0.5 h-5 w-5 text-brand-600" strokeWidth={3} />
        </div>

        <Limit side="left" value={estimate.low} label={COPY.reveal.bar.minLabel} delay="delay-300" />
        <Limit side="right" value={estimate.high} label={COPY.reveal.bar.maxLabel} delay="delay-500" />
      </div>
    </div>
  );
}
