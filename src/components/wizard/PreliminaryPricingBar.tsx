import { COPY } from '@shared/copy';
import type { PreliminaryEstimate } from '@shared/pricing';
import { formatCurrency } from '../../lib/utils';

// A symmetric red-yellow-green-yellow-red bar with a frosted glass "pill"
// floating over the recommended range in the middle. Red margins on both
// ends mark prices that fall outside the range (too low or too high), and
// the pill deliberately doesn't reach either edge so it reads as floating
// between them. The formula is symmetric in ratio (low = mid*0.88 /
// high = mid*1.12 for construcción; *0.8/*1.2 for terreno), so mid always
// sits at the center (50%) and Mín/Máx land at the pill's two edges.
const MIN_POS = 15; // % where the pill / Mín tick sits; red margin to its left
const MAX_POS = 85; // % where the pill / Máx tick sits; red margin to its right

interface Props {
  estimate: PreliminaryEstimate;
}

export function PreliminaryPricingBar({ estimate }: Props) {
  return (
    // Generous top/bottom padding: the pin above and the Mín/Máx labels plus
    // the "fuera de mercado" note below are absolutely positioned (they don't
    // add to this container's height), so without it surrounding content
    // renders overlapping them.
    <div className="pb-16 pt-20">
      <div className="relative mx-1">
        {/* Draws in from the left -- reads as being plotted, then the pin
            lands once it's done. Red at both ends, green in the middle,
            yellow easing between; the reds sit under the margins left exposed
            outside the glass pill. */}
        <div
          className="animate-draw-line h-2 rounded-full shadow-inner"
          style={{
            background: `linear-gradient(90deg, #dc2626 0%, #fbbf24 ${MIN_POS}%, #34d399 50%, #fbbf24 ${MAX_POS}%, #dc2626 100%)`,
          }}
        />

        {/* Frosted "recommended range" pill floating over the Mín-Máx span,
            red margins exposed on both sides. Opacity-only fade so it
            composes with the pin/tick transforms; no z-index, so it sits
            behind the pin (z-10) and ticks (z-0) by DOM order and never
            obscures a label. */}
        <div
          className="animate-in fade-in fill-mode-both absolute rounded-full border border-white/45 bg-white/15 shadow-[0_0_0_2px_rgba(37,211,102,0.15)] backdrop-blur-[2px] duration-500 delay-300"
          style={{ left: `${MIN_POS}%`, width: `${MAX_POS - MIN_POS}%`, top: '-9px', height: '28px' }}
        />

        {/* Estimado pin at 50%. Lands last, once the line has drawn, as the
            payoff. */}
        <div
          className="animate-in fade-in zoom-in-90 fill-mode-both absolute z-10 duration-500 delay-700"
          style={{ left: '50%', bottom: '8px', transform: 'translateX(-50%)' }}
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

        {/* Mín / Máx ticks at the pill edges, centered under them. */}
        <div
          className="animate-in fade-in fill-mode-both absolute z-0 duration-400 delay-300"
          style={{ left: `${MIN_POS}%`, top: '12px', transform: 'translateX(-50%)' }}
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
          style={{ left: `${MAX_POS}%`, top: '12px', transform: 'translateX(-50%)' }}
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
