import { IS_EVENT_MODE } from '../../lib/eventMode';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeftRight, Building2, FileSearch, Info, LineChart, Route, Target } from 'lucide-react';
import { RevealPricePanel } from './RevealPricePanel';
import { PropertySummaryCard, type PropertyProfile } from './PropertySummaryCard';
import { ComparablesMap } from './ComparablesMap';
import { ComparableListingCards } from './ComparableListingCards';
import { ZoneProfile } from './ZoneProfile';
import { MethodologySection } from './MethodologySection';
import { SlideBullets, SlideCard } from './SlideCard';
import { TestimonialsCarousel } from './TestimonialsCarousel';
import { AdvisorCTA } from './AdvisorCTA';
import { AdvisorClosingSection } from './AdvisorClosingSection';
import type { Advisor } from '@shared/advisors';
import { pendingComparableListings, readyComparableListings, totalReadyListingsCount } from '@shared/comparableListings';
import { COPY } from '@shared/copy';
import { referencePerM2, type PreliminaryEstimate } from '@shared/pricing';
import { formatCurrency } from '../../lib/utils';

interface Props {
  estimate: PreliminaryEstimate;
  nombre: string;
  tipoPropiedad: string;
  colonia: string;
  profile: PropertyProfile;
  // Chosen upstream (at submit) so the CRM webhook, the firma, and the
  // WhatsApp CTA all reference the same assigned broker.
  advisor: Advisor;
  // Two-panel layout: the price panel is rendered by the page, not here.
  wide?: boolean;
}

// Order-matched with COPY.reveal.acm.checklist.
const ACM_CHECKLIST_ICONS = [FileSearch, Target, Route];

export function WizardRevealStep({ estimate, nombre, tipoPropiedad, colonia, profile, advisor, wide = false }: Props) {
  const firstName = nombre.trim().split(' ')[0] || 'gracias';
  const comps = readyComparableListings(colonia);
  const pendingComps = pendingComparableListings(colonia);
  const hasComps = comps.length > 0;
  const hasPendingComps = pendingComps.length > 0;
  // The estimate result, exactly as shown in the price panel, pre-filled into
  // every WhatsApp CTA on the screen.
  const precioResultado = `${formatCurrency(estimate.low)} a ${formatCurrency(estimate.high)}`;
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
      {!wide && (
        <>
          {/* Plain page text, not a card -- centered on mobile (where it
              reads as the screen's title), left-aligned on tablet. On wide
              screens the greeting and price panel live in the left column
              (see RevealPricePanel). */}
          <div className="pb-2 text-center md:text-left">
            <h2 className="text-lg font-medium leading-snug text-neutral-900 md:text-xl">{COPY.reveal.greeting(firstName)}</h2>
            <p className="mt-1 text-sm text-neutral-500">{IS_EVENT_MODE ? COPY.event.revealSubtext : COPY.reveal.subtext}</p>
          </div>
          <RevealPricePanel
            estimate={estimate}
            nombre={nombre}
            tipoPropiedad={tipoPropiedad}
            colonia={colonia}
            advisor={advisor}
            panelRef={heroCardRef}
          />
        </>
      )}

      {wide && (
        <p className="text-xs leading-snug text-neutral-500">
          {hasPendingComps && !hasComps ? COPY.reveal.researchCaption(colonia) : COPY.reveal.caption(colonia)}
        </p>
      )}

      {/* "Tu propiedad" -- bridges the zone-average price panel to the
          numbered market chapters by echoing the visitor's own inputs as the
          basis for the estimate. Unnumbered (neutral chip): it's their data,
          not a market chapter. */}
      <PropertySummaryCard profile={profile} tipoPropiedad={tipoPropiedad} colonia={colonia} estimate={estimate} />

      {/* 01 -- zone-level data the visitor didn't have before asking. Every
          value here is derived from real portfolio data (pricing.ts
          baselines, comparableListings.ts counts) or the visitor's own
          estimate; nothing is invented to look thorough. */}
      <SlideCard chip={COPY.reveal.pulse.chip} title={COPY.reveal.pulse.title} subtitle={COPY.reveal.pulse.subtitle}>
        <SlideBullets
          items={[
            {
              icon: LineChart,
              title: COPY.reveal.pulse.m2Label,
              detail: zoneReference.isColoniaSpecific
                ? COPY.reveal.pulse.m2SublineColonia(colonia)
                : COPY.reveal.pulse.m2SublineZona,
              value: formatCurrency(zoneReference.perM2),
            },
            {
              icon: Building2,
              title: COPY.reveal.pulse.listingsLabel,
              detail: COPY.reveal.pulse.listingsSubline,
              value: COPY.reveal.pulse.listingsValue(totalReadyListingsCount()),
            },
            {
              icon: ArrowLeftRight,
              title: COPY.reveal.pulse.rangeWidthLabel,
              detail: COPY.reveal.pulse.rangeWidthSubline,
              value: rangeWidth,
            },
          ]}
        />
      </SlideCard>

      {/* 02 -- real references. The nota switches with the data: with
          comparables on screen it carries the report's own "oferta pública"
          caveat; while a colonia is still being researched it explains that
          instead. */}
      <SlideCard chip={COPY.reveal.mercadoChip} title={COPY.reveal.mercadoTitle} subtitle={COPY.reveal.mercadoSubtitle}>
        <ZoneProfile colonia={colonia} />

        <div className="flex gap-3 rounded-r-xl border-l-4 border-brand-500 bg-neutral-50 p-4">
          <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-600 dark:text-brand-400" />
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
      </SlideCard>

      {/* 03 -- the gap between rango and precio de salida, then exactly what
          the full document adds. This is the section that keeps "the range
          is all I needed" from being the exit thought: it quantifies what
          the range can't answer and names the deliverable that does. */}
      <SlideCard chip={COPY.reveal.acm.chip} title={COPY.reveal.acm.title} subtitle={COPY.reveal.acm.gapIntro(rangeWidth)}>
        <SlideBullets items={COPY.reveal.acm.checklist.map((c, i) => ({ ...c, icon: ACM_CHECKLIST_ICONS[i] }))} />
        <p className="rounded-r-xl border-l-4 border-brand-500 bg-neutral-50 p-4 text-sm font-medium leading-relaxed text-neutral-800 md:text-base">
          {COPY.reveal.acm.marketTruth}
        </p>
      </SlideCard>

      <MethodologySection />

      {/* Repeated from the Hero, deliberately -- someone who scrolled all
          the way to a price should get one more nudge of social proof right
          before deciding whether to reach out. */}
      <TestimonialsCarousel />

      {/* The very bottom: the assigned advisor's profile + the only inline
          CTA on the screen, followed by the rest of the team. Its dark
          surface bookends the price panel the way the full report's dark
          hero and footer bracket its body. */}
      <AdvisorClosingSection
        advisor={advisor}
        nombre={nombre}
        tipoPropiedad={tipoPropiedad}
        colonia={colonia}
        precio={precioResultado}
        ctaRef={inlineCtaRef}
      />

      {/* On wide screens the price panel (with its CTA) is always on screen. */}
      {!wide && (
        <AdvisorCTA
          advisor={advisor}
          nombre={nombre}
          tipoPropiedad={tipoPropiedad}
          colonia={colonia}
          precio={precioResultado}
          visible={isStickyBarVisible}
        />
      )}
    </div>
  );
}
