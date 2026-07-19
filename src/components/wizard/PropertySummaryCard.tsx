import { ArrowDown, ArrowUp } from 'lucide-react';
import type { Amenity, PropertyAge } from '@shared/validation';
import type { PreliminaryEstimate } from '@shared/pricing';
import { zoneTypicalSpecs } from '@shared/comparableListings';
import { COPY } from '@shared/copy';
import { SectionChip } from './SectionChip';
import { formatCurrency } from '../../lib/utils';

type Direction = 'up' | 'down' | null;

// Above/below the zone's typical value (from real comparable listings). Only
// a strict difference flags -- exactly typical shows nothing, so the card
// highlights what stands out rather than labeling every field.
function compareToTypical(value: number | undefined, typical: number | undefined): Direction {
  if (value == null || typical == null) return null;
  if (value > typical) return 'up';
  if (value < typical) return 'down';
  return null;
}

export interface PropertyProfile {
  m2Construccion?: number;
  m2Terreno?: number;
  recamaras?: number;
  banos?: number;
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

interface SpecCell {
  label: string;
  value: string;
  direction?: Direction;
}

// "Tu propiedad": a light 3-column recap of the visitor's own answers, plus
// one derived number (the estimate spread across their built m²) so the card
// does analysis rather than just repeating data they already know. Kept
// deliberately minimal -- no boxes or icons -- because these are their inputs;
// the payoff is the derived per-m², not the recap. Blank fields don't render.
export function PropertySummaryCard({ profile, tipoPropiedad, colonia, estimate }: Props) {
  const c = COPY.reveal.propertyCard;
  const isTerreno = tipoPropiedad === 'Terreno';
  // Benchmark the count fields against the zone's real listings, so an
  // above-average room/bath count reads as the selling point it is.
  const typical = zoneTypicalSpecs();

  const cells: SpecCell[] = [{ label: c.labels.ubicacion, value: colonia }];

  if (!isTerreno && profile.m2Construccion) {
    cells.push({ label: c.labels.construccion, value: c.m2Value(profile.m2Construccion) });
  }
  if (profile.m2Terreno) {
    cells.push({ label: c.labels.terreno, value: c.m2Value(profile.m2Terreno) });
  }
  if (!isTerreno && profile.recamaras) {
    cells.push({
      label: c.labels.recamaras,
      value: String(profile.recamaras),
      direction: compareToTypical(profile.recamaras, typical.recamaras),
    });
  }
  if (!isTerreno && profile.banos) {
    cells.push({
      label: c.labels.banos,
      value: String(profile.banos),
      direction: compareToTypical(profile.banos, typical.banos),
    });
  }
  if (!isTerreno && profile.estacionamientos) {
    cells.push({ label: c.labels.estacionamientos, value: String(profile.estacionamientos) });
  }
  if (!isTerreno && profile.antiguedad) {
    cells.push({ label: c.labels.antiguedad, value: profile.antiguedad });
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

      <dl className="grid grid-cols-3 gap-x-3 gap-y-4">
        {cells.map(({ label, value, direction }) => (
          <div key={label} className="min-w-0">
            <dt className="text-[10px] font-bold uppercase text-neutral-400">{label}</dt>
            <dd className="mt-0.5 flex items-center gap-1 text-sm font-semibold leading-snug text-neutral-900">
              <span>{value}</span>
              {/* Up = a genuine strength (green). Down stays muted-neutral, not
                  red -- it's context, not a flaw in the seller's property. */}
              {direction === 'up' && <ArrowUp aria-label={c.compareUp} className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" />}
              {direction === 'down' && <ArrowDown aria-label={c.compareDown} className="h-3.5 w-3.5 text-neutral-400" />}
            </dd>
          </div>
        ))}
      </dl>

      {profile.amenidades.length > 0 && (
        <div className="flex flex-wrap gap-1.5 border-t border-neutral-200/70 pt-4">
          {profile.amenidades.map((a) => (
            <span
              key={a}
              className="rounded-full border border-brand-500/20 bg-brand-500/5 px-2.5 py-0.5 text-xs font-medium text-neutral-600"
            >
              {a}
            </span>
          ))}
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
