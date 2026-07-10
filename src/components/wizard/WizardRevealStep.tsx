import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import type { PreliminaryEstimate } from '@shared/pricing';
import { PropertyShowcase } from './PropertyShowcase';
import { PreliminaryPricingBar } from './PreliminaryPricingBar';

interface Props {
  estimate: PreliminaryEstimate;
  nombre: string;
  tipoPropiedad: string;
  colonia: string;
}

const ACM_INCLUDES = [
  'Comparables reales de propiedades similares en tu zona',
  'Estrategia de precio de lanzamiento y rango de negociación',
  'Plan de acción para vender más rápido y al mejor precio',
];

function useCountUp(target: number, durationMs = 1100) {
  const [value, setValue] = useState(target);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setValue(target);
      return;
    }

    const from = Math.round(target * 0.72);
    setValue(from);
    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);

  return value;
}

export function WizardRevealStep({ estimate, nombre, tipoPropiedad, colonia }: Props) {
  const firstName = nombre.trim().split(' ')[0] || 'gracias';
  const mid = useCountUp(estimate.mid);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-5 duration-700">
      <div className="relative overflow-hidden rounded-card-lg bg-gradient-to-b from-ink-soft to-ink p-px shadow-[0_24px_48px_-24px_rgba(16,32,26,0.55)]">
        <div className="relative overflow-hidden rounded-[calc(var(--radius-card-lg)-1px)] p-6 md:p-10">
          {/* Ambient color behind the glass panel below — glassmorphism needs
              something with variation to actually refract. */}
          <div className="pointer-events-none absolute -left-10 -top-16 h-56 w-56 rounded-full bg-emerald-glow/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-brass/20 blur-3xl" />

          <div className="relative mb-7 flex items-center justify-between">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-brass-soft">
              Estimación preliminar
            </p>
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-brass/50">
              <div className="h-1.5 w-1.5 rotate-45 bg-emerald-glow" />
            </div>
          </div>

          <p className="relative text-sm font-medium text-neutral-300">Gracias, {firstName}</p>

          {/* Glass panel — the ACM report's bold price treatment, in frosted
              glass over the ambient color blobs above. */}
          <div className="relative mt-3 rounded-2xl border border-white/20 bg-white/[0.07] px-5 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-xl md:px-8 md:py-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-400">Precio de referencia</p>
            <div className="mt-1 font-mono text-[2.25rem] font-medium tabular-nums text-white md:text-[3rem] lg:text-5xl">
              {formatCurrency(mid)}
            </div>
          </div>

          <p className="relative mt-6 max-w-xl text-sm leading-relaxed text-neutral-400 md:text-base">
            Referencia preliminar para tu {tipoPropiedad.toLowerCase()} en {colonia}, basado en promedios generales de
            la zona. <span className="font-semibold text-white">No sustituye tu Análisis Comparativo de Mercado</span>{' '}
            completo, que un asesor te comparte por WhatsApp en menos de 48 horas usando comparables reales de tu
            zona.
          </p>
        </div>
      </div>

      <div className="rounded-card-lg border border-neutral-200 bg-parchment-card p-6 md:p-8">
        <p className="text-[11px] font-bold uppercase tracking-wider text-brass">Rango de posicionamiento</p>
        <h3 className="mt-1 text-base font-bold text-neutral-900">Dónde se ubica tu propiedad</h3>
        <PreliminaryPricingBar estimate={estimate} />
      </div>

      <div className="space-y-4 rounded-card-lg border border-neutral-200 bg-parchment-card p-6 md:p-8">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-brand-500" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">Tu ACM personalizado incluirá</h3>
        </div>
        <ul className="space-y-2.5">
          {ACM_INCLUDES.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
              <p className="text-sm leading-relaxed text-neutral-600">{item}</p>
            </li>
          ))}
        </ul>
      </div>

      <PropertyShowcase />
    </div>
  );
}
