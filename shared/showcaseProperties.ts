// A small, hand-picked sample of real, currently-published listings from
// Habitanza's own portfolio in Zona Esmeralda — shown on the reveal step so
// a visitor sees genuine active inventory, not a mockup. These are NOT the
// comparables behind their preliminary estimate (the formula in pricing.ts
// doesn't use them); they exist purely as a credibility signal: "we
// actually work this market." Photos are Habitanza's own listing photos,
// already public on inmuebles24/mercadolibre/etc.
//
// Sampled 2026-07-10 via the internal portfolio search. Listings sell —
// refresh this list periodically so it doesn't go stale.
export interface ShowcaseProperty {
  tipo: 'Casa' | 'Departamento' | 'Terreno';
  colonia: string;
  precio: number;
  photo: string;
  m2: number;
  recamaras?: number;
  banos?: number;
}

export const SHOWCASE_PROPERTIES: ShowcaseProperty[] = [
  {
    tipo: 'Casa',
    colonia: 'Lomas de Valle Escondido',
    precio: 12590000,
    photo: 'https://images.pulppo.com/property/6848bda3b5c00ea3c679adfe/picture_ff6ccae7a8e847b8a743cf6cc091d7ce.jpg',
    m2: 277,
    recamaras: 3,
    banos: 2,
  },
  {
    tipo: 'Departamento',
    colonia: 'Bosque Esmeralda',
    precio: 8200000,
    photo: 'https://images.pulppo.com/property/6a2c5be8cc77b3ff30e2dec2/picture_50415c5b1aaa4ed884d4a9ad99355181.jpg',
    m2: 204,
    recamaras: 3,
    banos: 4,
  },
  {
    tipo: 'Terreno',
    colonia: 'Condado de Sayavedra',
    precio: 6900000,
    photo: 'https://images.pulppo.com/property/682bb72c0416496d73b46b8f/picture_d0003874f02c4a538ea20c2cb9c90107.JPG',
    m2: 1147,
  },
];
