import { useRef, type FormEvent } from 'react';
import { REFERRAL_SOURCES } from '@shared/validation';
import { WizardShell } from './WizardShell';
import { inputClass, labelClass } from './formStyles';
import { cn } from '../../lib/utils';

interface Props {
  nombre: string;
  setNombre: (v: string) => void;
  telefono: string;
  setTelefono: (v: string) => void;
  comoNosConociste: string;
  setComoNosConociste: (v: string) => void;
  comoNosConocisteOtro: string;
  setComoNosConocisteOtro: (v: string) => void;
  consentimiento: boolean;
  setConsentimiento: (v: boolean) => void;
  empresa: string;
  setEmpresa: (v: string) => void;
  errorMessage: string;
  isSubmitting: boolean;
  onBack: () => void;
  onSubmit: () => void;
}

export function WizardContactStep(props: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    props.onSubmit();
  }

  return (
    <WizardShell
      title="Cuéntanos de ti"
      description="Enviaremos este análisis y toda la información."
      step={{ current: 3, total: 3 }}
      onBack={props.onBack}
      nextLabel="Ver mi estimación"
      isNextLoading={props.isSubmitting}
      formRef={formRef}
    >
      <form ref={formRef} onSubmit={handleSubmit} className="relative flex flex-col gap-4">
        {/* Honeypot — real visitors never see or fill this; bots often do. */}
        <input
          type="text"
          name="empresa"
          value={props.empresa}
          onChange={(e) => props.setEmpresa(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="absolute left-[-9999px] top-0 h-0 w-0 opacity-0"
          aria-hidden="true"
        />

        <div>
          <label className={labelClass}>Nombre completo *</label>
          <input
            className={inputClass}
            value={props.nombre}
            onChange={(e) => props.setNombre(e.target.value)}
            maxLength={120}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Teléfono / WhatsApp *</label>
          <input
            type="tel"
            inputMode="tel"
            className={inputClass}
            value={props.telefono}
            onChange={(e) => props.setTelefono(e.target.value)}
            maxLength={20}
            placeholder="55 1234 5678"
            required
          />
        </div>

        <div>
          <label className={labelClass}>¿Cómo nos conociste? (opcional)</label>
          <select
            className={inputClass}
            value={props.comoNosConociste}
            onChange={(e) => props.setComoNosConociste(e.target.value)}
          >
            <option value="">Seleccionar...</option>
            {REFERRAL_SOURCES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
          {props.comoNosConociste === 'otro' && (
            <input
              className={cn(inputClass, 'mt-2')}
              value={props.comoNosConocisteOtro}
              onChange={(e) => props.setComoNosConocisteOtro(e.target.value)}
              maxLength={120}
              placeholder="¿Cómo nos conociste?"
              autoFocus
            />
          )}
        </div>

        <label className="flex items-start gap-2 text-sm text-neutral-600">
          <input
            type="checkbox"
            className="mt-1"
            checked={props.consentimiento}
            onChange={(e) => props.setConsentimiento(e.target.checked)}
            required
          />
          <span>
            Acepto el{' '}
            <a href="/aviso-de-privacidad" target="_blank" rel="noreferrer" className="text-brand-600 underline">
              aviso de privacidad
            </a>{' '}
            y autorizo que un asesor de Habitanza me contacte por WhatsApp. *
          </span>
        </label>

        {props.errorMessage && <p className="text-sm text-red-600">{props.errorMessage}</p>}
      </form>
    </WizardShell>
  );
}
