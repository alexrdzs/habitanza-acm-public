import { Logo } from '../Logo';
import { IS_EVENT_MODE } from '../../lib/eventMode';
import type { Ref } from 'react';
import { PreliminaryPricingBar } from './PreliminaryPricingBar';
import { PropertyFicha } from './PropertyFicha';
import type { PropertyProfile } from './PropertySummaryCard';
import { pendingComparableListings, readyComparableListings } from '@shared/comparableListings';
import { COPY } from '@shared/copy';
import type { PreliminaryEstimate } from '@shared/pricing';
import { formatMillions } from '../../lib/utils';

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
      className="relative overflow-hidden rounded-card-lg border border-neutral-200/70 bg-parchment-card/80 backdrop-blur-md"
    >

      <Logo className="absolute right-8 top-7 z-10 hidden h-7 text-neutral-900 lg:block" />
      <div className="relative flex flex-col gap-5 p-5 md:p-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-10 lg:gap-y-8 lg:p-8">
        <div className="hidden lg:col-span-2 lg:block">
          <h2 className="text-xl font-extrabold leading-tight tracking-tight text-neutral-900 md:text-2xl">{COPY.reveal.greeting(firstName)}</h2>
          <p className="mt-3 text-sm text-neutral-500 md:text-base">{IS_EVENT_MODE ? COPY.event.revealSubtext : COPY.reveal.subtext}</p>
          <div className="mt-6 h-px w-16 bg-gradient-to-r from-brand-500 to-transparent" />
        </div>

        {/* The whole property sheet across the card. */}
        <div className="order-2 border-t border-neutral-200/70 pt-5 lg:self-stretch lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0 lg:flex lg:flex-col lg:justify-center">
          <PropertyFicha
            large
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

        {/* The range, centered. First thing on phones. */}
        <div className="order-1 mx-auto w-full max-w-3xl text-center lg:flex lg:flex-col lg:justify-center">
          <p className="text-[11px] font-bold uppercase tracking-wider text-brand-600 md:text-xs">{COPY.reveal.panelChip}</p>
          {/* Phone/tablet: the range as text. From lg the bar's own end labels
              carry the numbers, so this is hidden. */}
          <div>
            <p className="mt-3 text-[13px] font-medium text-neutral-500">{COPY.reveal.headlinePrefix}</p>
            <h3 className="mt-1.5 text-xl font-bold leading-tight tracking-tight tabular-nums text-neutral-900 md:text-4xl">
              <span className="animate-in fade-in slide-in-from-bottom-1 fill-mode-both duration-500 delay-100">
                {formatMillions(estimate.low)}
              </span>{' '}
              <span className="font-light text-neutral-400">-</span>{' '}
              <span className="animate-in fade-in slide-in-from-bottom-1 fill-mode-both duration-500 delay-200">
                {formatMillions(estimate.high)}
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
