import { useState } from 'react';
import { PUBLIC_PROPERTY_TYPES, AMENITIES, PROPERTY_AGE_RANGES } from '@shared/validation';
import type { PropertyAge, Amenity } from '@shared/validation';
import { COPY } from '@shared/copy';
import { WizardShell } from './WizardShell';
import { SegmentedControl } from './SegmentedControl';
import { BanosScale } from './BanosScale';
import { ThousandsInput } from './ThousandsInput';
import { inputClass } from './formStyles';
import {
  Bath,
  BedDouble,
  Bot,
  Building2,
  CalendarDays,
  ChevronDown,
  Eye,
  Flame,
  Gamepad2,
  House,
  LandPlot,
  Ruler,
  Sparkles,
  Trees,
  Waves,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '../../lib/utils';

const ROOM_COUNT_OPTIONS = ['1', '2', '3', '4', '5+'];

function minimumConstructionM2(recamaras: string, banos: string): number {
  const bedrooms = recamaras === '5+' ? 5 : Number(recamaras);
  const bathrooms = banos === '5+' ? 5 : Number(banos);

  if (bedrooms >= 4 || bathrooms >= 4) return 70;
  if (bedrooms >= 3 || bathrooms >= 3) return 50;
  if (bedrooms >= 2 && bathrooms >= 2) return 35;
  return 1;
}

const AMENITY_ICONS: Record<Amenity, LucideIcon> = {
  'Casa inteligente': Bot,
  'Calefacción integrada': Flame,
  'Jardín muy amplio': Trees,
  'Salón de juegos': Gamepad2,
  'Alberca o Jacuzzi': Waves,
  'Vistas panorámicas': Eye,
};

// WizardShell already provides the primary surface. Keep field groups flat and
// let the inputs and selection controls carry their own affordance.
const boxClass = 'space-y-2';

interface Props {
  tipoPropiedad: string;
  setTipoPropiedad: (v: string) => void;
  antiguedad: string;
  setAntiguedad: (v: PropertyAge | '') => void;
  m2Construccion: string;
  setM2Construccion: (v: string) => void;
  m2Terreno: string;
  setM2Terreno: (v: string) => void;
  recamaras: string;
  setRecamaras: (v: string) => void;
  banos: string;
  setBanos: (v: string) => void;
  amenidades: Amenity[];
  setAmenidades: (v: Amenity[]) => void;
  onBack: () => void;
  onContinue: () => void;
}

export function WizardBasicsStep(props: Props) {
  const isTerreno = props.tipoPropiedad === 'Terreno';
  const minimumConstruction = minimumConstructionM2(props.recamaras, props.banos);

  const lotValid = Number(props.m2Terreno) >= 50;
  const constructionValid = isTerreno || Number(props.m2Construccion) >= minimumConstruction;
  const canContinue = !!props.tipoPropiedad && lotValid && constructionValid;

  // Errors stay hidden until the visitor tries to continue, so the form
  // doesn't flash red while someone is mid-typing "50". The button stays
  // enabled (rather than disabled-until-valid) precisely so they CAN press
  // it and see what's missing. After the first attempt, validation goes
  // live as they correct the value.
  const [attempted, setAttempted] = useState(false);
  const showLotError = attempted && !lotValid;
  const showConstructionError = attempted && !isTerreno && !constructionValid;
  const lotErrorMessage =
    props.m2Terreno === '' ? 'Ingresa los metros de terreno.' : 'El terreno debe ser de al menos 50 m².';
  const constructionErrorMessage =
    props.m2Construccion === ''
      ? 'Ingresa los metros de construcción.'
      : `Con estas habitaciones, la construcción debe ser de al menos ${minimumConstruction} m².`;

  function handleContinue() {
    if (!canContinue) {
      setAttempted(true);
      return;
    }
    props.onContinue();
  }

  function toggleAmenity(a: Amenity) {
    props.setAmenidades(
      props.amenidades.includes(a) ? props.amenidades.filter((x) => x !== a) : [...props.amenidades, a]
    );
  }

  return (
    <WizardShell
      title={COPY.basics.title}
      description={COPY.basics.description}
      step={{ current: 2, total: 3 }}
      onBack={props.onBack}
      onNext={handleContinue}
    >
      <div className="space-y-6 pb-2">
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-medium text-neutral-800">
            <Building2 className="h-5 w-5 text-brand-500" />
            {COPY.basics.fieldLabels.tipoPropiedad}
          </h3>
          <SegmentedControl
            options={PUBLIC_PROPERTY_TYPES}
            value={props.tipoPropiedad}
            onChange={props.setTipoPropiedad}
            className="w-full"
          />
        </section>

        <section className="space-y-4 border-t border-neutral-200 pt-6">
          <h3 className="flex items-center gap-2 text-lg font-medium text-neutral-800">
            <Ruler className="h-5 w-5 text-brand-500" />
            {COPY.basics.sectionLabels.tamanoEspacios}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {!isTerreno && (
              <div className={boxClass}>
                <label className="flex items-center gap-1.5 text-sm font-medium text-neutral-700">
                  <House className="h-4 w-4 text-neutral-400" />
                  {COPY.basics.fieldLabels.m2Construccion}
                </label>
                <ThousandsInput value={props.m2Construccion} onChange={props.setM2Construccion} placeholder="m²" />
                {showConstructionError && (
                  <p className="text-xs font-medium text-red-600 dark:text-red-400" role="alert">
                    {constructionErrorMessage}
                  </p>
                )}
              </div>
            )}
            <div className={cn(boxClass, isTerreno && 'col-span-2')}>
              <label className="flex items-center gap-1.5 text-sm font-medium text-neutral-700">
                <LandPlot className="h-4 w-4 text-neutral-400" />
                {COPY.basics.fieldLabels.m2TerrenoRequired}
              </label>
              <ThousandsInput value={props.m2Terreno} onChange={props.setM2Terreno} placeholder="m²" />
              {showLotError && (
                <p className="text-xs font-medium text-red-600 dark:text-red-400" role="alert">
                  {lotErrorMessage}
                </p>
              )}
            </div>
          </div>

          {!isTerreno && (
            <div className="space-y-4">
              <div>
                <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-neutral-700">
                  <BedDouble className="h-4 w-4 text-neutral-400" />
                  {COPY.basics.fieldLabels.recamaras}
                </label>
                <SegmentedControl
                  options={ROOM_COUNT_OPTIONS}
                  value={props.recamaras}
                  onChange={props.setRecamaras}
                  className="w-full justify-between"
                />
              </div>
              <div>
                <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-neutral-700">
                  <Bath className="h-4 w-4 text-neutral-400" />
                  {COPY.basics.fieldLabels.banos}
                </label>
                <BanosScale value={props.banos} onChange={props.setBanos} />
              </div>
            </div>
          )}
        </section>

        <section className="space-y-4 border-t border-neutral-200 pt-6">
          <h3 className="flex items-center gap-2 text-lg font-medium text-neutral-800">
            <Sparkles className="h-5 w-5 text-brand-500" />
            {COPY.basics.sectionLabels.adicionales}
          </h3>
          {/* Amenities lead the "Adicionales" section: they're the tappable,
              engaging part, so they come before the antigüedad dropdown. Two
              columns at every breakpoint -- never four (too busy for a
              six-item list) and never one (too tall). Labels wrap to a second
              line on the narrow mobile column rather than truncate. */}
          <div className="grid grid-cols-2 gap-2.5">
            {AMENITIES.map((a) => {
              const active = props.amenidades.includes(a);
              const Icon = AMENITY_ICONS[a];
              return (
                <button
                  key={a}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleAmenity(a)}
                  className={cn(
                    'flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left text-sm font-medium leading-tight transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
                    active
                      ? 'border-brand-500 bg-brand-500/5 text-neutral-900 shadow-sm'
                      : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 dark:bg-neutral-100 dark:hover:bg-neutral-200'
                  )}
                >
                  <Icon className={cn('h-5 w-5 shrink-0', active ? 'text-brand-500' : 'text-neutral-400')} />
                  <span>{a}</span>
                </button>
              );
            })}
          </div>

          {!isTerreno && (
            <div className="relative mt-2">
              <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <select
                aria-label="Antigüedad de construcción (opcional)"
                className={cn(inputClass, 'appearance-none pl-10 pr-10')}
                value={props.antiguedad}
                onChange={(event) => props.setAntiguedad(event.target.value as PropertyAge | '')}
              >
                <option value="">Antigüedad</option>
                {PROPERTY_AGE_RANGES.map((age) => (
                  <option key={age} value={age}>
                    {age}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-700" />
            </div>
          )}
        </section>
      </div>
    </WizardShell>
  );
}
