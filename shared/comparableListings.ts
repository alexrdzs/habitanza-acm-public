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
  // Main photo of the source listing (another agency's). Kept only for listings
  // that passed the photo quality check.
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
    { tipo: 'Casa', precio: 8200000, m2: 300, recamaras: 4, banos: 4, photo: 'https://assets.easybroker.com/property_images/6109299/108233888/EB-WL9299.jpeg', lat: 19.5692645, lng: -99.3217801, source: 'EasyBroker', sourceUrl: 'https://quality-habitat.easybroker.com/property/casa-preventa-condado-de-sayavedra-pagos-diferidos' },
    { tipo: 'Casa', precio: 11990000, m2: 435, recamaras: 3, banos: 3, photo: 'https://assets.easybroker.com/property_images/6038655/106711276/EB-WE8655.jpeg', lat: 19.569888, lng: -99.325584, source: 'EasyBroker', sourceUrl: 'https://quality-arteaga.easybroker.com/property/vendo-casa-condado-de-sayavedra-condado-de-sayavedra-casa' },
    { tipo: 'Casa', precio: 12000000, m2: 539, recamaras: 4, banos: 4, photo: 'https://assets.easybroker.com/property_images/6133749/108764132/EB-WO3749.jpeg', lat: 19.569888, lng: -99.325584, source: 'EasyBroker', sourceUrl: 'https://mdpconsultoria-inmobiliaria.easybroker.com/property/condado-sayavedra-vendo-casa' },
    { tipo: 'Casa', precio: 20000000, m2: 888, recamaras: 5, banos: 7, photo: 'https://assets.easybroker.com/property_images/5633826/98324704/EB-UQ3826.jpeg', lat: 19.5692645, lng: -99.3217801, source: 'EasyBroker', sourceUrl: 'https://tresolbienesraices.easybroker.com/property/vendo-residencia-condado-de-sayavedra-condado-de-sayavedra' },
    { tipo: 'Terreno residencial', precio: 3800000, m2: 510, photo: 'https://assets.easybroker.com/property_images/4574329/76804087/EB-QO4329.jpg', lat: 19.5833053, lng: -99.3111286, source: 'EasyBroker', sourceUrl: 'https://mx-inmobiliaria.easybroker.com/property/terrenos-en-venta-condado-de-sayavedra-atizapan-de-zaragoza-estado-de-mexico' },
    { tipo: 'Terreno residencial', precio: 4489000, m2: 385, photo: 'https://assets.easybroker.com/property_images/6152129/109145100/EB-WQ2129.jpeg', lat: 19.5853053, lng: -99.3091286, source: 'EasyBroker', sourceUrl: 'https://network-de-asesores-inmobiliarios.easybroker.com/property/terrenos-residenciales-en-condominio-horizontal-condado-de-sayavedra' },
  ],
  'Hacienda de Valle Escondido': [
    { tipo: 'Casa', precio: 24889000, m2: 800, recamaras: 5, banos: 5, photo: 'https://assets.easybroker.com/property_images/6080452/107624125/EB-WJ0452.jpeg', lat: 19.5650443, lng: -99.3101993, source: 'EasyBroker', sourceUrl: 'https://interksa.easybroker.com/property/vendo-residencia-hacienda-de-valle-escondido' },
    { tipo: 'Casa', precio: 26889000, m2: 701, recamaras: 5, banos: 5, photo: 'https://assets.easybroker.com/property_images/5704331/99687150/EB-UX4331.jpeg', lat: 19.5703585, lng: -99.3076688, source: 'EasyBroker', sourceUrl: 'https://mdpconsultoria-inmobiliaria.easybroker.com/property/vendo-casa-en-real-de-hacienda-de-valle-escondido' },
    { tipo: 'Casa', precio: 28500000, m2: 627, recamaras: 4, banos: 6, photo: 'https://assets.easybroker.com/property_images/6068316/107405751/EB-WH8316.jpeg', lat: 19.3264047715, lng: -99.6050102185, source: 'EasyBroker', sourceUrl: 'https://mdpconsultoria-inmobiliaria.easybroker.com/property/vendo-casa-hacienda-de-valle-escondido-hacienda-de-valle-escondido-atizapan-de-zaragoza' },
    { tipo: 'Casa', precio: 28800000, m2: 565, recamaras: 4, banos: 4, photo: 'https://assets.easybroker.com/property_images/5983661/105511034/EB-VZ3661.jpg', lat: 19.5703585, lng: -99.3076688, source: 'EasyBroker', sourceUrl: 'https://innovareal.easybroker.com/property/hacienda-de-valle-escondido-c0a0ed4b-3d51-4ae2-8a77-796cf8467ebc' },
    { tipo: 'Terreno residencial', precio: 14200000, m2: 1907, photo: 'https://assets.easybroker.com/property_images/3971534/65455548/EB-OG1534.jpeg', lat: 19.567008303, lng: -99.3157839528, source: 'EasyBroker', sourceUrl: 'https://tresolbienesraices.easybroker.com/property/vendo-predio-en-hacienda-de-valle-escondido-residencial-muy-exclusivo' },
    { tipo: 'Terreno residencial', precio: 16000000, m2: 2236, photo: 'https://assets.easybroker.com/property_images/5323018/91883488/EB-TL3018.jpeg', lat: 19.5703585, lng: -99.3076688, source: 'EasyBroker', sourceUrl: 'https://easyhomescuernavaca.easybroker.com/property/terreno-de-venta-hacienda-de-valle-escondido-cod-vte795' },
    { tipo: 'Terreno residencial', precio: 39000000, m2: 6772, photo: 'https://assets.easybroker.com/property_images/6242041/110732538/EB-WZ2041.JPG', lat: 19.5639930991, lng: -99.3178788522, source: 'EasyBroker', sourceUrl: 'https://network-de-asesores-inmobiliarios.easybroker.com/property/venta-terreno-en-los-reales-dentro-hacienda-de-valle-escondido-atizapan-edo-mex' },
  ],
  'Rancho San Juan': [
    { tipo: 'Casa', precio: 35000000, m2: 982, recamaras: 4, banos: 5, photo: 'https://assets.easybroker.com/property_images/6086095/107748111/EB-WJ6095.png', lat: 19.5858451, lng: -99.301925, source: 'EasyBroker', sourceUrl: 'https://innovareal.easybroker.com/property/canelos-en-rancho-san-juan' },
    { tipo: 'Casa', precio: 38250000, m2: 732, recamaras: 4, banos: 5, photo: 'https://assets.easybroker.com/property_images/6099186/108031354/EB-WK9186.jpeg', lat: 19.5875995, lng: -99.2962383, source: 'EasyBroker', sourceUrl: 'https://mx-inmobiliaria.easybroker.com/property/vendo-casa-en-rancho-san-juan' },
    { tipo: 'Terreno residencial', precio: 10900000, m2: 886, photo: 'https://assets.easybroker.com/property_images/6134365/108772162/EB-WO4365.jpg', lat: 19.577148, lng: -99.3000986, source: 'EasyBroker', sourceUrl: 'https://valueinmobiliaria.easybroker.com/property/terreno-en-venta-en-rancho-san-juan-atizapan-de-zaragoza-8c8c8742-ff35-4d30-b151-143892e7d1de' },
    { tipo: 'Terreno residencial', precio: 11000000, m2: 1112, photo: 'https://assets.easybroker.com/property_images/6028898/106508205/EB-WD8898.jpg', lat: 19.5753082, lng: -99.2936368, source: 'EasyBroker', sourceUrl: 'https://rivero-bienesraices.easybroker.com/property/terreno-en-venta-en-rancho-san-juan-atizapan-de-zaragoza-03d2f3b7-c2e6-4285-b5ed-bee87c0c36c0' },
    { tipo: 'Terreno residencial', precio: 12300000, m2: 1044, photo: 'https://assets.easybroker.com/property_images/6172871/109605944/EB-WS2871.jpeg', lat: 19.5798701, lng: -99.2975523, source: 'EasyBroker', sourceUrl: 'https://grupo-tzar.easybroker.com/property/terreno-venta-rancho-san-juan-zona-esmeralda-atizapan-de-zaragoza-edo-mex' },
    { tipo: 'Terreno residencial', precio: 13500000, m2: 1145, photo: 'https://assets.easybroker.com/property_images/6222757/110592423/EB-WX2757.jpeg', lat: 19.5839646, lng: -99.3001173, source: 'EasyBroker', sourceUrl: 'https://heyhaus-listado.easybroker.com/property/terreno-venta-en-rancho-san-juan-almendros-atizapan-zaragoza' },
    { tipo: 'Terreno residencial', precio: 15000000, m2: 1316, photo: 'https://assets.easybroker.com/property_images/5951211/104838650/EB-VW1211.jpg', lat: 19.5760751, lng: -99.2970842, source: 'EasyBroker', sourceUrl: 'https://mac.easybroker.com/property/terreno-en-venta-rancho-san-juan-atizapan-de-zaragoza-4408db82-3853-41cb-9797-7effca47ae0a' },
  ],
  'Bosque Real': [
    { tipo: 'Casa', precio: 23499000, m2: 632, recamaras: 3, banos: 3, photo: 'https://assets.easybroker.com/property_images/6175919/109671554/EB-WS5919.jpg', lat: 19.4262738, lng: -99.2939026, source: 'EasyBroker', sourceUrl: 'https://amir-cherit-real-estate.easybroker.com/property/casa-en-privada-bosque-real-bosque-real-huixquilucan' },
    { tipo: 'Casa', precio: 25900000, m2: 560, recamaras: 4, banos: 4, photo: 'https://assets.easybroker.com/property_images/6241892/110982121/EB-WZ1892.jpg', lat: 19.4303982, lng: -99.2880519, source: 'EasyBroker', sourceUrl: 'https://mac.easybroker.com/property/espectacular-casa-en-bosque-real-3efbb572-d37e-4f1d-a7ea-1ec0061bd319' },
    { tipo: 'Casa', precio: 29000000, m2: 450, recamaras: 3, banos: 3, photo: 'https://assets.easybroker.com/property_images/6224353/110626754/EB-WX4353.jpeg', lat: 19.429977, lng: -99.2789068, source: 'EasyBroker', sourceUrl: 'https://mac.easybroker.com/property/casa-en-venta-de-tres-niveles-en-bosque-real' },
    { tipo: 'Casa', precio: 85000000, m2: 1080, recamaras: 4, banos: 4, photo: 'https://assets.easybroker.com/property_images/2906191/46127078/EB-KD6191.jpg', lat: 19.420297, lng: -99.2881025, source: 'EasyBroker', sourceUrl: 'https://interksa.easybroker.com/property/casa-venta-bosque-real-priv-isla-del-rio-rcv533087' },
    { tipo: 'Departamento', precio: 8498000, m2: 204, recamaras: 3, banos: 2, photo: 'https://assets.easybroker.com/property_images/5508076/106056391/EB-UD8076.png', lat: 19.4325376, lng: -99.2875765, source: 'EasyBroker', sourceUrl: 'https://duparcrealty.easybroker.com/property/bosque-real-huixquilucan-edomex-departamento-en-venta' },
    { tipo: 'Departamento', precio: 14700000, m2: 337, recamaras: 3, banos: 3, photo: 'https://assets.easybroker.com/property_images/5218270/100938573/EB-TA8270.jpg', lat: 19.4274517, lng: -99.2818927, source: 'EasyBroker', sourceUrl: 'https://living-value.easybroker.com/property/venta-departamento-punta-pergolas-bosque-real' },
  ],
  'Club de Golf Chiluca': [
    { tipo: 'Casa', precio: 11000000, m2: 445, recamaras: 3, banos: 2, photo: 'https://assets.easybroker.com/property_images/2537292/69559526/EB-IS7292.jpeg', lat: 19.5433306999, lng: -99.3069648743, source: 'EasyBroker', sourceUrl: 'https://easyhomescuernavaca.easybroker.com/property/joya-inglesa-para-el-conocedor-del-buen-vivir' },
    { tipo: 'Casa', precio: 13000000, m2: 342, recamaras: 3, banos: 3, photo: 'https://assets.easybroker.com/property_images/5734093/100319277/EB-VA4093.jpeg', lat: 19.5505575, lng: -99.3086011, source: 'EasyBroker', sourceUrl: 'https://innovareal.easybroker.com/property/chiluca-casa-3' },
    { tipo: 'Casa', precio: 18000000, m2: 678, recamaras: 7, banos: 5, photo: 'https://assets.easybroker.com/property_images/6031951/107022973/EB-WE1951.jpeg', lat: 19.5526792, lng: -99.3010057, source: 'EasyBroker', sourceUrl: 'https://mdpconsultoria-inmobiliaria.easybroker.com/property/vendo-casa-club-de-golf-chiluca' },
    { tipo: 'Casa', precio: 14100000, m2: 522, recamaras: 3, lat: 19.544405, lng: -99.304728, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-ad25c9494ffa-9a4c-1a18fb9-8827-7a09' },
    { tipo: 'Casa', precio: 16900000, m2: 390, recamaras: 3, lat: 19.5526792, lng: -99.3010057, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-49a17a3426cb-b171-19c68a9-9693-71d3' },
    { tipo: 'Casa', precio: 12850000, m2: 400, recamaras: 3, lat: 19.5422876, lng: -99.302243, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-86afb66fcee7-64dc-1a01127-85ca-7555' },
    { tipo: 'Casa', precio: 10850000, m2: 200, recamaras: 3, banos: 5, photo: 'https://img.lamudi.com.mx/eyJidWNrZXQiOiJwcmQtbGlmdWxsY29ubmVjdC1iYWNrZW5kLWIyYi1pbWFnZXMiLCJrZXkiOiJwcm9wZXJ0aWVzLzAxOTczMjAwLWNjMjEtNzExNi1iMDRiLTRmYjQxOGZlMDQxMy8wMTk3MzIyYy0yYzdmLTcwNDgtODQzYi0xZmFjMzM2ZGIyOGEuanBnIiwiYnJhbmQiOiJsYW11ZGkiLCJlZGl0cyI6eyJyb3RhdGUiOm51bGwsInJlc2l6ZSI6eyJ3aWR0aCI6OTAwLCJoZWlnaHQiOjY1MCwiZml0IjoiY292ZXIifX19', lat: 19.5439857, lng: -99.3048959, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-4fb418fe045c-cc6a-1973249-b094-715f' },
  ],
  'Prado Largo': [
    { tipo: 'Casa', precio: 23000000, m2: 600, recamaras: 3, banos: 3, photo: 'https://assets.easybroker.com/property_images/6257072/111048092/EB-XA7072.png', lat: 19.5565599, lng: -99.3067697, source: 'EasyBroker', sourceUrl: 'https://innovareal.easybroker.com/property/prado-largo-en-zona-esmeralda' },
    { tipo: 'Casa', precio: 26900000, m2: 630, recamaras: 3, banos: 4, photo: 'https://assets.easybroker.com/property_images/5922333/104267169/EB-VT2333.jpeg', lat: 19.5554838, lng: -99.3104417, source: 'EasyBroker', sourceUrl: 'https://meti.easybroker.com/property/venta-casa-prado-largo-e863b286-53c1-4fd9-b0a2-9e82f6d7f9ba' },
    { tipo: 'Casa', precio: 27000000, m2: 800, recamaras: 6, banos: 6, photo: 'https://assets.easybroker.com/property_images/6193235/110051866/EB-WU3235.jpg', lat: 19.5553637, lng: -99.3083389, source: 'EasyBroker', sourceUrl: 'https://mac.easybroker.com/property/fraccionamiento-exclusivo-de-zona-esmeralda-prado-largo-280604ca-4adf-4821-b428-ceec252130e7' },
    { tipo: 'Casa', precio: 15900000, m2: 450, recamaras: 4, banos: 4, photo: 'https://img.lamudi.com.mx/eyJidWNrZXQiOiJwcmQtbGlmdWxsY29ubmVjdC1iYWNrZW5kLWIyYi1pbWFnZXMiLCJrZXkiOiJpbmdlc3Rlci8wMWExM2Q0OS0yMmY0LTdhMWQtOWFiMi0xNjY2YjY2ZTAxZmIvNTU4YTNjYWYxNTljNjQ4N2YyOWQwYWZiM2E3N2MxMjI3NWNhMzVmNDA0MzA0NWFlNDExOTk2NWY3ZDNiMTE4My5qcGVnIiwiYnJhbmQiOiJsYW11ZGkiLCJlZGl0cyI6eyJyb3RhdGUiOm51bGwsInJlc2l6ZSI6eyJ3aWR0aCI6OTAwLCJoZWlnaHQiOjY1MCwiZml0IjoiY292ZXIifX19', lat: 19.555484, lng: -99.310442, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-1666b66e0244-233d-1a13d92-9afb-7a66' },
    { tipo: 'Casa', precio: 15500000, m2: 468, recamaras: 3, banos: 3, photo: 'https://img.lamudi.com.mx/eyJidWNrZXQiOiJwcmQtbGlmdWxsY29ubmVjdC1iYWNrZW5kLWIyYi1pbWFnZXMiLCJrZXkiOiJpbmdlc3Rlci8wMTliNDhhMi1iNDU4LTdjZDctYWY2ZC1mMTA1M2E4NDIyZDAvNzc4NjljMDRiMDhhZmUwZTZkNjI1MGU2YTBlMDUyN2Y1ZmFkMjY2Nzc4ODgxMjZiZDU5MTA4YjJmNGM4ZTE2Ni5qcGVnIiwiYnJhbmQiOiJsYW11ZGkiLCJlZGl0cyI6eyJyb3RhdGUiOm51bGwsInJlc2l6ZSI6eyJ3aWR0aCI6OTAwLCJoZWlnaHQiOjY1MCwiZml0IjoiY292ZXIifX19', lat: 19.561212, lng: -99.298872, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-f1053a842319-b4a1-19b48eb-afb6-7d20' },
    { tipo: 'Casa', precio: 18200001, m2: 414, recamaras: 4, banos: 4, photo: 'https://img.lamudi.com.mx/eyJidWNrZXQiOiJwcmQtbGlmdWxsY29ubmVjdC1iYWNrZW5kLWIyYi1pbWFnZXMiLCJrZXkiOiJpbmdlc3Rlci8wMWEwODNhYi1hMjAwLTdlZjgtYTEwYS1iMjc4YzEzMjQxOGYvNTJmNTY5M2QzZjc4MjMxZjkzYWVmZmM2MjgzZTBhOTI5M2M1YjQ5NmY4MGRmMTE1OGU5ZWUzMDMxZTc2MWNhYi5qcGVnIiwiYnJhbmQiOiJsYW11ZGkiLCJlZGl0cyI6eyJyb3RhdGUiOm51bGwsInJlc2l6ZSI6eyJ3aWR0aCI6OTAwLCJoZWlnaHQiOjY1MCwiZml0IjoiY292ZXIifX19', lat: 19.558774, lng: -99.303162, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-b278c13241d8-a249-1a083f4-a153-7f41' },
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

// Price range per property type, derived from the colonia's comparables. A type
// with fewer than 2 listings has no range, so one outlier never defines it.
export function comparablePriceRanges(colonia: string): Partial<Record<'Casa' | 'Terreno' | 'Departamento', [number, number]>> {
  const out: Partial<Record<'Casa' | 'Terreno' | 'Departamento', [number, number]>> = {};
  for (const [key, match] of [['Casa', 'Casa'], ['Terreno', 'Terreno residencial'], ['Departamento', 'Departamento']] as const) {
    const prices = readyComparableListings(colonia).filter((l) => l.tipo === match).map((l) => l.precio);
    if (prices.length >= 2) out[key] = [Math.min(...prices), Math.max(...prices)];
  }
  return out;
}
