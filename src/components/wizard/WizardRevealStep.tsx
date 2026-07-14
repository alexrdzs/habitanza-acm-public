import { useEffect, useMemo, useRef, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { PreliminaryPricingBar } from './PreliminaryPricingBar';
import { ComparablesMap } from './ComparablesMap';
import { ComparableListingCards } from './ComparableListingCards';
import { MethodologySection } from './MethodologySection';
import { TestimonialsCarousel } from './TestimonialsCarousel';
import { AdvisorCTA } from './AdvisorCTA';
import { AdvisorAvatar } from './AdvisorAvatar';
import { advisorsForColonia, whatsappLink, buildWhatsAppMessage } from '@shared/advisors';
import { pendingComparableListings, readyComparableListings } from '@shared/comparableListings';
import { COPY } from '@shared/copy';
import type { PreliminaryEstimate } from '@shared/pricing';
import { formatCurrency } from '../../lib/utils';

interface Props {
  estimate: PreliminaryEstimate;
  nombre: string;
  tipoPropiedad: string;
  colonia: string;
}

export function WizardRevealStep({ estimate, nombre, tipoPropiedad, colonia }: Props) {
  const firstName = nombre.trim().split(' ')[0] || 'gracias';
  // Randomized once per visit from the right coverage pool, so the same
  // advisor appears in the signature block and persistent WhatsApp bar.
  const advisor = useMemo(() => {
    const advisors = advisorsForColonia(colonia);
    return advisors[Math.floor(Math.random() * advisors.length)];
  }, [colonia]);
  const advisorFirstName = advisor.name.split(' ')[0];
  const comps = readyComparableListings(colonia);
  const pendingComps = pendingComparableListings(colonia);
  const hasComps = comps.length > 0;
  const hasPendingComps = pendingComps.length > 0;
  const message = buildWhatsAppMessage(advisor, nombre, tipoPropiedad, colonia);

  // The sticky bottom CTA only makes sense once the inline one next to the
  // firma has scrolled out of view -- otherwise there'd be two identical
  // WhatsApp buttons on screen at once.
  const heroCardRef = useRef<HTMLDivElement>(null);
  const [isStickyBarVisible, setIsStickyBarVisible] = useState(false);

  useEffect(() => {
    const el = heroCardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setIsStickyBarVisible(!entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-3 pb-20 duration-700 md:space-y-5">
      {/* Plain page text, not a card -- the greeting shouldn't be the thing
          that makes the first card feel heavy. Centered on mobile (where it
          reads as the screen's title), left-aligned once there's enough
          width for it to sit naturally beside the card below. */}
      <div className="pb-2 text-center md:text-left">
        <h2 className="text-lg font-medium leading-snug text-neutral-900 md:text-xl">{COPY.reveal.greeting(firstName)}</h2>
        <p className="mt-1 text-sm text-neutral-500">{COPY.reveal.subtext}</p>
      </div>

      {/* The result belongs to the same warm, paper-like system as the entry
          flow. It earns emphasis through scale and spacing, not a separate
          dark visual language. */}
      <div
        ref={heroCardRef}
        className="overflow-hidden rounded-card-lg border border-neutral-200/70 bg-parchment-card/80 shadow-[0_1px_2px_rgba(16,32,26,0.04),0_12px_28px_-16px_rgba(16,32,26,0.18)] backdrop-blur-md"
      >
        <div className="p-7 text-center md:p-10">
          <p className="text-sm font-medium text-neutral-600">{COPY.reveal.headlinePrefix}</p>
          <h3 className="mt-2 text-lg font-bold leading-tight tabular-nums text-neutral-900 sm:text-2xl md:text-4xl">
            <span className="animate-in fade-in slide-in-from-bottom-1 fill-mode-both duration-500 delay-100">
              {formatCurrency(estimate.low)}
            </span>{' '}
            {COPY.reveal.headlineJoiner}{' '}
            <span className="animate-in fade-in slide-in-from-bottom-1 fill-mode-both duration-500 delay-200">
              {formatCurrency(estimate.high)}
            </span>
          </h3>
          <PreliminaryPricingBar estimate={estimate} />
          <p className="mx-auto max-w-lg text-center text-xs text-neutral-500 md:text-sm">
            {hasPendingComps && !hasComps ? COPY.reveal.researchCaption(colonia) : COPY.reveal.caption(colonia)}
          </p>

          {/* Putting a real person before the follow-up message lets the
              homeowner understand who is continuing the analysis before
              being asked to take the next step. */}
          <div className="mt-8 flex flex-col items-center border-t border-neutral-200/70 pt-6 text-center">
            <AdvisorAvatar
              advisor={advisor}
              className="h-14 w-14 flex-shrink-0 border-2 border-brand-500/70 bg-neutral-100"
              iconClassName="h-6 w-6 text-neutral-500"
            />
            <p className="mt-2 text-sm font-bold text-neutral-900">{advisor.name}</p>
            <p className="text-xs text-neutral-500">{advisor.roleLabel}</p>
          </div>
          <p className="mx-auto mt-5 max-w-lg text-center text-sm leading-relaxed text-neutral-600 md:text-base">
            {COPY.reveal.advisorParagraph(advisorFirstName, advisor.gender, colonia)}
          </p>
          <a
            href={whatsappLink(advisor, message)}
            target="_blank"
            rel="noreferrer"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-pill bg-brand-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_-8px_rgba(37,211,102,0.55)] transition-transform active:scale-95 hover:bg-brand-600"
          >
            <MessageCircle className="h-4 w-4" />
            {COPY.reveal.ctaLabel(advisorFirstName)}
          </a>
        </div>
      </div>

      <div className="space-y-5 rounded-card-lg border border-neutral-200/70 bg-parchment-card/80 p-6 backdrop-blur-md md:p-8">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-brass">{COPY.reveal.mercadoEyebrow}</p>
          <h3 className="mt-1 text-base font-bold text-neutral-900">
            {hasComps ? COPY.reveal.mercadoTitleWithComps(colonia) : COPY.reveal.mercadoTitleNoComps(colonia)}
          </h3>
        </div>

        <div className="border-l-2 border-brass/50 pl-4">
          <p className="text-sm font-medium text-neutral-700">{COPY.reveal.notaPlaceholderTag}</p>
          <p className="mt-1 text-sm leading-relaxed text-neutral-500">{COPY.reveal.notaPlaceholderBody(colonia)}</p>
        </div>

        {hasComps || hasPendingComps ? (
          <div className="space-y-3 md:flex md:gap-3 md:space-y-0">
            <div className="md:w-1/2">
              <ComparablesMap listings={comps} colonia={colonia} researchCount={pendingComps.length} />
            </div>
            <div className="md:w-1/2">
              <ComparableListingCards
                listings={hasComps ? comps : pendingComps}
                researchLabel={hasPendingComps ? COPY.reveal.researchCardsLabel(pendingComps.length) : undefined}
              />
            </div>
          </div>
        ) : (
          <p className="text-sm leading-relaxed text-neutral-500">{COPY.reveal.noCompsBody(colonia)}</p>
        )}
      </div>

      <MethodologySection />

      {/* Repeated from the Hero, deliberately -- someone who scrolled all
          the way to a price should get one more nudge of social proof right
          before deciding whether to reach out. */}
      <TestimonialsCarousel />

      <AdvisorCTA advisor={advisor} nombre={nombre} tipoPropiedad={tipoPropiedad} colonia={colonia} visible={isStickyBarVisible} />
    </div>
  );
}
