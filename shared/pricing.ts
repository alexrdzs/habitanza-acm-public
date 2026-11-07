// Preliminary, non-binding pricing model used only to render a wide,
// clearly-labeled "estimación preliminar" immediately after a visitor
// shares contact info. This is NOT the real homologation engine — no real
// comparables are consulted at request time — it is a simple zone-average
// formula meant to feel personalized while honestly setting up the real
// Análisis Comparativo de Mercado (ACM) a broker builds afterward.
//
// The baselines below are derived from real, currently-published listings
// in Habitanza's own portfolio (price ÷ built m², sampled 2026-07-10), not
// guessed — but most colonias only had one or two comps available, so
// treat these as directional, not precise. Re-derive periodically as more
// sales close; a colonia with no sample falls back to the blended default.
// The `null` entries for the two temporary campaign zones are deliberate
// research markers. Replace each only with a verified local price per m².
import { FEATURE_EFFECTS } from './validation';
import type { Amenity, PropertyAge, PublicPropertyType } from './validation';

export const PRICE_PER_M2_CONSTRUCCION: Record<string, number | null> = {
  'Bosque Esmeralda': 40000, // depto DAJ-081: $8.2M / 204m²
  'Residencial Lago Esmeralda': 48000, // depto DOG-086: $2.4M / 38m² (single small unit — noisy)
  'Lomas de Valle Escondido': 42000, // avg of CAX-089 ($45.5k/m²) and CAZ-272 ($39.5k/m²)
  'Hacienda de Valle Escondido': 48000, // CAQ-399: $34M / 700m²
  'Rancho San Juan': 34000, // TAP-307: $44.9M / 1,327m²
  // Medianas de $/m² de los listados reales de shared/comparableListings.ts (precio de lista, 2026-11-07), redondeadas a $500.
  'Condado de Sayavedra': 29000, // mediana de 5 casas: $24.2k a $37.2k/m²
  'Club de Golf Chiluca': 28500, // mediana de 7 casas: $24.7k a $54.3k/m²
  'Prado Largo': 37000, // mediana de 6 casas: $33.1k a $44.0k/m²
  'Club de Golf Valle Escondido': 47000, // mediana de 6 casas: $24.1k a $68.0k/m² (muy disperso)
  'Fincas de Sayavedra': 42500, // mediana de 3 casas: $38.8k a $42.5k/m²
  'La Estadía': 29500, // mediana de 4 casas: $20.0k a $54.4k/m² (disperso)
  'Bosque Real': 55500, // mediana de 4 casas: $37.2k a $78.7k/m² (muy disperso)
  Interlomas: 36000, // mediana de 2 casas: $32.2k y $39.9k/m² (pocas, direccional)
  'Interlomas y Hda. de las Palmas': 36000, // mismo dato que Interlomas
};
export const DEFAULT_PRICE_PER_M2_CONSTRUCCION = 42000;

export const PRICE_PER_M2_TERRENO: Record<string, number | null> = {
  'Condado de Sayavedra': 6000, // TXJ-575: $6.9M / 1,147m²
  // Medianas de listados reales (n>=3). Sin listados de terreno (Chiluca, Prado Largo, Lomas, Club de Golf VE, Interlomas) o con 1 o 2, queda el valor general: no se inventa.
  'Hacienda de Valle Escondido': 7000, // mediana de 3 terrenos: $5.8k a $7.4k/m²
  'Rancho San Juan': 11500, // mediana de 5 terrenos: $11.4k a $13.2k/m²
  'Fincas de Sayavedra': 2500, // mediana de 4 terrenos: $1.9k a $8.4k/m² (muy disperso)
  'La Estadía': 7000, // mediana de 3 terrenos: $5.7k a $8.3k/m²
  'Bosque Real': 19600, // mediana de 9 terrenos de la Colección TBR3SPM (EasyBroker, 2026-11-07): $17.6k a $25.5k/m², n=9
};
export const DEFAULT_PRICE_PER_M2_TERRENO = 6000;

// Minimum $/m² per property type, applied to every colonia. The estimate never
// shows a price per m² below these. While a colonia sits on its floor, each
// positive feature the visitor ticks lifts the price 2% (the position model
// below only moves the point inside the band, so it can't lift a floored one).
const MIN_PRICE_PER_M2: Record<string, number> = { Terreno: 15500, Casa: 30000, Departamento: 25000 };
const FLOOR_FEATURE_LIFT = 0.02;
const minPerM2 = (tipo: string) => MIN_PRICE_PER_M2[tipo] ?? MIN_PRICE_PER_M2.Casa;

function upFeatureCount(amenidades: Amenity[] = []): number {
  return amenidades.filter((a) => FEATURE_EFFECTS[a] === 'up').length;
}

// Fixed terreno band for colonias where the $/m² floor doesn't fit the market
// (Sayavedra lots sell at $8k to $11k/m²). Ignores lot size on purpose.
// ponytail: fixed band, make it size-aware if visitors with very small or very large lots complain.
const TERRENO_FIXED_RANGE: Record<string, { low: number; high: number }> = {
  'Condado de Sayavedra': { low: 3_000_000, high: 8_000_000 },
};

const PROPERTY_TYPE_FACTOR: Partial<Record<PublicPropertyType, number>> = {
  Casa: 1,
  Departamento: 0.9,
};

// ── Where the aprox point sits WITHIN the range ────────────────────────────
// The range (low..high) is the zone/comparable band and never moves. These
// signals only decide where inside it the single best-guess "aprox" lands, so
// a newer, well-equipped home sits above the midpoint and a bare, older one
// below -- without ever implying more precision than the band already
// discloses (the pin stays clamped well inside the band, never on an edge).
// 0.5 == dead center, which is exactly what neutral/unknown inputs return, so
// behavior is unchanged for anyone who skips these optional fields.
//
// Deliberately a light heuristic, not homologation: absence of amenities is
// treated as neutral (most homes lack most of these premium extras, that's
// not a defect), while antigüedad moves the point both ways.
const AGE_POSITION_SCORE: Record<PropertyAge, number> = {
  'A estrenar': 1,
  'Menos de 5 años': 0.5,
  'Entre 5 y 10 años': 0,
  'Entre 10 y 20 años': -0.5,
  'Más de 20 años': -1,
};
const FEATURE_POSITION_WEIGHT = 0.12; // a fully-featured property => +12% of the range
const FEATURE_NORMALIZER = 5; // net feature count that reaches ~full weight
const AGE_POSITION_WEIGHT = 0.1; // a-estrenar => +10%, más-de-20 => -10%
const POSITION_MIN = 0.3; // keep the pin off the low/high edge in both directions
const POSITION_MAX = 0.7;

export function estimateRangePosition(params: {
  amenidades?: Amenity[];
  antiguedad?: PropertyAge | '';
}): number {
  // Net feature score: +1 per positive characteristic, -1 per challenge (a
  // slope, an irregular lot), 0 for neutral ones. So a terreno with two
  // challenges lands below center, a well-equipped home above it.
  let score = 0;
  for (const feature of params.amenidades ?? []) {
    const effect = FEATURE_EFFECTS[feature];
    if (effect === 'up') score += 1;
    else if (effect === 'down') score -= 1;
  }
  const featureLift = Math.max(-1, Math.min(1, score / FEATURE_NORMALIZER)) * FEATURE_POSITION_WEIGHT;
  const ageLift = params.antiguedad ? (AGE_POSITION_SCORE[params.antiguedad] ?? 0) * AGE_POSITION_WEIGHT : 0;
  return Math.min(POSITION_MAX, Math.max(POSITION_MIN, 0.5 + featureLift + ageLift));
}

export interface PreliminaryEstimate {
  low: number;
  mid: number;
  high: number;
}

// The effective $/m² behind the estimate, surfaced on the reveal screen's
// "Pulso de la Zona" tile. It must reconcile with estimatePreliminaryRange:
// the range applies PROPERTY_TYPE_FACTOR (e.g. 0.9 for Departamento), so the
// tile has to apply it too, or a Departamento shows a reference the range
// visibly contradicts. Also reports whether the baseline came from the
// visitor's own colonia or the zone-wide fallback, so the caption can stay
// honest about which one it is.
export interface ZoneReference {
  perM2: number;
  isColoniaSpecific: boolean;
}

export function referencePerM2(colonia: string, tipoPropiedad: PublicPropertyType | string): ZoneReference {
  if (tipoPropiedad === 'Terreno') {
    const perM2 = PRICE_PER_M2_TERRENO[colonia];
    return { perM2: Math.max(perM2 ?? DEFAULT_PRICE_PER_M2_TERRENO, minPerM2('Terreno')), isColoniaSpecific: perM2 != null };
  }
  const perM2 = PRICE_PER_M2_CONSTRUCCION[colonia];
  const typeFactor = PROPERTY_TYPE_FACTOR[tipoPropiedad as PublicPropertyType] ?? 1;
  const base = perM2 ?? DEFAULT_PRICE_PER_M2_CONSTRUCCION;
  return { perM2: Math.max(Math.round(base * typeFactor), minPerM2(String(tipoPropiedad))), isColoniaSpecific: perM2 != null };
}

// A preliminary estimate should be directionally useful, not falsely
// precise. Display it in $10,000 increments (e.g. $8,448,000 → $8,450,000).
function roundPreliminaryEstimate(value: number): number {
  return Math.round(value / 10000) * 10000;
}

// The "lo que sí tiene sentido" band: the central half of the market range.
// Below `low` the owner would be giving the property away; above `high` it is
// out of market; this inner band is where an asking price makes sense.
export function idealBand(low: number, high: number): { low: number; high: number } {
  return {
    low: roundPreliminaryEstimate(low + 0.2 * (high - low)),
    high: roundPreliminaryEstimate(low + 0.8 * (high - low)),
  };
}

export function estimatePreliminaryRange(params: {
  tipoPropiedad: PublicPropertyType | string;
  colonia: string;
  m2Construccion?: number;
  m2Terreno?: number;
  // Optional quality signals. They never widen or shift the range itself --
  // only where the aprox point sits inside it (see estimateRangePosition).
  amenidades?: Amenity[];
  antiguedad?: PropertyAge | '';
}): PreliminaryEstimate | null {
  const { tipoPropiedad, colonia, m2Construccion, m2Terreno, amenidades, antiguedad } = params;

  if (tipoPropiedad === 'Terreno') {
    if (!m2Terreno || m2Terreno <= 0) return null;
    // Land has no age, but its características (vistas lift it, a slope or an
    // irregular shape drag it) move the aprox within the band, same as a home.
    const fixed = TERRENO_FIXED_RANGE[colonia];
    if (fixed) {
      const mid = fixed.low + estimateRangePosition({ amenidades, antiguedad: undefined }) * (fixed.high - fixed.low);
      return { low: fixed.low, mid: roundPreliminaryEstimate(mid), high: fixed.high };
    }
    const perM2 = PRICE_PER_M2_TERRENO[colonia] ?? DEFAULT_PRICE_PER_M2_TERRENO;
    const floor = minPerM2('Terreno');
    const lift = perM2 < floor ? 1 + FLOOR_FEATURE_LIFT * upFeatureCount(amenidades) : 1;
    const base = m2Terreno * Math.max(perM2, floor) * lift;
    const low = Math.max(base * 0.75, m2Terreno * floor);
    const high = Math.max(base * 1.25, low);
    const mid = low + estimateRangePosition({ amenidades, antiguedad: undefined }) * (high - low);
    return {
      low: roundPreliminaryEstimate(low),
      mid: roundPreliminaryEstimate(mid),
      high: roundPreliminaryEstimate(high),
    };
  }

  if (!m2Construccion || m2Construccion <= 0) return null;
  const perM2 = PRICE_PER_M2_CONSTRUCCION[colonia] ?? DEFAULT_PRICE_PER_M2_CONSTRUCCION;
  const typeFactor = PROPERTY_TYPE_FACTOR[tipoPropiedad as PublicPropertyType] ?? 1;
  // `base` is the zone-anchored center of the band; low/high are the fixed
  // ±15% comparable range. The aprox then floats within [low, high] by the
  // property's own signals instead of always landing at the midpoint.
  const floor = minPerM2(String(tipoPropiedad));
  const lift = perM2 * typeFactor < floor ? 1 + FLOOR_FEATURE_LIFT * upFeatureCount(amenidades) : 1;
  const base = m2Construccion * Math.max(perM2 * typeFactor, floor) * lift;
  const low = Math.max(base * 0.85, m2Construccion * floor);
  const high = Math.max(base * 1.15, low);
  const mid = low + estimateRangePosition({ amenidades, antiguedad }) * (high - low);
  return {
    low: roundPreliminaryEstimate(low),
    mid: roundPreliminaryEstimate(mid),
    high: roundPreliminaryEstimate(high),
  };
}
