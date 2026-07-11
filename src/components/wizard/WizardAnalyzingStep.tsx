import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { WizardShell } from './WizardShell';
import { AnalyzingMap } from './AnalyzingMap';
import { cn } from '../../lib/utils';

interface Stage {
  label: string;
  detail: string;
}

const STAGES: Stage[] = [
  {
    label: 'Ubicando tu propiedad',
    detail: 'Cruzamos tu colonia con el mapa de la zona para entender el entorno exacto que mueve tu valor.',
  },
  {
    label: 'Revisando nuestro portafolio activo',
    detail: 'Tenemos inventario real en tu zona — comparamos contra propiedades que existen, no las adivinamos.',
  },
  {
    label: 'Ajustando por el estado de tu propiedad',
    detail: 'Una casa remodelada no vale lo mismo que una para renovar: lo consideramos desde el primer cálculo.',
  },
  {
    label: 'Preparando tu estimación',
    detail: 'Tu Análisis Comparativo de Mercado completo lo arma un asesor humano, no un algoritmo genérico.',
  },
];

const STAGE_DURATION_MS = 950;
const COMPLETE_HOLD_MS = 850;
const EXIT_DURATION_MS = 500;

type Phase = 'running' | 'complete' | 'exiting';

export function WizardAnalyzingStep({ colonia, onDone }: { colonia: string; onDone: () => void }) {
  const [stageIndex, setStageIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('running');

  useEffect(() => {
    const interval = setInterval(() => {
      setStageIndex((prev) => Math.min(prev + 1, STAGES.length - 1));
    }, STAGE_DURATION_MS);

    const completeAt = STAGES.length * STAGE_DURATION_MS;
    const completeTimeout = setTimeout(() => setPhase('complete'), completeAt);
    const exitTimeout = setTimeout(() => setPhase('exiting'), completeAt + COMPLETE_HOLD_MS);
    const doneTimeout = setTimeout(onDone, completeAt + COMPLETE_HOLD_MS + EXIT_DURATION_MS);

    return () => {
      clearInterval(interval);
      clearTimeout(completeTimeout);
      clearTimeout(exitTimeout);
      clearTimeout(doneTimeout);
    };
  }, [onDone]);

  const isComplete = phase !== 'running';

  return (
    <div
      className={cn(
        'transition-all duration-500 ease-out',
        phase === 'exiting' ? '-translate-y-3 opacity-0' : 'translate-y-0 opacity-100'
      )}
    >
      <WizardShell title="Analizando tu zona" description="Estamos preparando tu primera referencia de valor.">
        <div className="flex flex-col items-center gap-8 py-4">
          {/* A real map, not an abstract loading animation: starts zoomed
              out over the whole zone, then narrows into the visitor's
              colonia and its real comps once we reach that stage --
              cross-fading into a completion stamp once every stage has
              finished so the cut to the next screen reads as a deliberate
              beat rather than an abrupt jump. */}
          <div className="relative flex h-36 w-full items-center justify-center overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
            {!isComplete ? (
              <>
                <AnalyzingMap colonia={colonia} narrow={stageIndex >= 1} />
                <div
                  className="pointer-events-none absolute inset-0 animate-spin opacity-30 [animation-duration:2.4s]"
                  style={{
                    background:
                      'conic-gradient(from 0deg, transparent 0deg, var(--color-emerald-glow) 25deg, transparent 70deg)',
                  }}
                />
              </>
            ) : (
              <div className="flex animate-in flex-col items-center gap-2 zoom-in-95 fade-in duration-500">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-deep text-white shadow-lg">
                  <Check className="h-7 w-7" strokeWidth={3} />
                </div>
                <p className="text-sm font-bold text-neutral-800">Referencia lista</p>
              </div>
            )}
          </div>

          {/* Stage checklist — each item narrates what's happening and why it
              matters, not a generic "cargando..." message. */}
          <div className="w-full space-y-3">
            {STAGES.map((stage, i) => {
              const isDone = i < stageIndex || isComplete;
              const isActive = i === stageIndex && !isComplete;
              return (
              <div
                key={stage.label}
                className={`flex items-start gap-3 rounded-xl border p-3 transition-all duration-500 ${
                  isActive
                    ? 'border-brand-200 bg-brand-50'
                    : isDone
                      ? 'border-neutral-200 bg-parchment-card opacity-60'
                      : 'border-transparent opacity-0'
                }`}
                style={{ maxHeight: i <= stageIndex ? '120px' : '0px', overflow: 'hidden' }}
              >
                <div
                  className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                    isDone ? 'bg-brand-500' : isActive ? 'border-2 border-brand-500' : 'border border-neutral-300'
                  }`}
                >
                  {isDone && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                  {isActive && <div className="h-2 w-2 animate-pulse rounded-full bg-brand-500" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-800">{stage.label}</p>
                  {isActive && <p className="mt-0.5 text-xs leading-relaxed text-neutral-500">{stage.detail}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </WizardShell>
    </div>
  );
}
