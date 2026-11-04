import { IS_EVENT_MODE } from '../../lib/eventMode';
import type { Ref } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { PreliminaryPricingBar } from './PreliminaryPricingBar';
import { AdvisorAvatar } from './AdvisorAvatar';
import { whatsappLink, buildWhatsAppMessage, type Advisor } from '@shared/advisors';
import { pendingComparableListings, readyComparableListings } from '@shared/comparableListings';
import { COPY } from '@shared/copy';
import type { PreliminaryEstimate } from '@shared/pricing';
import { cn, formatCurrency } from '../../lib/utils';

interface Props {
  estimate: PreliminaryEstimate;
  nombre: string;
  tipoPropiedad: string;
  colonia: string;
  advisor: Advisor;
  // Wide layout: the panel lives in the left column of the two-panel layout
  // (no card chrome of its own, greeting included, no "scroll" cue).
  wide?: boolean;
  panelRef?: Ref<HTMLDivElement>;
}

// The reveal's price moment: dark ink panel with the preliminary range, the
// advisor's profile and the WhatsApp CTA. On phones it is the first card of
// the reveal; on wide screens it is the left half of the app.
export function RevealPricePanel({ estimate, nombre, tipoPropiedad, colonia, advisor, wide = false, panelRef }: Props) {
  const firstName = nombre.trim().split(' ')[0] || 'gracias';
  const advisorFirstName = advisor.name.split(' ')[0];
  const hasComps = readyComparableListings(colonia).length > 0;
  const hasPendingComps = pendingComparableListings(colonia).length > 0;
  const precioResultado = `${formatCurrency(estimate.low)} a ${formatCurrency(estimate.high)}`;
  const message = buildWhatsAppMessage(advisor, nombre, tipoPropiedad, colonia, precioResultado);

  return (
    <>
      {wide && (
        <div className="px-2 pb-4">
          <h2 className="text-2xl font-semibold leading-snug text-neutral-900">{COPY.reveal.greeting(firstName)}</h2>
          <p className="mt-1 text-sm text-neutral-500">{IS_EVENT_MODE ? COPY.event.revealSubtext : COPY.reveal.subtext}</p>
        </div>
      )}
      {/* The price moment borrows the full ACM's dark panel (its hero and
          "Precio Sugerido de Salida" card are the same near-black surface),
          so the preliminary range visibly foreshadows the document the
          advisor delivers. The "Rango preliminar" chip is doing expectation
          work: it names this as the junior version of a number that exists.
          Deliberately slim -- just the price moment plus a "continues below"
          cue -- so the 01 Pulso card peeks above the fold on a phone. */}
      <div
        ref={panelRef}
        className={cn(
          'relative overflow-hidden rounded-card-lg bg-ink text-white shadow-[0_1px_2px_rgba(12,10,9,0.08),0_16px_36px_-16px_rgba(12,10,9,0.45)] dark:ring-1 dark:ring-white/10',
        )}
      >
        {/* Ambient glow, deliberately slow and low-opacity: alive, not
            loading (see index.css glow-pulse). */}
        <div className="pointer-events-none absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-500/15 blur-3xl animate-glow-pulse" />

        <div className={cn('relative p-7 text-center md:p-10', wide && 'p-5 md:p-5')}>
          <p className="text-[11px] md:text-xs font-bold uppercase tracking-wider text-brand-400">{COPY.reveal.panelChip}</p>
          <p className="mt-3 text-[13px] font-medium text-white/70">{COPY.reveal.headlinePrefix}</p>
          {/* Without the "Entre" prefix the "{low} a {high}" range is short
              enough to sit a notch larger and still stay on one line at 390px
              for the 7-8 figure values typical of this zone; leading-tight
              lets an unusually large value wrap gracefully. */}
          <h3
            className={cn(
              'mt-1.5 text-xl font-bold leading-tight tracking-tight tabular-nums text-white md:text-4xl',
              wide && 'md:text-3xl'
            )}
          >
            <span className="animate-in fade-in slide-in-from-bottom-1 fill-mode-both duration-500 delay-100">
              {formatCurrency(estimate.low)}
            </span>{' '}
            {COPY.reveal.headlineJoiner}{' '}
            <span className="animate-in fade-in slide-in-from-bottom-1 fill-mode-both duration-500 delay-200">
              {formatCurrency(estimate.high)}
            </span>
          </h3>
          <PreliminaryPricingBar estimate={estimate} />

          {/* Advisor profile: a real person running the analysis, stated
              above the fold so bot suspicion never forms. */}
          <div
            className={cn(
              'mx-auto mt-6 max-w-xs border-t border-white/10 pt-6',
              wide && 'mt-4 max-w-none pt-4'
            )}
          >
            <div className={cn('flex flex-col items-center gap-3 text-center', wide && 'flex-row text-left')}>
              <AdvisorAvatar
                advisor={advisor}
                className={cn(
                  'h-16 w-16 flex-shrink-0 border-2 border-brand-500/70 bg-white/10',
                  wide && 'h-14 w-14'
                )}
                iconClassName="h-6 w-6 text-white/50"
              />
              <p className="text-[13px] leading-relaxed text-white/70">
                <span className="font-semibold text-white">{advisorFirstName}</span>
                {COPY.reveal.panelAdvisorNote.middle(advisor.roleLabel)}
                <span className="font-semibold text-white">{colonia}</span>
                {IS_EVENT_MODE ? COPY.event.panelAdvisorSuffix : COPY.reveal.panelAdvisorNote.suffix}
              </p>
            </div>
            <a
              href={whatsappLink(advisor, message)}
              target="_blank"
              rel="noreferrer"
              className={cn(
                'mt-5 flex w-full items-center justify-center gap-2 rounded-pill bg-brand-500 bg-brand-gradient px-4 py-3 text-sm font-semibold text-white transition-transform active:scale-95 ',
                wide && 'mt-4'
              )}
            >
              <MessageCircle className="h-4 w-4" />
              {IS_EVENT_MODE ? COPY.event.panelCtaLabel : COPY.reveal.panelCtaLabel}
            </a>
          </div>

          {/* Range disclaimer as fine print, then (phones/portrait only) the
              "continues below" cue. */}
          {!wide && (
            <div className="mt-6 border-t border-white/10 pt-4">
              <p className="mx-auto max-w-lg text-center text-[10px] leading-snug text-neutral-500 md:text-xs">
                {hasPendingComps && !hasComps ? COPY.reveal.researchCaption(colonia) : COPY.reveal.caption(colonia)}
              </p>
              <div className="mt-4 flex flex-col items-center gap-0.5">
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-neutral-500">
                  {COPY.reveal.panelScrollCue}
                </p>
                <ChevronDown className="h-3.5 w-3.5 text-neutral-500" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
