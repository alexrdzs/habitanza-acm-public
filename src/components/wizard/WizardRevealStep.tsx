import { CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import type { PreliminaryEstimate } from '@shared/pricing';

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

export function WizardRevealStep({ estimate, nombre, tipoPropiedad, colonia }: Props) {
  const firstName = nombre.trim().split(' ')[0] || 'gracias';

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-500">
      <div className="relative overflow-hidden rounded-card-lg bg-neutral-950 p-6 text-white shadow-xl md:p-10">
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500 text-lg font-bold shadow-lg shadow-brand-500/20">
              $
            </div>
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-brand-500">
                Estimación preliminar
              </span>
              <span className="text-sm font-semibold text-neutral-300">Gracias, {firstName}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-baseline gap-x-3 text-3xl font-bold tracking-tight tabular-nums text-white md:text-4xl lg:text-5xl">
            <span>{formatCurrency(estimate.low)}</span>
            <span className="text-xl font-medium text-neutral-500 md:text-2xl">—</span>
            <span>{formatCurrency(estimate.high)}</span>
          </div>

          <p className="max-w-xl text-sm leading-relaxed text-neutral-400 md:text-base">
            Rango preliminar para tu {tipoPropiedad.toLowerCase()} en {colonia}, basado en promedios generales de la
            zona.{' '}
            <span className="font-semibold text-white">
              No sustituye tu Análisis Comparativo de Mercado (ACM) completo
            </span>
            , que un asesor te comparte por WhatsApp en menos de 48 horas usando comparables reales de tu zona.
          </p>
        </div>
      </div>

      <div className="space-y-4 rounded-card-lg border border-neutral-200 bg-white p-6 md:p-8">
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
    </div>
  );
}
