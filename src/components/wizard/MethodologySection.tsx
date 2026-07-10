import { Search, ListChecks, UserCheck } from 'lucide-react';

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

// Shared between the Hero (as one more reason to trust the process before
// starting) and the reveal screen (explaining how the number was reached).
export function MethodologySection() {
  return (
    <div className="space-y-5 rounded-card-lg border border-neutral-200 bg-parchment-card p-6 text-left md:p-8">
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
  );
}
