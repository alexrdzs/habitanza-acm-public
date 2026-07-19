import { useEffect, useState } from 'react';
import { Logo } from '../components/Logo';
import { WizardHero } from '../components/wizard/WizardHero';
import { WizardLocationStep } from '../components/wizard/WizardLocationStep';
import { WizardBasicsStep } from '../components/wizard/WizardBasicsStep';
import { WizardAnalyzingStep } from '../components/wizard/WizardAnalyzingStep';
import { WizardContactStep } from '../components/wizard/WizardContactStep';
import { WizardRevealStep } from '../components/wizard/WizardRevealStep';
import { MapPreloader } from '../components/wizard/NeighborhoodMap';
import { OTHER_COLONIA_VALUE, normalizePhone, type PropertyAge, type Amenity } from '@shared/validation';
import { pickAdvisor, type Advisor } from '@shared/advisors';
import { estimatePreliminaryRange, type PreliminaryEstimate } from '@shared/pricing';
import { COPY } from '@shared/copy';

type Step = 'hero' | 'location' | 'basics' | 'contact' | 'analyzing' | 'reveal';

function parseRoomCount(v: string): number | undefined {
  if (!v) return undefined;
  // Options can carry a trailing "+" ("5+", "3+") meaning "that many or more".
  const n = Number(v.replace('+', ''));
  return Number.isFinite(n) ? n : undefined;
}

export function LandingPage() {
  // Local-only visual QA shortcut. Vite replaces import.meta.env.DEV with
  // false in production builds, so this can never bypass lead submission.
  const previewParams = new URLSearchParams(window.location.search);
  const isRevealPreview = import.meta.env.DEV && previewParams.get('preview') === 'reveal';
  const revealPreviewColonia =
    { interlomas: 'Interlomas', lomas: 'Lomas de Valle Escondido' }[previewParams.get('colonia') ?? ''] ??
    'Bosque Real';
  const [step, setStep] = useState<Step>(() => (isRevealPreview ? 'reveal' : 'hero'));

  // Location
  const [colonia, setColonia] = useState(() => (isRevealPreview ? revealPreviewColonia : ''));
  const [coloniaOtra, setColoniaOtra] = useState('');

  // Property specifics
  const [tipoPropiedad, setTipoPropiedad] = useState('Casa');
  const [antiguedad, setAntiguedad] = useState<PropertyAge | ''>(() => (isRevealPreview ? 'A estrenar' : ''));
  const [m2Construccion, setM2Construccion] = useState(() => (isRevealPreview ? '240' : ''));
  const [m2Terreno, setM2Terreno] = useState(() => (isRevealPreview ? '320' : ''));
  const [recamaras, setRecamaras] = useState(() => (isRevealPreview ? '4' : ''));
  const [banos, setBanos] = useState(() => (isRevealPreview ? '3' : ''));
  const [estacionamientos, setEstacionamientos] = useState(() => (isRevealPreview ? '2' : ''));
  const [amenidades, setAmenidades] = useState<Amenity[]>(() =>
    isRevealPreview ? ['Alberca o Jacuzzi', 'Vistas panorámicas', 'Casa inteligente'] : []
  );

  // Contact
  const [nombre, setNombre] = useState(() => (isRevealPreview ? 'Cliente' : ''));
  const [telefono, setTelefono] = useState('');
  const [comoNosConociste, setComoNosConociste] = useState('');
  const [comoNosConocisteOtro, setComoNosConocisteOtro] = useState('');
  const [consentimiento, setConsentimiento] = useState(false);
  const [empresa, setEmpresa] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // The broker assigned to this lead. Chosen once at submit so the CRM
  // webhook and the reveal screen (firma + WhatsApp CTA) all agree.
  const [assignedAdvisor, setAssignedAdvisor] = useState<Advisor | null>(() =>
    isRevealPreview ? pickAdvisor(revealPreviewColonia) : null
  );
  const [estimate, setEstimate] = useState<PreliminaryEstimate | null>(() =>
    isRevealPreview
      ? estimatePreliminaryRange({
          tipoPropiedad: 'Casa',
          colonia: revealPreviewColonia,
          m2Construccion: 240,
          m2Terreno: 320,
          // Sample signals so the preview shows the aprox sitting above center.
          amenidades: ['Alberca o Jacuzzi', 'Vistas panorámicas', 'Casa inteligente'],
          antiguedad: 'A estrenar',
        })
      : null
  );

  const resolvedColonia = colonia === OTHER_COLONIA_VALUE ? coloniaOtra : colonia;

  // Each step is its own "page" -- if the visitor scrolled down before
  // continuing, the next step should still start from the top instead of
  // wherever the previous scroll position happened to land.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

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
    // Assign the broker now, before the webhook fires, so the CRM is told who
    // owns the lead and the reveal screen shows that same person.
    const advisor = pickAdvisor(resolvedColonia);
    setAssignedAdvisor(advisor);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          telefono,
          colonia,
          colonia_otra: coloniaOtra || undefined,
          asesorAsignado: advisor.name,
          asesorTelefono: advisor.phone,
          tipoPropiedad,
          antiguedad: antiguedad || undefined,
          m2Construccion: m2Construccion ? Number(m2Construccion) : undefined,
          m2Terreno: m2Terreno ? Number(m2Terreno) : undefined,
          recamaras: parseRoomCount(recamaras),
          banos: parseRoomCount(banos),
          estacionamientos: parseRoomCount(estacionamientos),
          amenidades: amenidades.length > 0 ? amenidades : undefined,
          comoNosConociste: comoNosConociste || undefined,
          comoNosConocisteOtro: comoNosConociste === 'otro' ? comoNosConocisteOtro || undefined : undefined,
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
          m2Construccion: m2Construccion ? Number(m2Construccion) : undefined,
          m2Terreno: m2Terreno ? Number(m2Terreno) : undefined,
          // Nudge the aprox within the range by the property's own signals.
          amenidades,
          antiguedad: antiguedad || undefined,
        })
      );
      // The analyzing animation now plays after contact info is submitted
      // (not before it) -- the estimate above is already computed from the
      // visitor's real answers, so this reads as "processing your actual
      // data" rather than a generic pre-roll before asking for a phone
      // number.
      setStep('analyzing');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'No se pudo enviar tu solicitud.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;

  return (
    <div className="min-h-screen">
      {/* Warm the Maps script the moment a neighborhood is chosen, so the
          analyzing ("radar") map is already loaded two steps later and doesn't
          flash a loading state. No-op without a key. */}
      {colonia && mapsApiKey && <MapPreloader apiKey={mapsApiKey} />}
      <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white dark:bg-parchment-card/85 dark:backdrop-blur-md">
        <div className="mx-auto flex max-w-md items-center px-4 py-4 md:max-w-xl lg:max-w-2xl">
          {/* Extra left padding lines the wordmark up with the card content
              (title/fields) below, which sit inset by the card's own padding,
              rather than with the card's outer edge. */}
          <Logo className="h-7 pl-6 text-neutral-900 md:pl-8" />
        </div>
      </header>
      <main className="mx-auto max-w-md px-4 pt-4 pb-20 md:max-w-xl lg:max-w-2xl">
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
            antiguedad={antiguedad}
            setAntiguedad={setAntiguedad}
            m2Construccion={m2Construccion}
            setM2Construccion={setM2Construccion}
            m2Terreno={m2Terreno}
            setM2Terreno={setM2Terreno}
            recamaras={recamaras}
            setRecamaras={setRecamaras}
            banos={banos}
            setBanos={setBanos}
            estacionamientos={estacionamientos}
            setEstacionamientos={setEstacionamientos}
            amenidades={amenidades}
            setAmenidades={setAmenidades}
            onBack={() => setStep('location')}
            onContinue={() => setStep('contact')}
          />
        )}

        {step === 'contact' && (
          <WizardContactStep
            nombre={nombre}
            setNombre={setNombre}
            telefono={telefono}
            setTelefono={setTelefono}
            comoNosConociste={comoNosConociste}
            setComoNosConociste={setComoNosConociste}
            comoNosConocisteOtro={comoNosConocisteOtro}
            setComoNosConocisteOtro={setComoNosConocisteOtro}
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

        {step === 'analyzing' && (
          <WizardAnalyzingStep colonia={resolvedColonia} onDone={() => setStep('reveal')} />
        )}

        {step === 'reveal' &&
          (estimate && assignedAdvisor ? (
            <WizardRevealStep
              estimate={estimate}
              nombre={nombre}
              tipoPropiedad={tipoPropiedad}
              colonia={resolvedColonia}
              advisor={assignedAdvisor}
              profile={{
                m2Construccion: m2Construccion ? Number(m2Construccion) : undefined,
                m2Terreno: m2Terreno ? Number(m2Terreno) : undefined,
                recamaras: parseRoomCount(recamaras),
                banos: parseRoomCount(banos),
                estacionamientos: parseRoomCount(estacionamientos),
                antiguedad: antiguedad || undefined,
                amenidades,
              }}
            />
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 space-y-3 rounded-card-lg border border-neutral-200/70 bg-parchment-card/80 p-8 text-center shadow-sm backdrop-blur-md duration-500">
              <h2 className="text-xl font-bold text-neutral-900">
                {COPY.submittedFallback.title(nombre.split(' ')[0])}
              </h2>
              <p className="text-neutral-600">{COPY.submittedFallback.body}</p>
            </div>
          ))}
      </main>
    </div>
  );
}
