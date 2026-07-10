import { Search, ListChecks, UserCheck } from 'lucide-react';
import { PropertyShowcase } from './PropertyShowcase';
import { PreliminaryPricingBar } from './PreliminaryPricingBar';
import { AdvisorCTA } from './AdvisorCTA';
import type { PreliminaryEstimate } from '@shared/pricing';

interface Props {
  estimate: PreliminaryEstimate;
  nombre: string;
  tipoPropiedad: string;
  colonia: string;
}

const METHODOLOGY_STEPS = [
  {
    icon: Search,
    title: 'Homologamos tu propiedad',
    detail: 'Tamaño, condición y ubicación, frente al mercado real de tu zona — no un promedio genérico de internet.',
  },
  {
    icon: ListChecks,
    title: 'Cruzamos contra portafolio activo',
    detail: 'Comparamos contra propiedades que existen hoy en Zona Esmeralda, no listados viejos o de otras zonas.',
  },
  {
    icon: UserCheck,
    title: 'Un asesor humano lo revisa',
    detail: 'Antes de compartirte el número final, alguien que conoce tu fraccionamiento lo valida.',
  },
];

export function WizardRevealStep({ estimate, nombre, tipoPropiedad, colonia }: Props) {
  const firstName = nombre.trim().split(' ')[0] || 'gracias';

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

          {/* Glass panel — blurred by design: this screen is a teaser, the
              real number comes from an advisor, not a client-side formula. */}
          <div className="relative mt-3 rounded-2xl border border-white/20 bg-white/[0.07] px-5 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-xl md:px-8 md:py-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-400">Precio de referencia</p>
            <div className="mt-1 select-none font-mono text-[2.25rem] font-medium tabular-nums text-white blur-[6px] md:text-[3rem] lg:text-5xl">
              {'$•••,•••,•••'}
            </div>
            <p className="mt-2 text-xs font-medium text-brass-soft">Tu asesor te lo comparte por WhatsApp</p>
          </div>

          <p className="relative mt-6 max-w-xl text-sm leading-relaxed text-neutral-400 md:text-base">
            Ya calculamos una referencia para tu {tipoPropiedad.toLowerCase()} en {colonia}. Esto es solo un adelanto
            — <span className="font-semibold text-white">tu Análisis Comparativo de Mercado completo</span> lo arma
            un asesor con comparables reales de tu zona, no una fórmula genérica.
          </p>
        </div>
      </div>

      <div className="rounded-card-lg border border-neutral-200 bg-parchment-card p-6 md:p-8">
        <p className="text-[11px] font-bold uppercase tracking-wider text-brass">Rango de posicionamiento</p>
        <h3 className="mt-1 text-base font-bold text-neutral-900">Dónde se ubica tu propiedad</h3>
        <PreliminaryPricingBar estimate={estimate} />
      </div>

      <div className="space-y-5 rounded-card-lg border border-neutral-200 bg-parchment-card p-6 md:p-8">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-brass">Metodología</p>
          <h3 className="mt-1 text-base font-bold text-neutral-900">Así llegamos a un número</h3>
        </div>
        <ol className="space-y-4">
          {METHODOLOGY_STEPS.map(({ icon: Icon, title, detail }, i) => (
            <li key={title} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-deep/10">
                  <Icon className="h-4 w-4 text-emerald-deep" />
                </div>
                {i < METHODOLOGY_STEPS.length - 1 && <div className="mt-1 w-px flex-1 bg-neutral-200" />}
              </div>
              <div className="pb-1">
                <p className="text-sm font-bold text-neutral-900">{title}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-neutral-500">{detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <PropertyShowcase />

      <AdvisorCTA tipoPropiedad={tipoPropiedad} colonia={colonia} />
    </div>
  );
}
