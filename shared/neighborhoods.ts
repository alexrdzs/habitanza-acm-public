// Real coordinates sampled from Habitanza's own published listings in each
// colonia (2026-07-10) — a representative point within the neighborhood,
// not a precise centroid. Used only to center the decorative/real map on
// the location step; not survey-grade.
export const NEIGHBORHOOD_COORDINATES: Record<string, { lat: number; lng: number }> = {
  'Condado de Sayavedra': { lat: 19.568868, lng: -99.3228756 },
  'Lomas de Valle Escondido': { lat: 19.554829, lng: -99.301831 },
  'Lago Esmeralda': { lat: 19.5370996, lng: -99.272454 },

  'Hacienda de Valle Escondido': { lat: 19.5719563, lng: -99.3088356 },
  'Rancho San Juan': { lat: 19.5869926, lng: -99.302409 },
  'Bosque Real': { lat: 19.4155848, lng: -99.2843137 },

  // View More

  'Bosque Esmeralda': { lat: 19.548263184561648, lng: -99.31109283622297 },
  'Club de Golf Valle Escondido': { lat: 19.5614362, lng: -99.3069787 },
  'Club de Golf Chiluca': { lat: 19.5439857, lng: -99.30489589999999 },
  'La Estadía': { lat: 19.5354335, lng: -99.2993504 },
  'Fincas de Sayavedra': { lat: 19.5792689, lng: -99.3222996 },
  'Prado Largo': { lat: 19.5554838, lng: -99.3104417 },
  'Interlomas y Hda. de las Palmas': { lat: 19.4024249, lng: -99.2720745 },
};

// Fallback center — roughly the middle of the six colonias above — used
// when a colonia isn't in the map yet (free-text "otra colonia").
export const ZONA_ESMERALDA_CENTER = { lat: 19.5645, lng: -99.3 };
