import { useEffect, useRef, useState } from 'react';
import { Logo } from '../components/Logo';
import { WizardHero } from '../components/wizard/WizardHero';
import { WizardLocationStep } from '../components/wizard/WizardLocationStep';
import { WizardPropertyStep, WizardSpacesStep } from '../components/wizard/WizardPropertySteps';
import { WizardTopBar } from '../components/wizard/WizardTopBar';
import { WizardExtrasStep } from '../components/wizard/WizardExtrasStep';
import { WizardAnalyzingStep } from '../components/wizard/WizardAnalyzingStep';
import { IS_EVENT_MODE } from '../lib/eventMode';
import { WizardContactStep } from '../components/wizard/WizardContactStep';
import { WizardRevealStep } from '../components/wizard/WizardRevealStep';
import { MapPreloader } from '../components/wizard/NeighborhoodMap';
import { WizardSidebar } from '../components/wizard/WizardSidebar';
import { useIsWide } from '../lib/useIsWide';
import { OTHER_COLONIA_VALUE, normalizePhone, type PropertyAge, type Amenity } from '@shared/validation';
import { pickAdvisor, type Advisor } from '@shared/advisors';
import { BrokerPicker } from '../components/wizard/BrokerPicker';
import { getStoredBroker, storeBroker } from '../lib/broker';
import { estimatePreliminaryRange, type PreliminaryEstimate } from '@shared/pricing';
import { COPY } from '@shared/copy';

type Step = 'hero' | 'location' | 'property' | 'spaces' | 'extras' | 'contact' | 'analyzing' | 'reveal';

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
  // Event mode (?modo=evento): the broker's tablet at a stand. Adds the
  // "Volver a empezar" button and defaults "¿Cómo nos conociste?" to Evento.
  const isEventMode = IS_EVENT_MODE;
  const isRevealPreview = import.meta.env.DEV && previewParams.get('preview') === 'reveal';
  const revealPreviewColonia =
    { interlomas: 'Interlomas', lomas: 'Lomas de Valle Escondido' }[previewParams.get('colonia') ?? ''] ??
    previewParams.get('colonia') ??
    'Bosque Real';
  // ?preview=analizando: shows the analyzing step and loops it (dev only).
  const isAnalyzingPreview = import.meta.env.DEV && previewParams.get('preview') === 'analizando';
  const [replay, setReplay] = useState(0);
  const [analyzingStage, setAnalyzingStage] = useState(0);
  const [step, setStep] = useState<Step>(() => (isRevealPreview ? 'reveal' : isAnalyzingPreview ? 'analyzing' : 'hero'));

  // Location
  const [colonia, setColonia] = useState(() => (isRevealPreview || isAnalyzingPreview ? revealPreviewColonia : ''));
  const [coloniaOtra, setColoniaOtra] = useState('');

  // Property specifics
  const [tipoPropiedad, setTipoPropiedad] = useState(() => (isRevealPreview ? 'Casa' : ''));
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
  // Dev only: ?tel=5530494822 pre-fills the phone for testing the share.
  const [telefono, setTelefono] = useState(import.meta.env.DEV ? (previewParams.get('tel') ?? '') : '');
  const [comoNosConociste, setComoNosConociste] = useState(isEventMode ? 'evento' : '');
  const [comoNosConocisteOtro, setComoNosConocisteOtro] = useState('');
  const [consentimiento, setConsentimiento] = useState(false);
  const [empresa, setEmpresa] = useState('');

  // Event mode: the broker working this tablet, remembered across visits.
  const [eventBroker, setEventBroker] = useState<Advisor | null>(() => (isEventMode ? getStoredBroker() : null));
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
  // On wide screens the right panel is the scroll container, not the window.
  const panelRef = useRef<HTMLDivElement>(null);
  const wide = useIsWide();
  useEffect(() => {
    window.scrollTo(0, 0);
    panelRef.current?.scrollTo(0, 0);
  }, [step]);

  // Bumped on every restart so a lead submission still in flight can't push
  // the next visitor's screen to "analyzing".
  const sessionRef = useRef(0);

  // Event mode: wipe every answer and go back to the intro for the next visitor.
  function resetAll() {
    sessionRef.current += 1;
    setStep('hero');
    setColonia('');
    setColoniaOtra('');
    setTipoPropiedad('');
    setAntiguedad('');
    setM2Construccion('');
    setM2Terreno('');
    setRecamaras('');
    setBanos('');
    setEstacionamientos('');
    setAmenidades([]);
    setNombre('');
    setTelefono('');
    setComoNosConociste(isEventMode ? 'evento' : '');
    setComoNosConocisteOtro('');
    setConsentimiento(false);
    setEmpresa('');
    setIsSubmitting(false);
    setErrorMessage('');
    setAssignedAdvisor(null);
    setEstimate(null);
  }

  async function handleContactSubmit() {
    const session = sessionRef.current;
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
    const advisor = (isEventMode && eventBroker) || pickAdvisor(resolvedColonia);
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

      if (session !== sessionRef.current) return;
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
      if (session !== sessionRef.current) return;
      setErrorMessage(err instanceof Error ? err.message : 'No se pudo enviar tu solicitud.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;

  // Terreno has no rooms or age, so its flow is shorter.
  const flow: Step[] =
    tipoPropiedad === 'Terreno'
      ? ['location', 'property', 'extras', 'contact']
      : ['location', 'property', 'spaces', 'extras', 'contact'];
  const flowIndex = flow.indexOf(step);
  const goBack = () => setStep(flow[flowIndex - 1] ?? 'hero');
  const goNext = () => setStep(flow[flowIndex + 1] ?? 'contact');

  const barLabel =
    flowIndex >= 0
      ? `${COPY.progress.stepOf(flowIndex + 1, flow.length)} · ${COPY.progress.labels[step as keyof typeof COPY.progress.labels]}`
      : step === 'analyzing'
        ? COPY.progress.analyzing
        : COPY.progress.result;
  // Home -> first step is two different screens: the home fades out, then the
  // wizard layout assembles piece by piece (side panel, bar, content).
  const [leavingHero, setLeavingHero] = useState(false);
  const startWizard = () => {
    setLeavingHero(true);
    window.setTimeout(() => {
      setStep('location');
      setLeavingHero(false);
    }, 120);
  };
  // Map search pins narrow as the visitor answers: 45 once the zone is known,
  // half when the type is picked, then down to 12 at the last step.
  const lastIdx = flow.length - 1;
  const pinCount = !colonia || (wide && step === 'analyzing') // analyzing: comparables show as photos instead
    ? 0
    : !tipoPropiedad
      ? 45
      : flowIndex >= 2
        ? Math.round(22 - (10 * (flowIndex - 1)) / Math.max(1, lastIdx - 1))
        : step === 'analyzing' || step === 'reveal'
          ? 12
          : 22;
  const topBar =
    step === 'hero' ? null : (
      <WizardTopBar
        label={barLabel}
        fraction={flowIndex >= 0 ? (flowIndex + 1) / (flow.length + 1) : 1}
        onRestart={isEventMode ? resetAll : undefined}
        needsConfirm={step !== 'reveal'}
      />
    );
  const preloader = colonia && mapsApiKey ? <MapPreloader apiKey={mapsApiKey} /> : null;

  const steps = (
    <>
      {step === 'hero' && (
        <div className={`relative flex flex-1 flex-col transition-opacity duration-[120ms] ease-out ${leavingHero ? 'opacity-0' : ''}`}>
          {isEventMode && (
            <BrokerPicker
              value={eventBroker}
              onChange={(b) => {
                storeBroker(b.name);
                setEventBroker(b);
              }}
            />
          )}
          <WizardHero onStart={startWizard} eventMode={isEventMode} wide={wide} />
        </div>
      )}

      {step === 'location' && (
        <WizardLocationStep
          colonia={colonia}
          setColonia={setColonia}
          coloniaOtra={coloniaOtra}
          setColoniaOtra={setColoniaOtra}
          onBack={() => setStep('hero')}
          onContinue={goNext}
        />
      )}

      {step === 'property' && (
        <WizardPropertyStep
          tipoPropiedad={tipoPropiedad}
          setTipoPropiedad={(v) => {
            if (v !== tipoPropiedad) {
              // Características are type-specific, and Terreno has no rooms,
              // construction or age, so a type switch clears what no longer fits.
              setAmenidades([]);
              if (v === 'Terreno') {
                setRecamaras('');
                setBanos('');
                setEstacionamientos('');
                setM2Construccion('');
                setAntiguedad('');
              }
            }
            setTipoPropiedad(v);
          }}
          m2Construccion={m2Construccion}
          setM2Construccion={setM2Construccion}
          m2Terreno={m2Terreno}
          setM2Terreno={setM2Terreno}
          antiguedad={antiguedad}
          setAntiguedad={setAntiguedad}
          onBack={goBack}
          onContinue={goNext}
        />
      )}

      {step === 'spaces' && (
        <WizardSpacesStep
          recamaras={recamaras}
          setRecamaras={setRecamaras}
          banos={banos}
          setBanos={setBanos}
          estacionamientos={estacionamientos}
          setEstacionamientos={setEstacionamientos}
          m2Construccion={m2Construccion}
          onFixSize={() => setStep('property')}
          onBack={goBack}
          onContinue={goNext}
        />
      )}


      {step === 'extras' && (
        <WizardExtrasStep
          tipoPropiedad={tipoPropiedad}
          amenidades={amenidades}
          setAmenidades={setAmenidades}
          onBack={goBack}
          onContinue={goNext}
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
          onBack={goBack}
          onSubmit={handleContactSubmit}
        />
      )}

      {step === 'analyzing' && (
        <WizardAnalyzingStep
          key={replay}
          colonia={resolvedColonia}
          showGrid={!wide}
          onStage={setAnalyzingStage}
          onDone={() => (isAnalyzingPreview ? setReplay((n) => n + 1) : setStep('reveal'))}
        />
      )}

      {step === 'reveal' &&
        (estimate && assignedAdvisor ? (
          <WizardRevealStep
            wide={false}
            estimate={estimate}
            nombre={nombre}
            telefono={telefono}
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
            <p className="text-neutral-600">{isEventMode ? COPY.event.submittedBody : COPY.submittedFallback.body}</p>
          </div>
        ))}
    </>
  );

  // Tablet landscape / desktop: an iPad-app style frame. Left, a dark panel
  // (progress + live summary, or the price once revealed); right, the step.
  if (wide) {
    return (
      <div className="h-dvh">
        {preloader}
        <div className="flex h-full">
          {/* One white container. The wizard sits on the left; once the visitor
              starts, the map + summary panel assembles on the right. */}
          <div className="relative flex min-w-0 flex-1 overflow-hidden bg-parchment-card">
            <div
              key={step === 'hero' ? 'home' : 'wizard'}
              className="flex min-w-0 flex-1 animate-in flex-col duration-300 fade-in"
            >
              {topBar}
              <div ref={panelRef} className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
                <main
                  className={`mx-auto flex min-h-full flex-col px-[var(--gutter)] [--gutter:2rem] xl:[--gutter:2.5rem] ${
                    flowIndex >= 0 ? 'max-w-3xl pb-0 pt-2' : step === 'reveal' ? 'max-w-7xl pb-8 pt-2' : step === 'hero' ? 'max-w-6xl pb-8 pt-8' : 'max-w-5xl pb-8 pt-8 xl:pb-10'
                  }`}
                >
                  {steps}
                </main>
              </div>
            </div>
            {step !== 'hero' && step !== 'reveal' && (
              <aside className="w-[440px] shrink-0 animate-in overflow-hidden duration-500 fade-in slide-in-from-right-6 xl:w-[480px]">
                <div className="h-full overflow-y-auto">
                  <div className="relative h-full">
                    <WizardSidebar
                      pinCount={pinCount}
                      analyzingStage={step === 'analyzing' ? analyzingStage : undefined}
                      showHighlights={step === 'extras' || step === 'contact' || step === 'analyzing'}
                      colonia={resolvedColonia}
                      tipoPropiedad={tipoPropiedad}
                      m2Construccion={m2Construccion}
                      m2Terreno={m2Terreno}
                      recamaras={recamaras}
                      banos={banos}
                      estacionamientos={estacionamientos}
                      antiguedad={antiguedad}
                      amenidades={amenidades}
                    />
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Warm the Maps script the moment a neighborhood is chosen, so the
          analyzing ("radar") map is already loaded two steps later and doesn't
          flash a loading state. No-op without a key. */}
      {preloader}
      <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white dark:bg-parchment-card/85 dark:backdrop-blur-md">
        <div className="mx-auto flex max-w-md items-center px-4 py-4 md:max-w-2xl">
          {/* Extra left padding lines the wordmark up with the card content
              (title/fields) below, which sit inset by the card's own padding,
              rather than with the card's outer edge. */}
          <Logo className="h-7 pl-6 text-neutral-900 md:pl-8" />
        </div>
        {topBar && <div className="mx-auto max-w-md md:max-w-2xl">{topBar}</div>}
      </header>
      <main
        className={`mx-auto flex max-w-md flex-col px-[var(--gutter)] pt-4 [--gutter:1rem] md:max-w-2xl ${
          // Home: fills the screen under the header so its button sits at the very bottom.
          step === 'hero' ? 'min-h-[calc(100dvh-3.8rem)] pb-0' : 'min-h-[calc(100dvh-7.05rem)]'
        } ${flowIndex >= 0 || step === 'hero' ? 'pb-0' : 'pb-20'}`}
      >
        {steps}
      </main>
    </div>
  );
}
