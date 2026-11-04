import { useEffect, useRef, useState } from 'react';
import { PUBLIC_PROPERTY_TYPES, PROPERTY_AGE_RANGES } from '@shared/validation';
import type { PropertyAge } from '@shared/validation';
import { COPY } from '@shared/copy';
import { cn } from '../../lib/utils';
import { WizardShell } from './WizardShell';
import { SegmentedControl } from './SegmentedControl';
import { OptionTile } from './OptionTile';
import { ThousandsInput } from './ThousandsInput';
import { Bath, BedDouble, Building2, CalendarDays, Car, House, LandPlot, type LucideIcon } from 'lucide-react';

// The property "Datos" are two short screens (type + size + age, spaces) so
// none of them needs scrolling on a tablet. Nothing is preselected.

// Lets the tap's checkmark land before the screen changes.
const AUTO_ADVANCE_DELAY_MS = 250;

const TYPE_ICONS: Record<string, LucideIcon> = { Casa: House, Departamento: Building2, Terreno: LandPlot };
const ROOM_COUNT_OPTIONS = ['1', '2', '3', '4', '5+'];
// Cajones de estacionamiento: a common valuation signal in these fraccionamientos.
const PARKING_OPTIONS = ['0', '1', '2', '3', '4+'];

function minimumConstructionM2(recamaras: string, banos: string): number {
  const bedrooms = recamaras === '5+' ? 5 : Number(recamaras);
  const bathrooms = banos === '5+' ? 5 : Number(banos);

  if (bedrooms >= 4 || bathrooms >= 4) return 70;
  if (bedrooms >= 3 || bathrooms >= 3) return 50;
  if (bedrooms >= 2 && bathrooms >= 2) return 35;
  return 1;
}

// Runs `fn` after the auto-advance pause; the pending call is dropped on
// unmount so a Back tap can't be overridden by a late advance.
function useAutoAdvance() {
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  return (fn: () => void) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(fn, AUTO_ADVANCE_DELAY_MS);
  };
}

// ---- 1. Type + size ----------------------------------------------------

interface PropertyProps {
  tipoPropiedad: string;
  setTipoPropiedad: (v: string) => void;
  m2Construccion: string;
  setM2Construccion: (v: string) => void;
  m2Terreno: string;
  setM2Terreno: (v: string) => void;
  antiguedad: string;
  setAntiguedad: (v: PropertyAge | '') => void;
  onBack: () => void;
  onContinue: () => void;
}

export function WizardPropertyStep(props: PropertyProps) {
  const isTerreno = props.tipoPropiedad === 'Terreno';
  const lotValid = Number(props.m2Terreno) >= 50;
  // The construction minimum depends on the rooms, which come next: the
  // spaces step checks it. Here it only has to be filled in.
  const constructionValid = isTerreno || Number(props.m2Construccion) >= 1;

  // Errors stay hidden until the visitor tries to continue, so the form
  // doesn't flash red while someone is mid-typing "50". After the first
  // attempt, validation goes live as they correct the value.
  const [attempted, setAttempted] = useState(false);
  const lotError =
    attempted && !lotValid
      ? props.m2Terreno === '' ? 'Ingresa los metros de terreno.' : 'El terreno debe ser de al menos 50 m².'
      : '';
  const constructionError = attempted && !constructionValid ? 'Ingresa los metros de construcción.' : '';

  // Optional: tapping the selected option again clears it.
  function pickAge(age: string) {
    props.setAntiguedad(props.antiguedad === age ? '' : (age as PropertyAge));
  }

  function handleContinue() {
    if (!lotValid || !constructionValid) {
      setAttempted(true);
      return;
    }
    props.onContinue();
  }

  const fields = [
    !isTerreno && { Icon: House, label: COPY.basics.fieldLabels.m2Construccion, value: props.m2Construccion, set: props.setM2Construccion, error: constructionError },
    { Icon: LandPlot, label: COPY.basics.fieldLabels.m2TerrenoRequired, value: props.m2Terreno, set: props.setM2Terreno, error: lotError },
  ].filter(Boolean) as { Icon: LucideIcon; label: string; value: string; set: (v: string) => void; error: string }[];

  return (
    <WizardShell
      title={COPY.property.title}
      description={COPY.property.description}
      onBack={props.onBack}
      onNext={handleContinue}
      nextDisabled={!props.tipoPropiedad}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-3 gap-4">
          {PUBLIC_PROPERTY_TYPES.map((t) => (
            <OptionTile
              key={t}
              label={t}
              icon={TYPE_ICONS[t]}
              active={props.tipoPropiedad === t}
              className="min-h-[104px] md:min-h-[112px]"
              onClick={() => props.setTipoPropiedad(t)}
            />
          ))}
        </div>

        {/* The size fields appear once a type is chosen (Terreno has no
            construction field). */}
        {props.tipoPropiedad && (
          <div key={props.tipoPropiedad} className="grid animate-in gap-6 duration-300 fade-in slide-in-from-bottom-2 sm:grid-cols-2">
            {fields.map(({ Icon, label, value, set, error }) => (
              <div key={label} className="space-y-3">
                <label className="flex items-center gap-2 text-base font-medium text-neutral-700">
                  <Icon className="h-5 w-5 text-neutral-400" />
                  {label}
                </label>
                <ThousandsInput value={value} onChange={set} placeholder="0" />
                {error && (
                  <p className="text-sm font-medium text-red-600 dark:text-red-400" role="alert">
                    {error}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Age (optional) sits right under the sizes. Terreno has none. */}
        {props.tipoPropiedad && !isTerreno && (
          <div className="animate-in space-y-3 duration-300 fade-in">
            <p className="flex items-center gap-2 text-base font-medium text-neutral-700">
              <CalendarDays className="h-5 w-5 text-neutral-400" />
              {COPY.age.label}
            </p>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
              {PROPERTY_AGE_RANGES.map((age, i) => (
                <button
                  key={age}
                  type="button"
                  aria-pressed={props.antiguedad === age}
                  onClick={() => pickAge(age)}
                  className={cn(
                    'flex min-h-[56px] items-center justify-center whitespace-nowrap rounded-xl border px-1 py-3 text-center text-[12.5px] lg:max-[1150px]:text-[11.5px] font-semibold leading-tight transition-all active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
                    i === 0 && 'col-span-2 md:col-span-1',
                    props.antiguedad === age
                      ? 'border-brand-500 bg-selected-gradient text-neutral-900'
                      : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50'
                  )}
                >
                  {COPY.age.short[age] ?? age}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </WizardShell>
  );
}

// ---- 2. Spaces ---------------------------------------------------------

interface SpacesProps {
  recamaras: string;
  setRecamaras: (v: string) => void;
  banos: string;
  setBanos: (v: string) => void;
  estacionamientos: string;
  setEstacionamientos: (v: string) => void;
  m2Construccion: string;
  // Sends the visitor back to the size screen to fix the construction m².
  onFixSize: () => void;
  onBack: () => void;
  onContinue: () => void;
}

export function WizardSpacesStep(props: SpacesProps) {
  const minimum = minimumConstructionM2(props.recamaras, props.banos);
  const [attempted, setAttempted] = useState(false);
  const tooSmall = Number(props.m2Construccion) < minimum;

  function handleContinue() {
    if (tooSmall) {
      setAttempted(true);
      return;
    }
    props.onContinue();
  }

  const rows: { Icon: LucideIcon; label: string; options: string[]; value: string; set: (v: string) => void }[] = [
    { Icon: BedDouble, label: COPY.basics.fieldLabels.recamaras, options: ROOM_COUNT_OPTIONS, value: props.recamaras, set: props.setRecamaras },
    { Icon: Bath, label: COPY.basics.fieldLabels.banos, options: ROOM_COUNT_OPTIONS, value: props.banos, set: props.setBanos },
    { Icon: Car, label: COPY.basics.fieldLabels.estacionamientos, options: PARKING_OPTIONS, value: props.estacionamientos, set: props.setEstacionamientos },
  ];
  return (
    <WizardShell title={COPY.spaces.title} description={COPY.spaces.description} onBack={props.onBack} onNext={handleContinue}>
      <div className="space-y-6">
        {rows.map(({ Icon, label, options, value, set }) => (
          <div key={label}>
            <p className="mb-2 flex items-center gap-2 text-base font-medium text-neutral-700">
              <Icon className="h-5 w-5 text-neutral-400" />
              {label}
            </p>
            <SegmentedControl options={options} value={value} onChange={set} className="w-full justify-between" />
          </div>
        ))}
        {attempted && tooSmall && (
          <p className="text-sm font-medium text-red-600 dark:text-red-400" role="alert">
            Con estas habitaciones, la construcción debe ser de al menos {minimum} m².{' '}
            <button type="button" onClick={props.onFixSize} className="font-semibold underline underline-offset-2">
              Corregir metros
            </button>
          </p>
        )}
      </div>
    </WizardShell>
  );
}
