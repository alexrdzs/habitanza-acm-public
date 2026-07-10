import { ZONA_ESMERALDA_COLONIAS, OTHER_COLONIA_VALUE, PUBLIC_PROPERTY_TYPES, AMENITIES } from '@shared/validation';
import type { PropertyCondition, Amenity } from '@shared/validation';
import { WizardShell } from './WizardShell';
import { ConditionToggle } from '../ConditionToggle';
import { SegmentedControl } from './SegmentedControl';
import { ThousandsInput } from './ThousandsInput';
import { inputClass, labelClass } from './formStyles';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

const ROOM_COUNT_OPTIONS = ['1', '2', '3', '4', '5+'];

interface Props {
  tipoPropiedad: string;
  setTipoPropiedad: (v: string) => void;
  colonia: string;
  setColonia: (v: string) => void;
  coloniaOtra: string;
  setColoniaOtra: (v: string) => void;
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
    !!props.tipoPropiedad &&
    !!props.colonia &&
    (props.colonia !== OTHER_COLONIA_VALUE || props.coloniaOtra.trim().length > 0) &&
    (isTerreno ? Number(props.m2Terreno) > 0 : Number(props.m2Construccion) > 0);

  function toggleAmenity(a: Amenity) {
    props.setAmenidades(
      props.amenidades.includes(a) ? props.amenidades.filter((x) => x !== a) : [...props.amenidades, a]
    );
  }

  return (
    <WizardShell
      title="Cuéntanos sobre tu propiedad"
      description="Estos datos nos permiten preparar una primera referencia de valor para tu zona."
      step={{ current: 1, total: 2 }}
      onBack={props.onBack}
      onNext={props.onContinue}
      nextDisabled={!canContinue}
    >
      <div className="flex flex-col gap-5">
        <div>
          <label className={labelClass}>Tipo de propiedad *</label>
          <SegmentedControl
            options={PUBLIC_PROPERTY_TYPES}
            value={props.tipoPropiedad}
            onChange={props.setTipoPropiedad}
          />
        </div>

        <div>
          <label className={labelClass}>Fraccionamiento / colonia *</label>
          <div className="flex flex-wrap gap-2">
            {ZONA_ESMERALDA_COLONIAS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => props.setColonia(c)}
                className={cn(
                  'rounded-input border px-3 py-2 text-sm font-medium transition-all',
                  props.colonia === c
                    ? 'border-brand-500 bg-brand-500 text-white'
                    : 'border-neutral-300 text-neutral-600 hover:border-neutral-400 hover:bg-neutral-50'
                )}
              >
                {c}
              </button>
            ))}
            <button
              type="button"
              onClick={() => props.setColonia(OTHER_COLONIA_VALUE)}
              className={cn(
                'rounded-input border px-3 py-2 text-sm font-medium transition-all',
                props.colonia === OTHER_COLONIA_VALUE
                  ? 'border-brand-500 bg-brand-500 text-white'
                  : 'border-dashed border-neutral-300 text-neutral-500 hover:border-neutral-400 hover:bg-neutral-50'
              )}
            >
              Otra colonia
            </button>
          </div>
        </div>

        {props.colonia === OTHER_COLONIA_VALUE && (
          <div>
            <label className={labelClass}>¿Cuál?</label>
            <input
              className={inputClass}
              value={props.coloniaOtra}
              onChange={(e) => props.setColoniaOtra(e.target.value)}
              maxLength={120}
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          {!isTerreno && (
            <div>
              <label className={labelClass}>m² construcción *</label>
              <ThousandsInput value={props.m2Construccion} onChange={props.setM2Construccion} placeholder="220" />
            </div>
          )}
          <div className={isTerreno ? 'col-span-2' : ''}>
            <label className={labelClass}>m² terreno {isTerreno ? '*' : '(opcional)'}</label>
            <ThousandsInput value={props.m2Terreno} onChange={props.setM2Terreno} placeholder="350" />
          </div>
        </div>

        {!isTerreno && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Recámaras</label>
              <SegmentedControl options={ROOM_COUNT_OPTIONS} value={props.recamaras} onChange={props.setRecamaras} />
            </div>
            <div>
              <label className={labelClass}>Baños</label>
              <SegmentedControl options={ROOM_COUNT_OPTIONS} value={props.banos} onChange={props.setBanos} />
            </div>
          </div>
        )}

        {!isTerreno && (
          <ConditionToggle
            label="Estado general de la propiedad"
            value={props.condicion}
            onChange={props.setCondicion}
          />
        )}

        <div>
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
