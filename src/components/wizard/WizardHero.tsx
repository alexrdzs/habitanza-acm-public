import { ShieldCheck, Clock, MapPin } from 'lucide-react';

interface Props {
  onStart: () => void;
}

const TRUST_BADGES = [
  { icon: ShieldCheck, label: 'Sin costo, sin compromiso' },
  { icon: Clock, label: 'Respuesta en menos de 48 horas' },
  { icon: MapPin, label: 'Especialistas en Zona Esmeralda' },
];

export function WizardHero({ onStart }: Props) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 py-4 text-center duration-500">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
          ¿Cuánto vale hoy tu casa en Zona Esmeralda?
        </h1>
        <p className="mx-auto max-w-md text-base text-neutral-600 md:text-lg">
          Recibe una estimación preliminar en minutos y un Análisis Comparativo de Mercado (ACM) personalizado,
          elaborado por un asesor especialista en tu zona.
        </p>
      </div>

      <div className="mx-auto grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
        {TRUST_BADGES.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-2 rounded-card border border-neutral-200 bg-white p-4 shadow-sm"
          >
            <Icon className="h-5 w-5 text-brand-500" />
            <p className="text-center text-xs font-semibold leading-snug text-neutral-700">{label}</p>
          </div>
        ))}
      </div>

      <button
        onClick={onStart}
        className="rounded-pill bg-brand-500 px-8 py-4 text-base font-semibold text-white shadow-sm transition-all active:scale-95 hover:bg-brand-600"
      >
        Conoce el valor de tu propiedad
      </button>
    </div>
  );
}
