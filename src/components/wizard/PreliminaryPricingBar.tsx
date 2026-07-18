import { COPY } from '@shared/copy';
import type { PreliminaryEstimate } from '@shared/pricing';
import { formatCurrency } from '../../lib/utils';

// A red-yellow-green-yellow-red bar that reads in three layers:
//   1. The whole coloured bar is the plausible market range. The red zones at
//      each end are "fuera de mercado"; Mín / Máx (= low / high) sit right at
//      the inner edge of that red, so past them is visibly out of market.
//   2. The frosted "pill" is a narrower LIKELY band -- a fixed % of the range
//      that rides with the aprox (so a better-equipped / newer property leans
//      its likely band toward the upper end). It carries more room BELOW the
//      aprox than above (PILL_DOWNSIDE_BIAS) because sellers' asking prices
//      skew optimistic, so the realistic outcome clusters at or below the best
//      guess -- but only "when needed": the clamp keeps the whole band inside
//      the plausible range, so where the range runs out on one side the lean
//      naturally flattens. It never spills into the red: "your property is
//      probably somewhere in here."
//   3. The Estimado pin is the single best guess, always sitting inside the
//      pill, positioned at where the aprox actually falls within [low, high]
//      (see estimateRangePosition in shared/pricing.ts).
const RANGE_MIN = 14; // % where Mín (low) sits, just inside the left red zone
const RANGE_MAX = 86; // % where Máx (high) sits, just inside the right red zone
const PILL_WIDTH_FRACTION = 0.5; // likely band = 50% of the plausible range
const PILL_DOWNSIDE_BIAS = 0.5; // share of the band below the aprox (0.5 = symmetric)

interface Props {
  estimate: PreliminaryEstimate;
}

export function PreliminaryPricingBar({ estimate }: Props) {
  // Where the aprox falls within [low, high], mapped onto the [RANGE_MIN,
  // RANGE_MAX] track. Falls back to dead-center for a zero-width range.
  const span = estimate.high - estimate.low;
  const midFraction = span > 0 ? Math.min(1, Math.max(0, (estimate.mid - estimate.low) / span)) : 0.5;
  const estimatePos = RANGE_MIN + midFraction * (RANGE_MAX - RANGE_MIN);

  // The likely band leans below the aprox (optimism correction), then clamps
  // so the whole band stays inside [RANGE_MIN, RANGE_MAX] -- it can shift
  // toward an end but never crosses into the red, and the aprox always stays
  // inside it (estimatePos is within [RANGE_MIN, RANGE_MAX], and the clamp
  // moves the band by at most its own bias, so the pin can't fall outside).
  const pillWidth = PILL_WIDTH_FRACTION * (RANGE_MAX - RANGE_MIN);
  const pillLeft = Math.min(
    RANGE_MAX - pillWidth,
    Math.max(RANGE_MIN, estimatePos - pillWidth * PILL_DOWNSIDE_BIAS)
  );
  return (
    // Generous top/bottom padding: the pin above and the Mín/Máx labels plus
    // the "fuera de mercado" note below are absolutely positioned (they don't
    // add to this container's height), so without it surrounding content
    // renders overlapping them.
    <div className="pb-16 pt-20">
      <div className="relative mx-1">
        {/* Draws in from the left -- reads as being plotted, then the pin
            lands once it's done. Solid red at both ends (fuera de mercado),
            easing through yellow into green in the middle. Mín/Máx sit at the
            inner edge of the red so past them reads as out of market. */}
        <div
          className="animate-draw-line h-2 rounded-full shadow-inner"
          style={{
            background: `linear-gradient(90deg, #dc2626 0%, #dc2626 6%, #fbbf24 ${RANGE_MIN}%, #34d399 50%, #fbbf24 ${RANGE_MAX}%, #dc2626 94%, #dc2626 100%)`,
          }}
        />

        {/* Frosted LIKELY-band pill: a % of the range that rides with the
            aprox, clamped to never cross into the red. Opacity-only fade so it
            composes with the pin/tick transforms; no z-index, so it sits
            behind the pin (z-10) and ticks (z-0) by DOM order and never
            obscures a label. */}
        <div
          className="animate-in fade-in fill-mode-both absolute rounded-full border border-white/45 bg-white/15 shadow-[0_0_0_2px_rgba(37,211,102,0.15)] backdrop-blur-[2px] duration-500 delay-300"
          style={{ left: `${pillLeft}%`, width: `${pillWidth}%`, top: '-9px', height: '28px' }}
        />

        {/* Estimado pin. Lands last, once the line has drawn, as the payoff.
            Positioned at the aprox's real place in the range, not always 50%. */}
        <div
          className="animate-in fade-in zoom-in-90 fill-mode-both absolute z-10 duration-500 delay-700"
          style={{ left: `${estimatePos}%`, bottom: '8px', transform: 'translateX(-50%)' }}
        >
          <div className="flex flex-col items-center">
            <div className="relative mb-1.5 flex flex-col items-center whitespace-nowrap rounded-lg bg-white px-3 py-1.5 shadow-lg ring-1 ring-brand-500/40">
              <span className="text-sm font-bold tabular-nums text-ink">{formatCurrency(estimate.mid)}</span>
              <span className="text-[8px] font-bold uppercase tracking-wider text-brand-600">
                {COPY.reveal.bar.estimateLabel}
              </span>
              <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-white" />
            </div>
            <div className="h-3 w-0.5 rounded-full bg-white/50" />
          </div>
        </div>

        {/* Mín / Máx ticks at the plausible-range edges (by the red zones),
            centered under them. */}
        <div
          className="animate-in fade-in fill-mode-both absolute z-0 duration-400 delay-300"
          style={{ left: `${RANGE_MIN}%`, top: '12px', transform: 'translateX(-50%)' }}
        >
          <div className="mx-auto h-2.5 w-0.5 rounded-full bg-white/40" />
          <div className="mt-1.5 flex flex-col items-center whitespace-nowrap">
            <span className="text-[11px] font-bold tabular-nums text-white">{formatCurrency(estimate.low)}</span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">
              {COPY.reveal.bar.minLabel}
            </span>
          </div>
        </div>
        <div
          className="animate-in fade-in fill-mode-both absolute z-0 duration-400 delay-500"
          style={{ left: `${RANGE_MAX}%`, top: '12px', transform: 'translateX(-50%)' }}
        >
          <div className="mx-auto h-2.5 w-0.5 rounded-full bg-white/40" />
          <div className="mt-1.5 flex flex-col items-center whitespace-nowrap">
            <span className="text-[11px] font-bold tabular-nums text-white">{formatCurrency(estimate.high)}</span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">
              {COPY.reveal.bar.maxLabel}
            </span>
          </div>
        </div>

        {/* "Fuera de mercado" as a centered footnote under the bar, since the
            red now marks both ends rather than a single tail. Shown on every
            viewport. */}
        <div
          className="animate-in fade-in fill-mode-both absolute left-1/2 -translate-x-1/2 duration-400 delay-700"
          style={{ top: '56px' }}
        >
          <span className="flex items-center gap-1.5 whitespace-nowrap text-[10px] font-medium text-neutral-400">
            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500" />
            {COPY.reveal.bar.outOfMarketNote}
          </span>
        </div>
      </div>
    </div>
  );
}
