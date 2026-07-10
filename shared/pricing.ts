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
import type { PropertyCondition, PublicPropertyType } from './validation';

export const PRICE_PER_M2_CONSTRUCCION: Record<string, number> = {
  'Bosque Esmeralda': 40000, // depto DAJ-081: $8.2M / 204m²
  'Residencial Lago Esmeralda': 48000, // depto DOG-086: $2.4M / 38m² (single small unit — noisy)
  'Lomas de Valle Escondido': 42000, // avg of CAX-089 ($45.5k/m²) and CAZ-272 ($39.5k/m²)
  'Hacienda de Valle Escondido': 48000, // CAQ-399: $34M / 700m²
  'Rancho San Juan': 34000, // TAP-307: $44.9M / 1,327m²
  // Condado de Sayavedra has no construcción comp sampled yet — falls back to the default below.
};
export const DEFAULT_PRICE_PER_M2_CONSTRUCCION = 42000;

export const PRICE_PER_M2_TERRENO: Record<string, number> = {
  'Condado de Sayavedra': 6000, // TXJ-575: $6.9M / 1,147m²
  // Other colonias have no raw-land comp sampled yet — fall back to the default below.
};
export const DEFAULT_PRICE_PER_M2_TERRENO = 6000;

// Mirrors the direction (not the exact math) of the authenticated tool's
// qualityFactor: condition is the single biggest lever on a home's value.
// Applied as an absolute multiplier here (vs. a comp-relative diff there)
// since a public visitor has no comparable to diff against yet.
export const CONDITION_FACTOR: Record<PropertyCondition, number> = {
  'Para reformar': 0.85,
  'Buen estado': 1.0,
  Remodelada: 1.08,
  Nueva: 1.15,
};

const PROPERTY_TYPE_FACTOR: Partial<Record<PublicPropertyType, number>> = {
  Casa: 1,
  Departamento: 0.9,
};

export interface PreliminaryEstimate {
  low: number;
  mid: number;
  high: number;
}

function roundToThousand(value: number): number {
  return Math.round(value / 1000) * 1000;
}

export function estimatePreliminaryRange(params: {
  tipoPropiedad: PublicPropertyType | string;
  colonia: string;
  condicion?: PropertyCondition;
  m2Construccion?: number;
  m2Terreno?: number;
}): PreliminaryEstimate | null {
  const { tipoPropiedad, colonia, condicion, m2Construccion, m2Terreno } = params;

  if (tipoPropiedad === 'Terreno') {
    if (!m2Terreno || m2Terreno <= 0) return null;
    const perM2 = PRICE_PER_M2_TERRENO[colonia] ?? DEFAULT_PRICE_PER_M2_TERRENO;
    const mid = m2Terreno * perM2;
    return { low: roundToThousand(mid * 0.8), mid: roundToThousand(mid), high: roundToThousand(mid * 1.2) };
  }

  if (!m2Construccion || m2Construccion <= 0) return null;
  const perM2 = PRICE_PER_M2_CONSTRUCCION[colonia] ?? DEFAULT_PRICE_PER_M2_CONSTRUCCION;
  const typeFactor = PROPERTY_TYPE_FACTOR[tipoPropiedad as PublicPropertyType] ?? 1;
  const conditionFactor = condicion ? CONDITION_FACTOR[condicion] : 1;
  const mid = m2Construccion * perM2 * typeFactor * conditionFactor;
  return { low: roundToThousand(mid * 0.88), mid: roundToThousand(mid), high: roundToThousand(mid * 1.12) };
}
