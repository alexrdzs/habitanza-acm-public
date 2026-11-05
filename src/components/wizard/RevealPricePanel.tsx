import { Logo } from '../Logo';
import { IS_EVENT_MODE } from '../../lib/eventMode';
import type { Ref } from 'react';
import { PreliminaryPricingBar } from './PreliminaryPricingBar';
import { PropertyFicha } from './PropertyFicha';
import type { PropertyProfile } from './PropertySummaryCard';
import { pendingComparableListings, readyComparableListings } from '@shared/comparableListings';
import { COPY } from '@shared/copy';
import type { PreliminaryEstimate } from '@shared/pricing';
import { formatCurrency } from '../../lib/utils';

interface Props {
  estimate: PreliminaryEstimate;
  nombre: string;
  tipoPropiedad: string;
  colonia: string;
  profile: PropertyProfile;
  panelRef?: Ref<HTMLDivElement>;
}

// The reveal's range moment: ONE light glass card (no card inside a card).
// From lg it has two columns: the greeting + the property summary (the same
// PropertyFicha as the wizard) on the left, the RANGE bar on the right. It
// never shows a single price. Stacked on phones: range first, summary last.
export function RevealPricePanel({ estimate, nombre, tipoPropiedad, colonia, profile, panelRef }: Props) {
  const firstName = nombre.trim().split(' ')[0] || 'gracias';
  const hasComps = readyComparableListings(colonia).length > 0;
  const hasPendingComps = pendingComparableListings(colonia).length > 0;
  const caption = hasPendingComps && !hasComps ? COPY.reveal.researchCaption(colonia) : COPY.reveal.caption(colonia);
  const str = (n?: number) => (n ? String(n) : '');

  return (
    // Glass over a soft green wash: the frosted surface needs something behind
    // it to pick up, so a slow-pulsing glow sits under it.
    <div
      ref={panelRef}
      className="relative overflow-hidden rounded-card-lg border border-white/70 bg-gradient-to-br from-brand-50/40 via-white to-emerald-50/40 shadow-[0_1px_2px_rgba(12,10,9,0.05),0_16px_36px_-20px_rgba(22,163,74,0.2)]"
    >
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-500/8 blur-3xl animate-glow-pulse" />

      <Logo className="absolute right-8 top-7 z-10 hidden h-7 text-neutral-900 lg:block" />
      <div className="relative flex flex-col gap-6 p-6 md:p-8 lg:grid lg:grid-cols-2 lg:items-center lg:gap-10 lg:px-10 lg:pb-14 lg:pt-10">
        <div className="order-2 lg:order-1">
          <div className="hidden lg:mb-12 lg:block">
            <h2 className="text-2xl font-semibold leading-snug text-neutral-900">{COPY.reveal.greeting(firstName)}</h2>
            <p className="mt-1 text-sm text-neutral-500">{IS_EVENT_MODE ? COPY.event.revealSubtext : COPY.reveal.subtext}</p>
          </div>
          <div className="border-t border-neutral-200/70 pt-5 lg:border-0 lg:pt-0">
            <PropertyFicha
              colonia={colonia}
              tipoPropiedad={tipoPropiedad}
              m2Construccion={str(profile.m2Construccion)}
              m2Terreno={str(profile.m2Terreno)}
              recamaras={str(profile.recamaras)}
              banos={str(profile.banos)}
              estacionamientos={str(profile.estacionamientos)}
              antiguedad={profile.antiguedad ?? ''}
              amenidades={profile.amenidades}
            />
          </div>
        </div>

        <div className="order-1 text-center lg:order-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-brand-600 md:text-xs">{COPY.reveal.panelChip}</p>
          {/* Phone/tablet: the range as text. From lg the bar's own end labels
              carry the numbers, so this is hidden. */}
          <div className="lg:hidden">
            <p className="mt-3 text-[13px] font-medium text-neutral-500">{COPY.reveal.headlinePrefix}</p>
            <h3 className="mt-1.5 text-xl font-bold leading-tight tracking-tight tabular-nums text-neutral-900 md:text-4xl">
              <span className="animate-in fade-in slide-in-from-bottom-1 fill-mode-both duration-500 delay-100">
                {formatCurrency(estimate.low)}
              </span>{' '}
              {COPY.reveal.headlineJoiner}{' '}
              <span className="animate-in fade-in slide-in-from-bottom-1 fill-mode-both duration-500 delay-200">
                {formatCurrency(estimate.high)}
              </span>
            </h3>
          </div>
          <PreliminaryPricingBar estimate={estimate} />
          <p className="mx-auto mt-2 max-w-lg text-[10px] leading-snug text-neutral-400">{caption}</p>
        </div>
      </div>
    </div>
  );
}
