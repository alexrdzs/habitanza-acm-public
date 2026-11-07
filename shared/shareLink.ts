import { PROPERTY_AGE_RANGES, PUBLIC_PROPERTY_TYPES, ZONA_ESMERALDA_COLONIAS, ZONA_ESMERALDA_COLONIAS_EXTENDED, type PropertyAge } from './validation';
import { ADVISORS, BOSQUE_REAL_INTERLOMAS_ADVISORS, type Advisor } from './advisors';

// Short link to a valuation, e.g. /312802 = colonia 3, tipo 1, broker 2, 802 m².
// The price is NOT in the link: the page recomputes it from these values.
// Optional ficha data follows the m², each as letter + number, in this order:
// t terreno m² (casa/depto only; for a terreno the m² already is the land),
// a antigüedad (1-5, position in PROPERTY_AGE_RANGES: append only), r recámaras,
// b baños, e autos. E.g. /811520t300a1r3b3e2. Absent letters mean "not given".
// IMPORTANT: these lists are positional. Only ever APPEND to them (colonias,
// property types, advisors), or links already sent would change meaning.
export const COLONIAS = [...ZONA_ESMERALDA_COLONIAS, ...ZONA_ESMERALDA_COLONIAS_EXTENDED];
const ALL_ADVISORS = [...ADVISORS, ...BOSQUE_REAL_INTERLOMAS_ADVISORS];

export interface ShareLinkData {
  colonia: string;
  tipoPropiedad: string;
  advisor: Advisor | null;
  m2: number;
  terreno?: number;
  antiguedad?: PropertyAge;
  recamaras?: number;
  banos?: number;
  estacionamientos?: number;
}

type Extras = { terreno?: number; antiguedad?: string; recamaras?: number; banos?: number; estacionamientos?: number };

// null when the colonia is a free-text one (not in the list) or m² is missing.
export function encodeShareLink(d: { colonia: string; tipoPropiedad: string; advisorName: string; m2: number } & Extras): string | null {
  const c = COLONIAS.indexOf(d.colonia as (typeof COLONIAS)[number]);
  const t = PUBLIC_PROPERTY_TYPES.indexOf(d.tipoPropiedad as (typeof PUBLIC_PROPERTY_TYPES)[number]);
  const a = ALL_ADVISORS.findIndex((x) => x.name === d.advisorName) + 1;
  const m2 = Math.round(d.m2);
  if (c < 0 || t < 0 || a > 9 || !(m2 > 0) || m2 > 99999) return null;
  const num = (n: number | undefined, max: number) => (typeof n === 'number' && n >= 0 && n <= max ? Math.round(n) : undefined);
  const age = PROPERTY_AGE_RANGES.indexOf(d.antiguedad as PropertyAge) + 1;
  const terreno = d.tipoPropiedad === 'Terreno' ? undefined : num(d.terreno, 99999);
  const extras = [
    terreno && `t${terreno}`,
    age > 0 && `a${age}`,
    num(d.recamaras, 99) !== undefined && `r${num(d.recamaras, 99)}`,
    num(d.banos, 99) !== undefined && `b${num(d.banos, 99)}`,
    num(d.estacionamientos, 99) !== undefined && `e${num(d.estacionamientos, 99)}`,
  ];
  return `${(c + 1).toString(36)}${t + 1}${a}${m2}${extras.filter(Boolean).join('')}`;
}

export function decodeShareLink(code: string): ShareLinkData | null {
  const m = /^([0-9a-z])([1-9])(\d)(\d{1,5})((?:[tarbe]\d{1,5})*)$/.exec(code);
  if (!m) return null;
  const colonia = COLONIAS[parseInt(m[1], 36) - 1];
  const tipoPropiedad = PUBLIC_PROPERTY_TYPES[Number(m[2]) - 1];
  if (!colonia || !tipoPropiedad) return null;
  const x = Object.fromEntries([...m[5].matchAll(/([tarbe])(\d+)/g)].map((e) => [e[1], Number(e[2])]));
  return {
    colonia,
    tipoPropiedad,
    advisor: ALL_ADVISORS[Number(m[3]) - 1] ?? null,
    m2: Number(m[4]),
    terreno: x.t,
    antiguedad: PROPERTY_AGE_RANGES[x.a - 1],
    recamaras: x.r,
    banos: x.b,
    estacionamientos: x.e,
  };
}
