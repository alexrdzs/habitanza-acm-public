import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { WizardShell } from './WizardShell';

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

export function WizardAnalyzingStep({ onDone }: { onDone: () => void }) {
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStageIndex((prev) => Math.min(prev + 1, STAGES.length - 1));
    }, STAGE_DURATION_MS);
    const doneTimeout = setTimeout(onDone, STAGES.length * STAGE_DURATION_MS + 500);
    return () => {
      clearInterval(interval);
      clearTimeout(doneTimeout);
    };
  }, [onDone]);

  const progress = (stageIndex + 1) / STAGES.length;
  const blurPx = Math.max(0, 10 - stageIndex * 3.5);

  return (
    <WizardShell title="Analizando tu zona" description="Estamos preparando tu primera referencia de valor.">
      <div className="flex flex-col items-center gap-8 py-4">
        {/* Radar-scan ring behind a sharpening trio of property-card
            silhouettes — foreshadows the real showcase on the next screen. */}
        <div className="relative flex h-36 w-full items-center justify-center overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
          <div
            className="absolute inset-0 animate-spin opacity-40 [animation-duration:2.4s]"
            style={{
              background:
                'conic-gradient(from 0deg, transparent 0deg, var(--color-emerald-glow) 25deg, transparent 70deg)',
            }}
          />
          <div className="relative flex gap-2.5 px-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-20 w-16 rounded-lg border border-neutral-300 bg-white shadow-sm transition-[filter] duration-700 ease-out"
                style={{ filter: `blur(${blurPx}px)`, opacity: 0.5 + progress * 0.5 }}
              >
                <div className="h-11 w-full rounded-t-lg bg-neutral-200" />
                <div className="space-y-1 p-1.5">
                  <div className="h-1.5 w-3/4 rounded-full bg-neutral-200" />
                  <div className="h-1.5 w-1/2 rounded-full bg-neutral-200" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stage checklist — each item narrates what's happening and why it
            matters, not a generic "cargando..." message. */}
        <div className="w-full space-y-3">
          {STAGES.map((stage, i) => {
            const isDone = i < stageIndex;
            const isActive = i === stageIndex;
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
  );
}
