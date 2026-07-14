import { formatCurrency } from '../../lib/utils';
import type { PreliminaryEstimate } from '@shared/pricing';

interface Props {
  estimate: PreliminaryEstimate;
}

// Margin the track extends past Mín/Máx so the gradient has room to read as
// "outside the recommended range." Independent of which formula branch
// produced the estimate (construcción's 0.88/1.12 vs terreno's 0.8/1.2) --
// low and high are always symmetric around mid, so mid lands at exactly
// 50% and Mín/Máx always land at these same two fixed percentages.
const RANGE_MARGIN = 0.2;
const MIN_POS = (RANGE_MARGIN / (1 + 2 * RANGE_MARGIN)) * 100;
const MAX_POS = 100 - MIN_POS;

// Design-reviewed via a standalone prototype before landing here. A glass
// "recommended range" band sits over the Mín-Máx span -- the same range
// already stated in the caption text below, not a new data point -- while
// the gradient reads green inside it and fades to red past either edge.
// Deliberately doesn't carry over the authenticated report's "Fuera de
// Mercado" price marker or "Negociación" band: those encode real market
// data we don't have here: this bar only has low/mid/high.
export function PreliminaryPricingBar({ estimate }: Props) {
  return (
    // pb-14 isn't decorative -- the Mín/Máx tick labels below are absolutely
    // positioned (so they don't contribute to this container's height) and
    // extend well past the bar itself; without this the next element in
    // flow renders overlapping them instead of below them.
    <div className="pt-[4.25rem] pb-14">
      <div className="relative mx-1">
        {/* Draws in from the left instead of just appearing -- the bar
            reads as being plotted, then the pin lands once it's done. */}
        <div
          className="h-2 animate-draw-line rounded-full shadow-inner"
          style={{
            background: `linear-gradient(90deg, #dc2626 0%, var(--color-brass-soft) ${MIN_POS}%, #1f8a5c 32%, var(--color-brand-500) 50%, #1f8a5c 68%, var(--color-brass-soft) ${MAX_POS}%, #dc2626 100%)`,
          }}
        />

        {/* Glass highlight over the recommended Mín-Máx span. Opacity-only
            fade -- a transform here would replace (not compose with) the
            Mín/Máx ticks' own translateX centering once the animation's
            fill-mode holds the end state. */}
        <div
          className="absolute rounded-full border border-white/65 bg-white/15 shadow-[0_0_0_2px_rgba(37,211,102,0.12)] backdrop-blur-[2px] animate-in fade-in fill-mode-both duration-500 delay-300"
          style={{ left: `${MIN_POS}%`, width: `${MAX_POS - MIN_POS}%`, top: '-9px', height: '28px' }}
        />

        {/* Estimado pin, pinned at 50% -- true for both formula branches.
            Its stem lands in the middle of the glass band rather than
            above it, so the bar reads as more compact. Lands last, once
            the line has finished drawing, as the payoff. */}
        <div
          className="absolute z-20 animate-in fade-in zoom-in-90 fill-mode-both duration-500 delay-700"
          style={{ left: '50%', bottom: '5px', transform: 'translateX(-50%)' }}
        >
          <div className="flex flex-col items-center">
            <div className="relative mb-1.5 flex flex-col items-center whitespace-nowrap rounded-lg bg-ink px-3 py-1.5 shadow-lg ring-2 ring-brand-500/30">
              <span className="font-mono text-sm font-semibold tabular-nums text-white">
                {formatCurrency(estimate.mid)}
              </span>
              <span className="text-[8px] font-bold uppercase tracking-wider text-emerald-glow">Estimado</span>
              <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-ink" />
            </div>
            <div className="h-3.5 w-0.5 rounded-full bg-brand-500/50" />
          </div>
        </div>

        {/* Min / Max ticks below the bar, fading in as the line passes
            their position -- Mín near the start of the draw, Máx near
            the end. Positioned at the same MIN_POS/MAX_POS as the glass
            band's edges. */}
        <div
          className="absolute animate-in fade-in fill-mode-both duration-400 delay-300"
          style={{ left: `${MIN_POS}%`, top: '12px', transform: 'translateX(-50%)' }}
        >
          <div className="mx-auto h-2.5 w-0.5 rounded-full bg-neutral-300" />
          <div className="mt-1.5 flex flex-col items-center whitespace-nowrap">
            <span className="font-mono text-[11px] font-semibold tabular-nums text-neutral-900">
              {formatCurrency(estimate.low)}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">Mín</span>
          </div>
        </div>
        <div
          className="absolute animate-in fade-in fill-mode-both duration-400 delay-500"
          style={{ left: `${MAX_POS}%`, top: '12px', transform: 'translateX(-50%)' }}
        >
          <div className="mx-auto h-2.5 w-0.5 rounded-full bg-neutral-300" />
          <div className="mt-1.5 flex flex-col items-center whitespace-nowrap">
            <span className="font-mono text-[11px] font-semibold tabular-nums text-neutral-900">
              {formatCurrency(estimate.high)}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">Máx</span>
          </div>
        </div>
      </div>
    </div>
  );
}
