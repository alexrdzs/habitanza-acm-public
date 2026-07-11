// Real coordinates sampled from Habitanza's own published listings in each
// colonia (2026-07-10) — a representative point within the neighborhood,
// not a precise centroid. Used only to center the decorative/real map on
// the location step; not survey-grade.
export const NEIGHBORHOOD_COORDINATES: Record<string, { lat: number; lng: number }> = {
  'Bosque Esmeralda': { lat: 19.548263184561648, lng: -99.31109283622297 },
  'Residencial Lago Esmeralda': { lat: 19.536344973210404, lng: -99.26503462516754 },
  'Condado de Sayavedra': { lat: 19.5853053, lng: -99.3091286 },
  'Lomas de Valle Escondido': { lat: 19.5572671, lng: -99.29931789999999 },
  'Hacienda de Valle Escondido': { lat: 19.5719563, lng: -99.3088356 },
  'Rancho San Juan': { lat: 19.5869926, lng: -99.302409 },
  'Fincas de Sayavedra': { lat: 19.5792689, lng: -99.3222996 },
};

// Fallback center — roughly the middle of the six colonias above — used
// when a colonia isn't in the map yet (free-text "otra colonia").
export const ZONA_ESMERALDA_CENTER = { lat: 19.5645, lng: -99.3 };
