import { COMPARABLE_LISTINGS } from '@shared/comparableListings';

// A fraccionamiento the visitor typed (picked from Google Places) that we don't
// have borrows the comparables of the nearest registered one. The alias is a
// NON-enumerable property on COMPARABLE_LISTINGS, so every helper in
// shared/comparableListings.ts finds the listings by name, while the zone-wide
// stats (Object.values / Object.keys) don't count them twice. Browser session
// only; nothing is written anywhere.
const BORROWED = new Map<string, string>();

// Nearest registered colonia by distance to the centroid of its real listings.
// Flat-earth distance is plenty at this scale (tens of km).
export function nearestColonia(lat: number, lng: number): string | undefined {
  let best: string | undefined;
  let bestD = Infinity;
  for (const [name, all] of Object.entries(COMPARABLE_LISTINGS)) {
    const ls = all.filter((l) => !l.isPlaceholder);
    if (ls.length === 0) continue;
    const cLat = ls.reduce((a, l) => a + l.lat, 0) / ls.length;
    const cLng = ls.reduce((a, l) => a + l.lng, 0) / ls.length;
    const d = (cLat - lat) ** 2 + ((cLng - lng) * Math.cos((lat * Math.PI) / 180)) ** 2;
    if (d < bestD) [best, bestD] = [name, d];
  }
  return best;
}

export function borrowComparables(name: string, lat: number, lng: number) {
  const near = nearestColonia(lat, lng);
  if (!near || name in COMPARABLE_LISTINGS) return;
  Object.defineProperty(COMPARABLE_LISTINGS, name, { value: COMPARABLE_LISTINGS[near], enumerable: false, configurable: true });
  BORROWED.set(name, near);
}

// Name of the colonia whose comparables stand in for `colonia`, if borrowed.
export function borrowedFrom(colonia: string): string | undefined {
  return BORROWED.get(colonia);
}
