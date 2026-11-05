import { Bath, BedDouble, Building2, CalendarDays, LandPlot, Ruler, Sparkles, type LucideIcon } from 'lucide-react';
import { FEATURE_ICONS } from '../components/wizard/WizardExtrasStep';
import { FEATURE_EFFECTS } from '@shared/validation';
import { readyComparableListings, zoneTypicalConstruccionM2, zoneTypicalSpecs, zoneTypicalTerrenoM2 } from '@shared/comparableListings';
import { COPY } from '@shared/copy';
import type { PropertyProfile } from '../components/wizard/PropertySummaryCard';

export interface ReadingItem {
  icon: LucideIcon;
  text: string;
}

const cmp = (v?: number, typical?: number) => (v == null || typical == null || v === typical ? null : v > typical ? 'up' : 'down');

// The reveal's plain-language read: what plays in the property's favor (pros)
// and the challenges in this zone (cons). Everything comes from the visitor's
// own answers compared against the zone's REAL comparable listings, so a
// bullet only exists when the data backs it. No data, no bullet.
export function readProperty(profile: PropertyProfile, tipoPropiedad: string, colonia: string) {
  const R = COPY.reveal.reading;
  const pros: ReadingItem[] = [];
  const cons: ReadingItem[] = [];
  const add = (dir: 'up' | 'down' | null, icon: LucideIcon, up: string, down: string) => {
    if (dir === 'up') pros.push({ icon, text: up });
    if (dir === 'down') cons.push({ icon, text: down });
  };

  const isTerreno = tipoPropiedad === 'Terreno';
  const typical = zoneTypicalSpecs();
  if (!isTerreno) {
    add(cmp(profile.m2Construccion, zoneTypicalConstruccionM2(tipoPropiedad)), Ruler, R.conUp, R.conDown);
    add(cmp(profile.recamaras, typical.recamaras), BedDouble, R.recUp, R.recDown);
    add(cmp(profile.banos, typical.banos), Bath, R.banUp, R.banDown);
  }
  add(cmp(profile.m2Terreno, zoneTypicalTerrenoM2()), LandPlot, R.terUp, R.terDown);

  if (profile.antiguedad === 'A estrenar' || profile.antiguedad === 'Menos de 5 años') pros.push({ icon: CalendarDays, text: R.ageNew });
  if (profile.antiguedad === 'Más de 20 años') cons.push({ icon: CalendarDays, text: R.ageOld });

  for (const a of profile.amenidades) {
    const effect = FEATURE_EFFECTS[a];
    const icon = FEATURE_ICONS[a] ?? Sparkles;
    if (effect === 'up' && pros.length < 5) pros.push({ icon, text: R.feature(a) });
    if (effect === 'down') cons.push({ icon, text: R.challenge(a) });
  }

  const comps = readyComparableListings(colonia).length;
  if (comps > 0) cons.push({ icon: Building2, text: R.competition(comps, colonia) });

  return { pros, cons };
}
