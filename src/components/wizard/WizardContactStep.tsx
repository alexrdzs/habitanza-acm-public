import { useEffect, useRef, useState, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { REFERRAL_SOURCES } from '@shared/validation';
import { COPY } from '@shared/copy';
import { WizardShell } from './WizardShell';
import { PrivacyNoticeContent } from '../PrivacyNoticeContent';
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
  // The aviso de privacidad opens in a modal, not a new tab: sending someone
  // to another page at the last step of the funnel is a reliable way to lose
  // them.
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  useEffect(() => {
    if (!isPrivacyOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsPrivacyOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isPrivacyOpen]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    props.onSubmit();
  }

  return (
    <WizardShell
      title={COPY.contact.title}
      description={COPY.contact.description}
      step={{ current: 3, total: 3 }}
      onBack={props.onBack}
      nextLabel={COPY.contact.nextLabel}
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
          <label className={labelClass}>{COPY.contact.fieldLabels.nombre}</label>
          <input
            className={inputClass}
            value={props.nombre}
            onChange={(e) => props.setNombre(e.target.value)}
            maxLength={120}
            required
          />
        </div>

        <div>
          <label className={labelClass}>{COPY.contact.fieldLabels.telefono}</label>
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
          <label className={labelClass}>{COPY.contact.fieldLabels.comoNosConociste}</label>
          <select
            className={inputClass}
            value={props.comoNosConociste}
            onChange={(e) => props.setComoNosConociste(e.target.value)}
          >
            <option value="">{COPY.contact.fieldLabels.comoNosConocisteSelectPlaceholder}</option>
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
              placeholder={COPY.contact.fieldLabels.comoNosConocisteOtroPlaceholder}
              autoFocus
            />
          )}
        </div>

        {/* Hairline + spacing sets the consent apart from the fields it
            governs, so it reads as a distinct agreement rather than another
            input. */}
        <label className="mt-2 flex items-start gap-2 border-t border-neutral-200 pt-5 text-sm text-neutral-600">
          <input
            type="checkbox"
            className="mt-1"
            checked={props.consentimiento}
            onChange={(e) => props.setConsentimiento(e.target.checked)}
            required
          />
          <span>
            {COPY.contact.consent.prefix}
            <button
              type="button"
              onClick={() => setIsPrivacyOpen(true)}
              className="text-brand-600 underline underline-offset-2 hover:text-brand-700"
            >
              {COPY.contact.consent.linkLabel}
            </button>
            {COPY.contact.consent.suffix}
          </span>
        </label>

        {props.errorMessage && <p className="text-sm text-red-600">{props.errorMessage}</p>}
      </form>

      {/* Portaled to <body>: WizardShell's card uses backdrop-blur, which
          establishes a containing block for fixed descendants -- rendered
          in place, this "overlay" would be trapped inside the card instead
          of covering the viewport. */}
      {isPrivacyOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Aviso de Privacidad"
          >
            <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm" onClick={() => setIsPrivacyOpen(false)} />
            <div className="animate-in zoom-in-95 relative flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-card-lg bg-parchment-card shadow-2xl duration-200">
              <div className="flex items-center justify-between border-b border-neutral-200 p-5">
                <h2 className="text-lg font-bold text-emerald-deep">Aviso de Privacidad</h2>
                <button
                  type="button"
                  onClick={() => setIsPrivacyOpen(false)}
                  aria-label="Cerrar"
                  className="rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="overflow-y-auto p-5">
                <PrivacyNoticeContent />
              </div>
            </div>
          </div>,
          document.body
        )}
    </WizardShell>
  );
}
