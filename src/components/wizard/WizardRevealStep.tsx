import { IS_EVENT_MODE } from '../../lib/eventMode';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeftRight, Building2, FileSearch, LineChart, MapPin, MessageCircle, Route, Ruler, Home, CalendarClock, Target, Share2 } from 'lucide-react';
import { ValuationShareSheet } from './ValuationShareSheet';
import { RevealPricePanel } from './RevealPricePanel';
import { ReadingList } from './ReadingList';
import { readProperty } from '../../lib/propertyReading';
import type { PropertyProfile } from './PropertySummaryCard';
import { ComparablesMap } from './ComparablesMap';
import { ComparableListingCards } from './ComparableListingCards';
import { ZoneProfile } from './ZoneProfile';
import { SlideBullets, SlideCard } from './SlideCard';
import { AdvisorAvatar } from './AdvisorAvatar';
import { AdvisorCTA } from './AdvisorCTA';
import { whatsappLink, buildWhatsAppMessage, type Advisor } from '@shared/advisors';
import { pendingComparableListings, readyComparableListings, totalReadyListingsCount } from '@shared/comparableListings';
import { COPY } from '@shared/copy';
import { referencePerM2, type PreliminaryEstimate } from '@shared/pricing';
import { formatCurrency, formatPhone } from '../../lib/utils';

interface Props {
  estimate: PreliminaryEstimate;
  nombre: string;
  tipoPropiedad: string;
  colonia: string;
  profile: PropertyProfile;
  // Chosen upstream (at submit) so the CRM webhook, the firma, and the
  // WhatsApp CTA all reference the same assigned broker.
  advisor: Advisor;
  // Two-panel layout: the range panel is rendered by the page, not here.
  wide?: boolean;
}

// Order-matched with COPY.reveal.acm.checklist.
const MEETING_ICONS = [FileSearch, Target, Route];

// The reveal is a mini, market-first presentation whose only job is to get a
// meeting: the range, what the zone is doing, the references behind it, and
// the next step. The visitor's own property shows up only as header chips.
export function WizardRevealStep({ estimate, nombre, tipoPropiedad, colonia, profile, advisor, wide = false }: Props) {
  const firstName = nombre.trim().split(' ')[0] || 'gracias';
  const advisorFirstName = advisor.name.split(' ')[0];
  const { pros, cons } = readProperty(profile, tipoPropiedad, colonia);
  const comps = readyComparableListings(colonia);
  const pendingComps = pendingComparableListings(colonia);
  const hasComps = comps.length > 0;
  const hasPendingComps = pendingComps.length > 0;
  const precioResultado = `${formatCurrency(estimate.low)} a ${formatCurrency(estimate.high)}`;
  const message = buildWhatsAppMessage(advisor, nombre, tipoPropiedad, colonia, precioResultado);
  const zoneReference = referencePerM2(colonia, tipoPropiedad);
  const rangeWidth = formatCurrency(estimate.high - estimate.low);

  const [shareOpen, setShareOpen] = useState(false);
  const F = COPY.share.features;
  const shareFeatures = [
    profile.m2Construccion && F.construction(profile.m2Construccion),
    profile.m2Terreno && F.land(profile.m2Terreno),
    profile.recamaras && F.bedrooms(profile.recamaras),
    profile.banos && F.baths(profile.banos),
    profile.estacionamientos && F.parking(profile.estacionamientos),
  ].filter((x): x is string => Boolean(x));

  // The sticky bottom CTA appears once the range panel has scrolled away and
  // yields while the closing card's own CTA is on screen, so two green
  // WhatsApp buttons never stack.
  const heroCardRef = useRef<HTMLDivElement>(null);
  const inlineCtaRef = useRef<HTMLDivElement>(null);
  const [isPanelOffscreen, setIsPanelOffscreen] = useState(false);
  const [isInlineCtaVisible, setIsInlineCtaVisible] = useState(false);

  useEffect(() => {
    const panel = heroCardRef.current;
    const inlineCta = inlineCtaRef.current;
    if (!inlineCta) return;
    const ctaObserver = new IntersectionObserver(([entry]) => setIsInlineCtaVisible(entry.isIntersecting), {
      threshold: 0,
    });
    ctaObserver.observe(inlineCta);
    const panelObserver = new IntersectionObserver(([entry]) => setIsPanelOffscreen(!entry.isIntersecting), {
      threshold: 0,
    });
    if (panel) panelObserver.observe(panel);
    return () => {
      panelObserver.disconnect();
      ctaObserver.disconnect();
    };
  }, []);
  const isStickyBarVisible = isPanelOffscreen && !isInlineCtaVisible;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 grid grid-cols-1 gap-3 pb-20 duration-700 md:gap-5 lg:grid-cols-2">
      {!wide && (
        <>
          <div className="pb-2 text-center md:text-left lg:hidden">
            <h2 className="text-lg font-medium leading-snug text-neutral-900 md:text-xl">{COPY.reveal.greeting(firstName)}</h2>
            <p className="mt-1 text-sm text-neutral-500">{IS_EVENT_MODE ? COPY.event.revealSubtext : COPY.reveal.subtext}</p>
          </div>
          <div className="lg:col-span-2">
            <RevealPricePanel
              estimate={estimate}
              nombre={nombre}
              colonia={colonia}
              profile={profile}
              tipoPropiedad={tipoPropiedad}
              panelRef={heroCardRef}
            />
          </div>
        </>
      )}

      {/* 01 -- the property read against the zone: what helps, what to watch. */}
      {(pros.length > 0 || cons.length > 0) && (
        <div className="lg:col-span-2">
          <SlideCard compact chip={COPY.reveal.reading.chip} title={COPY.reveal.reading.title}>
            <div className="grid gap-3 md:gap-5 lg:grid-cols-2">
              {pros.length > 0 && <ReadingList title={COPY.reveal.reading.prosTitle} items={pros} tone="green" />}
              {cons.length > 0 && <ReadingList title={COPY.reveal.reading.consTitle} items={cons} tone="red" />}
            </div>
          </SlideCard>
        </div>
      )}

      {/* 01 -- what the market says: ONE card, two clear columns from lg
          (zone numbers | the references behind the range). */}
      <div className="lg:col-span-2">
        <SlideCard compact chip={COPY.reveal.market.chip} title={COPY.reveal.pulse.title(colonia)}>
          <div className="space-y-6 lg:grid lg:grid-cols-2 lg:space-y-0 lg:divide-x lg:divide-neutral-200/70">
            <div className="space-y-4 lg:flex lg:flex-col lg:pr-8">
              <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 md:text-xs">{COPY.reveal.market.statsLabel}</p>
              {/* From lg the three rows spread over the column height, so the
                  left side matches the map column instead of leaving a gap. */}
              <div>
              <SlideBullets
                compact
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
              </div>
              <ZoneProfile colonia={colonia} />
            </div>
            <div className="space-y-3 lg:pl-8">
              <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 md:text-xs">{COPY.reveal.mercadoSubtitle}</p>
              {hasComps || hasPendingComps ? (
                <div className="space-y-3 md:flex md:gap-3 md:space-y-0 lg:block lg:space-y-3">
                  <div className="md:w-1/2 lg:w-full">
                    <ComparablesMap listings={comps} colonia={colonia} researchCount={pendingComps.length} />
                  </div>
                  <div className="md:w-1/2 lg:w-full">
                    <ComparableListingCards
                      listings={hasComps ? comps : pendingComps}
                      researchLabel={hasPendingComps ? COPY.reveal.researchCardsLabel(pendingComps.length) : undefined}
                    />
                  </div>
                </div>
              ) : (
                <p className="text-sm leading-relaxed text-neutral-500">{COPY.reveal.noCompsBody(colonia)}</p>
              )}
              <p className="text-xs leading-relaxed text-neutral-500">
                {hasComps ? COPY.reveal.notaOfertaBody : COPY.reveal.notaPlaceholderBody(colonia)}
              </p>
            </div>
          </div>
        </SlideCard>
      </div>

      {/* The ask: a meeting to turn the range into an exact price. In event
          mode the broker is sitting right there, so no named advisor and no
          button: the copy just invites to pick a day together. */}
      <div className="lg:col-span-2">
        <SlideCard
          compact
          chip={COPY.reveal.meeting.chip}
          title={IS_EVENT_MODE ? COPY.event.meeting.title : COPY.reveal.meeting.title}
          subtitle={IS_EVENT_MODE ? COPY.event.meeting.subtitle : COPY.reveal.meeting.subtitle}
        >
          {/* Two columns from lg, like the card above: the checklist | the
              broker with two small buttons (not full width). */}
          <div className={IS_EVENT_MODE ? '' : 'space-y-6 lg:grid lg:grid-cols-2 lg:space-y-0 lg:divide-x lg:divide-neutral-200/70'}>
            <div className={IS_EVENT_MODE ? 'lg:[&>ul]:grid lg:[&>ul]:grid-cols-3 lg:[&>ul]:gap-8 lg:[&>ul]:space-y-0' : 'lg:pr-8'}>
              <SlideBullets
                compact
                items={COPY.reveal.acm.checklist.map((c, i) => ({
                  ...c,
                  detail: IS_EVENT_MODE && i === 0 ? COPY.event.meeting.checklistFirstDetail : c.detail,
                  icon: MEETING_ICONS[i],
                }))}
              />
            </div>
            <div ref={inlineCtaRef} hidden={IS_EVENT_MODE} className="space-y-5 text-center lg:flex lg:flex-col lg:items-center lg:justify-center lg:pl-8">
              {!IS_EVENT_MODE && (
                <div className="flex flex-col items-center gap-2">
                  <AdvisorAvatar
                    advisor={advisor}
                    className="h-24 w-24 flex-shrink-0 border-2 border-brand-500/70 bg-neutral-100"
                    iconClassName="h-9 w-9 text-neutral-400"
                  />
                  <div className="min-w-0">
                    <p className="text-lg font-bold leading-tight text-neutral-900">{advisor.name}</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wider text-brand-600">{advisor.roleLabel}</p>
                    <p className="mt-1 text-sm text-neutral-500">{formatPhone(advisor.phone)}</p>
                  </div>
                </div>
              )}
              {!IS_EVENT_MODE && (
                <div className="flex flex-wrap justify-center gap-3">
                  <a
                    href={whatsappLink(advisor, message)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-pill bg-brand-500 bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white transition-transform active:scale-95"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {COPY.reveal.meeting.ctaLabel(advisorFirstName)}
                  </a>
                  <button
                    type="button"
                    onClick={() => setShareOpen(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-pill border border-brand-500 bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 transition-transform active:scale-95"
                  >
                    <Share2 className="h-4 w-4" />
                    {COPY.share.button}
                  </button>
                </div>
              )}
            </div>
          </div>
        </SlideCard>
      </div>

      {IS_EVENT_MODE && !shareOpen && (
        <button
          type="button"
          onClick={() => setShareOpen(true)}
          className="fixed bottom-8 right-8 z-30 inline-flex items-center gap-3 rounded-pill bg-brand-500 bg-brand-gradient px-7 py-4 text-base font-bold text-white shadow-[0_12px_28px_-8px_rgba(22,163,74,0.55)] transition-transform active:scale-95"
        >
          <Share2 className="h-5 w-5" />
          {COPY.event.shareFab}
        </button>
      )}

      {shareOpen && (
        <ValuationShareSheet
          onClose={() => setShareOpen(false)}
          nombre={nombre}
          tipoPropiedad={tipoPropiedad}
          colonia={colonia}
          low={estimate.low}
          high={estimate.high}
          features={shareFeatures}
          brokerName={advisor.name}
          brokerRole={advisor.roleLabel}
          brokerPhone={formatPhone(advisor.phone)}
          brokerPhotoUrl={advisor.imageUrl}
          firstName={firstName}
        />
      )}

      {/* On wide screens the range panel (with its CTA) is always on screen. */}
      {!wide && !IS_EVENT_MODE && (
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
