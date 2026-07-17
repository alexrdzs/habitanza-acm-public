// Single source of truth for an optional rich illustration per
// fraccionamiento -- e.g. Airbnb-style 3D icons rendered with Nano Banana.
// When a name has an image here, the location picker shows that visual in
// place of the flat lucide fallback icon (see shared/neighborhoodIcons.ts),
// giving each row a distinctive, dynamic thumbnail instead of a generic icon.
//
// This is the ONE place a fraccionamiento is tied to an image. Drop square
// artwork in `/public` (e.g. /public/neighborhoods/bosque-esmeralda.png) and
// reference it by path, or paste a full https URL. The tile renders the image
// edge to edge (object-cover), so square art works best; art with a
// transparent background sits on a soft tile so it still reads.
//
// Any name left out (or set to undefined) simply falls back to its lucide
// icon, so the picker keeps working while the artwork is produced one
// fraccionamiento at a time.
export const NEIGHBORHOOD_IMAGES: Record<string, string | undefined> = {
  // 'Bosque Esmeralda': '/neighborhoods/bosque-esmeralda.png',
  // 'Residencial Lago Esmeralda': '/neighborhoods/lago-esmeralda.png',
  // 'Condado de Sayavedra': '/neighborhoods/condado-sayavedra.png',
  // 'Lomas de Valle Escondido': '/neighborhoods/lomas-valle-escondido.png',
  // 'Hacienda de Valle Escondido': '/neighborhoods/hacienda-valle-escondido.png',
  // 'Rancho San Juan': '/neighborhoods/rancho-san-juan.png',
};

export function neighborhoodImage(colonia: string): string | undefined {
  return NEIGHBORHOOD_IMAGES[colonia];
}
