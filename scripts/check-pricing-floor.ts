// Self-check for the minimum $/m² floors in shared/pricing.ts. Run: npx tsx scripts/check-pricing-floor.ts
import { estimatePreliminaryRange as est, referencePerM2 as ref } from '../shared/pricing';
import { PROPERTY_FEATURES } from '../shared/validation';
import assert from 'node:assert';

const up = Object.values(PROPERTY_FEATURES).flat().filter((f) => f.effect === 'up').map((f) => f.value);
const per = (e: ReturnType<typeof est>, m2: number) => e!.low / m2;
// Condado de Sayavedra terrenos use the fixed $3M to $8M band.
const sy = est({ tipoPropiedad: 'Terreno', colonia: 'Condado de Sayavedra', m2Terreno: 500 })!;
assert(sy.low === 3_000_000 && sy.high === 8_000_000);
// Floors hold for the band's low end.
assert(per(est({ tipoPropiedad: 'Terreno', colonia: 'Bosque Real', m2Terreno: 500 }), 500) >= 15500 - 10);
assert(per(est({ tipoPropiedad: 'Casa', colonia: 'Residencial Lago Esmeralda', m2Construccion: 300 }), 300) >= 30000 - 10);
assert(per(est({ tipoPropiedad: 'Departamento', colonia: 'Residencial Lago Esmeralda', m2Construccion: 100 }), 100) >= 25000 - 10);
// Each positive feature lifts a floored price by 2% (today only terrenos sit on their floor; casas and deptos are above theirs).
const base = est({ tipoPropiedad: 'Terreno', colonia: 'Rancho San Juan', m2Terreno: 500 })!;
const one = est({ tipoPropiedad: 'Terreno', colonia: 'Rancho San Juan', m2Terreno: 500, amenidades: up.slice(0, 1) })!;
assert(one.high > base.high, 'feature should lift high end');
assert(ref('Bosque Real', 'Terreno').perM2 >= 15500);
console.log('✓ pricing floors ok', { base, one });
