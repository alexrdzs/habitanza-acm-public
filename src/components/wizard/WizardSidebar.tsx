import { Bath, BedDouble, Building2, CalendarDays, Car, House, LandPlot, MapPin, Ruler, Sparkles, type LucideIcon } from 'lucide-react';
import { IS_EVENT_MODE } from '../../lib/eventMode';
import { Logo } from '../Logo';
import { COPY } from '@shared/copy';
import { FEATURE_ICONS } from './WizardExtrasStep';
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

const TYPE_ICONS: Record<string, LucideIcon> = { Casa: House, Departamento: Building2, Terreno: LandPlot };

type Cell = { Icon: LucideIcon; label: string; value: string };

// Same short text as the picker ("Entre 10 y 20 años" -> "10 a 20 años").
const shortAge = (a: string) => COPY.age.short[a] ?? a;

// Right panel of the two-panel layout: the zone map as a backdrop with a frosted
// "ficha" on top that fills in, with an icon per answer, as the visitor goes.
export function WizardSidebar(p: Props) {
  const S = COPY.sidebar;
  // Header = location + type. Everything else is one 3-column grid of
  // label + value cells (built, land, age / rooms), in a fixed order; a cell
  // only appears once answered.
  const size = [
    p.m2Construccion && { Icon: Ruler, label: S.construccion, value: `${p.m2Construccion} m²` },
    p.m2Terreno && { Icon: LandPlot, label: S.terreno, value: `${p.m2Terreno} m²` },
    p.antiguedad && { Icon: CalendarDays, label: S.antiguedad, value: shortAge(p.antiguedad) },
  ].filter(Boolean) as Cell[];
  const rooms = [
    p.recamaras && { Icon: BedDouble, label: S.recamaras, value: p.recamaras },
    p.banos && { Icon: Bath, label: S.banos, value: p.banos },
    p.estacionamientos && { Icon: Car, label: S.estacionamientos, value: p.estacionamientos },
  ].filter(Boolean) as Cell[];
  const empty = !p.colonia && size.length === 0 && rooms.length === 0;

  const glass =
    'rounded-2xl border border-white/70 bg-white/85 shadow-[0_8px_24px_-12px_rgba(15,23,42,0.25)] backdrop-blur-xl';

  return (
    <div className={`h-full p-2.5 ${IS_EVENT_MODE ? 'pl-0' : ''}`}>
      <div className={`relative h-full overflow-hidden rounded-[1.5rem] ${IS_EVENT_MODE ? '' : 'shadow-[0_12px_32px_-16px_rgba(15,23,42,0.35)] ring-1 ring-neutral-200/70'}`}>
        <ZoneMap colonia={p.colonia} pinCount={p.pinCount ?? 0} />


        {!p.intro && (
        <div className="absolute inset-x-3 top-3">
          <div className={`${glass} animate-in p-3.5 duration-700 fade-in slide-in-from-top-3 [animation-delay:550ms] [animation-fill-mode:both]`}>
            {(
              <div className="mb-5 flex items-center justify-between gap-3">
                <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">{empty ? '' : S.summaryLabel}</p>
                <Logo className="h-8 text-neutral-900" />
              </div>
            )}
            {empty ? (
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold leading-tight text-neutral-900">{S.title}</h2>
                <hr className="border-t border-neutral-200/70" />
                <p className="text-sm text-neutral-600">{S.subtitle}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {p.colonia && (
                  <div className="flex items-center justify-between gap-3">
                    <p className="flex min-w-0 items-center gap-2 text-lg font-bold leading-tight text-neutral-900">
                      <MapPin className="h-[18px] w-[18px] shrink-0 text-brand-600" strokeWidth={2} />
                      <span className="truncate">{p.colonia}</span>
                    </p>
                    {p.tipoPropiedad && (
                      <p className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-neutral-700">
                        {(() => {
                          const T = TYPE_ICONS[p.tipoPropiedad] ?? House;
                          return <T className="h-4 w-4 text-brand-600" strokeWidth={2} />;
                        })()}
                        {p.tipoPropiedad}
                      </p>
                    )}
                  </div>
                )}

                {[size, rooms].map(
                  (row, r) =>
                    row.length > 0 && (
                      <dl key={r} className="grid animate-in grid-cols-3 gap-x-3 border-t border-neutral-200/70 pt-3 duration-300 fade-in">
                        {row.map(({ Icon, label, value }) => (
                          <div key={label} className="min-w-0">
                            <dt className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                              <Icon className="h-3.5 w-3.5 shrink-0 text-brand-600" strokeWidth={2} />
                              <span className="truncate">{label}</span>
                            </dt>
                            <dd className="mt-0.5 truncate text-[15px] font-semibold text-neutral-900">{value}</dd>
                          </div>
                        ))}
                      </dl>
                    )
                )}

                {p.amenidades.length > 0 && (
                  <ul className="flex animate-in flex-wrap gap-3 border-t border-neutral-200/70 pt-3 duration-300 fade-in">
                    {p.amenidades.map((a) => {
                      const Icon = FEATURE_ICONS[a] ?? Sparkles;
                      return (
                        <li key={a} title={a}>
                          <Icon className="h-[18px] w-[18px] text-brand-600" strokeWidth={1.75} aria-label={a} />
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
