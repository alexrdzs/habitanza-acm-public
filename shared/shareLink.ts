import { PUBLIC_PROPERTY_TYPES, ZONA_ESMERALDA_COLONIAS, ZONA_ESMERALDA_COLONIAS_EXTENDED } from './validation';
import { ADVISORS, BOSQUE_REAL_INTERLOMAS_ADVISORS, type Advisor } from './advisors';

// Short link to a valuation, e.g. /312802 = colonia 3, tipo 1, broker 2, 802 m².
// The price is NOT in the link: the page recomputes it from these four values.
// IMPORTANT: these lists are positional. Only ever APPEND to them (colonias,
// property types, advisors), or links already sent would change meaning.
export const COLONIAS = [...ZONA_ESMERALDA_COLONIAS, ...ZONA_ESMERALDA_COLONIAS_EXTENDED];
const ALL_ADVISORS = [...ADVISORS, ...BOSQUE_REAL_INTERLOMAS_ADVISORS];

export interface ShareLinkData {
  colonia: string;
  tipoPropiedad: string;
  advisor: Advisor | null;
  m2: number;
}

// null when the colonia is a free-text one (not in the list) or m² is missing.
export function encodeShareLink(d: { colonia: string; tipoPropiedad: string; advisorName: string; m2: number }): string | null {
  const c = COLONIAS.indexOf(d.colonia as (typeof COLONIAS)[number]);
  const t = PUBLIC_PROPERTY_TYPES.indexOf(d.tipoPropiedad as (typeof PUBLIC_PROPERTY_TYPES)[number]);
  const a = ALL_ADVISORS.findIndex((x) => x.name === d.advisorName) + 1;
  const m2 = Math.round(d.m2);
  if (c < 0 || t < 0 || a > 9 || !(m2 > 0) || m2 > 99999) return null;
  return `${(c + 1).toString(36)}${t + 1}${a}${m2}`;
}

export function decodeShareLink(code: string): ShareLinkData | null {
  const m = /^([0-9a-z])([1-9])(\d)(\d{1,5})$/.exec(code);
  if (!m) return null;
  const colonia = COLONIAS[parseInt(m[1], 36) - 1];
  const tipoPropiedad = PUBLIC_PROPERTY_TYPES[Number(m[2]) - 1];
  if (!colonia || !tipoPropiedad) return null;
  return { colonia, tipoPropiedad, advisor: ALL_ADVISORS[Number(m[3]) - 1] ?? null, m2: Number(m[4]) };
}
