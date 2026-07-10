import { useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import {
  ZONA_ESMERALDA_COLONIAS,
  OTHER_COLONIA_VALUE,
  PUBLIC_PROPERTY_TYPES,
  TIMELINE_OPTIONS,
  normalizePhone,
} from '@shared/validation';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const inputClass =
  'w-full rounded-input border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200';

const labelClass = 'mb-1.5 block text-sm font-medium text-neutral-700';

export function LeadForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [colonia, setColonia] = useState('');
  const [coloniaOtra, setColoniaOtra] = useState('');
  const [tipoPropiedad, setTipoPropiedad] = useState('');
  const [m2Construccion, setM2Construccion] = useState('');
  const [recamaras, setRecamaras] = useState('');
  const [timeline, setTimeline] = useState('');
  const [consentimiento, setConsentimiento] = useState(false);
  const [empresa, setEmpresa] = useState(''); // honeypot

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMessage('');

    if (!nombre.trim() || !telefono.trim() || !colonia || !tipoPropiedad || !consentimiento) {
      setErrorMessage('Por favor completa los campos requeridos.');
      return;
    }
    if (!normalizePhone(telefono)) {
      setErrorMessage('Ingresa un número de WhatsApp válido a 10 dígitos.');
      return;
    }
    if (colonia === OTHER_COLONIA_VALUE && !coloniaOtra.trim()) {
      setErrorMessage('Indica tu fraccionamiento o colonia.');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          telefono,
          colonia,
          colonia_otra: coloniaOtra || undefined,
          tipoPropiedad,
          m2Construccion: m2Construccion ? Number(m2Construccion) : undefined,
          recamaras: recamaras ? Number(recamaras) : undefined,
          timeline: timeline || undefined,
          consentimiento,
          empresa,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}) as { error?: string });
        throw new Error(data.error || 'No se pudo enviar tu solicitud.');
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'No se pudo enviar tu solicitud.');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 rounded-card-lg bg-white p-8 text-center shadow-sm">
        <CheckCircle2 className="h-12 w-12 text-brand-500" />
        <h2 className="text-xl font-bold text-neutral-900">Gracias, {nombre.split(' ')[0]}</h2>
        <p className="text-neutral-600">
          Un asesor te contacta por WhatsApp en menos de 48 horas con el valor estimado de tu propiedad.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-col gap-4 rounded-card-lg bg-white p-6 shadow-sm sm:p-8">
      {/* Honeypot — real visitors never see or fill this; bots often do. */}
      <input
        type="text"
        name="empresa"
        value={empresa}
        onChange={(e) => setEmpresa(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] top-0 h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <div>
        <label className={labelClass} htmlFor="nombre">Nombre completo *</label>
        <input id="nombre" className={inputClass} value={nombre} onChange={(e) => setNombre(e.target.value)} required maxLength={120} />
      </div>

      <div>
        <label className={labelClass} htmlFor="telefono">Teléfono / WhatsApp *</label>
        <input id="telefono" type="tel" inputMode="tel" className={inputClass} value={telefono} onChange={(e) => setTelefono(e.target.value)} required maxLength={20} placeholder="55 1234 5678" />
      </div>

      <div>
        <label className={labelClass} htmlFor="colonia">Fraccionamiento / colonia *</label>
        <select id="colonia" className={inputClass} value={colonia} onChange={(e) => setColonia(e.target.value)} required>
          <option value="" disabled>Selecciona tu fraccionamiento</option>
          {ZONA_ESMERALDA_COLONIAS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
          <option value={OTHER_COLONIA_VALUE}>Otra colonia (especificar)</option>
        </select>
      </div>

      {colonia === OTHER_COLONIA_VALUE && (
        <div>
          <label className={labelClass} htmlFor="colonia_otra">¿Cuál?</label>
          <input id="colonia_otra" className={inputClass} value={coloniaOtra} onChange={(e) => setColoniaOtra(e.target.value)} maxLength={120} />
        </div>
      )}

      <div>
        <label className={labelClass} htmlFor="tipoPropiedad">Tipo de propiedad *</label>
        <select id="tipoPropiedad" className={inputClass} value={tipoPropiedad} onChange={(e) => setTipoPropiedad(e.target.value)} required>
          <option value="" disabled>Selecciona una opción</option>
          {PUBLIC_PROPERTY_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="m2">m² construcción aprox.</label>
          <input id="m2" type="number" min={0} className={inputClass} value={m2Construccion} onChange={(e) => setM2Construccion(e.target.value)} />
        </div>
        <div>
          <label className={labelClass} htmlFor="recamaras">Recámaras</label>
          <input id="recamaras" type="number" min={0} className={inputClass} value={recamaras} onChange={(e) => setRecamaras(e.target.value)} />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="timeline">¿Cuándo te gustaría vender?</label>
        <select id="timeline" className={inputClass} value={timeline} onChange={(e) => setTimeline(e.target.value)}>
          <option value="">Prefiero no decir</option>
          {TIMELINE_OPTIONS.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      <label className="flex items-start gap-2 text-sm text-neutral-600">
        <input type="checkbox" className="mt-1" checked={consentimiento} onChange={(e) => setConsentimiento(e.target.checked)} required />
        <span>
          Acepto el{' '}
          <a href="/aviso-de-privacidad" target="_blank" rel="noreferrer" className="text-brand-600 underline">
            aviso de privacidad
          </a>{' '}
          y autorizo que un asesor de Habitanza me contacte por WhatsApp. *
        </span>
      </label>

      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className={cn(
          'flex items-center justify-center gap-2 rounded-pill bg-brand-500 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-600 disabled:opacity-60'
        )}
      >
        {status === 'submitting' && <Loader2 className="h-5 w-5 animate-spin" />}
        Quiero saber cuánto vale mi casa
      </button>
    </form>
  );
}
