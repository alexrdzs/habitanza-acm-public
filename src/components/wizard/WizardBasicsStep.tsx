import { PUBLIC_PROPERTY_TYPES, AMENITIES } from '@shared/validation';
import type { PropertyCondition, Amenity } from '@shared/validation';
import { WizardShell } from './WizardShell';
import { ConditionQuickPicker } from './ConditionQuickPicker';
import { SegmentedControl } from './SegmentedControl';
import { ThousandsInput } from './ThousandsInput';
import { labelClass } from './formStyles';
import { Check, Trees, Waves, Wifi, Flame, Gamepad2, Mountain } from 'lucide-react';
import { cn } from '../../lib/utils';

const ROOM_COUNT_OPTIONS = ['1', '2', '3', '4', '5+'];

const boxClass = 'rounded-2xl border border-neutral-200/70 bg-parchment-card/80 p-4 backdrop-blur-md';

const AMENITY_ICONS: Record<Amenity, typeof Trees> = {
  'Casa inteligente': Wifi,
  'Calefacción integrada': Flame,
  'Jardín muy amplio': Trees,
  'Salón de juegos': Gamepad2,
  'Alberca o Jacuzzi': Waves,
  'Vistas panorámicas': Mountain,
};

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
      title="Cuéntanos de tu propiedad"
      description="Esta información sirve para usar comparables equivalentes."
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
              <ConditionQuickPicker
                label="Estado general de la propiedad"
                value={props.condicion}
                onChange={props.setCondicion}
              />
            </div>
          </>
        )}

        <div className={cn(boxClass, 'col-span-2')}>
          <label className={labelClass}>Características especiales (opcional)</label>
          <div className="grid grid-cols-2 gap-2">
            {AMENITIES.map((a) => {
              const active = props.amenidades.includes(a);
              const Icon = AMENITY_ICONS[a];
              return (
                <button
                  key={a}
                  type="button"
                  onClick={() => toggleAmenity(a)}
                  className={cn(
                    'flex items-center gap-1.5 rounded-input border px-3 py-2 text-left text-sm font-medium transition-all',
                    active
                      ? 'border-emerald-deep bg-emerald-deep/10 text-emerald-deep'
                      : 'border-neutral-300 text-neutral-600 hover:border-neutral-400 hover:bg-neutral-50'
                  )}
                >
                  <Icon className={cn('h-4 w-4 flex-shrink-0', active ? 'text-emerald-deep' : 'text-neutral-400')} />
                  <span className="flex-1">{a}</span>
                  {active && (
                    <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-emerald-deep">
                      <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </WizardShell>
  );
}
