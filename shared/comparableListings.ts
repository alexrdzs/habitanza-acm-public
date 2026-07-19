// Real, currently-published listings from Habitanza's portfolio (sampled
// 2026-07-10 via the internal inventory search), used on the reveal screen's
// map + mini cards. Keyed by colonia name, matching ZONA_ESMERALDA_COLONIAS
// in validation.ts. These are reference listings for social/spatial proof
// -- not the literal comparables behind the preliminary price formula in
// pricing.ts -- so copy referencing them should stay honest about that.
//
// This object is the single source of truth for every comparable listing
// and photo used across the wizard. To add, remove, or update a listing,
// edit the array for its colonia below -- every consumer (the reveal
// screen's map/cards, the location step's photo grid and "show more"
// teaser, the analyzing screen's map) reads through the helpers here or
// through COMPARABLE_LISTINGS directly, none of them hardcode a listing or
// photo of their own.
export interface ComparableListing {
  tipo: string;
  precio: number;
  m2: number;
  recamaras?: number;
  banos?: number;
  photo?: string;
  lat: number;
  lng: number;
  // Research templates remain in this source of truth but must never appear
  // in visitor-facing maps or cards.
  isPlaceholder?: boolean;
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
      // Corrected by Alex -- the portfolio's own coordinate for this listing
      // placed the pin in the wrong spot.
      lat: 19.568735,
      lng: -99.321748,
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

  // RESEARCH QUEUE — Bosque Real
  // Replace every TODO value with a real, active or recently sold comparable.
  // Add a Pulppo/CDN image URL where available, then delete `isPlaceholder`.
  // Do not publish zeros or approximate coordinates as completed comparables.
  'Bosque Real': [
    { tipo: 'TODO: comparable 1', precio: 0, m2: 0, lat: 0, lng: 0, isPlaceholder: true },
    { tipo: 'TODO: comparable 2', precio: 0, m2: 0, lat: 0, lng: 0, isPlaceholder: true },
    { tipo: 'TODO: comparable 3', precio: 0, m2: 0, lat: 0, lng: 0, isPlaceholder: true },
    { tipo: 'TODO: comparable 4', precio: 0, m2: 0, lat: 0, lng: 0, isPlaceholder: true },
    { tipo: 'TODO: comparable 5', precio: 0, m2: 0, lat: 0, lng: 0, isPlaceholder: true },
  ],

  // RESEARCH QUEUE — Interlomas
  // Same workflow: complete all factual fields, add an optional photo, then
  // delete `isPlaceholder` on each researched listing.
  'Interlomas': [
    { tipo: 'TODO: comparable 1', precio: 0, m2: 0, lat: 0, lng: 0, isPlaceholder: true },
    { tipo: 'TODO: comparable 2', precio: 0, m2: 0, lat: 0, lng: 0, isPlaceholder: true },
    { tipo: 'TODO: comparable 3', precio: 0, m2: 0, lat: 0, lng: 0, isPlaceholder: true },
    { tipo: 'TODO: comparable 4', precio: 0, m2: 0, lat: 0, lng: 0, isPlaceholder: true },
    { tipo: 'TODO: comparable 5', precio: 0, m2: 0, lat: 0, lng: 0, isPlaceholder: true },
  ],
};

// The primary listing photo for a given colonia, if it has one. The
// canonical way to look up a single photo -- components should call this
// instead of reaching into COMPARABLE_LISTINGS directly.
export function readyComparableListings(colonia: string): ComparableListing[] {
  return (COMPARABLE_LISTINGS[colonia] ?? []).filter((listing) => !listing.isPlaceholder);
}

// Development/research-only entries. Render them as progress indicators, never
// as factual listings, prices, or property pins.
export function pendingComparableListings(colonia: string): ComparableListing[] {
  return (COMPARABLE_LISTINGS[colonia] ?? []).filter((listing) => listing.isPlaceholder);
}

// Zone-wide count of real (non-placeholder) listings, for the reveal
// screen's "Referencias activas" tile. Derived so it never goes stale as
// listings are added or researched.
export function totalReadyListingsCount(): number {
  return Object.values(COMPARABLE_LISTINGS).reduce(
    (count, listings) => count + listings.filter((listing) => !listing.isPlaceholder).length,
    0
  );
}

// Zone-typical specs, derived (median) from the real, non-placeholder,
// non-terreno listings above. A directional benchmark for the reveal card's
// "above/below the zone" indicators, NOT a precise statistic. Uses the whole
// zone sample (per-colonia is too sparse) and the median, so one outlier
// (e.g. a 38 m² studio or a 1,300 m² estate) doesn't drag it. Any field with
// no data returns undefined, so consumers show no indicator rather than
// compare against a fabricated number. Note the sample skews to large homes,
// so this median runs high -- treat "below" as "below this premium zone," not
// "small."
export interface ZoneTypicalSpecs {
  recamaras?: number;
  banos?: number;
  m2?: number;
}

function median(values: number[]): number | undefined {
  if (values.length === 0) return undefined;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

export function zoneTypicalSpecs(): ZoneTypicalSpecs {
  const listings = Object.values(COMPARABLE_LISTINGS)
    .flat()
    .filter((l) => !l.isPlaceholder && !l.tipo.startsWith('Terreno'));
  const pick = (get: (l: ComparableListing) => number | undefined) =>
    median(listings.map(get).filter((v): v is number => v != null));
  return {
    recamaras: pick((l) => l.recamaras),
    banos: pick((l) => l.banos),
    m2: pick((l) => l.m2),
  };
}

export function coloniaPhoto(colonia: string): string | undefined {
  return readyComparableListings(colonia).find((listing) => listing.photo)?.photo;
}

// The source listings come straight from Pulppo's CDN at full camera
// resolution (2-3MB JPEGs, not resized for web) -- fine for a single reveal
// screen photo, but the location step renders up to 11 of these at once in
// small (~180px) grid cells, so serving the originals there wastes most of
// the download on pixels nobody sees. This routes non-local photo URLs
// through images.weserv.nl (a free resizing/re-encoding proxy) to request an
// appropriately-sized, modern-format (webp) version instead. Falls back to
// the original URL for anything already local or unrecognized.
export function optimizedPhotoUrl(url: string, width: number, quality = 70): string {
  if (!url.startsWith('http')) return url;
  const stripped = url.replace(/^https?:\/\//, '');
  return `https://images.weserv.nl/?url=${encodeURIComponent(stripped)}&w=${width}&q=${quality}&output=webp&fit=cover`;
}

// A representative sample of photos across different colonias, for purely
// decorative "browse more" teasers (e.g. the location step's "Ver más
// opciones" tile) that aren't tied to any specific hidden colonia. Walks
// COMPARABLE_LISTINGS in declaration order, so it's derived from whatever
// listings actually exist here -- it never goes stale if a listing is
// added, removed, or loses its photo, unlike hardcoding colonia names in
// the component that wants a teaser.
export function sampleListingPhotos(count: number): string[] {
  const photos: string[] = [];
  for (const listings of Object.values(COMPARABLE_LISTINGS)) {
    const photo = listings.find((listing) => !listing.isPlaceholder && listing.photo)?.photo;
    if (photo) photos.push(photo);
    if (photos.length >= count) break;
  }
  return photos;
}
