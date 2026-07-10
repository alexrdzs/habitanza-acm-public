// Real, currently-published listings from Habitanza's portfolio (sampled
// 2026-07-10 via the internal inventory search), used on the reveal screen's
// map + mini cards. Keyed by colonia name, matching ZONA_ESMERALDA_COLONIAS
// in validation.ts. These are reference listings for social/spatial proof
// -- not the literal comparables behind the preliminary price formula in
// pricing.ts -- so copy referencing them should stay honest about that.
export interface ComparableListing {
  tipo: string;
  precio: number;
  m2: number;
  recamaras?: number;
  banos?: number;
  photo?: string;
  lat: number;
  lng: number;
}

export const COMPARABLE_LISTINGS: Record<string, ComparableListing[]> = {
  'Bosque Esmeralda': [
    {
      tipo: 'Departamento',
      precio: 8200000,
      m2: 204,
      recamaras: 3,
      banos: 3.5,
      photo: 'https://images.pulppo.com/property/6a2c5be8cc77b3ff30e2dec2/picture_50415c5b1aaa4ed884d4a9ad99355181.jpg',
      lat: 19.5469485,
      lng: -99.2896171,
    },
  ],
  'Residencial Lago Esmeralda': [
    {
      tipo: 'Departamento',
      precio: 2400000,
      m2: 38,
      recamaras: 2,
      banos: 1,
      photo: 'https://images.pulppo.com/property/6a45795f269e2c5b67c69d46/picture_deb933fd2f5a4511bd55fe2fb82b78f4.jpg',
      lat: 19.538488376687923,
      lng: -99.2654659785737,
    },
  ],
  'Condado de Sayavedra': [
    {
      tipo: 'Terreno residencial',
      precio: 3800000,
      m2: 572.62,
      photo: 'https://images.pulppo.com/property/6812b95bc4b9d40da6848713/picture_ab59db6530f14c4c8824ad4b7747916d.jpg',
      lat: 19.5853053,
      lng: -99.3091286,
    },
  ],
  'Lomas de Valle Escondido': [
    {
      tipo: 'Casa',
      precio: 12590000,
      m2: 277,
      recamaras: 3,
      banos: 2,
      photo: 'https://images.pulppo.com/property/6848bda3b5c00ea3c679adfe/picture_ff6ccae7a8e847b8a743cf6cc091d7ce.jpg',
      lat: 19.5586259,
      lng: -99.30034119999999,
    },
    {
      tipo: 'Casa',
      precio: 16950000,
      m2: 429,
      recamaras: 3,
      banos: 3,
      photo: 'https://images.pulppo.com/property/6876d9909c31f0380ae089d0/picture_d583d3b90736422ea569d7e38127f0be.jpg',
      lat: 19.5572671,
      lng: -99.29931789999999,
    },
  ],
  'Hacienda de Valle Escondido': [
    {
      tipo: 'Casa',
      precio: 29900000,
      m2: 720,
      recamaras: 4,
      banos: 4,
      photo: 'https://images.pulppo.com/property/668726857e451ad6898334b7/picture_7be38888e7384885b716bcc89772650f.jpg',
      lat: 19.5666796,
      lng: -99.31231600000001,
    },
    {
      tipo: 'Casa',
      precio: 34000000,
      m2: 700,
      recamaras: 4,
      banos: 4,
      photo: 'https://images.pulppo.com/property/68c9b5628090b21401203223/picture_118d30c723d94aca89c883572613db7e.jpg',
      lat: 19.5719563,
      lng: -99.3088356,
    },
  ],
  'Rancho San Juan': [
    {
      tipo: 'Casa',
      precio: 44900000,
      m2: 1327,
      recamaras: 4,
      banos: 4,
      photo: 'https://images.pulppo.com/property/661d78820d396bcc67f31730/picture_89ba75fd79f3470c803b17c109d25d1f.png',
      lat: 19.5869926,
      lng: -99.302409,
    },
  ],
};
