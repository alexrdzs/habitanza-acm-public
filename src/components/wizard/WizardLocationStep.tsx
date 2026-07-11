import { useState } from 'react';
import { ChevronDown, ChevronUp, Check, Home } from 'lucide-react';
import {
  ZONA_ESMERALDA_COLONIAS,
  ZONA_ESMERALDA_COLONIAS_EXTENDED,
  OTHER_COLONIA_VALUE,
} from '@shared/validation';
import { COMPARABLE_LISTINGS } from '@shared/comparableListings';
import { WizardShell } from './WizardShell';
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

function coloniaPhoto(colonia: string): string | undefined {
  return COMPARABLE_LISTINGS[colonia]?.[0]?.photo;
}

interface ColoniaCardProps {
  colonia: string;
  active: boolean;
  onSelect: () => void;
}

function ColoniaCard({ colonia, active, onSelect }: ColoniaCardProps) {
  const photo = coloniaPhoto(colonia);
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <button type="button" onClick={onSelect} className="flex w-full flex-col gap-1.5 text-left">
      <div
        className={cn(
          'relative aspect-[4/3] w-full overflow-hidden rounded-2xl border-2 bg-neutral-100 transition-all',
          active ? 'border-brand-500' : 'border-transparent'
        )}
      >
        {photo && !imgFailed ? (
          <img
            src={photo}
            alt={colonia}
            loading="lazy"
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Home className="h-6 w-6 text-neutral-300" />
          </div>
        )}
        {active && (
          <div className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 shadow">
            <Check className="h-3 w-3 text-white" strokeWidth={3} />
          </div>
        )}
      </div>
      <p className="line-clamp-2 text-xs font-semibold leading-tight text-neutral-800">{colonia}</p>
    </button>
  );
}

export function WizardLocationStep(props: Props) {
  const canContinue =
    !!props.colonia && (props.colonia !== OTHER_COLONIA_VALUE || props.coloniaOtra.trim().length > 0);

  const mapLabel = props.colonia === OTHER_COLONIA_VALUE ? props.coloniaOtra : props.colonia;

  const isExtendedSelection =
    !!props.colonia &&
    props.colonia !== OTHER_COLONIA_VALUE &&
    !(ZONA_ESMERALDA_COLONIAS as readonly string[]).includes(props.colonia);

  // Start expanded if the visitor already picked something from the "ver
  // más" panel (e.g. navigating back to this step), so their choice stays
  // visible instead of collapsing behind a generic "Ver más" label.
  const [showMore, setShowMore] = useState(isExtendedSelection);

  return (
    <WizardShell
      title="¿Dónde está tu propiedad?"
      description="Ubicamos tu fraccionamiento para comparar contra la zona correcta."
      step={{ current: 1, total: 3 }}
      onBack={props.onBack}
      onNext={props.onContinue}
      nextDisabled={!canContinue}
    >
      <div className="flex flex-col gap-4">
        <div>
          <label className={labelClass}>Fraccionamiento / colonia *</label>
          <div className="grid grid-cols-2 gap-3">
            {ZONA_ESMERALDA_COLONIAS.map((c) => (
              <ColoniaCard key={c} colonia={c} active={props.colonia === c} onSelect={() => props.setColonia(c)} />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowMore((v) => !v)}
            className={cn(
              'mt-3 flex w-full items-center justify-center gap-2 rounded-input border-2 border-dashed px-4 py-3 text-sm font-semibold transition-all',
              showMore || isExtendedSelection
                ? 'border-brand-500 bg-brand-500/5 text-brand-600'
                : 'border-neutral-300 text-neutral-500 hover:border-neutral-400 hover:bg-neutral-50'
            )}
          >
            {showMore ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            {!showMore && isExtendedSelection ? mapLabel || 'Ver más opciones' : showMore ? 'Ver menos' : 'Ver más opciones'}
          </button>
        </div>

        {showMore && (
          <div className="animate-in fade-in slide-in-from-top-2 flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-parchment-card p-4 duration-300">
            <p className={labelClass}>Otras colonias cercanas</p>
            <div className="grid grid-cols-2 gap-2">
              {ZONA_ESMERALDA_COLONIAS_EXTENDED.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => props.setColonia(c)}
                  className={cn(
                    'flex min-h-[3rem] items-center justify-center rounded-input border px-2 py-2 text-center text-sm font-medium leading-snug transition-all',
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
                  'flex min-h-[3rem] items-center justify-center rounded-input border px-2 py-2 text-center text-sm font-medium leading-snug transition-all',
                  props.colonia === OTHER_COLONIA_VALUE
                    ? 'border-brand-500 bg-brand-500 text-white'
                    : 'border-dashed border-neutral-300 text-neutral-500 hover:border-neutral-400 hover:bg-neutral-50'
                )}
              >
                Otra colonia
              </button>
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
        )}
      </div>
    </WizardShell>
  );
}
