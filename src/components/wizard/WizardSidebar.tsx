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
}

// Right panel of the two-panel layout: the zone map as a backdrop with a frosted
// "ficha" on top that fills in, with an icon per answer, as the visitor goes.
export function WizardSidebar(p: Props) {
  const S = COPY.sidebar;
  const empty = !p.colonia && !p.m2Construccion && !p.m2Terreno && !p.antiguedad && !p.recamaras && !p.banos && !p.estacionamientos;

  const glass =
    'rounded-2xl border border-white/70 bg-white/85 shadow-[0_8px_24px_-12px_rgba(15,23,42,0.25)] backdrop-blur-xl';

  return (
    <div className={`h-full p-2.5 ${IS_EVENT_MODE ? 'pl-0' : ''}`}>
      <div className={`relative h-full overflow-hidden rounded-[1.5rem] ${IS_EVENT_MODE ? '' : 'shadow-[0_12px_32px_-16px_rgba(15,23,42,0.35)] ring-1 ring-neutral-200/70'}`}>
        <ZoneMap colonia={p.colonia} pinCount={p.pinCount ?? 0} />


        {!p.intro && (
        <div className="absolute inset-x-3 top-[52px]">
          {/* top offset: the logo row lines up with the step title on the left. */}
          <div className={`${glass} animate-in p-3.5 duration-700 fade-in slide-in-from-top-3 [animation-delay:550ms] [animation-fill-mode:both]`}>
            {(
              <div className="mb-6">
                {/* The logo sits alone on its own line; "Tu propiedad" goes below it. */}
                <div className="flex justify-end">
                  <Logo className="h-8 text-neutral-900" />
                </div>
                {!empty && (
                  <p className="mt-5 text-[11px] font-bold uppercase tracking-wider text-neutral-400">{S.summaryLabel}</p>
                )}
              </div>
            )}
            {empty ? (
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold leading-tight text-neutral-900">{S.title}</h2>
                <hr className="border-t border-neutral-200/70" />
                <p className="text-sm text-neutral-600">{S.subtitle}</p>
              </div>
            ) : (
              <PropertyFicha {...p} />
            )}
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
