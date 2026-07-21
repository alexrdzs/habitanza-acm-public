// Shared between the client wizard (src/components/wizard/*) and the
// serverless endpoint (api/lead.ts). The server re-validates everything
// here independently — this file does not make client input trustworthy.

// Verified against Habitanza's actual live portfolio (real colonia values
// returned by published listings in Atizapán de Zaragoza), not guessed.
export const ZONA_ESMERALDA_COLONIAS = [
  'Condado de Sayavedra',
  'Hacienda de Valle Escondido',
  'Bosque Real',
  'Residencial Lago Esmeralda',
  'Club de Golf Chiluca',

] as const;

// Additional real colonias shown behind the location step's "Ver más"
// expansion instead of in the main carousel -- kept separate because the
// primary six are what Habitanza actually specializes in (real listings,
// real pricing baselines). These four (plus Fincas de Sayavedra) are
// verified against Pulppo's own location catalog via resolver_ubicacion,
// not guessed -- they have real coordinates but no active listings yet, so
// they get the default price/m² fallback and no "Mercado de la zona" comps.
export const ZONA_ESMERALDA_COLONIAS_EXTENDED = [
  'Bosque Esmeralda',
  'Club de Golf Valle Escondido',
  'Fincas de Sayavedra',
  'Interlomas y Hda. de las Palmas',
  
  'Lomas de Valle Escondido',
  'La Estadía',
  'Prado Largo',
  // Temporary campaign coverage. These zones use the generic preliminary
  // baseline until their local comparable data is added.
  'Rancho San Juan',
  
] as const;

// Sentinel value for "my colonia isn't in the list" — paired with the
// free-text colonia_otra field so the campaign isn't limited to this seed
// list. Review/expand the list above against the real campaign area.
export const OTHER_COLONIA_VALUE = 'otra';

export const PUBLIC_PROPERTY_TYPES = ['Casa', 'Departamento', 'Terreno'] as const;
export type PublicPropertyType = (typeof PUBLIC_PROPERTY_TYPES)[number];

export const PROPERTY_AGE_RANGES = [
  'A estrenar',
  'Menos de 5 años',
  'Entre 5 y 10 años',
  'Entre 10 y 20 años',
  'Más de 20 años',
] as const;
export type PropertyAge = (typeof PROPERTY_AGE_RANGES)[number];

// Optional "Características" chips on the basics step, tailored to the property
// type. Each feature carries a hidden pricing `effect`: 'up' nudges the aprox
// up within the range, 'down' (a challenge like a slope) nudges it down,
// 'neutral' is context only. IMPORTANT: the form renders these as plain,
// unlabeled pills — the polarity is NEVER shown there, so picking a "challenge"
// isn't discouraged; it only surfaces as a slightly lower aprox pin and as
// context for the broker. Keep the value list in sync (inlined) in api/lead.ts.
export type FeatureEffect = 'up' | 'down' | 'neutral';
export interface PropertyFeature {
  value: string;
  effect: FeatureEffect;
}
export const PROPERTY_FEATURES: Record<PublicPropertyType, readonly PropertyFeature[]> = {
  Casa: [
    { value: 'Casa inteligente', effect: 'up' },
    { value: 'Calefacción integrada', effect: 'up' },
    { value: 'Jardín muy amplio', effect: 'up' },
    { value: 'Salón de juegos', effect: 'up' },
    { value: 'Alberca o Jacuzzi', effect: 'up' },
    { value: 'Vistas panorámicas', effect: 'up' },
    { value: 'Una sola planta', effect: 'neutral' },
  ],
  Departamento: [
    { value: 'Terraza o balcón', effect: 'up' },
    { value: 'Vistas panorámicas', effect: 'up' },
    { value: 'Casa inteligente', effect: 'up' },
    { value: 'Calefacción integrada', effect: 'up' },
    { value: 'Alberca o Jacuzzi', effect: 'up' },
    { value: 'Salón de juegos', effect: 'up' },
  ],
  Terreno: [
    { value: 'Vistas panorámicas', effect: 'up' },
    { value: 'Servicios completos', effect: 'up' },
    { value: 'En privada con seguridad', effect: 'up' },
    { value: 'Terreno irregular', effect: 'down' },
    { value: 'Con pendiente', effect: 'down' },
  ],
};

// Every feature value that can appear in a submission, for server-side
// validation regardless of type.
export const ALL_FEATURE_VALUES = Array.from(
  new Set(Object.values(PROPERTY_FEATURES).flat().map((f) => f.value))
);

// Effect lookup by value, for the pricing position model. A value keeps the
// same effect across types, so the flat map is unambiguous.
export const FEATURE_EFFECTS: Record<string, FeatureEffect> = Object.fromEntries(
  Object.values(PROPERTY_FEATURES)
    .flat()
    .map((f) => [f.value, f.effect])
);

// A selected feature is just its string value; kept named `Amenity` so the
// existing `amenidades` field and its consumers don't need renaming.
export type Amenity = string;

export const REFERRAL_SOURCES = [
  { value: 'publicidad', label: 'Publicidad' },
  { value: 'redes_sociales', label: 'Redes Sociales' },
  { value: 'recomendacion', label: 'Recomendación' },
  { value: 'otro', label: 'Otro' },
] as const;
export type ReferralSource = (typeof REFERRAL_SOURCES)[number]['value'];

export interface LeadSubmission {
  nombre: string;
  telefono: string;
  colonia: string; // one of ZONA_ESMERALDA_COLONIAS, or OTHER_COLONIA_VALUE
  colonia_otra?: string;
  tipoPropiedad: PublicPropertyType;
  antiguedad?: PropertyAge;
  m2Construccion?: number;
  m2Terreno?: number;
  recamaras?: number;
  banos?: number;
  estacionamientos?: number; // cajones de estacionamiento
  amenidades?: Amenity[];
  comoNosConociste?: ReferralSource;
  comoNosConocisteOtro?: string;
  asesorAsignado?: string; // broker this lead was routed to (client-assigned)
  asesorTelefono?: string; // that broker's WhatsApp number
  consentimiento: boolean;
  empresa?: string; // honeypot — must stay empty
}

export function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 10) return digits;
  if (digits.length === 12 && digits.startsWith('52')) return digits.slice(2);
  if (digits.length === 13 && digits.startsWith('521')) return digits.slice(3);
  return null;
}

export function sanitizeText(input: unknown, maxLen: number): string {
  if (typeof input !== 'string') return '';
  return input.replace(/[<>]/g, '').trim().slice(0, maxLen);
}
