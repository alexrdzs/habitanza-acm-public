import { useEffect, useMemo, useRef, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { PreliminaryPricingBar } from './PreliminaryPricingBar';
import { ComparablesMap } from './ComparablesMap';
import { ComparableListingCards } from './ComparableListingCards';
import { MethodologySection } from './MethodologySection';
import { AdvisorCTA } from './AdvisorCTA';
import { AdvisorAvatar } from './AdvisorAvatar';
import { ADVISORS, whatsappLink, buildWhatsAppMessage } from '@shared/advisors';
import { COMPARABLE_LISTINGS } from '@shared/comparableListings';
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
  // Randomized once per visit so the same advisor's photo/name shown here
  // also appears on the persistent WhatsApp bar below -- and so the team
  // can compare inbound contact between Rogelio and Tere.
  const advisor = useMemo(() => ADVISORS[Math.floor(Math.random() * ADVISORS.length)], []);
  const comps = COMPARABLE_LISTINGS[colonia] ?? [];
  const hasComps = comps.length > 0;
  const message = buildWhatsAppMessage(advisor, tipoPropiedad, colonia);

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
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-5 pb-20 duration-700">
      {/* Plain page text, not a card -- the greeting shouldn't be the thing
          that makes the first card feel heavy. */}
      <div>
        <h2 className="text-xl font-bold leading-snug text-neutral-900 md:text-2xl">
          Estamos listos, {firstName}.
        </h2>
        <p className="mt-1 text-base text-neutral-500">
          Basado en nuestra experiencia y tendencias del mercado, tenemos un primer rango para ti.
        </p>
      </div>

      {/* The one card staged like a certificate being issued (dark ink
          ground, brass trim): price, a personal note from the advisor in
          first person, and their signature -- reads as one signed message
          instead of the price bar dead-ending at the card's edge. */}
      <div
        ref={heroCardRef}
        className="relative overflow-hidden rounded-card-lg bg-gradient-to-b from-ink-soft to-ink p-px shadow-[0_24px_48px_-24px_rgba(16,32,26,0.55)]"
      >
        <div className="relative overflow-hidden rounded-[calc(var(--radius-card-lg)-1px)] p-7 md:p-10">
          <div className="pointer-events-none absolute -left-10 -top-16 h-56 w-56 rounded-full bg-emerald-glow/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-brass/20 blur-3xl" />

          <p className="relative font-mono text-[10px] uppercase tracking-[0.15em] text-brass-soft">
            Rango de precio
          </p>
          <h3 className="relative mt-2 text-lg font-bold leading-snug text-white md:text-xl">
            Tu propiedad estaría en un rango de {formatCurrency(estimate.low)} a {formatCurrency(estimate.high)}
          </h3>
          <PreliminaryPricingBar estimate={estimate} />

          <p className="relative mt-4 border-t border-white/10 pt-6 text-sm leading-relaxed text-neutral-300 md:text-base">
            En los próximos días yo estaré trabajando en un estimado de valor con comparables y te lo enviaré
            personalmente. Gracias por tu confianza.
          </p>

          <div className="relative mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-6">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <AdvisorAvatar
                advisor={advisor}
                className="h-12 w-12 flex-shrink-0 border-2 border-white/25 bg-white/10"
                iconClassName="h-5 w-5 text-white/70"
              />
              <div className="min-w-0">
                <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-neutral-500">Firma</p>
                <p className="truncate text-sm font-bold text-white">{advisor.name}</p>
                <p className="truncate text-xs text-neutral-400">{advisor.roleLabel}</p>
              </div>
            </div>
            <a
              href={whatsappLink(advisor, message)}
              target="_blank"
              rel="noreferrer"
              className="flex flex-shrink-0 items-center gap-1.5 rounded-pill bg-brand-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform active:scale-95 hover:bg-brand-600"
            >
              <MessageCircle className="h-4 w-4" />
              Chatear
            </a>
          </div>
        </div>
      </div>

      <div className="space-y-5 rounded-card-lg border border-neutral-200 bg-parchment-card p-6 md:p-8">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-brass">Mercado de la zona</p>
          <h3 className="mt-1 text-base font-bold text-neutral-900">
            {hasComps ? `Referencias reales en ${colonia}` : `Armando referencias para ${colonia}`}
          </h3>
        </div>

        <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 px-4 py-3.5">
          <p className="text-[10px] font-bold uppercase tracking-wide text-neutral-400">
            Nota sobre la zona [placeholder]
          </p>
          <p className="mt-1 text-sm italic leading-relaxed text-neutral-500">
            Espacio reservado para una nota específica sobre {colonia} — texto por definir.
          </p>
        </div>

        {hasComps ? (
          <div className="space-y-3 md:flex md:gap-3 md:space-y-0">
            <div className="md:w-1/2">
              <ComparablesMap listings={comps} />
            </div>
            <div className="md:w-1/2">
              <ComparableListingCards listings={comps} />
            </div>
          </div>
        ) : (
          <p className="text-sm leading-relaxed text-neutral-500">
            Todavía no tenemos comparables específicos de {colonia} en nuestro sistema — tu asesor los incluirá al
            preparar tu Análisis Comparativo de Mercado completo.
          </p>
        )}
      </div>

      <MethodologySection />

      <AdvisorCTA advisor={advisor} tipoPropiedad={tipoPropiedad} colonia={colonia} visible={isStickyBarVisible} />
    </div>
  );
}
