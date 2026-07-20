import { ArrowDownRight, ArrowUpRight, Equal } from 'lucide-react';
import type { Amenity, PropertyAge } from '@shared/validation';
import type { PreliminaryEstimate } from '@shared/pricing';
import { zoneTypicalSpecs, zoneTypicalTerrenoM2 } from '@shared/comparableListings';
import { COPY } from '@shared/copy';
import { SectionChip } from './SectionChip';
import { formatCurrency } from '../../lib/utils';

type Direction = 'up' | 'down' | 'equal' | null;

// Above / below / in line with the zone's typical value (from real comparable
// listings). Returns null only when there's no benchmark to compare against,
// so those fields show no indicator at all.
function compareToTypical(value: number | undefined, typical: number | undefined): Direction {
  if (value == null || typical == null) return null;
  if (value > typical) return 'up';
  if (value < typical) return 'down';
  return 'equal';
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
  const recDir = !isTerreno && profile.recamaras ? compareToTypical(profile.recamaras, typical.recamaras) : null;
  const banDir = !isTerreno && profile.banos ? compareToTypical(profile.banos, typical.banos) : null;
  // A home's own size read: built m² vs the zone's typical built m², and its
  // lot vs the zone's terreno pool (the only lot-size benchmark we have -- it's
  // a directional size comparison, so it stays in the prose only, not on the
  // spec-grid arrow, which deliberately never marks a house's yard).
  const construccionDir = !isTerreno && profile.m2Construccion ? compareToTypical(profile.m2Construccion, typical.m2) : null;
  const casaLoteDir = !isTerreno && profile.m2Terreno ? compareToTypical(profile.m2Terreno, zoneTypicalTerrenoM2()) : null;
  // Terrenos have no rooms/baths, so their one comparable attribute is lot
  // size, benchmarked against the zone's other terrenos.
  const terrenoDir = isTerreno && profile.m2Terreno ? compareToTypical(profile.m2Terreno, zoneTypicalTerrenoM2()) : null;
  const analysisSegs = isTerreno
    ? c.analysisSegmentsTerreno(terrenoDir)
    : c.analysisSegments(construccionDir, casaLoteDir, recDir, banDir);

  const cells: SpecCell[] = [{ label: c.labels.ubicacion, value: colonia }];

  if (!isTerreno && profile.m2Construccion) {
    cells.push({ label: c.labels.construccion, value: c.m2Value(profile.m2Construccion) });
  }
  if (profile.m2Terreno) {
    // The size arrow only applies to a raw lote (a house's yard isn't compared
    // against the terreno pool).
    cells.push({ label: c.labels.terreno, value: c.m2Value(profile.m2Terreno), direction: isTerreno ? terrenoDir : undefined });
  }
  if (!isTerreno && profile.recamaras) {
    cells.push({ label: c.labels.recamaras, value: String(profile.recamaras), direction: recDir });
  }
  if (!isTerreno && profile.banos) {
    cells.push({ label: c.labels.banos, value: String(profile.banos), direction: banDir });
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
      <h3 className="text-base font-bold text-neutral-900">{c.title}</h3>

      <dl className="grid grid-cols-3 gap-x-3 gap-y-4">
        {cells.map(({ label, value, direction }) => (
          <div key={label} className="min-w-0">
            <dt className="text-[10px] font-bold uppercase text-neutral-400">{label}</dt>
            <dd className="mt-0.5 flex items-center gap-1 text-sm font-semibold leading-snug text-neutral-900">
              <span>{value}</span>
              {/* Diagonal arrows read as trend: up-right (green) = growth,
                  down-right (red) = drags the price. An equals sign (blue)
                  marks a value right on the zone average. */}
              {direction === 'up' && <ArrowUpRight aria-label={c.compareUp} className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" />}
              {direction === 'down' && <ArrowDownRight aria-label={c.compareDown} className="h-3.5 w-3.5 text-red-500 dark:text-red-400" />}
              {direction === 'equal' && <Equal aria-label={c.compareEqual} className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />}
            </dd>
          </div>
        ))}
      </dl>

      {analysisSegs.length > 0 && (
        // Subtle-background card, same "back sutil que facilita la lectura"
        // treatment the Pulse tiles and the Mercado nota use -- it sets the
        // derived read apart from the raw spec recap above it.
        <div className="rounded-xl border border-neutral-100 bg-neutral-50 p-4">
          <p className="text-sm leading-relaxed text-neutral-600">
            {analysisSegs.map((seg, i) =>
              seg.tone ? (
                <strong
                  key={i}
                  className={
                    seg.tone === 'pos'
                      ? 'font-semibold text-brand-600 dark:text-brand-400'
                      : 'font-semibold text-red-500 dark:text-red-400'
                  }
                >
                  {seg.t}
                </strong>
              ) : (
                <span key={i}>{seg.t}</span>
              )
            )}
          </p>
        </div>
      )}

      {profile.amenidades.length > 0 && (
        <div className="flex flex-wrap gap-1.5 border-t border-neutral-200/70 pt-4">
          {/* Neutral chips: a characteristic is just context here. A challenge
              (e.g. "Con pendiente") never reads as a plus -- its effect on the
              value already shows up in where the aprox pin lands. */}
          {profile.amenidades.map((a) => (
            <span
              key={a}
              className="rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-0.5 text-xs font-medium text-neutral-600"
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
