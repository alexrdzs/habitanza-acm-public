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
    { tipo: 'Casa', precio: 11990000, m2: 435, recamaras: 3, banos: 3, photo: 'https://assets.easybroker.com/property_images/6038655/106711276/EB-WE8655.jpeg', lat: 19.569888, lng: -99.325584, source: 'EasyBroker', sourceUrl: 'https://quality-arteaga.easybroker.com/property/vendo-casa-condado-de-sayavedra-condado-de-sayavedra-casa' },
    { tipo: 'Terreno residencial', precio: 4489000, m2: 385, photo: 'https://assets.easybroker.com/property_images/6152129/109145100/EB-WQ2129.jpeg', lat: 19.5853053, lng: -99.3091286, source: 'EasyBroker', sourceUrl: 'https://network-de-asesores-inmobiliarios.easybroker.com/property/terrenos-residenciales-en-condominio-horizontal-condado-de-sayavedra' },
    { tipo: 'Casa', precio: 8200000, m2: 300, recamaras: 4, banos: 4, photo: 'https://assets.easybroker.com/property_images/6109299/108233888/EB-WL9299.jpeg', lat: 19.5692645, lng: -99.3217801, source: 'EasyBroker', sourceUrl: 'https://quality-habitat.easybroker.com/property/casa-preventa-condado-de-sayavedra-pagos-diferidos' },
    { tipo: 'Terreno residencial', precio: 3800000, m2: 510, photo: 'https://assets.easybroker.com/property_images/4574329/76804087/EB-QO4329.jpg', lat: 19.5833053, lng: -99.3111286, source: 'EasyBroker', sourceUrl: 'https://mx-inmobiliaria.easybroker.com/property/terrenos-en-venta-condado-de-sayavedra-atizapan-de-zaragoza-estado-de-mexico' },
    { tipo: 'Casa', precio: 12000000, m2: 539, recamaras: 4, banos: 4, photo: 'https://assets.easybroker.com/property_images/6133749/108764132/EB-WO3749.jpeg', lat: 19.569888, lng: -99.325584, source: 'EasyBroker', sourceUrl: 'https://mdpconsultoria-inmobiliaria.easybroker.com/property/condado-sayavedra-vendo-casa' },
    { tipo: 'Casa', precio: 20000000, m2: 888, recamaras: 5, banos: 7, photo: 'https://assets.easybroker.com/property_images/5633826/98324704/EB-UQ3826.jpeg', lat: 19.5692645, lng: -99.3217801, source: 'EasyBroker', sourceUrl: 'https://tresolbienesraices.easybroker.com/property/vendo-residencia-condado-de-sayavedra-condado-de-sayavedra' },
  ],
  'Hacienda de Valle Escondido': [
    { tipo: 'Casa', precio: 26889000, m2: 701, recamaras: 5, banos: 5, photo: 'https://assets.easybroker.com/property_images/5704331/99687150/EB-UX4331.jpeg', lat: 19.5703585, lng: -99.3076688, source: 'EasyBroker', sourceUrl: 'https://mdpconsultoria-inmobiliaria.easybroker.com/property/vendo-casa-en-real-de-hacienda-de-valle-escondido' },
    { tipo: 'Terreno residencial', precio: 16000000, m2: 2236, photo: 'https://assets.easybroker.com/property_images/5323018/91883488/EB-TL3018.jpeg', lat: 19.5703585, lng: -99.3076688, source: 'EasyBroker', sourceUrl: 'https://easyhomescuernavaca.easybroker.com/property/terreno-de-venta-hacienda-de-valle-escondido-cod-vte795' },
    { tipo: 'Casa', precio: 28500000, m2: 627, recamaras: 4, banos: 6, photo: 'https://assets.easybroker.com/property_images/6068316/107405751/EB-WH8316.jpeg', lat: 19.3264047715, lng: -99.6050102185, source: 'EasyBroker', sourceUrl: 'https://mdpconsultoria-inmobiliaria.easybroker.com/property/vendo-casa-hacienda-de-valle-escondido-hacienda-de-valle-escondido-atizapan-de-zaragoza' },
    { tipo: 'Terreno residencial', precio: 39000000, m2: 6772, photo: 'https://assets.easybroker.com/property_images/6242041/110732538/EB-WZ2041.JPG', lat: 19.5639930991, lng: -99.3178788522, source: 'EasyBroker', sourceUrl: 'https://network-de-asesores-inmobiliarios.easybroker.com/property/venta-terreno-en-los-reales-dentro-hacienda-de-valle-escondido-atizapan-edo-mex' },
    { tipo: 'Casa', precio: 28800000, m2: 565, recamaras: 4, banos: 4, photo: 'https://assets.easybroker.com/property_images/5983661/105511034/EB-VZ3661.jpg', lat: 19.5703585, lng: -99.3076688, source: 'EasyBroker', sourceUrl: 'https://innovareal.easybroker.com/property/hacienda-de-valle-escondido-c0a0ed4b-3d51-4ae2-8a77-796cf8467ebc' },
    { tipo: 'Terreno residencial', precio: 14200000, m2: 1907, photo: 'https://assets.easybroker.com/property_images/3971534/65455548/EB-OG1534.jpeg', lat: 19.567008303, lng: -99.3157839528, source: 'EasyBroker', sourceUrl: 'https://tresolbienesraices.easybroker.com/property/vendo-predio-en-hacienda-de-valle-escondido-residencial-muy-exclusivo' },
    { tipo: 'Casa', precio: 24889000, m2: 800, recamaras: 5, banos: 5, photo: 'https://assets.easybroker.com/property_images/6080452/107624125/EB-WJ0452.jpeg', lat: 19.5650443, lng: -99.3101993, source: 'EasyBroker', sourceUrl: 'https://interksa.easybroker.com/property/vendo-residencia-hacienda-de-valle-escondido' },
  ],
  'Rancho San Juan': [
    { tipo: 'Terreno residencial', precio: 13500000, m2: 1145, photo: 'https://assets.easybroker.com/property_images/6222757/110592423/EB-WX2757.jpeg', lat: 19.5839646, lng: -99.3001173, source: 'EasyBroker', sourceUrl: 'https://heyhaus-listado.easybroker.com/property/terreno-venta-en-rancho-san-juan-almendros-atizapan-zaragoza' },
    { tipo: 'Casa', precio: 35000000, m2: 982, recamaras: 4, banos: 5, photo: 'https://assets.easybroker.com/property_images/6086095/107748111/EB-WJ6095.png', lat: 19.5858451, lng: -99.301925, source: 'EasyBroker', sourceUrl: 'https://innovareal.easybroker.com/property/canelos-en-rancho-san-juan' },
    { tipo: 'Terreno residencial', precio: 12300000, m2: 1044, photo: 'https://assets.easybroker.com/property_images/6172871/109605944/EB-WS2871.jpeg', lat: 19.5798701, lng: -99.2975523, source: 'EasyBroker', sourceUrl: 'https://grupo-tzar.easybroker.com/property/terreno-venta-rancho-san-juan-zona-esmeralda-atizapan-de-zaragoza-edo-mex' },
    { tipo: 'Casa', precio: 38250000, m2: 732, recamaras: 4, banos: 5, photo: 'https://assets.easybroker.com/property_images/6099186/108031354/EB-WK9186.jpeg', lat: 19.5875995, lng: -99.2962383, source: 'EasyBroker', sourceUrl: 'https://mx-inmobiliaria.easybroker.com/property/vendo-casa-en-rancho-san-juan' },
    { tipo: 'Terreno residencial', precio: 15000000, m2: 1316, photo: 'https://assets.easybroker.com/property_images/5951211/104838650/EB-VW1211.jpg', lat: 19.5760751, lng: -99.2970842, source: 'EasyBroker', sourceUrl: 'https://mac.easybroker.com/property/terreno-en-venta-rancho-san-juan-atizapan-de-zaragoza-4408db82-3853-41cb-9797-7effca47ae0a' },
    { tipo: 'Terreno residencial', precio: 11000000, m2: 1112, photo: 'https://assets.easybroker.com/property_images/6028898/106508205/EB-WD8898.jpg', lat: 19.5753082, lng: -99.2936368, source: 'EasyBroker', sourceUrl: 'https://rivero-bienesraices.easybroker.com/property/terreno-en-venta-en-rancho-san-juan-atizapan-de-zaragoza-03d2f3b7-c2e6-4285-b5ed-bee87c0c36c0' },
    { tipo: 'Terreno residencial', precio: 10900000, m2: 886, photo: 'https://assets.easybroker.com/property_images/6134365/108772162/EB-WO4365.jpg', lat: 19.577148, lng: -99.3000986, source: 'EasyBroker', sourceUrl: 'https://valueinmobiliaria.easybroker.com/property/terreno-en-venta-en-rancho-san-juan-atizapan-de-zaragoza-8c8c8742-ff35-4d30-b151-143892e7d1de' },
  ],
  'Bosque Real': [
    { tipo: 'Casa', precio: 23499000, m2: 632, recamaras: 3, banos: 3, photo: 'https://assets.easybroker.com/property_images/6175919/109671554/EB-WS5919.jpg', lat: 19.4262738, lng: -99.2939026, source: 'EasyBroker', sourceUrl: 'https://amir-cherit-real-estate.easybroker.com/property/casa-en-privada-bosque-real-bosque-real-huixquilucan' },
    { tipo: 'Departamento', precio: 14700000, m2: 337, recamaras: 3, banos: 3, photo: 'https://assets.easybroker.com/property_images/5218270/100938573/EB-TA8270.jpg', lat: 19.4274517, lng: -99.2818927, source: 'EasyBroker', sourceUrl: 'https://living-value.easybroker.com/property/venta-departamento-punta-pergolas-bosque-real' },
    { tipo: 'Casa', precio: 25900000, m2: 560, recamaras: 4, banos: 4, photo: 'https://assets.easybroker.com/property_images/6241892/110982121/EB-WZ1892.jpg', lat: 19.4303982, lng: -99.2880519, source: 'EasyBroker', sourceUrl: 'https://mac.easybroker.com/property/espectacular-casa-en-bosque-real-3efbb572-d37e-4f1d-a7ea-1ec0061bd319' },
    { tipo: 'Departamento', precio: 8498000, m2: 204, recamaras: 3, banos: 2, photo: 'https://assets.easybroker.com/property_images/5508076/106056391/EB-UD8076.png', lat: 19.4325376, lng: -99.2875765, source: 'EasyBroker', sourceUrl: 'https://duparcrealty.easybroker.com/property/bosque-real-huixquilucan-edomex-departamento-en-venta' },
    { tipo: 'Casa', precio: 29000000, m2: 450, recamaras: 3, banos: 3, photo: 'https://assets.easybroker.com/property_images/6224353/110626754/EB-WX4353.jpeg', lat: 19.429977, lng: -99.2789068, source: 'EasyBroker', sourceUrl: 'https://mac.easybroker.com/property/casa-en-venta-de-tres-niveles-en-bosque-real' },
    { tipo: 'Casa', precio: 85000000, m2: 1080, recamaras: 4, banos: 4, photo: 'https://assets.easybroker.com/property_images/2906191/46127078/EB-KD6191.jpg', lat: 19.420297, lng: -99.2881025, source: 'EasyBroker', sourceUrl: 'https://interksa.easybroker.com/property/casa-venta-bosque-real-priv-isla-del-rio-rcv533087' },
  ],
  'Club de Golf Chiluca': [
    { tipo: 'Casa', precio: 13000000, m2: 342, recamaras: 3, banos: 3, photo: 'https://assets.easybroker.com/property_images/5734093/100319277/EB-VA4093.jpeg', lat: 19.5505575, lng: -99.3086011, source: 'EasyBroker', sourceUrl: 'https://innovareal.easybroker.com/property/chiluca-casa-3' },
    { tipo: 'Casa', precio: 12850000, m2: 400, recamaras: 3, lat: 19.5422876, lng: -99.302243, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-86afb66fcee7-64dc-1a01127-85ca-7555' },
    { tipo: 'Casa', precio: 14100000, m2: 522, recamaras: 3, lat: 19.544405, lng: -99.304728, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-ad25c9494ffa-9a4c-1a18fb9-8827-7a09' },
    { tipo: 'Casa', precio: 11000000, m2: 445, recamaras: 3, banos: 2, photo: 'https://assets.easybroker.com/property_images/2537292/69559526/EB-IS7292.jpeg', lat: 19.5433306999, lng: -99.3069648743, source: 'EasyBroker', sourceUrl: 'https://easyhomescuernavaca.easybroker.com/property/joya-inglesa-para-el-conocedor-del-buen-vivir' },
    { tipo: 'Casa', precio: 10850000, m2: 200, recamaras: 3, banos: 5, photo: 'https://img.lamudi.com.mx/eyJidWNrZXQiOiJwcmQtbGlmdWxsY29ubmVjdC1iYWNrZW5kLWIyYi1pbWFnZXMiLCJrZXkiOiJwcm9wZXJ0aWVzLzAxOTczMjAwLWNjMjEtNzExNi1iMDRiLTRmYjQxOGZlMDQxMy8wMTk3MzIyYy0yYzdmLTcwNDgtODQzYi0xZmFjMzM2ZGIyOGEuanBnIiwiYnJhbmQiOiJsYW11ZGkiLCJlZGl0cyI6eyJyb3RhdGUiOm51bGwsInJlc2l6ZSI6eyJ3aWR0aCI6OTAwLCJoZWlnaHQiOjY1MCwiZml0IjoiY292ZXIifX19', lat: 19.5439857, lng: -99.3048959, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-4fb418fe045c-cc6a-1973249-b094-715f' },
    { tipo: 'Casa', precio: 16900000, m2: 390, recamaras: 3, lat: 19.5526792, lng: -99.3010057, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-49a17a3426cb-b171-19c68a9-9693-71d3' },
    { tipo: 'Casa', precio: 18000000, m2: 678, recamaras: 7, banos: 5, photo: 'https://assets.easybroker.com/property_images/6031951/107022973/EB-WE1951.jpeg', lat: 19.5526792, lng: -99.3010057, source: 'EasyBroker', sourceUrl: 'https://mdpconsultoria-inmobiliaria.easybroker.com/property/vendo-casa-club-de-golf-chiluca' },
  ],
  'Prado Largo': [
    { tipo: 'Casa', precio: 18200001, m2: 414, recamaras: 4, banos: 4, photo: 'https://img.lamudi.com.mx/eyJidWNrZXQiOiJwcmQtbGlmdWxsY29ubmVjdC1iYWNrZW5kLWIyYi1pbWFnZXMiLCJrZXkiOiJpbmdlc3Rlci8wMWEwODNhYi1hMjAwLTdlZjgtYTEwYS1iMjc4YzEzMjQxOGYvNTJmNTY5M2QzZjc4MjMxZjkzYWVmZmM2MjgzZTBhOTI5M2M1YjQ5NmY4MGRmMTE1OGU5ZWUzMDMxZTc2MWNhYi5qcGVnIiwiYnJhbmQiOiJsYW11ZGkiLCJlZGl0cyI6eyJyb3RhdGUiOm51bGwsInJlc2l6ZSI6eyJ3aWR0aCI6OTAwLCJoZWlnaHQiOjY1MCwiZml0IjoiY292ZXIifX19', lat: 19.558774, lng: -99.303162, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-b278c13241d8-a249-1a083f4-a153-7f41' },
    { tipo: 'Casa', precio: 23000000, m2: 600, recamaras: 3, banos: 3, photo: 'https://assets.easybroker.com/property_images/6257072/111048092/EB-XA7072.png', lat: 19.5565599, lng: -99.3067697, source: 'EasyBroker', sourceUrl: 'https://innovareal.easybroker.com/property/prado-largo-en-zona-esmeralda' },
    { tipo: 'Casa', precio: 15900000, m2: 450, recamaras: 4, banos: 4, photo: 'https://img.lamudi.com.mx/eyJidWNrZXQiOiJwcmQtbGlmdWxsY29ubmVjdC1iYWNrZW5kLWIyYi1pbWFnZXMiLCJrZXkiOiJpbmdlc3Rlci8wMWExM2Q0OS0yMmY0LTdhMWQtOWFiMi0xNjY2YjY2ZTAxZmIvNTU4YTNjYWYxNTljNjQ4N2YyOWQwYWZiM2E3N2MxMjI3NWNhMzVmNDA0MzA0NWFlNDExOTk2NWY3ZDNiMTE4My5qcGVnIiwiYnJhbmQiOiJsYW11ZGkiLCJlZGl0cyI6eyJyb3RhdGUiOm51bGwsInJlc2l6ZSI6eyJ3aWR0aCI6OTAwLCJoZWlnaHQiOjY1MCwiZml0IjoiY292ZXIifX19', lat: 19.555484, lng: -99.310442, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-1666b66e0244-233d-1a13d92-9afb-7a66' },
    { tipo: 'Casa', precio: 15500000, m2: 468, recamaras: 3, banos: 3, photo: 'https://img.lamudi.com.mx/eyJidWNrZXQiOiJwcmQtbGlmdWxsY29ubmVjdC1iYWNrZW5kLWIyYi1pbWFnZXMiLCJrZXkiOiJpbmdlc3Rlci8wMTliNDhhMi1iNDU4LTdjZDctYWY2ZC1mMTA1M2E4NDIyZDAvNzc4NjljMDRiMDhhZmUwZTZkNjI1MGU2YTBlMDUyN2Y1ZmFkMjY2Nzc4ODgxMjZiZDU5MTA4YjJmNGM4ZTE2Ni5qcGVnIiwiYnJhbmQiOiJsYW11ZGkiLCJlZGl0cyI6eyJyb3RhdGUiOm51bGwsInJlc2l6ZSI6eyJ3aWR0aCI6OTAwLCJoZWlnaHQiOjY1MCwiZml0IjoiY292ZXIifX19', lat: 19.561212, lng: -99.298872, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-f1053a842319-b4a1-19b48eb-afb6-7d20' },
    { tipo: 'Casa', precio: 26900000, m2: 630, recamaras: 3, banos: 4, photo: 'https://assets.easybroker.com/property_images/5922333/104267169/EB-VT2333.jpeg', lat: 19.5554838, lng: -99.3104417, source: 'EasyBroker', sourceUrl: 'https://meti.easybroker.com/property/venta-casa-prado-largo-e863b286-53c1-4fd9-b0a2-9e82f6d7f9ba' },
    { tipo: 'Casa', precio: 27000000, m2: 800, recamaras: 6, banos: 6, photo: 'https://assets.easybroker.com/property_images/6193235/110051866/EB-WU3235.jpg', lat: 19.5553637, lng: -99.3083389, source: 'EasyBroker', sourceUrl: 'https://mac.easybroker.com/property/fraccionamiento-exclusivo-de-zona-esmeralda-prado-largo-280604ca-4adf-4821-b428-ceec252130e7' },
  ],
  'Residencial Lago Esmeralda': [
    { tipo: 'Casa', precio: 4110000, m2: 92, recamaras: 3, banos: 2, photo: 'https://assets.easybroker.com/property_images/5298810/91361072/EB-TI8810.jpg', lat: 19.5386173305, lng: -99.2625008896, source: 'EasyBroker', sourceUrl: 'https://innovareal.easybroker.com/property/sky-view-en-lago-esmeralda-residencial-lago-esmeralda-atizapan-de-zaragoza' },
    { tipo: 'Departamento', precio: 6500000, m2: 160, recamaras: 3, banos: 4, photo: 'https://assets.easybroker.com/property_images/5877818/103349053/EB-VO7818.jpeg', lat: 19.53766, lng: -99.273344, source: 'EasyBroker', sourceUrl: 'https://quality-habitat.easybroker.com/property/venta-departamento-vista-antigua-3-lago-esmeralda-atizapan-de-zaragoza-residencial-lago-esmeralda' },
    { tipo: 'Terreno residencial', precio: 2625000, m2: 105, photo: 'https://assets.easybroker.com/property_images/6068741/107358414/EB-WH8741.jpeg', lat: 19.3264047715, lng: -99.6050102185, source: 'EasyBroker', sourceUrl: 'https://meti.easybroker.com/property/pre-venta-lotes-residenciales-residencial-lago-esmeralda' },
    { tipo: 'Casa', precio: 5175000, m2: 110, recamaras: 3, banos: 2, photo: 'https://assets.easybroker.com/property_images/3969340/65412183/EB-OF9340.jpg', lat: 19.541736, lng: -99.275113, source: 'EasyBroker', sourceUrl: 'https://mac.easybroker.com/property/casa-venta-lago-esmeralda-bosque-esmeralda-atizapan-de-zaragoza-estado-de-mexic' },
    { tipo: 'Casa', precio: 3500000, m2: 113, recamaras: 2, banos: 2, photo: 'https://assets.easybroker.com/property_images/5936219/107475577/EB-VU6219.jpeg', lat: 19.5416389, lng: -99.2707575, source: 'EasyBroker', sourceUrl: 'https://mac.easybroker.com/property/casa-en-pre-venta-miralago-lago-esmeralda' },
    { tipo: 'Casa', precio: 2630000, m2: 52, recamaras: 2, banos: 2, photo: 'https://assets.easybroker.com/property_images/5298850/91361893/EB-TI8850.jpg', lat: 19.5372434489, lng: -99.2620889191, source: 'EasyBroker', sourceUrl: 'https://innovareal.easybroker.com/property/park-view-en-venta-en-lago-esmeralda' },
    { tipo: 'Casa', precio: 7900000, m2: 200, recamaras: 3, banos: 4, photo: 'https://assets.easybroker.com/property_images/6246729/110830183/EB-WZ6729.png', lat: 19.5410047, lng: -99.2697013, source: 'EasyBroker', sourceUrl: 'https://kappital.easybroker.com/property/venta-casa-contemporanea-lago-esmeralda' },
    { tipo: 'Casa', precio: 9300000, m2: 280, recamaras: 4, banos: 3, photo: 'https://assets.easybroker.com/property_images/6130136/108873212/EB-WO0136.jpg', lat: 19.5416389, lng: -99.2707575, source: 'EasyBroker', sourceUrl: 'https://valueinmobiliaria.easybroker.com/property/casa-en-venta-en-lago-esmeralda-atizapan-de-zaragoza-10fb1ce7-b127-41b1-bc16-e892e74a2989' },
  ],
  'Lomas de Valle Escondido': [
    { tipo: 'Casa', precio: 14900000, m2: 450, recamaras: 3, banos: 3, photo: 'https://assets.easybroker.com/property_images/6261738/111149802/EB-XB1738.jpg', lat: 19.5575288136, lng: -99.2983752928, source: 'EasyBroker', sourceUrl: 'https://torretobienesraices.easybroker.com/property/hermosa-casa-en-loma-de-valle-escondido-1a2b8aee-41f1-444f-bce8-851cff5d0235' },
    { tipo: 'Casa', precio: 14900000, m2: 504, recamaras: 3, banos: 3, photo: 'https://assets.easybroker.com/property_images/6222790/110593247/EB-WX2790.jpeg', lat: 19.56371, lng: -99.25141, source: 'EasyBroker', sourceUrl: 'https://la-paz-bay-rentals-and-real-estate.easybroker.com/property/casa-venta-loma-de-valle-escondido-atizapan-de-zaragoza-lomas-de-valle-escondido' },
    { tipo: 'Casa', precio: 14490000, m2: 546, recamaras: 4, banos: 4, photo: 'https://assets.easybroker.com/property_images/2040626/111106200/EB-GV0626.png', lat: 19.5544874, lng: -99.3049724, source: 'EasyBroker', sourceUrl: 'https://innovareal.easybroker.com/property/casa-en-loma-de-valle-escondido-a0963b99-4c18-43fd-8b1e-e79d3e46a60f' },
    { tipo: 'Casa', precio: 13500000, m2: 430, recamaras: 3, banos: 3, photo: 'https://assets.easybroker.com/property_images/6222873/110594992/EB-WX2873.jpeg', lat: 19.5206426, lng: -99.251892, source: 'EasyBroker', sourceUrl: 'https://heyhaus-listado.easybroker.com/property/casa-venta-loma-de-vallescondido-atizapan-de-zaragoza' },
    { tipo: 'Casa', precio: 16950000, m2: 488, recamaras: 4, banos: 4, photo: 'https://assets.easybroker.com/property_images/5520864/95852494/EB-UF0864.jpeg', lat: 19.5583737, lng: -99.3077132, source: 'EasyBroker', sourceUrl: 'https://tresolbienesraices.easybroker.com/property/venta-vendo-casa-lomas-de-valle-escondido-atizapan-de-zaragoza-edo-mex' },
    { tipo: 'Casa', precio: 17900000, m2: 690, recamaras: 5, banos: 3, photo: 'https://assets.easybroker.com/property_images/6120513/108469973/EB-WN0513.jpeg', lat: 19.5555061, lng: -99.3022785, source: 'EasyBroker', sourceUrl: 'https://mdpconsultoria-inmobiliaria.easybroker.com/property/vendo-casa-loma-de-valle-escondido-lomas-de-valle-escondido' },
  ],
  'Bosque Esmeralda': [
    { tipo: 'Casa', precio: 8500000, m2: 237, recamaras: 3, banos: 3, photo: 'https://assets.easybroker.com/property_images/5298564/91356518/EB-TI8564.jpg', lat: 19.5461029, lng: -99.2924191, source: 'EasyBroker', sourceUrl: 'https://innovareal.easybroker.com/property/horizonte-ocre-en-bosque-esmeralda' },
    { tipo: 'Terreno residencial', precio: 7634000, m2: 763, photo: 'https://assets.easybroker.com/property_images/6242111/110734230/EB-WZ2111.JPG', lat: 19.5433946141, lng: -99.2953113415, source: 'EasyBroker', sourceUrl: 'https://network-de-asesores-inmobiliarios.easybroker.com/property/venta-terreno-puerta-de-pamplona-bosque-esmeralda-atizapan-bosque-esmeralda' },
    { tipo: 'Departamento', precio: 10500000, m2: 220, recamaras: 3, banos: 3, photo: 'https://assets.easybroker.com/property_images/5860464/102996947/EB-VN0464.jpeg', lat: 19.5461029, lng: -99.2924191, source: 'EasyBroker', sourceUrl: 'https://mac.easybroker.com/property/departamento-nuevo-en-renta-en-grand-viure' },
    { tipo: 'Casa', precio: 9995000, m2: 285, recamaras: 3, banos: 3, photo: 'https://assets.easybroker.com/property_images/6187556/109935890/EB-WT7556.JPG', lat: 19.5509861, lng: -99.2880397, source: 'EasyBroker', sourceUrl: 'https://valueinmobiliaria.easybroker.com/property/casa-en-venta-en-bosque-esmeralda-atizapan-de-zaragoza-988c434d-058d-4f56-9eba-cd2d183eb405' },
    { tipo: 'Terreno residencial', precio: 6474000, m2: 647, photo: 'https://assets.easybroker.com/property_images/6238017/110692071/EB-WY8017.JPG', lat: 19.5450287013, lng: -99.295492126, source: 'EasyBroker', sourceUrl: 'https://network-de-asesores-inmobiliarios.easybroker.com/property/venta-terreno-puerta-de-almaraz-bosque-esmeralda-atizapan-bosque-esmeralda' },
    { tipo: 'Departamento', precio: 4300000, m2: 134, recamaras: 3, banos: 3, photo: 'https://assets.easybroker.com/property_images/5977423/105374468/EB-VY7423.jpg', lat: 19.5547973, lng: -99.2983159, source: 'EasyBroker', sourceUrl: 'https://mac.easybroker.com/property/departamento-en-venta-bosque-esmeralda-atizapan-estado-de-mexico-bosque-esmeralda' },
    { tipo: 'Casa', precio: 10700000, m2: 340, recamaras: 3, banos: 3, photo: 'https://assets.easybroker.com/property_images/6108399/108212255/EB-WL8399.jpg', lat: 19.5431165, lng: -99.2854951, source: 'EasyBroker', sourceUrl: 'https://best-inmobiliaria.easybroker.com/property/casa-en-venta-en-moncayo-bosque-esmeralda-atizapan-de-zaragoza-bosque-esmeralda-casa' },
    { tipo: 'Casa', precio: 12700000, m2: 350, recamaras: 3, banos: 3, photo: 'https://assets.easybroker.com/property_images/5380168/92971145/EB-TR0168.jpeg', lat: 19.5461029, lng: -99.2924191, source: 'EasyBroker', sourceUrl: 'https://mac.easybroker.com/property/casa-en-venta-en-las-puertas-bosque-esmeralda-atizapan-de-zaragoza' },
    { tipo: 'Casa', precio: 5300000, m2: 142, recamaras: 3, banos: 2, photo: 'https://assets.easybroker.com/property_images/5505707/95536556/EB-UD5707.jpg', lat: 19.5430361, lng: -99.2947066, source: 'EasyBroker', sourceUrl: 'https://innovareal.easybroker.com/property/punta-esmeralda-en-bosque-esmeralda-bosque-esmeralda' },
    { tipo: 'Casa', precio: 18500000, m2: 685, recamaras: 4, banos: 5, photo: 'https://assets.easybroker.com/property_images/6172199/109591403/EB-WS2199.jpeg', lat: 19.5428412631, lng: -99.2955479281, source: 'EasyBroker', sourceUrl: 'https://mac.easybroker.com/property/casa-en-venta-en-bosque-esmeralda-zona-esmeralda-atizapan-bosque-esmeralda' },
  ],
  'Club de Golf Valle Escondido': [
    { tipo: 'Casa', precio: 29900000, m2: 440, recamaras: 3, banos: 3, photo: 'https://assets.easybroker.com/property_images/6222783/110593115/EB-WX2783.jpeg', lat: 19.5441929, lng: -99.3081789, source: 'EasyBroker', sourceUrl: 'https://affarebienesraices.easybroker.com/property/casa-venta-club-de-golf-vallescondido-atizapan-de-zaragoza-club-de-golf-valle-escondido' },
    { tipo: 'Casa', precio: 35000000, m2: 706, recamaras: 4, banos: 4, photo: 'https://img.lamudi.com.mx/eyJidWNrZXQiOiJwcmQtbGlmdWxsY29ubmVjdC1iYWNrZW5kLWIyYi1pbWFnZXMiLCJrZXkiOiJwcm9wZXJ0aWVzLzAxYTFhODE4LWI4OTMtNzQyMy05YWYwLTk5MDdiM2Q0OGJmZi8wMWExYTgyZi03MTlmLTcwNjItYTgwOC02ZThmNjI2MmI0ZGIuanBnIiwiYnJhbmQiOiJsYW11ZGkiLCJlZGl0cyI6eyJyb3RhdGUiOm51bGwsInJlc2l6ZSI6eyJ3aWR0aCI6OTAwLCJoZWlnaHQiOjY1MCwiZml0IjoiY292ZXIifX19', lat: 19.5673286, lng: -99.29619249999999, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-9907b3d48c48-b8dc-1a1a861-9b39-746c' },
    { tipo: 'Casa', precio: 28000000, m2: 920, recamaras: 5, banos: 3, photo: 'https://assets.easybroker.com/property_images/6189466/109975096/EB-WT9466.jpg', lat: 19.5614362, lng: -99.3069786, source: 'EasyBroker', sourceUrl: 'https://mac.easybroker.com/property/venta-casa-club-de-golf-valle-escondido-atizapan-de-zaragoza-club-de-golf-valle-escondido' },
    { tipo: 'Casa', precio: 38000000, m2: 860, recamaras: 5, banos: 5, photo: 'https://img.lamudi.com.mx/eyJidWNrZXQiOiJwcmQtbGlmdWxsY29ubmVjdC1iYWNrZW5kLWIyYi1pbWFnZXMiLCJrZXkiOiJwcm9wZXJ0aWVzLzAxYTE5NDQ4LWM2NzEtNzA2Ni04Y2FkLWI1YWU3NDEwZjQyOS8wMWExOTQ0YS1hMzE0LTcwNDUtYThhYy01YmIwYTQ5YjM3M2YucG5nIiwiYnJhbmQiOiJsYW11ZGkiLCJlZGl0cyI6eyJyb3RhdGUiOm51bGwsInJlc2l6ZSI6eyJ3aWR0aCI6OTAwLCJoZWlnaHQiOjY1MCwiZml0IjoiY292ZXIifX19', lat: 19.5609153, lng: -99.3056311, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-b5ae7410f472-c6ba-1a19491-8cf6-70af' },
    { tipo: 'Casa', precio: 20500000, m2: 850, recamaras: 5, banos: 8, photo: 'https://img.lamudi.com.mx/eyJidWNrZXQiOiJwcmQtbGlmdWxsY29ubmVjdC1iYWNrZW5kLWIyYi1pbWFnZXMiLCJrZXkiOiJwcm9wZXJ0aWVzLzAxOTczN2YwLTE1NmUtNzMzNi1hZDQxLWJmYjc5ZDI1YTliNi8wMTk3MzdmNi1hNjQ3LTcxNmMtOTI1MS1mYmVhODQ3OWEzMGYuanBnIiwiYnJhbmQiOiJsYW11ZGkiLCJlZGl0cyI6eyJyb3RhdGUiOm51bGwsInJlc2l6ZSI6eyJ3aWR0aCI6OTAwLCJoZWlnaHQiOjY1MCwiZml0IjoiY292ZXIifX19', lat: 19.5614362, lng: -99.3069786, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-bfb79d25a9ff-15b7-1973839-ad8a-737f' },
    { tipo: 'Casa', precio: 45500000, m2: 846, recamaras: 4, banos: 4, photo: 'https://assets.easybroker.com/property_images/6084652/107710311/EB-WJ4652.png', lat: 19.5658383, lng: -99.2970593, source: 'EasyBroker', sourceUrl: 'https://innovareal.easybroker.com/property/paseo-de-valle-escondido-no-94-club-de-golf-valle-escondido-atizapan-de-zarago' },
  ],
  'Fincas de Sayavedra': [
    { tipo: 'Terreno residencial', precio: 19530000, m2: 10015, photo: 'https://img.lamudi.com.mx/eyJidWNrZXQiOiJwcmQtbGlmdWxsY29ubmVjdC1iYWNrZW5kLWIyYi1pbWFnZXMiLCJrZXkiOiJpbmdlc3Rlci9lMDM4N2U1NC03ZTk0LTNkZDMtOTlhNi0xYTZhNmIxNzZiOWQvMWVhZTlmNmIxNDc5ZmM1ODEyNDRmZTRlYjNmZWIxZmFkZWVhMGFmZDE5Y2I0NzlhNmZlNWRjNmE5MmUwOTVlZi5qcGVnIiwiYnJhbmQiOiJsYW11ZGkiLCJlZGl0cyI6eyJyb3RhdGUiOm51bGwsInJlc2l6ZSI6eyJ3aWR0aCI6OTAwLCJoZWlnaHQiOjY1MCwiZml0IjoiY292ZXIifX19', lat: 19.5792689, lng: -99.3222996, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-1a6a6b176be6-7edd-e0387e9d-99ef-3e1c' },
    { tipo: 'Casa', precio: 38000000, m2: 899, recamaras: 7, banos: 8, photo: 'https://img.lamudi.com.mx/eyJidWNrZXQiOiJwcmQtbGlmdWxsY29ubmVjdC1iYWNrZW5kLWIyYi1pbWFnZXMiLCJrZXkiOiJpbmdlc3Rlci8yZThmMzkyNi0zZTVkLTM3ZTgtOGVlNS04Y2EwZjJiM2FmZTAvNmQ3NjA4OWM1NzA4Njc5ZDJjMTg5MWZiYmQ3NTkwMjkwZTFhY2ZlNzcyYTUwNzAyYmQ2MmRiMjJkZGRmNmY0OC5qcGVnIiwiYnJhbmQiOiJsYW11ZGkiLCJlZGl0cyI6eyJyb3RhdGUiOm51bGwsInJlc2l6ZSI6eyJ3aWR0aCI6OTAwLCJoZWlnaHQiOjY1MCwiZml0IjoiY292ZXIifX19', lat: 19.5783236, lng: -99.3268426, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-8ca0f2b3b029-3ea6-2e8f396f-8f2e-3831' },
    { tipo: 'Terreno residencial', precio: 15000000, m2: 8000, photo: 'https://assets.easybroker.com/property_images/1456469/21768604/EB-EO6469.JPG', lat: 19.5801796, lng: -99.3251451, source: 'EasyBroker', sourceUrl: 'https://la-paz-bay-rentals-and-real-estate.easybroker.com/property/vte643-terreno-con-una-superficie-de-8-000-m2-en-venta-fincas-sayavedra' },
    { tipo: 'Casa', precio: 38995000, m2: 1006, recamaras: 4, banos: 4, photo: 'https://img.lamudi.com.mx/eyJidWNrZXQiOiJwcmQtbGlmdWxsY29ubmVjdC1iYWNrZW5kLWIyYi1pbWFnZXMiLCJrZXkiOiJpbmdlc3Rlci8wMTlmM2NhMy1iOWJjLTdjNGYtYWQwMi02NmZiNzdkZjUxZTkvYzc3OWY5MzgxMTcyODIzZjhlMzY2MDU2ZGU0ZDRlMGExZTljMTg2OTA1MGE2YTBkYWI0NWE1YzNkNjE1ZGQ2YS5qcGVnIiwiYnJhbmQiOiJsYW11ZGkiLCJlZGl0cyI6eyJyb3RhdGUiOm51bGwsInJlc2l6ZSI6eyJ3aWR0aCI6OTAwLCJoZWlnaHQiOjY1MCwiZml0IjoiY292ZXIifX19', lat: 19.579962, lng: -99.322558, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-66fb77df5232-ba05-19f3cec-ad4b-7c98' },
    { tipo: 'Terreno residencial', precio: 8500000, m2: 2500, photo: 'https://img.lamudi.com.mx/eyJidWNrZXQiOiJwcmQtbGlmdWxsY29ubmVjdC1iYWNrZW5kLWIyYi1pbWFnZXMiLCJrZXkiOiJpbmdlc3Rlci8wMTlhY2Y5Yi1iMzUxLTdkMDAtODk1OC1hN2VlYzI4YjY0ZjQvZTAyZmVmZDA4Y2I5ZjVlN2FjMWRhYzMxMDBkOTYxM2YyYjJjNjhhODE0ZGE2ODIxZDJkNTgwYTQwZWE2MjRhMC5qcGVnIiwiYnJhbmQiOiJsYW11ZGkiLCJlZGl0cyI6eyJyb3RhdGUiOm51bGwsInJlc2l6ZSI6eyJ3aWR0aCI6OTAwLCJoZWlnaHQiOjY1MCwiZml0IjoiY292ZXIifX19', lat: 19.579612, lng: -99.322467, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-a7eec28b653d-b39a-19acfe4-89a1-7d49' },
    { tipo: 'Casa', precio: 45000000, m2: 1058, recamaras: 3, banos: 4, photo: 'https://assets.easybroker.com/property_images/5773758/101151677/EB-VE3758.jpeg', lat: 19.5824594, lng: -99.3244723, source: 'EasyBroker', sourceUrl: 'https://tique-home.easybroker.com/property/venta-casa-fincas-de-sayavedra-dos-casas-mismo-precio-fincas-de-sayavedra-casa' },
    { tipo: 'Terreno residencial', precio: 4900000, m2: 582, photo: 'https://img.lamudi.com.mx/eyJidWNrZXQiOiJwcmQtbGlmdWxsY29ubmVjdC1iYWNrZW5kLWIyYi1pbWFnZXMiLCJrZXkiOiJpbmdlc3Rlci8wMWExNDI2My0zY2I0LTc4MDgtODYxMC01ZmMxYmQxZjNmOWUvYmJkYWFmNWYwMjM2OGVhOGQ1YjZkYjg4YzRjYjFiMjc2ZGNkODlhN2UzYjFkMDUxY2YyZDUzMDAzYmU3MTNlOC5qcGVnIiwiYnJhbmQiOiJsYW11ZGkiLCJlZGl0cyI6eyJyb3RhdGUiOm51bGwsInJlc2l6ZSI6eyJ3aWR0aCI6OTAwLCJoZWlnaHQiOjY1MCwiZml0IjoiY292ZXIifX19', lat: 19.580877, lng: -99.322791, source: 'Lamudi', sourceUrl: 'https://www.lamudi.com.mx/detalle/41032-73-5fc1bd1f3fe7-3cfd-1a142ac-8659-7851' },
  ],
  'Interlomas y Hda. de las Palmas': [
    { tipo: 'Departamento', precio: 9300000, m2: 260, recamaras: 3, banos: 3, photo: 'https://assets.easybroker.com/property_images/5415875/93691124/EB-TU5875.jpg', lat: 19.3886145, lng: -99.2915608, source: 'EasyBroker', sourceUrl: 'https://mac.easybroker.com/property/departamento-en-venta-en-hacienda-de-las-palmas-huixquilucan-mexico-interlomas' },
    { tipo: 'Casa', precio: 11980000, m2: 300, recamaras: 3, banos: 3, photo: 'https://assets.easybroker.com/property_images/6245430/110803375/EB-WZ5430.jpeg', lat: 19.3976512, lng: -99.2764361, source: 'EasyBroker', sourceUrl: 'https://living-value.easybroker.com/property/casa-venta-cerrada-paseo-de-las-palmas-interlomas' },
    { tipo: 'Departamento', precio: 9950000, m2: 310, recamaras: 3, banos: 3, photo: 'https://assets.easybroker.com/property_images/4077916/67451876/EB-OQ7916.jpeg', lat: 19.3913452, lng: -99.2864981, source: 'EasyBroker', sourceUrl: 'https://amir-cherit-real-estate.easybroker.com/property/departamento-en-venta-en-sei-interlomas-hacienda-de-las-palmas?agent=consueloo_2&lang=es' },
    { tipo: 'Casa', precio: 14500000, m2: 450, recamaras: 5, banos: 4, photo: 'https://assets.easybroker.com/property_images/5798204/101667903/EB-VG8204.jpg', lat: 19.3923945, lng: -99.2867945, source: 'EasyBroker', sourceUrl: 'https://meti.easybroker.com/property/casa-en-venta-hacienda-de-las-palmas-interlomas-2031268f-7c5f-4583-be81-689f50ea3264' },
    { tipo: 'Departamento', precio: 9158000, m2: 146, recamaras: 2, banos: 2, photo: 'https://assets.easybroker.com/property_images/6137598/108839756/EB-WO7598.jpeg', lat: 19.3950807, lng: -99.2856068, source: 'EasyBroker', sourceUrl: 'https://m2asesoresmx.easybroker.com/property/departamento-en-antia-interlomas-hacienda-de-las-palmas' },
    { tipo: 'Departamento', precio: 8900000, m2: 280, recamaras: 3, banos: 3, photo: 'https://assets.easybroker.com/property_images/5607443/97599889/EB-UN7443.jpeg', lat: 19.3895043, lng: -99.2890403, source: 'EasyBroker', sourceUrl: 'https://mac.easybroker.com/property/vendo-depa-con-280-metros-y-terraza-en-torre-da-vinci-hacienda-de-las-palmas-en' },
  ],
  'La Estadía': [
    { tipo: 'Casa', precio: 9800000, m2: 180, recamaras: 3, banos: 3, photo: 'https://assets.easybroker.com/property_images/5509139/101012118/EB-UD9139.png', lat: 19.5322973, lng: -99.303839, source: 'EasyBroker', sourceUrl: 'https://innovareal.easybroker.com/property/la-montana-en-zona-esmeralda' },
    { tipo: 'Terreno residencial', precio: 8990000, m2: 1079, photo: 'https://assets.easybroker.com/property_images/3580070/58270113/EB-MT0070.jpeg', lat: 19.5327599, lng: -99.3005942, source: 'EasyBroker', sourceUrl: 'https://tresolbienesraices.easybroker.com/property/terreno-en-venta-la-estadia-casi-plano-y-panoramico' },
    { tipo: 'Casa', precio: 19990000, m2: 1000, recamaras: 3, banos: 5, photo: 'https://assets.easybroker.com/property_images/3211500/51478377/EB-LI1500.jpg', lat: 19.5354335, lng: -99.2993504, source: 'EasyBroker', sourceUrl: 'https://loto.easybroker.com/property/espectacular-casa-en-venta-en-la-estadia-zona-esmeralda-atizapan-de-zaragoza' },
    { tipo: 'Terreno residencial', precio: 7300000, m2: 1280, photo: 'https://assets.easybroker.com/property_images/5191444/89231745/EB-SY1444.jpg', lat: 19.5300511854, lng: -99.3041598025, source: 'EasyBroker', sourceUrl: 'https://mac.easybroker.com/property/terreno-en-venta-en-la-estadia-atizapan' },
    { tipo: 'Casa', precio: 26300000, m2: 723, recamaras: 3, banos: 3, photo: 'https://assets.easybroker.com/property_images/6201336/110229071/EB-WV1336.jpg', lat: 19.5354335, lng: -99.2993504, source: 'EasyBroker', sourceUrl: 'https://best-inmobiliaria.easybroker.com/property/casa-en-venta-en-la-estadia-atizapan-ea9d328c-5819-4eb1-875d-d3e4769c593f' },
    { tipo: 'Terreno residencial', precio: 6990000, m2: 998, photo: 'https://assets.easybroker.com/property_images/3579304/58264411/EB-MS9304.jpeg', lat: 19.5327599, lng: -99.3005942, source: 'EasyBroker', sourceUrl: 'https://tresolbienesraices.easybroker.com/property/vendo-terreno-la-estadia' },
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

// Competition level for a colonia: how many real listings it has compared with
// the other colonias that have any (lower third = bajo, upper third = alto).
export function competitionLevel(colonia: string): { level: 'bajo' | 'medio' | 'alto'; count: number } | undefined {
  const counts = Object.keys(COMPARABLE_LISTINGS).map((c) => readyComparableListings(c).length).filter((n) => n > 0).sort((a, b) => a - b);
  const count = readyComparableListings(colonia).length;
  if (count === 0 || counts.length === 0) return undefined;
  const low = counts[Math.floor((counts.length - 1) / 3)];
  const high = counts[Math.ceil(((counts.length - 1) * 2) / 3)];
  return { level: count <= low ? 'bajo' : count >= high ? 'alto' : 'medio', count };
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
  // Lamudi photos already come resized (900x650) and the proxy cannot read that host.
  if (!url.startsWith('http') || url.includes('img.lamudi.com.mx')) return url;
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
