// Real, currently-published listings from OTHER agencies (Lamudi, EasyBroker),
// never from Habitanza's own Pulppo inventory. Checked on each listing page on
// 2026-11-05. They are used on the reveal screen's
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
  // Every comparable comes from another agency, never from Habitanza's own
  // Pulppo inventory. A portal pin is often the colonia centroid, not the house.
  source?: string; // portal name
  sourceUrl?: string; // public listing checked on 2026-11-05
}

export const COMPARABLE_LISTINGS: Record<string, ComparableListing[]> = {
  'Condado de Sayavedra': [
    { tipo: 'Casa', precio: 10250000, m2: 587, recamaras: 4, banos: 4, lat: 19.5692645, lng: -99.3217801, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-a9c048ac8b89-bc2c-1a088bd-8f2e-704c' },
    { tipo: 'Casa', precio: 11200000, m2: 320, recamaras: 4, banos: 3, lat: 19.5720296, lng: -99.3180444, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-6a8619747ed0-4119-1a1a2a0-bb09-70ca' },
    { tipo: 'Casa', precio: 14900000, m2: 495, recamaras: 3, banos: 5, lat: 19.570318, lng: -99.315741, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-4d9cf4daca3e-ff5e-1a05846-bf10-7a5e' },
    { tipo: 'Casa', precio: 8500000, m2: 390, recamaras: 5, banos: 5, lat: 19.5692645, lng: -99.3217801, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-e6302486b188-375-19443f7-92d5-7f31' },
    { tipo: 'Casa', precio: 10700000, m2: 331, recamaras: 3, banos: 2, lat: 19.5605442, lng: -99.3257236, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-9f325f103fcb-3998-1a07d81-a6e7-7646' },
    { tipo: 'Terreno residencial', precio: 5989000, m2: 600, lat: 19.569888, lng: -99.325584, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-c66bb64910b-9266-199d65a-b400-75d1' },
  ],
  'Hacienda de Valle Escondido': [
    { tipo: 'Casa', precio: 21950000, m2: 470, recamaras: 4, banos: 3, lat: 19.565593, lng: -99.317077, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-8a08e478c50b-d0ab-1a166b0-b086-7a7d' },
    { tipo: 'Casa', precio: 27000000, m2: 694, recamaras: 4, banos: 4, lat: 19.5668337, lng: -99.2979079, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-e54e14739c9-a065-19b04c8-b86e-7356' },
    { tipo: 'Casa', precio: 29980000, m2: 790, recamaras: 4, banos: 5, lat: 19.570359, lng: -99.307669, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-a3f607ebcc7c-40ed-19b32b9-909f-7739' }, // pin del portal para la colonia
    { tipo: 'Terreno residencial', precio: 18500000, m2: 2319, lat: 19.571881, lng: -99.307308, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-4102260f912a-53f7-19d22c6-b925-721b' },
    { tipo: 'Terreno residencial', precio: 13500000, m2: 1967, lat: 19.570359, lng: -99.307669, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-7c85094d5c62-e15e-19fb92e-914a-7ca4' }, // pin del portal para la colonia
  ],
  'Rancho San Juan': [
    { tipo: 'Casa', precio: 33980000, m2: 800, recamaras: 4, banos: 4, lat: 19.5798991, lng: -99.3009276, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-767854cdac9e-82e6-198afa1-b705-7735' },
    { tipo: 'Casa', precio: 27500000, m2: 580, recamaras: 4, banos: 5, lat: 19.5839646, lng: -99.3001173, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-548c3d1c8aaa-67e8-19fdc69-9cbe-7241' },
    { tipo: 'Casa', precio: 36000000, m2: 817, recamaras: 4, banos: 5, lat: 19.5839646, lng: -99.3001173, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-f46f47e4e9c4-b1ab-19b3352-8da0-776f' }, // pin del portal para la colonia
    { tipo: 'Casa', precio: 39500000, m2: 850, recamaras: 4, banos: 5, lat: 19.5839646, lng: -99.3001173, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-18641ce00efd-6736-19b3359-bedd-7393' }, // pin del portal para la colonia
    { tipo: 'Terreno residencial', precio: 9700000, m2: 861, lat: 19.5839646, lng: -99.3001173, source: 'EasyBroker', sourceUrl: 'https://www.easybroker.com/agent/properties/terreno-residencial-calle-premium-con-vista-al-fraccionamiento' },
    { tipo: 'Terreno residencial', precio: 11970000, m2: 1005, lat: 19.5839646, lng: -99.3001173, source: 'EasyBroker', sourceUrl: 'https://www.easybroker.com/listings/terreno-en-venta-nogales-rancho-san-juan' },
    { tipo: 'Terreno residencial', precio: 12300000, m2: 1044, lat: 19.5839646, lng: -99.3001173, source: 'EasyBroker', sourceUrl: 'https://www.easybroker.com/listings/terreno-venta-rancho-san-juan-zona-esmeralda-atizapan-de-zaragoza-edo-mex' },
    { tipo: 'Terreno residencial', precio: 15411000, m2: 1401, lat: 19.5839646, lng: -99.3001173, source: 'EasyBroker', sourceUrl: 'https://www.easybroker.com/listings/terreno-en-venta-en-rancho-san-juan-39ec8d23-ea07-4ef2-aa0a-8f33ccd438f2' },
    { tipo: 'Terreno residencial', precio: 11638400, m2: 1164, lat: 19.5839646, lng: -99.3001173, source: 'EasyBroker', sourceUrl: 'https://www.easybroker.com/listings/venta-terreno-en-ocotes-rancho-san-juan-atizapan-de-zaragoza' },
    { tipo: 'Terreno residencial', precio: 11400000, m2: 1057, lat: 19.5839646, lng: -99.3001173, source: 'EasyBroker', sourceUrl: 'https://www.easybroker.com/listings/se-vende-terreno-en-rancho-san-juan-rancho-san-juan' },
  ],
  'Bosque Real': [
    { tipo: 'Casa', precio: 19950000, m2: 504, recamaras: 4, banos: 6, lat: 19.42133241, lng: -99.28775149, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-77d5098450ce-a19f-1a18514-9804-71c1' },
    { tipo: 'Casa', precio: 21850000, m2: 525, recamaras: 4, banos: 5, lat: 19.4253797, lng: -99.27637893, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-7bc49ec5d03d-a8a2-19c4828-838a-7615' },
    { tipo: 'Casa', precio: 31800000, m2: 616, recamaras: 3, banos: 4, lat: 19.430398, lng: -99.288052, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-3400882cd2f6-50df-19e1f46-84fa-7068' },
    { tipo: 'Casa', precio: 26000000, m2: 669, recamaras: 4, banos: 5, lat: 19.426706, lng: -99.28175, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-6c1a1ca82b03-a01d-198353d-8be5-7b1d' },
    { tipo: 'Casa', precio: 21950000, m2: 525, recamaras: 4, banos: 5, lat: 19.42550112, lng: -99.27612143, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-d8e9249e79bc-c07c-19c481b-922a-718a' },
  ],
  'Club de Golf Chiluca': [
    { tipo: 'Casa', precio: 14100000, m2: 522, recamaras: 3, lat: 19.544405, lng: -99.304728, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-ad25c9494ffa-9a4c-1a18fb9-8827-7a09' },
    { tipo: 'Casa', precio: 16900000, m2: 390, recamaras: 3, lat: 19.5526792, lng: -99.3010057, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-49a17a3426cb-b171-19c68a9-9693-71d3' },
    { tipo: 'Casa', precio: 12850000, m2: 400, recamaras: 3, lat: 19.5422876, lng: -99.302243, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-86afb66fcee7-64dc-1a01127-85ca-7555' },
    { tipo: 'Casa', precio: 10850000, m2: 200, recamaras: 3, banos: 5, lat: 19.5439857, lng: -99.3048959, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-4fb418fe045c-cc6a-1973249-b094-715f' },
    { tipo: 'Terreno residencial', precio: 4400000, m2: 200, lat: 19.5500887, lng: -99.3020027, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-325b6ff49beb-26d8-199e435-bedb-795b' },
    { tipo: 'Terreno residencial', precio: 5800000, m2: 455, lat: 19.548217, lng: -99.304503, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-941345fe352a-69c7-19cb1bf-bf2a-7c13' },
    { tipo: 'Terreno residencial', precio: 8800000, m2: 1396, lat: 19.551545, lng: -99.301164, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-a8d028b6d1fe-2116-1966ae6-ae2c-7785' },
  ],
  'Prado Largo': [
    { tipo: 'Casa', precio: 20000000, m2: 500, recamaras: 3, banos: 3, lat: 19.5554838, lng: -99.3104417, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-5d62391338d5-bd93-19a939c-a06f-76e2' },
    { tipo: 'Casa', precio: 25400000, m2: 650, recamaras: 3, banos: 4, lat: 19.554094, lng: -99.311873, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-f62f7d6b1a97-2677-1a16175-aa6f-73d0' },
    { tipo: 'Casa', precio: 15900000, m2: 450, recamaras: 4, banos: 4, lat: 19.555484, lng: -99.310442, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-1666b66e0244-233d-1a13d92-9afb-7a66' },
    { tipo: 'Casa', precio: 37000000, m2: 600, recamaras: 4, banos: 4, lat: 19.555484, lng: -99.310442, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-637e240febe-760a-194d150-8ac2-7209' },
    { tipo: 'Casa', precio: 18200001, m2: 414, recamaras: 4, banos: 4, lat: 19.558774, lng: -99.303162, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-b278c13241d8-a249-1a083f4-a153-7f41' },
    { tipo: 'Casa', precio: 15500000, m2: 468, recamaras: 3, banos: 3, lat: 19.561212, lng: -99.298872, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-f1053a842319-b4a1-19b48eb-afb6-7d20' },
  ]
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

// Minimum real, sized terreno comps before we'll show a lot-size benchmark.
// Below this the sample isn't representative enough to call a value "above" or
// "below" the zone, so the reveal card shows no size arrow (see PropertyCard).
const MIN_TERRENO_SAMPLE = 3;

// Same idea for built m², applied per property type (see
// zoneTypicalConstruccionM2): a type with fewer than this many real comps
// (today: departamentos) gets no construcción benchmark, so the card omits that
// clause instead of comparing against a two-listing median.
const MIN_CONSTRUCCION_SAMPLE = 3;

// Median lot size (m²) of the zone's real terreno listings, or undefined when
// there aren't enough to be directional. Terrenos are benchmarked on their own
// pool (never against built homes).
export function zoneTypicalTerrenoM2(): number | undefined {
  const sizes = Object.values(COMPARABLE_LISTINGS)
    .flat()
    .filter((l) => !l.isPlaceholder && l.tipo.startsWith('Terreno') && l.m2 > 0)
    .map((l) => l.m2);
  return sizes.length >= MIN_TERRENO_SAMPLE ? median(sizes) : undefined;
}

// Median built m² of the zone's real listings *of a single property type*
// ('Casa' or 'Departamento'), or undefined when there aren't enough to be
// directional. Built m² varies enormously by type (this zone's casas run many
// times larger than its departamentos), so benchmarking a property against the
// blended pool made e.g. an apartment routinely read "menos m² de construcción"
// only because large casas share the pool. Keeping the benchmark within the
// selected type fixes that; below the sample floor the reveal card omits the
// construcción read rather than compare against a too-thin same-type median.
export function zoneTypicalConstruccionM2(tipoPropiedad: string): number | undefined {
  const sizes = Object.values(COMPARABLE_LISTINGS)
    .flat()
    .filter((l) => !l.isPlaceholder && l.tipo === tipoPropiedad && l.m2 > 0)
    .map((l) => l.m2);
  return sizes.length >= MIN_CONSTRUCCION_SAMPLE ? median(sizes) : undefined;
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
