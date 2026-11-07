// Self-check for shared/comparableListings.ts. Run: node scripts/check-comparables.ts
// Fails (exit 1) when a fraccionamiento breaks the rules in docs/comparables.md.
import { COMPARABLE_LISTINGS } from '../shared/comparableListings.ts';
import { ZONA_ESMERALDA_COLONIAS, ZONA_ESMERALDA_COLONIAS_EXTENDED } from '../shared/validation.ts';

const MIN = 6;
const MAX = 10;
const TIPOS = new Set(['Casa', 'Departamento', 'Terreno residencial']);
// Zona Esmeralda, Interlomas and Bosque Real sit inside this box.
const BOX = { latMin: 19.38, latMax: 19.62, lngMin: -99.36, lngMax: -99.25 };
const errors: string[] = [];
const fail = (msg: string) => errors.push(msg);

const registered = [...ZONA_ESMERALDA_COLONIAS, ...ZONA_ESMERALDA_COLONIAS_EXTENDED] as string[];
for (const c of registered) if (!(c in COMPARABLE_LISTINGS)) fail(`${c}: no tiene comparables`);
for (const c of Object.keys(COMPARABLE_LISTINGS)) if (!registered.includes(c)) fail(`${c}: no está en validation.ts`);

const seenUrls = new Map<string, string>();
for (const [colonia, list] of Object.entries(COMPARABLE_LISTINGS)) {
  if (list.length < MIN || list.length > MAX) fail(`${colonia}: ${list.length} comparables (debe ser ${MIN} a ${MAX})`);
  list.forEach((l, i) => {
    const id = `${colonia} #${i + 1}`;
    if (l.isPlaceholder) fail(`${id}: es un placeholder`);
    if (!TIPOS.has(l.tipo)) fail(`${id}: tipo inválido "${l.tipo}"`);
    if (!(l.precio >= 1e6 && l.precio <= 1e8)) fail(`${id}: precio fuera de rango (${l.precio})`);
    if (!(l.m2 > 0)) fail(`${id}: m2 inválido (${l.m2})`);
    if (!(l.lat >= BOX.latMin && l.lat <= BOX.latMax && l.lng >= BOX.lngMin && l.lng <= BOX.lngMax)) fail(`${id}: pin fuera de la zona (${l.lat}, ${l.lng})`);
    if (!l.photo) fail(`${id}: sin foto`);
    if (!l.source || !l.sourceUrl) fail(`${id}: sin source o sourceUrl`);
    if (l.sourceUrl) {
      const prev = seenUrls.get(l.sourceUrl);
      if (prev) fail(`${id}: sourceUrl repetido (también en ${prev})`);
      seenUrls.set(l.sourceUrl, id);
    }
    if (l.tipo !== 'Terreno residencial' && (l.recamaras == null || l.recamaras < 0)) fail(`${id}: sin recámaras`);
  });
  // The reveal shows the first 6: they must not all be one type when there are several.
  const first6 = new Set(list.slice(0, 6).map((l) => l.tipo));
  const all = new Set(list.map((l) => l.tipo));
  if (all.size > 1 && first6.size < 2) fail(`${colonia}: los 6 primeros son todos del mismo tipo`);
}

const total = Object.values(COMPARABLE_LISTINGS).reduce((n, l) => n + l.length, 0);
if (errors.length) {
  console.error(`✗ ${errors.length} problema(s):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`✓ ${Object.keys(COMPARABLE_LISTINGS).length} fraccionamientos, ${total} comparables, todo en regla`);
