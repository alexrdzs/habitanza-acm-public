import { IS_EVENT_MODE } from '../../lib/eventMode';
import { Logo } from '../Logo';
import { COPY } from '@shared/copy';
import { PropertyFicha } from './PropertyFicha';
import { ZoneMap } from './ZoneMap';

interface Props {
  colonia: string;
  tipoPropiedad: string;
  m2Construccion: string;
  m2Terreno: string;
  recamaras: string;
  banos: string;
  estacionamientos: string;
  antiguedad: string;
  amenidades: string[];
  /** Event home: only the map shows (the testimonials grid covers it); the ficha waits for the first step. */
  intro?: boolean;
  /** Search pins on the map: starts high and narrows as the ficha fills in. */
  pinCount?: number;
  /** Analyzing step only: drives the comparable photos on the map. */
  analyzingStage?: number;
  /** Show "Destacado" in the ficha: from "¿Qué la hace especial?" on. */
  showHighlights?: boolean;
}

// Right panel of the two-panel layout: the zone map as a backdrop with a frosted
// "ficha" on top that fills in, with an icon per answer, as the visitor goes.
export function WizardSidebar(p: Props) {
  const S = COPY.sidebar;
  const empty = !p.colonia && !p.m2Construccion && !p.m2Terreno && !p.antiguedad && !p.recamaras && !p.banos && !p.estacionamientos;

  const glass =
    'rounded-2xl border border-neutral-200/60 bg-parchment-card/85 shadow-[0_8px_24px_-12px_rgba(15,23,42,0.25)] backdrop-blur-xl';

  return (
    <div className={`flex h-full flex-col px-2.5 pb-10 pt-0 ${IS_EVENT_MODE ? 'pl-0' : ''}`}>
      {/* The logo lives above the map, top right, so the card stays clean. The 76px row puts the map's top on the step title's top; pb-10 puts its bottom on the Back/Continue buttons' bottom (WizardShell's md:pb-10). */}
      <div className="flex h-[76px] shrink-0 items-center justify-end px-3">
        <Logo className="h-8 text-neutral-900" />
      </div>
      <div className={`relative min-h-0 flex-1 overflow-hidden rounded-[1.5rem] ${IS_EVENT_MODE ? '' : 'shadow-[0_12px_32px_-16px_rgba(15,23,42,0.35)] ring-1 ring-neutral-200/70'}`}>
        <ZoneMap colonia={p.colonia} pinCount={p.pinCount ?? 0} analyzingStage={p.analyzingStage} />


        {!p.intro && (
        <div className="absolute inset-x-3 top-3">
          <div className={`${glass} animate-in p-3.5 duration-700 fade-in slide-in-from-top-3 [animation-delay:550ms] [animation-fill-mode:both]`}>
            {!empty && (
              <p className="mb-4 text-[11px] font-bold uppercase tracking-wider text-neutral-400">{S.summaryLabel}</p>
            )}
            {empty ? (
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold leading-tight text-neutral-900">{S.title}</h2>
                <hr className="border-t border-neutral-200/70" />
                <p className="text-sm text-neutral-600">{S.subtitle}</p>
              </div>
            ) : (
              <PropertyFicha {...p} showHighlights={!!p.showHighlights} />
            )}
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
