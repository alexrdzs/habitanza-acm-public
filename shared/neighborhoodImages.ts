// Single source of truth for an optional rich illustration per
// fraccionamiento -- e.g. Airbnb-style 3D icons rendered with Nano Banana.
// When a name has an image here, the location picker shows that visual in
// place of the flat lucide fallback icon (see shared/neighborhoodIcons.ts),
// giving each row a distinctive, dynamic thumbnail instead of a generic icon.
//
// This is the ONE place a fraccionamiento is tied to an image. Drop square
// artwork in `/public` (e.g. /public/neighborhoods/bosque-esmeralda.webp) and
// reference it by path, or paste a full https URL. The tile renders the image
// edge to edge (object-cover), so square art works best (192x192 WebP, a few KB, is plenty for the 56px tile); art with a
// transparent background sits on a soft tile so it still reads.
//
// Any name left out (or set to undefined) simply falls back to its lucide
// icon, so the picker keeps working while the artwork is produced one
// fraccionamiento at a time.
// Vite's base ('/valora/'), so images resolve under the /valora mount.
const BASE = import.meta.env.BASE_URL;

export const NEIGHBORHOOD_IMAGES: Record<string, string | undefined> = {
  'Condado de Sayavedra': `${BASE}neighborhoods/condado-sayavedra.webp`,
  'Hacienda de Valle Escondido': `${BASE}neighborhoods/hacienda-valle-escondido.webp`,
  'Bosque Real': `${BASE}neighborhoods/bosque-real.webp`,
  'Club de Golf Chiluca': `${BASE}neighborhoods/club-golf-chiluca.webp`,
  'Prado Largo': `${BASE}neighborhoods/prado-largo.webp`,
  'Rancho San Juan': `${BASE}neighborhoods/rancho-san-juan.webp`,
};

export function neighborhoodImage(colonia: string): string | undefined {
  return NEIGHBORHOOD_IMAGES[colonia];
}
