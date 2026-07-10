import { useState } from 'react';
import { Logo } from '../components/Logo';
import { WizardHero } from '../components/wizard/WizardHero';
import { WizardLocationStep } from '../components/wizard/WizardLocationStep';
import { WizardBasicsStep } from '../components/wizard/WizardBasicsStep';
import { WizardAnalyzingStep } from '../components/wizard/WizardAnalyzingStep';
import { WizardContactStep } from '../components/wizard/WizardContactStep';
import { WizardRevealStep } from '../components/wizard/WizardRevealStep';
import { OTHER_COLONIA_VALUE, normalizePhone, type PropertyCondition, type Amenity } from '@shared/validation';
import { estimatePreliminaryRange, type PreliminaryEstimate } from '@shared/pricing';

type Step = 'hero' | 'location' | 'basics' | 'analyzing' | 'contact' | 'reveal';

function parseRoomCount(v: string): number | undefined {
  if (!v) return undefined;
  return v === '5+' ? 5 : Number(v);
}

export function LandingPage() {
  const [step, setStep] = useState<Step>('hero');

  // Location
  const [colonia, setColonia] = useState('');
  const [coloniaOtra, setColoniaOtra] = useState('');

  // Property specifics
  const [tipoPropiedad, setTipoPropiedad] = useState('');
  const [condicion, setCondicion] = useState<PropertyCondition | ''>('Buen estado');
  const [m2Construccion, setM2Construccion] = useState('');
  const [m2Terreno, setM2Terreno] = useState('');
  const [recamaras, setRecamaras] = useState('');
  const [banos, setBanos] = useState('');
  const [amenidades, setAmenidades] = useState<Amenity[]>([]);

  // Contact
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [timeline, setTimeline] = useState('');
  const [consentimiento, setConsentimiento] = useState(false);
  const [empresa, setEmpresa] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [estimate, setEstimate] = useState<PreliminaryEstimate | null>(null);

  const resolvedColonia = colonia === OTHER_COLONIA_VALUE ? coloniaOtra : colonia;

  async function handleContactSubmit() {
    setErrorMessage('');

    if (!nombre.trim() || !telefono.trim() || !consentimiento) {
      setErrorMessage('Por favor completa los campos requeridos.');
      return;
    }
    if (!normalizePhone(telefono)) {
      setErrorMessage('Ingresa un número de WhatsApp válido a 10 dígitos.');
      return;
    }

    setIsSubmitting(true);
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
          condicion: condicion || undefined,
          m2Construccion: m2Construccion ? Number(m2Construccion) : undefined,
          m2Terreno: m2Terreno ? Number(m2Terreno) : undefined,
          recamaras: parseRoomCount(recamaras),
          banos: parseRoomCount(banos),
          amenidades: amenidades.length > 0 ? amenidades : undefined,
          timeline: timeline || undefined,
          consentimiento,
          empresa,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}) as { error?: string });
        throw new Error(data.error || 'No se pudo enviar tu solicitud.');
      }

      setEstimate(
        estimatePreliminaryRange({
          tipoPropiedad,
          colonia: resolvedColonia,
          condicion: condicion || undefined,
          m2Construccion: m2Construccion ? Number(m2Construccion) : undefined,
          m2Terreno: m2Terreno ? Number(m2Terreno) : undefined,
        })
      );
      setStep('reveal');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'No se pudo enviar tu solicitud.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-parchment">
      <header className="flex justify-center py-6">
        <Logo className="h-8 text-neutral-900" />
      </header>
      <main className="mx-auto max-w-md px-4 pb-20 md:max-w-xl lg:max-w-2xl">
        {step === 'hero' && <WizardHero onStart={() => setStep('location')} />}

        {step === 'location' && (
          <WizardLocationStep
            colonia={colonia}
            setColonia={setColonia}
            coloniaOtra={coloniaOtra}
            setColoniaOtra={setColoniaOtra}
            onBack={() => setStep('hero')}
            onContinue={() => setStep('basics')}
          />
        )}

        {step === 'basics' && (
          <WizardBasicsStep
            tipoPropiedad={tipoPropiedad}
            setTipoPropiedad={setTipoPropiedad}
            condicion={condicion}
            setCondicion={setCondicion}
            m2Construccion={m2Construccion}
            setM2Construccion={setM2Construccion}
            m2Terreno={m2Terreno}
            setM2Terreno={setM2Terreno}
            recamaras={recamaras}
            setRecamaras={setRecamaras}
            banos={banos}
            setBanos={setBanos}
            amenidades={amenidades}
            setAmenidades={setAmenidades}
            onBack={() => setStep('location')}
            onContinue={() => setStep('analyzing')}
          />
        )}

        {step === 'analyzing' && <WizardAnalyzingStep onDone={() => setStep('contact')} />}

        {step === 'contact' && (
          <WizardContactStep
            nombre={nombre}
            setNombre={setNombre}
            telefono={telefono}
            setTelefono={setTelefono}
            timeline={timeline}
            setTimeline={setTimeline}
            consentimiento={consentimiento}
            setConsentimiento={setConsentimiento}
            empresa={empresa}
            setEmpresa={setEmpresa}
            errorMessage={errorMessage}
            isSubmitting={isSubmitting}
            onBack={() => setStep('basics')}
            onSubmit={handleContactSubmit}
          />
        )}

        {step === 'reveal' &&
          (estimate ? (
            <WizardRevealStep
              estimate={estimate}
              nombre={nombre}
              tipoPropiedad={tipoPropiedad}
              colonia={resolvedColonia}
            />
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 space-y-3 rounded-card-lg border border-neutral-200 bg-parchment-card p-8 text-center shadow-sm duration-500">
              <h2 className="text-xl font-bold text-neutral-900">Gracias, {nombre.split(' ')[0]}</h2>
              <p className="text-neutral-600">
                Un asesor te contacta por WhatsApp en menos de 48 horas con el valor estimado de tu propiedad.
              </p>
            </div>
          ))}
      </main>
    </div>
  );
}
