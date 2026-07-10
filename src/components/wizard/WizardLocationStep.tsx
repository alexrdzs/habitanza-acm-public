import { ZONA_ESMERALDA_COLONIAS, OTHER_COLONIA_VALUE } from '@shared/validation';
import { WizardShell } from './WizardShell';
import { NeighborhoodMap } from './NeighborhoodMap';
import { inputClass, labelClass } from './formStyles';
import { cn } from '../../lib/utils';

interface Props {
  colonia: string;
  setColonia: (v: string) => void;
  coloniaOtra: string;
  setColoniaOtra: (v: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

export function WizardLocationStep(props: Props) {
  const canContinue =
    !!props.colonia && (props.colonia !== OTHER_COLONIA_VALUE || props.coloniaOtra.trim().length > 0);

  const mapLabel = props.colonia === OTHER_COLONIA_VALUE ? props.coloniaOtra : props.colonia;

  return (
    <WizardShell
      title="¿Dónde está tu propiedad?"
      description="Ubicamos tu fraccionamiento para comparar contra la zona correcta."
      step={{ current: 1, total: 3 }}
      onBack={props.onBack}
      onNext={props.onContinue}
      nextDisabled={!canContinue}
    >
      <div className="flex flex-col gap-5">
        <NeighborhoodMap colonia={mapLabel} />

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
              autoFocus
            />
          </div>
        )}
      </div>
    </WizardShell>
  );
}
