import { Bath, BedDouble, Building2, CalendarDays, Car, House, LandPlot, MapPin, Ruler, ShieldCheck, Sparkles, type LucideIcon } from 'lucide-react';
import { COPY } from '@shared/copy';
import { FEATURE_ICONS } from './WizardExtrasStep';

export interface PropertyFichaProps {
  colonia: string;
  tipoPropiedad: string;
  m2Construccion: string;
  m2Terreno: string;
  recamaras: string;
  banos: string;
  estacionamientos: string;
  antiguedad: string;
  amenidades: string[];
}

const TYPE_ICONS: Record<string, LucideIcon> = { Casa: House, Departamento: Building2, Terreno: LandPlot };

const SECURITY_AMENITY = 'En privada con seguridad';

type Cell = { Icon: LucideIcon; label: string; value: string };

// Same short text as the picker ("Entre 10 y 20 años" -> "10 a 20 años").
const shortAge = (a: string) => COPY.age.short[a] ?? a;

// The property summary: location + type, then label/value cells with an icon
// per answer, then feature icons. No card chrome of its own, so the wizard's
// map panel and the reveal's range card can each wrap it as they need.
export function PropertyFicha(p: PropertyFichaProps) {
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

  return (
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

      {/* "Destacado": the security mark is always there by default; it is
          skipped when the visitor already picked the equivalent feature, so
          the same shield never shows twice. */}
      <div className="animate-in border-t border-neutral-200/70 pt-3 duration-300 fade-in">
        <p className="text-[11px] text-neutral-500">{S.destacado}</p>
        <ul className="mt-1.5 flex flex-wrap gap-3">
          {!p.amenidades.includes(SECURITY_AMENITY) && (
            <li title={S.seguridad}>
              <ShieldCheck className="h-[18px] w-[18px] text-brand-600" strokeWidth={1.75} aria-label={S.seguridad} />
            </li>
          )}
          {p.amenidades.map((a) => {
            const Icon = FEATURE_ICONS[a] ?? Sparkles;
            return (
              <li key={a} title={a}>
                <Icon className="h-[18px] w-[18px] text-brand-600" strokeWidth={1.75} aria-label={a} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
