import { COPY } from '@shared/copy';
import type { PreliminaryEstimate } from '@shared/pricing';
import { formatCurrency } from '../../lib/utils';

// Adapted from the authenticated report's PricingStrategyBar and sharing its
// color semantics: yellow on the conservative side, green at the estimate,
// warming toward orange near Máx, and red reserved exclusively for the zone
// PAST the range ("Fuera de mercado"). Red never brackets the range itself:
// in the full ACM red means overpriced, and a Mín flagged in red here would
// contradict the document this screen is previewing. The out-of-market tail
// is also the quiet first lesson for the emotionally-priced seller: above
// Máx a listing stops competing.
//
// Geometry: the market band spans 0-86% of the track with the red tail on
// the remaining 14%. The formula is symmetric in ratio (low = mid*0.88,
// high = mid*1.12 for construcción; *0.8/*1.2 for terreno), so the estimate
// always sits at the center of the band (43%).
const BAND_END = 86; // % of the track where Máx sits and the red tail begins
const PIN_POSITION = BAND_END / 2;

interface Props {
  estimate: PreliminaryEstimate;
}

export function PreliminaryPricingBar({ estimate }: Props) {
  return (
    // The generous top/bottom padding isn't decorative -- the pin above and
    // the Mín/Máx tick labels below are absolutely positioned (so they don't
    // contribute to this container's height); without it, surrounding
    // content renders overlapping them. Mobile drops the "Fuera de mercado"
    // row (see below) so it needs less bottom room than desktop.
    <div className="pb-14 pt-20 md:pb-20">
      <div className="relative mx-1">
        {/* Draws in from the left instead of just appearing -- the bar
            reads as being plotted, then the pin lands once it's done. */}
        <div
          className="animate-draw-line h-2 rounded-full shadow-inner"
          style={{
            background:
              'linear-gradient(90deg, #fbbf24 0%, #34d399 30%, #34d399 56%, #fbbf24 74%, #f97316 86%, #dc2626 100%)',
          }}
        />

        {/* Estimado pin at the center of the market band. Lands last, once
            the line has finished drawing, as the payoff. */}
        <div
          className="animate-in fade-in zoom-in-90 fill-mode-both absolute z-10 duration-500 delay-700"
          style={{ left: `${PIN_POSITION}%`, bottom: '8px', transform: 'translateX(-50%)' }}
        >
          <div className="flex flex-col items-center">
            <div className="relative mb-1.5 flex flex-col items-center whitespace-nowrap rounded-lg bg-white px-3 py-1.5 shadow-lg ring-1 ring-brand-500/40">
              <span className="text-sm font-bold tabular-nums text-ink">
                {formatCurrency(estimate.mid)}
              </span>
              <span className="text-[8px] font-bold uppercase tracking-wider text-brand-600">
                {COPY.reveal.bar.estimateLabel}
              </span>
              <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-white" />
            </div>
            <div className="h-3 w-0.5 rounded-full bg-white/50" />
          </div>
        </div>

        {/* Mín / Máx ticks below the bar, fading in as the line passes
            their position. Neutral labels on purpose (see header comment). */}
        <div
          className="animate-in fade-in fill-mode-both absolute z-0 duration-400 delay-300"
          style={{ left: '0%', top: '12px' }}
        >
          <div className="h-2.5 w-0.5 rounded-full bg-white/40" />
          <div className="mt-1.5 flex flex-col whitespace-nowrap">
            <span className="text-[11px] font-bold tabular-nums text-white">
              {formatCurrency(estimate.low)}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">
              {COPY.reveal.bar.minLabel}
            </span>
          </div>
        </div>
        <div
          className="animate-in fade-in fill-mode-both absolute z-0 duration-400 delay-500"
          style={{ left: `${BAND_END}%`, top: '12px' }}
        >
          <div className="h-2.5 w-0.5 rounded-full bg-white/40" />
          <div className="mt-1.5 flex -translate-x-full flex-col items-end whitespace-nowrap pr-1">
            <span className="text-[11px] font-bold tabular-nums text-white">
              {formatCurrency(estimate.high)}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">
              {COPY.reveal.bar.maxLabel}
            </span>
          </div>
        </div>

        {/* "Fuera de mercado" on its own row below the Mín/Máx labels,
            right-aligned under the red tail. A row of its own keeps it
            clear of both the pin above the bar and the Máx price label,
            which it collided with at 390px in every same-row placement.
            Hidden on mobile to reclaim vertical space -- the red tail past
            Máx carries the meaning on its own there. */}
        <div
          className="animate-in fade-in fill-mode-both absolute hidden duration-400 delay-700 md:block"
          style={{ right: '0%', top: '58px' }}
        >
          <span className="flex items-center gap-1 whitespace-nowrap text-[9px] font-bold uppercase tracking-wider text-red-400">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            {COPY.reveal.bar.outOfMarketLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
