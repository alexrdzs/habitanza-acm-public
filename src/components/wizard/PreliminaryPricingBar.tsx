import { formatCurrency } from '../../lib/utils';
import type { PreliminaryEstimate } from '@shared/pricing';

interface Props {
  estimate: PreliminaryEstimate;
}

// Adapted from the authenticated report's PricingStrategyBar: a horizontal
// positioning bar with Min/Max ticks and a pinned callout for the headline
// number. Simplified because our formula is symmetric in ratio (low =
// mid*0.88, high = mid*1.12 for construcción; *0.8/*1.2 for terreno) --
// mid always lands at exactly 50%, so there's no need for the original's
// piecewise scale, out-of-market marker, or negotiation band. Styled as a
// light paper tag pinned to the dark ink panel it lives in, rather than the
// dark-on-light treatment it'd need on a parchment card.
export function PreliminaryPricingBar({ estimate }: Props) {
  return (
    // pb-14 isn't decorative -- the Mín/Máx tick labels below are absolutely
    // positioned (so they don't contribute to this container's height) and
    // extend well past the bar itself; without this the next element in
    // flow renders overlapping them instead of below them.
    <div className="pt-24 pb-20">

      <div className="relative mx-1">
        {/* Draws in from the left instead of just appearing -- the bar
            reads as being plotted, then the pin lands once it's done. */}
        <div className="h-2 animate-draw-line rounded-full bg-gradient-to-r from-red-500 via-emerald-400 to-red-500 shadow-inner" />

        {/* Estimado pin, pinned at 50% -- true for both formula branches.
            Lands last, once the line has finished drawing, as the payoff. */}
        <div
          className="absolute z-10 animate-in fade-in zoom-in-90 fill-mode-both duration-500 delay-700"
          style={{ left: '50%', bottom: '8px', transform: 'translateX(-50%)' }}
        >
          <div className="flex flex-col items-center">
            <div className="relative mb-1.5 flex flex-col items-center whitespace-nowrap rounded-lg bg-parchment-card px-3 py-1.5 shadow-lg ring-1 ring-brass/60">
              <span className="font-mono text-sm font-semibold tabular-nums text-ink">
                {formatCurrency(estimate.mid)}
              </span>
              <span className="text-[8px] font-bold uppercase tracking-wider text-emerald-deep">Estimado</span>
              <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-parchment-card" />
            </div>
            <div className="h-3 w-0.5 rounded-full bg-brass/60" />
          </div>
        </div>

        {/* Min / Max ticks below the bar, fading in as the line passes
            their position -- Mín near the start of the draw, Máx near
            the end. */}
        <div
          className="absolute z-0 animate-in fade-in fill-mode-both duration-400 delay-300"
          style={{ left: '0%', top: '12px' }}
        >
          <div className="mx-auto h-2.5 w-0.5 rounded-full bg-red-500" />
          <div className="mt-1.5 flex flex-col whitespace-nowrap">
            <span className="font-mono text-[11px] font-semibold tabular-nums text-red-700">
              {formatCurrency(estimate.low)}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-red-600">Mín</span>
          </div>
        </div>
        <div
          className="absolute z-0 animate-in fade-in fill-mode-both duration-400 delay-500"
          style={{ right: '0%', top: '12px' }}
        >
          <div className="ml-auto h-2.5 w-0.5 rounded-full bg-red-500" />
          <div className="mt-1.5 flex flex-col items-end whitespace-nowrap">
            <span className="font-mono text-[11px] font-semibold tabular-nums text-red-700">
              {formatCurrency(estimate.high)}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-red-600">Máx</span>
          </div>
        </div>
      </div>
    </div>
  );
}
