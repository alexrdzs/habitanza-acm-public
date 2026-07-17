import type { LucideIcon } from 'lucide-react';
import {
  TreePine,
  TreeDeciduous,
  Waves,
  Mountain,
  Castle,
  House,
  Fence,
  Flag,
  Flower2,
  Building2,
  MapPin,
} from 'lucide-react';

// Single source of truth for the little themed icon shown next to each
// fraccionamiento in the location picker. A property photo rarely reads as
// "the zone," so instead of a thumbnail each row carries an icon that hints
// at the character of the neighborhood (a lake, a golf flag, woods, hills).
//
// This is the ONE place a fraccionamiento is tied to an icon -- customize an
// assignment here and it updates everywhere. Swap in any lucide-react icon
// (https://lucide.dev/icons); add the import above and reference it below.
// Any name not listed falls back to DEFAULT_NEIGHBORHOOD_ICON, so the picker
// never breaks when a new colonia is added before its icon is chosen.
export const NEIGHBORHOOD_ICONS: Record<string, LucideIcon> = {
  // Primary six.
  'Bosque Esmeralda': TreePine,
  'Residencial Lago Esmeralda': Waves,
  'Condado de Sayavedra': Castle,
  'Lomas de Valle Escondido': Mountain,
  'Hacienda de Valle Escondido': House,
  'Rancho San Juan': Fence,
  // Extended ("ver mas") fraccionamientos.
  'Fincas de Sayavedra': TreeDeciduous,
  'Club de Golf Valle Escondido': Flag,
  'Club de Golf Chiluca': Flag,
  'La Estadía': House,
  'Prado Largo': Flower2,
  'Bosque Real': TreePine,
  Interlomas: Building2,
};

// Fallback for any fraccionamiento (and the free-text "otra" option) with no
// explicit icon yet.
export const DEFAULT_NEIGHBORHOOD_ICON: LucideIcon = MapPin;

export function neighborhoodIcon(colonia: string): LucideIcon {
  return NEIGHBORHOOD_ICONS[colonia] ?? DEFAULT_NEIGHBORHOOD_ICON;
}
