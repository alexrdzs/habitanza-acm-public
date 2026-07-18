import { BedDouble, Bath, Car, CalendarDays, House, LandPlot, MapPin, type LucideIcon } from 'lucide-react';
import type { Amenity, PropertyAge } from '@shared/validation';
import type { PreliminaryEstimate } from '@shared/pricing';
import { COPY } from '@shared/copy';
import { SectionChip } from './SectionChip';
import { formatCurrency } from '../../lib/utils';

export interface PropertyProfile {
  m2Construccion?: number;
  m2Terreno?: number;
  recamaras?: number;
  banos?: number;
  mediosBanos?: number;
  estacionamientos?: number;
  antiguedad?: PropertyAge | '';
  amenidades: Amenity[];
}

interface Props {
  profile: PropertyProfile;
  tipoPropiedad: string;
  colonia: string;
  estimate: PreliminaryEstimate;
}

interface SpecRow {
  icon: LucideIcon;
  label: string;
  value: string;
}

// "Tu propiedad": echoes the visitor's own answers back as the inputs behind
// the price panel above, plus one derived number (the estimate spread across
// their built m²) so it reads as analysis, not a form recap. Every value is
// the visitor's real input -- nothing is invented to fill the grid; fields
// left blank simply don't render.
export function PropertySummaryCard({ profile, tipoPropiedad, colonia, estimate }: Props) {
  const c = COPY.reveal.propertyCard;
  const isTerreno = tipoPropiedad === 'Terreno';

  const rows: SpecRow[] = [{ icon: MapPin, label: c.labels.ubicacion, value: colonia }];

  if (!isTerreno && profile.m2Construccion) {
    rows.push({ icon: House, label: c.labels.construccion, value: c.m2Value(profile.m2Construccion) });
  }
  if (profile.m2Terreno) {
    rows.push({ icon: LandPlot, label: c.labels.terreno, value: c.m2Value(profile.m2Terreno) });
  }
  if (!isTerreno && profile.recamaras) {
    rows.push({ icon: BedDouble, label: c.labels.recamaras, value: String(profile.recamaras) });
  }
  const banosValue = c.banosValue(profile.banos, profile.mediosBanos);
  if (!isTerreno && banosValue) {
    rows.push({ icon: Bath, label: c.labels.banos, value: banosValue });
  }
  if (!isTerreno && profile.estacionamientos) {
    rows.push({ icon: Car, label: c.labels.estacionamientos, value: String(profile.estacionamientos) });
  }
  if (!isTerreno && profile.antiguedad) {
    rows.push({ icon: CalendarDays, label: c.labels.antiguedad, value: profile.antiguedad });
  }

  // Derived: the aprox spread across the visitor's own built m² (terreno for a
  // lote). Rounded to a clean $500 step so it reads as directional, matching
  // the estimate's own $10k rounding -- not spurious precision.
  const perM2Base = isTerreno ? profile.m2Terreno : profile.m2Construccion;
  const perM2 = perM2Base && perM2Base > 0 ? Math.round(estimate.mid / perM2Base / 500) * 500 : null;

  return (
    <div className="space-y-4 rounded-card-lg border border-neutral-200/70 bg-parchment-card/80 p-6 backdrop-blur-md md:p-8">
      <SectionChip label={c.chip} variant="neutral" />
      <h3 className="text-base font-bold text-neutral-900">{c.title(tipoPropiedad)}</h3>
      <p className="text-sm leading-relaxed text-neutral-500">{c.intro}</p>

      <dl className="grid grid-cols-2 gap-3">
        {rows.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-start gap-2.5 rounded-xl border border-neutral-100 bg-neutral-50 p-3.5">
            <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500" />
            <div className="min-w-0">
              <dt className="text-[10px] font-bold uppercase text-neutral-400">{label}</dt>
              <dd className="text-sm font-semibold leading-snug text-neutral-900">{value}</dd>
            </div>
          </div>
        ))}
      </dl>

      {profile.amenidades.length > 0 && (
        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400">{c.labels.amenidades}</p>
          <div className="flex flex-wrap gap-2">
            {profile.amenidades.map((a) => (
              <span
                key={a}
                className="rounded-full border border-brand-500/20 bg-brand-500/5 px-3 py-1 text-xs font-medium text-neutral-700"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      )}

      {perM2 !== null && perM2Base && (
        <div className="flex items-baseline justify-between gap-3 border-t border-neutral-200/70 pt-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">{c.perM2Label}</p>
            <p className="mt-0.5 text-[11px] leading-snug text-neutral-500">{c.perM2Subline(perM2Base, isTerreno)}</p>
          </div>
          <p className="whitespace-nowrap text-lg font-bold tabular-nums text-neutral-900">{formatCurrency(perM2)}</p>
        </div>
      )}
    </div>
  );
}
