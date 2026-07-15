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
import type { PublicPropertyType } from './validation';

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

export interface PreliminaryEstimate {
  low: number;
  mid: number;
  high: number;
}

// The zone reference behind the estimate, surfaced on the reveal screen's
// "Pulso de la Zona" tile. Returns the same $/m² the formula used, plus
// whether it came from the visitor's own colonia or the zone-wide fallback,
// so the tile's caption can stay honest about which one it is.
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
  return { perM2: perM2 ?? DEFAULT_PRICE_PER_M2_CONSTRUCCION, isColoniaSpecific: perM2 != null };
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
}): PreliminaryEstimate | null {
  const { tipoPropiedad, colonia, m2Construccion, m2Terreno } = params;

  if (tipoPropiedad === 'Terreno') {
    if (!m2Terreno || m2Terreno <= 0) return null;
    const perM2 = PRICE_PER_M2_TERRENO[colonia] ?? DEFAULT_PRICE_PER_M2_TERRENO;
    const mid = m2Terreno * perM2;
    return {
      low: roundPreliminaryEstimate(mid * 0.8),
      mid: roundPreliminaryEstimate(mid),
      high: roundPreliminaryEstimate(mid * 1.2),
    };
  }

  if (!m2Construccion || m2Construccion <= 0) return null;
  const perM2 = PRICE_PER_M2_CONSTRUCCION[colonia] ?? DEFAULT_PRICE_PER_M2_CONSTRUCCION;
  const typeFactor = PROPERTY_TYPE_FACTOR[tipoPropiedad as PublicPropertyType] ?? 1;
  const mid = m2Construccion * perM2 * typeFactor;
  return {
    low: roundPreliminaryEstimate(mid * 0.88),
    mid: roundPreliminaryEstimate(mid),
    high: roundPreliminaryEstimate(mid * 1.12),
  };
}
