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
  // 'Habitanza' = own portfolio (exact coordinates). A portal name = verified
  // on that portal's listing page; its pin is often the colonia centroid.
  source?: string;
  ref?: string; // Habitanza internal code
  sourceUrl?: string; // public listing checked on 2026-11-04
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
  // Both terrenos sit in the same "Castillo de Nottingham" privada, so they
  // share the coordinate Alex hand-corrected (the portfolio's own coordinate
  // placed the pin in the wrong spot). TXJ-575's size comes from its listing
  // description (its structured superficie field is unset). The earlier single
  // entry here mixed TAZ-393's price with TAC-805's size; these two replace it.
  'Condado de Sayavedra': [
    { tipo: 'Terreno residencial', precio: 4567000, m2: 572.62, photo: 'https://images.pulppo.com/property/6812b95bc4b9d40da6848713/picture_c779a06850164202bf888daf87dd65f9.jpg', lat: 19.568735, lng: -99.321748, source: 'Habitanza', ref: 'TAC-805' },
    { tipo: 'Terreno residencial', precio: 6900000, m2: 1147, photo: 'https://images.pulppo.com/property/682bb72c0416496d73b46b8f/picture_c20711b17147487db599fcefbc5050f7.jpg', lat: 19.568735, lng: -99.321748, source: 'Habitanza', ref: 'TXJ-575' },
    { tipo: 'Terreno residencial', precio: 3962000, m2: 346, photo: 'https://images.pulppo.com/property/6aa5a112278d249c1b626029/picture_615b726b5c4e4829bcf5c4c1a53d8dd5.jpg', lat: 19.5820306, lng: -99.3149825, source: 'Habitanza', ref: 'TMS-854' }, // lote de 346 m², Residencial Xinté
    { tipo: 'Casa', precio: 9450000, m2: 460, recamaras: 3, banos: 3.5, photo: 'https://images.pulppo.com/property/65a5497f5730e4104137abf7/image_5.jpg', lat: 19.5876934, lng: -99.3070449, source: 'Habitanza', ref: 'CAJ-057' }, // despublicada; 721 m² de terreno
    { tipo: 'Casa', precio: 10250000, m2: 587, recamaras: 4, banos: 4, lat: 19.5692645, lng: -99.3217801, source: 'Lamudi', ref: '1973…8f2e-704c' },
    { tipo: 'Casa', precio: 11200000, m2: 320, recamaras: 4, banos: 3, lat: 19.5720296, lng: -99.3180444, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-6a8619747ed0-4119-1a1a2a0-bb09-70ca' },
    { tipo: 'Casa', precio: 14900000, m2: 495, recamaras: 3, banos: 5, lat: 19.570318, lng: -99.315741, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-4d9cf4daca3e-ff5e-1a05846-bf10-7a5e' },
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
    { tipo: 'Casa', precio: 29900000, m2: 720, recamaras: 4, banos: 4, photo: 'https://images.pulppo.com/property/668726857e451ad6898334b7/picture_7be38888e7384885b716bcc89772650f.jpg', lat: 19.5666796, lng: -99.312316, source: 'Habitanza', ref: 'CAN-505' },
    { tipo: 'Casa', precio: 34000000, m2: 700, recamaras: 4, banos: 4, photo: 'https://images.pulppo.com/property/68c9b5628090b21401203223/picture_118d30c723d94aca89c883572613db7e.jpg', lat: 19.5719563, lng: -99.3088356, source: 'Habitanza', ref: 'CAQ-399' },
    { tipo: 'Casa', precio: 27700000, m2: 675, recamaras: 4, banos: 5, lat: 19.5703585, lng: -99.3076688, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-66cb87d16876-1567-19cb9fa-af68-77e4' },
    { tipo: 'Casa', precio: 21950000, m2: 470, recamaras: 4, banos: 3, lat: 19.565593, lng: -99.317077, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-8a08e478c50b-d0ab-1a166b0-b086-7a7d' },
    { tipo: 'Casa', precio: 27000000, m2: 694, recamaras: 4, banos: 4, lat: 19.5668337, lng: -99.2979079, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-e54e14739c9-a065-19b04c8-b86e-7356' },
  ],
  'Rancho San Juan': [
    { tipo: 'Casa', precio: 44900000, m2: 1327, recamaras: 4, banos: 4, photo: 'https://images.pulppo.com/property/661d78820d396bcc67f31730/picture_89ba75fd79f3470c803b17c109d25d1f.png', lat: 19.5869926, lng: -99.302409, source: 'Habitanza', ref: 'TAP-307' },
    { tipo: 'Casa', precio: 39600000, m2: 800, recamaras: 3, banos: 5, photo: 'https://images.pulppo.com/property/6849fc511c99bdab5de88394/picture_65e362f7986b4207af92cab0f9fb7f66.jpg', lat: 19.5810465, lng: -99.3008712, source: 'Habitanza', ref: 'CAC-461' }, // despublicada
    { tipo: 'Terreno residencial', precio: 11750000, m2: 1080, photo: 'https://images.pulppo.com/property/6a85245e8c39402048e1835b/picture_c3e50742a77d4a20b8c675c1514ead10.jpeg', lat: 19.5839646, lng: -99.3001173, source: 'Habitanza', ref: 'THU-827' }, // 27 m x 40 m de su descripción
    { tipo: 'Casa', precio: 38250000, m2: 731, recamaras: 4, banos: 5, lat: 19.5839646, lng: -99.3001173, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-9bfd0ede486b-e06c-19d8eae-b0c8-768d' },
    { tipo: 'Casa', precio: 33980000, m2: 800, recamaras: 4, banos: 4, lat: 19.5798991, lng: -99.3009276, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-767854cdac9e-82e6-198afa1-b705-7735' },
    { tipo: 'Casa', precio: 32000000, m2: 815, recamaras: 4, banos: 7, lat: 19.5839646, lng: -99.3001173, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-9096feec4ea-bfb6-190dccb-bdac-7d0d' },
    { tipo: 'Casa', precio: 27500000, m2: 580, recamaras: 4, banos: 5, lat: 19.5839646, lng: -99.3001173, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-548c3d1c8aaa-67e8-19fdc69-9cbe-7241' },
  ],

  'Bosque Real': [
    { tipo: 'Terreno residencial', precio: 8900000, m2: 504.36, photo: 'https://images.pulppo.com/property/69d0934d948582309180ca28/picture_1b4c0e95ac23445a8291d66ff717b95c.jpg', lat: 19.427217, lng: -99.282115, source: 'Habitanza', ref: 'TBQ-319' }, // Las Pérgolas; m² de su descripción
    { tipo: 'Departamento', precio: 6600000, m2: 164.66, recamaras: 2, banos: 2, photo: 'https://images.pulppo.com/property/6ab48d0206f8c855c9740afa/picture_d8d8599581e24e4cb46b7619cc2dc950.jpg', lat: 19.4271666, lng: -99.2862197, source: 'Habitanza', ref: 'DFD-113' },
    { tipo: 'Departamento', precio: 11690000, m2: 164, recamaras: 2, banos: 2.5, photo: 'https://images.pulppo.com/property/6ab192eaf047a11c71a57d95/picture_8074b6c5d68642de9170be2a47ab54e0.jpg', lat: 19.4361797, lng: -99.2831966, source: 'Habitanza', ref: 'DPU-066' },
    { tipo: 'Departamento', precio: 9250000, m2: 189, recamaras: 3, banos: 3.5, photo: 'https://images.pulppo.com/property/6a8916b27b1028fc9e3cfe7d/picture_08e57bf962414b7da2a7852565d4406a.jpg', lat: 19.430297, lng: -99.2880548, source: 'Habitanza', ref: 'DES-855' },
    { tipo: 'Departamento', precio: 27790000, m2: 520, recamaras: 3, banos: 3, photo: 'https://images.pulppo.com/property/68d4a9c0effe7ded4aa98bec/picture_994f566524f24722a84f2afc76a495a8.jpg', lat: 19.4190638, lng: -99.2858674, source: 'Habitanza', ref: 'DHW-576' }, // obra gris, 636 m² totales
    { tipo: 'Casa', precio: 19950000, m2: 504, recamaras: 4, banos: 6, lat: 19.42133241, lng: -99.28775149, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-77d5098450ce-a19f-1a18514-9804-71c1' },
    { tipo: 'Casa', precio: 17250000, m2: 400, recamaras: 3, banos: 4, lat: 19.4303982, lng: -99.2880519, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-59c614f84dbe-1819-1a0951f-88ce-7450' },
    { tipo: 'Casa', precio: 26950000, m2: 700, recamaras: 4, banos: 4, lat: 19.4303982, lng: -99.2880519, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-10b2b44c7658-c7cf-1a003ee-a06e-7455' },
    { tipo: 'Casa', precio: 21800000, m2: 441, recamaras: 4, banos: 4, lat: 19.430297, lng: -99.288055, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-c9dc4ec02719-b53-196a8ba-bd60-7197' },
    { tipo: 'Casa', precio: 31800000, m2: 616, recamaras: 3, banos: 4, lat: 19.430398, lng: -99.288052, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-3400882cd2f6-50df-19e1f46-84fa-7068' },
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
  'Club de Golf Chiluca': [
    { tipo: 'Casa', precio: 14100000, m2: 522, recamaras: 3, lat: 19.544405, lng: -99.304728, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-ad25c9494ffa-9a4c-1a18fb9-8827-7a09' },
    { tipo: 'Casa', precio: 16900000, m2: 390, recamaras: 3, lat: 19.5526792, lng: -99.3010057, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-49a17a3426cb-b171-19c68a9-9693-71d3' },
    { tipo: 'Casa', precio: 12850000, m2: 400, recamaras: 3, lat: 19.5422876, lng: -99.302243, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-86afb66fcee7-64dc-1a01127-85ca-7555' },
    { tipo: 'Casa', precio: 9950000, m2: 330, recamaras: 3, lat: 19.5481306, lng: -99.3102626, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-e9b286b55957-e9d4-19b9a44-bd0f-7c73' },
    { tipo: 'Casa', precio: 10850000, m2: 200, recamaras: 3, banos: 5, lat: 19.5439857, lng: -99.3048959, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-4fb418fe045c-cc6a-1973249-b094-715f' },
    { tipo: 'Terreno residencial', precio: 4400000, m2: 200, lat: 19.5500887, lng: -99.3020027, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-325b6ff49beb-26d8-199e435-bedb-795b' },
    { tipo: 'Terreno residencial', precio: 5800000, m2: 455, lat: 19.548217, lng: -99.304503, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-941345fe352a-69c7-19cb1bf-bf2a-7c13' },
    { tipo: 'Terreno residencial', precio: 8800000, m2: 1396, lat: 19.551545, lng: -99.301164, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-a8d028b6d1fe-2116-1966ae6-ae2c-7785' },
  ],
  'Prado Largo': [
    { tipo: 'Casa', precio: 20000000, m2: 500, recamaras: 3, banos: 3, lat: 19.5554838, lng: -99.3104417, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-5d62391338d5-bd93-19a939c-a06f-76e2' },
    { tipo: 'Casa', precio: 25400000, m2: 650, recamaras: 3, banos: 4, lat: 19.554094, lng: -99.311873, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-f62f7d6b1a97-2677-1a16175-aa6f-73d0' },
    { tipo: 'Casa', precio: 28700000, m2: 1084, recamaras: 4, banos: 4, lat: 19.5554838, lng: -99.3104417, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-19ffa9291bdf-633a-1922792-9cad-7599' },
    { tipo: 'Casa', precio: 15900000, m2: 450, recamaras: 4, banos: 4, lat: 19.555484, lng: -99.310442, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-1666b66e0244-233d-1a13d92-9afb-7a66' },
    { tipo: 'Casa', precio: 37000000, m2: 600, recamaras: 4, banos: 4, lat: 19.555484, lng: -99.310442, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-637e240febe-760a-194d150-8ac2-7209' },
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
