import { ShieldCheck, Clock, MapPin } from 'lucide-react';

interface Props {
  onStart: () => void;
}

const TRUST_MARKS = [
  { icon: ShieldCheck, label: 'Sin costo, sin compromiso' },
  { icon: Clock, label: 'Respuesta en menos de 48 horas' },
  { icon: MapPin, label: 'Especialistas en la zona' },
];

export function WizardHero({ onStart }: Props) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-10 py-6 text-center duration-700">
      <div className="space-y-5">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-deep">
          Zona Esmeralda · Atizapán de Zaragoza
        </p>
        <h1 className="text-[2.15rem] font-extrabold leading-[1.08] tracking-tight text-neutral-900 md:text-5xl">
          ¿Cuánto vale hoy tu casa?
        </h1>
        <p className="mx-auto max-w-sm text-base leading-relaxed text-neutral-600 md:text-lg">
          Una primera referencia en minutos, y un Análisis Comparativo de Mercado hecho a la medida por un asesor que
          conoce tu fraccionamiento.
        </p>
      </div>

      <div className="facet-rule mx-auto max-w-xs" />

      <div className="mx-auto flex max-w-lg flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-0 sm:divide-x sm:divide-neutral-300">
        {TRUST_MARKS.map(({ icon: Icon, label }, i) => (
          <div key={label} className={`flex items-center gap-2 px-5 ${i === 0 ? 'sm:pl-0' : ''}`}>
            <Icon className="h-4 w-4 flex-shrink-0 text-brass" />
            <p className="text-left text-[13px] font-medium leading-snug text-neutral-600">{label}</p>
          </div>
        ))}
      </div>

      <div className="inline-flex items-center gap-2 rounded-pill border border-neutral-200 bg-parchment-card px-4 py-2 shadow-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
        <p className="text-[12px] font-medium text-neutral-600">
          <span className="font-mono font-semibold text-neutral-900">+10</span> propiedades activas en Zona
          Esmeralda · asesores dedicados a tu fraccionamiento
        </p>
      </div>

      <button
        onClick={onStart}
        className="rounded-pill bg-brand-500 px-9 py-4 text-base font-semibold text-white shadow-[0_10px_24px_-8px_rgba(37,211,102,0.55)] transition-all hover:bg-brand-600 active:scale-95"
      >
        Conoce el valor de tu propiedad
      </button>
    </div>
  );
}
