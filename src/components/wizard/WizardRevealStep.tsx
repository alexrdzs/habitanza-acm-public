import { useMemo } from 'react';
import { Search, ListChecks, UserCheck } from 'lucide-react';
import { PreliminaryPricingBar } from './PreliminaryPricingBar';
import { ComparablesMap } from './ComparablesMap';
import { ComparableListingCards } from './ComparableListingCards';
import { AdvisorCTA } from './AdvisorCTA';
import { AdvisorAvatar } from './AdvisorAvatar';
import { ADVISORS } from '@shared/advisors';
import { COMPARABLE_LISTINGS } from '@shared/comparableListings';
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
  // Randomized once per visit so the same advisor's photo/name shown here
  // also appears on the persistent WhatsApp bar below -- and so the team
  // can compare inbound contact between Rogelio and Tere.
  const advisor = useMemo(() => ADVISORS[Math.floor(Math.random() * ADVISORS.length)], []);
  const advisorFirstName = advisor.name.split(' ')[0];
  const comps = COMPARABLE_LISTINGS[colonia] ?? [];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-5 pb-20 duration-700">
      {/* The one screen staged like a certificate being issued (dark ink
          ground, brass trim) rather than a form -- deliberately not the
          final ACM, but the one moment meant to feel like a payoff. */}
      <div className="relative overflow-hidden rounded-card-lg bg-gradient-to-b from-ink-soft to-ink p-px shadow-[0_24px_48px_-24px_rgba(16,32,26,0.55)]">
        <div className="relative overflow-hidden rounded-[calc(var(--radius-card-lg)-1px)] p-6 md:p-10">
          <div className="pointer-events-none absolute -left-10 -top-16 h-56 w-56 rounded-full bg-emerald-glow/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-brass/20 blur-3xl" />

          <h2 className="relative text-xl font-bold leading-snug text-white md:text-2xl">
            Muchas gracias, {firstName}.
          </h2>
          <p className="relative mt-1.5 text-base font-medium text-neutral-300">
            Ya tenemos todo para trabajar tu estimado de valor.
          </p>

          <p className="relative mt-4 max-w-xl text-sm leading-relaxed text-neutral-300 md:text-base">
            <span className="font-semibold text-white">{advisorFirstName}</span> estará trabajando una propuesta
            para ti porque conoce a fondo {colonia}, pero desde ahora te podemos compartir algo que sabemos basado
            en nuestra experiencia y tendencias del mercado.
          </p>

          <div className="relative mt-6 border-t border-white/10 pt-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-brass-soft">Rango de precio</p>
            <h3 className="mt-1 text-base font-bold text-white">
              Tu propiedad estaría en un rango de {formatCurrency(estimate.low)} a {formatCurrency(estimate.high)}
            </h3>
            <PreliminaryPricingBar estimate={estimate} />
          </div>

          {comps.length > 0 && (
            <div className="relative mt-2 space-y-3 md:flex md:gap-3 md:space-y-0">
              <div className="md:w-1/2">
                <ComparablesMap listings={comps} />
              </div>
              <div className="md:w-1/2">
                <ComparableListingCards listings={comps} />
              </div>
            </div>
          )}

          <div className="relative mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
            <AdvisorAvatar
              advisor={advisor}
              className="h-11 w-11 border-2 border-white/25 bg-white/10"
              iconClassName="h-5 w-5 text-white/70"
            />
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-neutral-500">Firma</p>
              <p className="text-sm font-bold text-white">{advisor.name}</p>
              <p className="text-xs text-neutral-400">{advisor.roleLabel}</p>
            </div>
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

      <AdvisorCTA advisor={advisor} tipoPropiedad={tipoPropiedad} colonia={colonia} />
    </div>
  );
}
