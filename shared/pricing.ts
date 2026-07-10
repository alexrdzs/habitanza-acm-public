// Preliminary, non-binding pricing model used only to render a wide,
// clearly-labeled "estimación preliminar" immediately after a visitor
// shares contact info. This is NOT the real homologation engine — no real
// comparables are consulted — it is a simple zone-average formula meant to
// feel personalized while honestly setting up the real Análisis Comparativo
// de Mercado (ACM) a broker builds afterward.
//
// The baselines below are placeholders and MUST be calibrated by the team
// against real recent closing prices in each colonia before launch.
import type { PropertyCondition, PublicPropertyType } from './validation';

export const PRICE_PER_M2_CONSTRUCCION: Record<string, number> = {
  'Bosque Esmeralda': 28000,
  'Condado de Sayavedra': 32000,
  'Hacienda de las Palmas': 26000,
  'Loma Alta': 24000,
  'La Estadía': 25000,
  'Bosques de Echegaray': 27000,
  'Club de Golf Bellavista': 30000,
};
export const DEFAULT_PRICE_PER_M2_CONSTRUCCION = 26000;

export const PRICE_PER_M2_TERRENO: Record<string, number> = {
  'Bosque Esmeralda': 14000,
  'Condado de Sayavedra': 16000,
  'Hacienda de las Palmas': 13000,
  'Loma Alta': 12000,
  'La Estadía': 12500,
  'Bosques de Echegaray': 13500,
  'Club de Golf Bellavista': 15000,
};
export const DEFAULT_PRICE_PER_M2_TERRENO = 13000;

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
