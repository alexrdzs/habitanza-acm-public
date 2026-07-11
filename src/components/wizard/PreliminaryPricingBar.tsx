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
    <div className="pt-20 pb-1">
      <div className="relative mx-1">
        <div
          className="h-2 rounded-full shadow-inner"
          style={{
            background: 'linear-gradient(90deg, var(--color-brass-soft) 0%, var(--color-emerald-glow) 50%, var(--color-brass-soft) 100%)',
          }}
        />

        {/* Estimado pin, pinned at 50% -- true for both formula branches. */}
        <div className="absolute z-10" style={{ left: '50%', bottom: '8px', transform: 'translateX(-50%)' }}>
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

        {/* Min / Max ticks below the bar. */}
        <div className="absolute z-0" style={{ left: '0%', top: '12px' }}>
          <div className="mx-auto h-2.5 w-0.5 rounded-full bg-white/30" />
          <div className="mt-1.5 flex flex-col whitespace-nowrap">
            <span className="font-mono text-[11px] font-semibold tabular-nums text-neutral-200">
              {formatCurrency(estimate.low)}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">Mín</span>
          </div>
        </div>
        <div className="absolute z-0" style={{ right: '0%', top: '12px' }}>
          <div className="ml-auto h-2.5 w-0.5 rounded-full bg-white/30" />
          <div className="mt-1.5 flex flex-col items-end whitespace-nowrap">
            <span className="font-mono text-[11px] font-semibold tabular-nums text-neutral-200">
              {formatCurrency(estimate.high)}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">Máx</span>
          </div>
        </div>
      </div>
    </div>
  );
}
