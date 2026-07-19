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
  // Condado de Sayavedra has no construcción comp sampled yet — falls back to the default below.
  'Bosque Real': null, // TODO research: verified construcción price per m²
  Interlomas: null, // TODO research: verified construcción price per m²
};
export const DEFAULT_PRICE_PER_M2_CONSTRUCCION = 42000;

export const PRICE_PER_M2_TERRENO: Record<string, number | null> = {
  'Condado de Sayavedra': 6000, // TXJ-575: $6.9M / 1,147m²
  // Other colonias have no raw-land comp sampled yet — fall back to the default below.
  'Bosque Real': null, // TODO research: verified terreno price per m²
  Interlomas: null, // TODO research: verified terreno price per m²
};
export const DEFAULT_PRICE_PER_M2_TERRENO = 6000;

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
    return { perM2: perM2 ?? DEFAULT_PRICE_PER_M2_TERRENO, isColoniaSpecific: perM2 != null };
  }
  const perM2 = PRICE_PER_M2_CONSTRUCCION[colonia];
  const typeFactor = PROPERTY_TYPE_FACTOR[tipoPropiedad as PublicPropertyType] ?? 1;
  const base = perM2 ?? DEFAULT_PRICE_PER_M2_CONSTRUCCION;
  return { perM2: Math.round(base * typeFactor), isColoniaSpecific: perM2 != null };
}

// A preliminary estimate should be directionally useful, not falsely
// precise. Display it in $10,000 increments (e.g. $8,448,000 → $8,450,000).
function roundPreliminaryEstimate(value: number): number {
  return Math.round(value / 10000) * 10000;
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
    const perM2 = PRICE_PER_M2_TERRENO[colonia] ?? DEFAULT_PRICE_PER_M2_TERRENO;
    const base = m2Terreno * perM2;
    const low = base * 0.8;
    const high = base * 1.2;
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
  // ±12% comparable range. The aprox then floats within [low, high] by the
  // property's own signals instead of always landing at the midpoint.
  const base = m2Construccion * perM2 * typeFactor;
  const low = base * 0.88;
  const high = base * 1.12;
  const mid = low + estimateRangePosition({ amenidades, antiguedad }) * (high - low);
  return {
    low: roundPreliminaryEstimate(low),
    mid: roundPreliminaryEstimate(mid),
    high: roundPreliminaryEstimate(high),
  };
}
