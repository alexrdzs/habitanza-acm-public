// Shared between the client form (src/components/LeadForm.tsx) and the
// serverless endpoint (api/lead.ts). The server re-validates everything
// here independently — this file does not make client input trustworthy.

export const ZONA_ESMERALDA_COLONIAS = [
  'Bosque Esmeralda',
  'Condado de Sayavedra',
  'Hacienda de las Palmas',
  'Loma Alta',
  'La Estadía',
  'Bosques de Echegaray',
  'Club de Golf Bellavista',
] as const;

// Sentinel value for "my colonia isn't in the list" — paired with the
// free-text colonia_otra field so the campaign isn't limited to this seed
// list. Review/expand the list above against the real campaign area.
export const OTHER_COLONIA_VALUE = 'otra';

export const PUBLIC_PROPERTY_TYPES = ['Casa', 'Departamento', 'Terreno'] as const;
export type PublicPropertyType = (typeof PUBLIC_PROPERTY_TYPES)[number];

export const TIMELINE_OPTIONS = [
  { value: 'ya', label: 'Ya quiero vender' },
  { value: 'proximos_meses', label: 'En los próximos meses' },
  { value: 'solo_valor', label: 'Solo quiero saber el valor' },
] as const;
export type SellTimeline = (typeof TIMELINE_OPTIONS)[number]['value'];

export interface LeadSubmission {
  nombre: string;
  telefono: string;
  colonia: string; // one of ZONA_ESMERALDA_COLONIAS, or OTHER_COLONIA_VALUE
  colonia_otra?: string;
  tipoPropiedad: PublicPropertyType;
  m2Construccion?: number;
  recamaras?: number;
  timeline?: SellTimeline;
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
