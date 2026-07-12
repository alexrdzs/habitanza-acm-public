import { ShieldCheck, Award, Database, MapPin, LineChart, MessageCircle, Building2 } from 'lucide-react';
import { TestimonialsCarousel } from './TestimonialsCarousel';
import { TeamSection } from './TeamSection';
import { MethodologySection } from './MethodologySection';

interface Props {
  onStart: () => void;
}

const TRUST_MARKS = [
  { icon: ShieldCheck, label: 'Sin ningún costo' },
  { icon: Award, label: 'Hecho por expertos' },
  { icon: Database, label: 'Con data actualizada' },
];

const EXPERTISE_CARDS = [
  {
    icon: MapPin,
    title: 'Conocimiento local',
    detail: 'Asesores que viven y trabajan la zona todos los días, no un call center genérico.',
  },
  {
    icon: LineChart,
    title: 'Método basado en datos',
    detail: 'Homologamos metros, condición y ubicación antes de sugerir un precio.',
  },
  {
    icon: MessageCircle,
    title: 'Acompañamiento real',
    detail: 'Un asesor te guía por WhatsApp desde el primer mensaje hasta el cierre.',
  },
  {
    icon: Building2,
    title: 'Portafolio activo',
    detail: 'Inventario real en la zona ahora mismo, no solo un formulario.',
  },
];

function CtaButton({ onStart }: { onStart: () => void }) {
  return (
    <button
      onClick={onStart}
      className="rounded-pill bg-brand-500 px-9 py-4 text-base font-semibold text-white shadow-[0_10px_24px_-8px_rgba(37,211,102,0.55)] transition-all hover:bg-brand-600 active:scale-95"
    >
      Conoce el valor de tu propiedad
    </button>
  );
}

export function WizardHero({ onStart }: Props) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-10 py-6 text-center duration-700">
      <div className="space-y-5">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-deep">
          Zona Esmeralda · Atizapán de Zaragoza
        </p>
        <div className="space-y-1.5">
          <h1 className="text-[2.15rem] font-extrabold leading-[1.08] tracking-tight text-neutral-900 md:text-5xl">
            ¿Cuánto vale mi casa hoy?
          </h1>
          <p className="text-sm font-semibold text-emerald-deep md:text-base">Análisis de mercado y competencia</p>
        </div>
        <p className="mx-auto max-w-sm text-base leading-relaxed text-neutral-600 md:text-lg">
          En Habitanza te podemos ayudar a conocer el valor de tu propiedad al día de hoy con conocimiento real de
          la zona.
        </p>
      </div>

      <CtaButton onStart={onStart} />

      <div className="facet-rule mx-auto max-w-xs" />

      <div className="mx-auto flex max-w-lg flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-0 sm:divide-x sm:divide-neutral-300">
        {TRUST_MARKS.map(({ icon: Icon, label }, i) => (
          <div key={label} className={`flex items-center gap-2 px-5 ${i === 0 ? 'sm:pl-0' : ''}`}>
            <Icon className="h-4 w-4 flex-shrink-0 text-brass" />
            <p className="text-left text-[13px] font-medium leading-snug text-neutral-600">{label}</p>
          </div>
        ))}
      </div>

      <TeamSection />

      <div
        className="-mx-4 overflow-hidden pb-2 pt-1 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
        <div className="marquee-track flex w-max gap-3">
          {[...EXPERTISE_CARDS, ...EXPERTISE_CARDS].map(({ icon: Icon, title, detail }, i) => (
            <div
              key={`${title}-${i}`}
              className="flex w-[168px] flex-shrink-0 flex-col gap-2.5 rounded-2xl border border-neutral-200/70 bg-parchment-card/80 p-4 text-left shadow-[0_8px_20px_-10px_rgba(16,32,26,0.25)] backdrop-blur-md"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-deep/10">
                <Icon className="h-4 w-4 text-emerald-deep" />
              </div>
              <p className="text-[13px] font-bold leading-snug text-neutral-900">{title}</p>
              <p className="text-[11.5px] leading-relaxed text-neutral-500">{detail}</p>
            </div>
          ))}
        </div>
      </div>

      <MethodologySection />

      {/* Secondary trust module -- real client testimonials, moved here from
          the reveal screen so people have this reassurance before handing
          over contact info, not after. */}
      <TestimonialsCarousel />

      <CtaButton onStart={onStart} />
    </div>
  );
}
