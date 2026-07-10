import { useRef, type FormEvent } from 'react';
import { TIMELINE_OPTIONS } from '@shared/validation';
import { WizardShell } from './WizardShell';
import { inputClass, labelClass } from './formStyles';

interface Props {
  nombre: string;
  setNombre: (v: string) => void;
  telefono: string;
  setTelefono: (v: string) => void;
  timeline: string;
  setTimeline: (v: string) => void;
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
      title="Ya casi está"
      description="Dinos a dónde enviamos tu estimación preliminar y tu Análisis Comparativo de Mercado (ACM) completo."
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
          <label className={labelClass}>¿Cuándo te gustaría vender?</label>
          <select className={inputClass} value={props.timeline} onChange={(e) => props.setTimeline(e.target.value)}>
            <option value="">Prefiero no decir</option>
            {TIMELINE_OPTIONS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
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
