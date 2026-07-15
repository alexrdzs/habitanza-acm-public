import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, FileSearch, Info, MessageCircle, Route, Target } from 'lucide-react';
import { PreliminaryPricingBar } from './PreliminaryPricingBar';
import { ComparablesMap } from './ComparablesMap';
import { ComparableListingCards } from './ComparableListingCards';
import { MethodologySection } from './MethodologySection';
import { SectionChip } from './SectionChip';
import { TestimonialsCarousel } from './TestimonialsCarousel';
import { AdvisorCTA } from './AdvisorCTA';
import { AdvisorAvatar } from './AdvisorAvatar';
import { advisorsForColonia, whatsappLink, buildWhatsAppMessage } from '@shared/advisors';
import { pendingComparableListings, readyComparableListings, totalReadyListingsCount } from '@shared/comparableListings';
import { COPY } from '@shared/copy';
import { referencePerM2, type PreliminaryEstimate } from '@shared/pricing';
import { formatCurrency } from '../../lib/utils';

interface Props {
  estimate: PreliminaryEstimate;
  nombre: string;
  tipoPropiedad: string;
  colonia: string;
}

// Order-matched with COPY.reveal.acm.checklist.
const ACM_CHECKLIST_ICONS = [FileSearch, Target, Route];

// A stat tile in the full ACM's "Pulso del Mercado" style: micro label,
// bold value, one-line caption.
function PulseTile({ label, value, subline, className = '' }: { label: string; value: string; subline: string; className?: string }) {
  return (
    <div className={`flex flex-col gap-1 rounded-xl border border-neutral-100 bg-neutral-50 p-4 ${className}`}>
      <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">{label}</p>
      <p className="text-lg font-bold tabular-nums text-neutral-900">{value}</p>
      <p className="text-[11px] leading-snug text-neutral-500">{subline}</p>
    </div>
  );
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
  const zoneReference = referencePerM2(colonia, tipoPropiedad);
  const rangeWidth = formatCurrency(estimate.high - estimate.low);

  // The sticky bottom CTA appears once the price panel has scrolled away
  // (so there's always a way to reach the advisor while reading the
  // mini-ACM) and yields while section 03's own firma + CTA is on screen,
  // so two green WhatsApp buttons never stack at the bottom of the
  // viewport.
  const heroCardRef = useRef<HTMLDivElement>(null);
  const inlineCtaRef = useRef<HTMLDivElement>(null);
  const [isPanelOffscreen, setIsPanelOffscreen] = useState(false);
  const [isInlineCtaVisible, setIsInlineCtaVisible] = useState(false);

  useEffect(() => {
    const panel = heroCardRef.current;
    const inlineCta = inlineCtaRef.current;
    if (!panel || !inlineCta) return;
    const panelObserver = new IntersectionObserver(([entry]) => setIsPanelOffscreen(!entry.isIntersecting), {
      threshold: 0,
    });
    const ctaObserver = new IntersectionObserver(([entry]) => setIsInlineCtaVisible(entry.isIntersecting), {
      threshold: 0,
    });
    panelObserver.observe(panel);
    ctaObserver.observe(inlineCta);
    return () => {
      panelObserver.disconnect();
      ctaObserver.disconnect();
    };
  }, []);
  const isStickyBarVisible = isPanelOffscreen && !isInlineCtaVisible;

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

      {/* The price moment borrows the full ACM's dark panel (its hero and
          "Precio Sugerido de Salida" card are the same near-black surface),
          so the preliminary range visibly foreshadows the document the
          advisor delivers. The "Rango preliminar" chip is doing expectation
          work: it names this as the junior version of a number that exists.
          Deliberately slim -- just the price moment plus a "continues below"
          cue -- so the 01 Pulso card peeks above the fold on a phone. The
          advisor firma and CTA live in section 03, after the value has been
          delivered; the range must not read as the end of the screen. */}
      <div
        ref={heroCardRef}
        className="relative overflow-hidden rounded-card-lg bg-ink text-white shadow-[0_1px_2px_rgba(12,10,9,0.08),0_16px_36px_-16px_rgba(12,10,9,0.45)]"
      >
        {/* Ambient glow, deliberately slow and low-opacity: alive, not
            loading (see index.css glow-pulse). */}
        <div className="pointer-events-none absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-500/15 blur-3xl animate-glow-pulse" />

        <div className="relative p-7 text-center md:p-10">
          <p className="text-[11px] font-bold uppercase tracking-wider text-brand-400">{COPY.reveal.panelChip}</p>
          <p className="mt-3 text-sm font-medium text-neutral-300">{COPY.reveal.headlinePrefix}</p>
          <h3 className="mt-2 text-2xl font-bold leading-tight tabular-nums text-white md:text-4xl">
            {COPY.reveal.headlineRangePrefix}{' '}
            <span className="animate-in fade-in slide-in-from-bottom-1 fill-mode-both duration-500 delay-100">
              {formatCurrency(estimate.low)}
            </span>{' '}
            {COPY.reveal.headlineJoiner}{' '}
            <span className="animate-in fade-in slide-in-from-bottom-1 fill-mode-both duration-500 delay-200">
              {formatCurrency(estimate.high)}
            </span>
          </h3>
          <PreliminaryPricingBar estimate={estimate} />
          <p className="mx-auto max-w-lg text-center text-xs text-neutral-400 md:text-sm">
            {hasPendingComps && !hasComps ? COPY.reveal.researchCaption(colonia) : COPY.reveal.caption(colonia)}
          </p>

          <div className="mt-6 flex flex-col items-center gap-0.5 border-t border-white/10 pt-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
              {COPY.reveal.panelScrollCue}
            </p>
            <ChevronDown className="h-3.5 w-3.5 text-neutral-500" />
          </div>
        </div>
      </div>

      {/* 01 -- zone-level data the visitor didn't have before asking. Every
          value here is derived from real portfolio data (pricing.ts
          baselines, comparableListings.ts counts) or the visitor's own
          estimate; nothing is invented to look thorough. */}
      <div className="space-y-4 rounded-card-lg border border-neutral-200/70 bg-parchment-card/80 p-6 backdrop-blur-md md:p-8">
        <SectionChip label={COPY.reveal.pulse.chip} />
        <h3 className="text-base font-bold text-neutral-900">{COPY.reveal.pulse.title}</h3>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          <PulseTile
            label={COPY.reveal.pulse.m2Label}
            value={formatCurrency(zoneReference.perM2)}
            subline={
              zoneReference.isColoniaSpecific
                ? COPY.reveal.pulse.m2SublineColonia(colonia)
                : COPY.reveal.pulse.m2SublineZona
            }
            className="col-span-2 md:col-span-1"
          />
          <PulseTile
            label={COPY.reveal.pulse.listingsLabel}
            value={COPY.reveal.pulse.listingsValue(totalReadyListingsCount())}
            subline={COPY.reveal.pulse.listingsSubline}
          />
          <PulseTile
            label={COPY.reveal.pulse.rangeWidthLabel}
            value={rangeWidth}
            subline={COPY.reveal.pulse.rangeWidthSubline}
          />
        </div>
      </div>

      {/* 02 -- real references. The nota switches with the data: with
          comparables on screen it carries the report's own "oferta pública"
          caveat; while a colonia is still being researched it explains that
          instead. */}
      <div className="space-y-4 rounded-card-lg border border-neutral-200/70 bg-parchment-card/80 p-6 backdrop-blur-md md:p-8">
        <SectionChip label={COPY.reveal.mercadoChip} />
        <h3 className="text-base font-bold text-neutral-900">
          {hasComps ? COPY.reveal.mercadoTitleWithComps(colonia) : COPY.reveal.mercadoTitleNoComps(colonia)}
        </h3>

        <div className="flex gap-3 rounded-r-xl border-l-4 border-brand-500 bg-neutral-50 p-4">
          <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-600" />
          <div>
            <p className="text-sm font-medium text-neutral-700">
              {hasComps ? COPY.reveal.notaOfertaTag : COPY.reveal.notaPlaceholderTag}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-neutral-500">
              {hasComps ? COPY.reveal.notaOfertaBody : COPY.reveal.notaPlaceholderBody(colonia)}
            </p>
          </div>
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

      {/* 03 -- the gap between rango and precio de salida, then exactly what
          the full document adds. This is the section that keeps "the range
          is all I needed" from being the exit thought: it quantifies what
          the range can't answer and names the deliverable that does. */}
      <div className="space-y-4 rounded-card-lg border border-neutral-200/70 bg-parchment-card/80 p-6 backdrop-blur-md md:p-8">
        <SectionChip label={COPY.reveal.acm.chip} />
        <h3 className="text-base font-bold text-neutral-900">{COPY.reveal.acm.title}</h3>
        <p className="text-sm leading-relaxed text-neutral-600">{COPY.reveal.acm.gapIntro(rangeWidth)}</p>
        <p className="text-sm font-medium leading-relaxed text-neutral-800">{COPY.reveal.acm.marketTruth}</p>

        <ul className="space-y-4 border-t border-neutral-200/70 pt-4">
          {COPY.reveal.acm.checklist.map(({ title, detail }, i) => {
            const Icon = ACM_CHECKLIST_ICONS[i];
            return (
              <li key={title} className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-900">{title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-neutral-500">{detail}</p>
                </div>
              </li>
            );
          })}
        </ul>

        {/* The firma closes the chapter that asks for the conversation:
            a real person with a real job title, introduced after the value
            has been delivered rather than in front of the price. Same
            signature structure as the report hero: micro role label, then
            the name. */}
        <div ref={inlineCtaRef} className="border-t border-neutral-200/70 pt-5">
          <div className="flex flex-col items-center text-center">
            <AdvisorAvatar
              advisor={advisor}
              className="h-14 w-14 flex-shrink-0 border-2 border-brand-500/70 bg-neutral-100"
              iconClassName="h-6 w-6 text-neutral-500"
            />
            <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-brand-600">{advisor.roleLabel}</p>
            <p className="mt-0.5 text-sm font-bold text-neutral-900">{advisor.name}</p>
          </div>
          <p className="mx-auto mt-4 max-w-lg text-center text-sm leading-relaxed text-neutral-600">
            {COPY.reveal.advisorParagraph(advisorFirstName, advisor.gender, colonia)}
          </p>
          <a
            href={whatsappLink(advisor, message)}
            target="_blank"
            rel="noreferrer"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-pill bg-brand-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_-8px_rgba(37,211,102,0.55)] transition-transform active:scale-95 hover:bg-brand-600"
          >
            <MessageCircle className="h-4 w-4" />
            {COPY.reveal.acm.ctaLabel(advisorFirstName)}
          </a>
        </div>
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
