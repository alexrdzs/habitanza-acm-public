import { PUBLIC_PROPERTY_TYPES, AMENITIES } from '@shared/validation';
import type { PropertyCondition, Amenity } from '@shared/validation';
import { WizardShell } from './WizardShell';
import { ConditionToggle } from '../ConditionToggle';
import { SegmentedControl } from './SegmentedControl';
import { ThousandsInput } from './ThousandsInput';
import { labelClass } from './formStyles';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

const ROOM_COUNT_OPTIONS = ['1', '2', '3', '4', '5+'];

const boxClass = 'rounded-2xl border border-neutral-200 bg-parchment-card p-4';

interface Props {
  tipoPropiedad: string;
  setTipoPropiedad: (v: string) => void;
  condicion: string;
  setCondicion: (v: PropertyCondition) => void;
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

  const canContinue =
    !!props.tipoPropiedad && (isTerreno ? Number(props.m2Terreno) > 0 : Number(props.m2Construccion) > 0);

  function toggleAmenity(a: Amenity) {
    props.setAmenidades(
      props.amenidades.includes(a) ? props.amenidades.filter((x) => x !== a) : [...props.amenidades, a]
    );
  }

  return (
    <WizardShell
      title="Cuéntanos sobre tu propiedad"
      description="Estos datos nos permiten preparar una primera referencia de valor."
      step={{ current: 2, total: 3 }}
      onBack={props.onBack}
      onNext={props.onContinue}
      nextDisabled={!canContinue}
    >
      <div className="grid grid-cols-2 gap-3">
        <div className={cn(boxClass, 'col-span-2')}>
          <label className={labelClass}>Tipo de propiedad *</label>
          <SegmentedControl
            options={PUBLIC_PROPERTY_TYPES}
            value={props.tipoPropiedad}
            onChange={props.setTipoPropiedad}
          />
        </div>

        {!isTerreno && (
          <div className={boxClass}>
            <label className={labelClass}>m² construcción *</label>
            <ThousandsInput value={props.m2Construccion} onChange={props.setM2Construccion} placeholder="220" />
          </div>
        )}
        <div className={cn(boxClass, isTerreno && 'col-span-2')}>
          <label className={labelClass}>m² terreno {isTerreno ? '*' : '(opcional)'}</label>
          <ThousandsInput value={props.m2Terreno} onChange={props.setM2Terreno} placeholder="350" />
        </div>

        {!isTerreno && (
          <>
            <div className={cn(boxClass, 'col-span-2 space-y-4')}>
              <div>
                <label className={labelClass}>Recámaras</label>
                <SegmentedControl
                  options={ROOM_COUNT_OPTIONS}
                  value={props.recamaras}
                  onChange={props.setRecamaras}
                  className="w-full justify-between"
                />
              </div>
              <div>
                <label className={labelClass}>Baños</label>
                <SegmentedControl
                  options={ROOM_COUNT_OPTIONS}
                  value={props.banos}
                  onChange={props.setBanos}
                  className="w-full justify-between"
                />
              </div>
            </div>

            <div className={cn(boxClass, 'col-span-2')}>
              <ConditionToggle
                label="Estado general de la propiedad"
                value={props.condicion}
                onChange={props.setCondicion}
              />
            </div>
          </>
        )}

        <div className={cn(boxClass, 'col-span-2')}>
          <label className={labelClass}>Amenidades (opcional)</label>
          <div className="flex flex-wrap gap-2">
            {AMENITIES.map((a) => {
              const active = props.amenidades.includes(a);
              return (
                <button
                  key={a}
                  type="button"
                  onClick={() => toggleAmenity(a)}
                  className={cn(
                    'flex items-center gap-1.5 rounded-input border px-3 py-2 text-sm font-medium transition-all',
                    active
                      ? 'border-emerald-deep bg-emerald-deep/10 text-emerald-deep'
                      : 'border-neutral-300 text-neutral-600 hover:border-neutral-400 hover:bg-neutral-50'
                  )}
                >
                  <span
                    className={cn(
                      'flex h-4 w-4 items-center justify-center rounded border transition-all',
                      active ? 'border-emerald-deep bg-emerald-deep' : 'border-neutral-300 bg-white'
                    )}
                  >
                    {active && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                  </span>
                  {a}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </WizardShell>
  );
}
