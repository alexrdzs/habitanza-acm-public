import { Search, ListChecks, UserCheck, Check } from 'lucide-react';
import { TestimonialsCarousel } from './TestimonialsCarousel';
import { PreliminaryPricingBar } from './PreliminaryPricingBar';
import { AdvisorCTA } from './AdvisorCTA';
import type { PreliminaryEstimate } from '@shared/pricing';
import { formatCurrency } from '../../lib/utils';

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
      {/* Reassurance panel — the first thing people read after submitting.
          Deliberately not the final number: it names who picks up the lead
          and states outright that a full, personalized ACM is still coming,
          so this screen never reads as the end of the process. */}
      <div className="relative overflow-hidden rounded-card-lg bg-gradient-to-b from-ink-soft to-ink p-px shadow-[0_24px_48px_-24px_rgba(16,32,26,0.55)]">
        <div className="relative overflow-hidden rounded-[calc(var(--radius-card-lg)-1px)] p-6 md:p-10">
          <div className="pointer-events-none absolute -left-10 -top-16 h-56 w-56 rounded-full bg-emerald-glow/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-brass/20 blur-3xl" />

          <div className="relative mb-5 flex items-center justify-between">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-brass-soft">
              Recibimos tu información
            </p>
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-brass/50">
              <Check className="h-4 w-4 text-emerald-glow" strokeWidth={3} />
            </div>
          </div>

          <h2 className="relative text-xl font-bold leading-snug text-white md:text-2xl">
            Muchas gracias, {firstName}. Ya tenemos todo para trabajar tu estimado de valor.
          </h2>
          <p className="relative mt-3 max-w-xl text-sm leading-relaxed text-neutral-300 md:text-base">
            Lo estará trabajando <span className="font-semibold text-white">Rogelio</span>,{' '}
            <span className="font-semibold text-white">Tere</span>, o alguien más de nuestro equipo.
          </p>

          <div className="relative mt-5 rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3.5">
            <p className="text-xs leading-relaxed text-neutral-300 md:text-sm">
              <span className="font-semibold text-emerald-glow">Esto todavía no es el paso final: </span>
              con la información de tu {tipoPropiedad.toLowerCase()} en {colonia}, nuestro equipo trabajará un
              Análisis Comparativo de Mercado (ACM) personalizado, y nos pondremos en contacto contigo con una
              presentación completa.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5 rounded-card-lg border border-neutral-200 bg-parchment-card p-6 md:p-8">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-brass">¿Cómo lo hacemos?</p>
          <h3 className="mt-1 text-base font-bold text-neutral-900">Metodología</h3>
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

      <div className="rounded-card-lg border border-neutral-200 bg-parchment-card p-6 md:p-8">
        <p className="text-[11px] font-bold uppercase tracking-wider text-brass">Rango de zona</p>
        <h3 className="mt-1 text-base font-bold text-neutral-900">
          Tu propiedad estaría en un rango de {formatCurrency(estimate.low)} a {formatCurrency(estimate.high)}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-500">
          Por experiencia e indicadores de mercado, sabemos que {colonia} suele moverse en un rango así — pero cada
          propiedad es distinta, y es importante diseñar una estrategia específica para la tuya.
        </p>
        <PreliminaryPricingBar estimate={estimate} />
      </div>

      <TestimonialsCarousel />

      <AdvisorCTA tipoPropiedad={tipoPropiedad} colonia={colonia} />
    </div>
  );
}
