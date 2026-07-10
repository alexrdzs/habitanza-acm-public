import { ZONA_ESMERALDA_COLONIAS, OTHER_COLONIA_VALUE, PUBLIC_PROPERTY_TYPES } from '@shared/validation';
import type { PropertyCondition } from '@shared/validation';
import { WizardShell } from './WizardShell';
import { ConditionToggle } from '../ConditionToggle';
import { inputClass, labelClass } from './formStyles';

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

  return (
    <WizardShell
      title="Cuéntanos sobre tu propiedad"
      description="Estos datos nos permiten preparar una primera referencia de valor para tu zona."
      step={{ current: 1, total: 2 }}
      onBack={props.onBack}
      onNext={props.onContinue}
      nextDisabled={!canContinue}
    >
      <div className="flex flex-col gap-4">
        <div>
          <label className={labelClass}>Tipo de propiedad *</label>
          <select
            className={inputClass}
            value={props.tipoPropiedad}
            onChange={(e) => props.setTipoPropiedad(e.target.value)}
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            {PUBLIC_PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Fraccionamiento / colonia *</label>
          <select className={inputClass} value={props.colonia} onChange={(e) => props.setColonia(e.target.value)}>
            <option value="" disabled>
              Selecciona tu fraccionamiento
            </option>
            {ZONA_ESMERALDA_COLONIAS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
            <option value={OTHER_COLONIA_VALUE}>Otra colonia (especificar)</option>
          </select>
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
              <input
                type="number"
                min={0}
                className={inputClass}
                value={props.m2Construccion}
                onChange={(e) => props.setM2Construccion(e.target.value)}
              />
            </div>
          )}
          <div className={isTerreno ? 'col-span-2' : ''}>
            <label className={labelClass}>m² terreno {isTerreno ? '*' : '(opcional)'}</label>
            <input
              type="number"
              min={0}
              className={inputClass}
              value={props.m2Terreno}
              onChange={(e) => props.setM2Terreno(e.target.value)}
            />
          </div>
        </div>

        {!isTerreno && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Recámaras</label>
              <input
                type="number"
                min={0}
                className={inputClass}
                value={props.recamaras}
                onChange={(e) => props.setRecamaras(e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Baños</label>
              <input
                type="number"
                min={0}
                className={inputClass}
                value={props.banos}
                onChange={(e) => props.setBanos(e.target.value)}
              />
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
      </div>
    </WizardShell>
  );
}
