import { CheckCircle2 } from 'lucide-react';
import { TEAM_MEMBERS } from '@shared/team';
import { AdvisorAvatar } from './AdvisorAvatar';

// Sourced from Habitanza's own "Presentación de Servicios" deck (team intro
// slide) -- the accompaniment/tech/alliances promises are their real
// positioning, not copy invented for this page.
const TEAM_CHECKLIST = [
  {
    title: 'Estaremos contigo en todo el proceso',
    detail: 'Desde la estrategia hasta firmar escrituras.',
  },
  {
    title: 'Tecnología trabajando a tu favor',
    detail: 'Las mejores herramientas para mejores resultados.',
  },
  {
    title: 'Alianzas clave con toda la industria',
    detail: 'Desde brokers hasta notarías.',
  },
];

// The years-of-experience line reads more like a person talking to you than
// a stat when it's attributed to someone real -- Alex is the first entry in
// the team roster (see shared/team.ts), so this just reuses that record.
const ALEX = TEAM_MEMBERS[0];

// The full active roster (see shared/team.ts) as a plain photo+name
// marquee -- no cards, no titles, just faces -- so this reads as "here are
// the real professionals behind Habitanza" rather than another form-y
// module. Scrolls opposite the expertise-card marquee further down this
// same screen so the two don't read as one continuous conveyor.
export function TeamSection() {
  return (
    <div className="space-y-5 rounded-card-lg border border-neutral-200/70 bg-parchment-card/80 p-6 text-left backdrop-blur-md md:p-8">
      <div className="text-center">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-brass">
          Tu equipo en la zona
        </p>
        <h3 className="mt-1 text-base font-bold text-neutral-900">Tu equipo de profesionales</h3>
        <p className="mt-1 text-sm text-neutral-500">
          Expertos en Zona Esmeralda, Bosque Real, Satélite, Lomas Verdes y sus alrededores.
        </p>
      </div>

      <div className="-mx-6 overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] md:-mx-8">
        <div className="marquee-track-reverse flex w-max gap-7">
          {[...TEAM_MEMBERS, ...TEAM_MEMBERS].map((member, i) => (
            <div key={`${member.name}-${i}`} className="flex w-20 flex-shrink-0 flex-col items-center gap-2 text-center">
              <AdvisorAvatar
                advisor={member}
                className="h-16 w-16 border-2 border-white shadow-sm"
                iconClassName="h-6 w-6 text-neutral-400"
              />
              <p className="text-xs font-semibold leading-tight text-neutral-800">{member.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-neutral-200/70 bg-white/40 p-3">
        <AdvisorAvatar advisor={ALEX} className="h-11 w-11 flex-shrink-0 border-2 border-white shadow-sm" iconClassName="h-5 w-5 text-neutral-400" />
        <div>
          <p className="text-xs font-bold text-neutral-900">{ALEX.name.split(' ')[0]}</p>
          <p className="mt-0.5 text-xs leading-relaxed text-neutral-600">
            con más de 15 años de experiencia en Zona Esmeralda, conocemos muy bien el mercado y qué lo hace único.
          </p>
        </div>
      </div>

      <ul className="space-y-3 border-t border-neutral-200 pt-4">
        {TEAM_CHECKLIST.map(({ title, detail }) => (
          <li key={title} className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-deep" />
            <div>
              <p className="text-sm font-bold leading-snug text-neutral-900">{title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-neutral-500">{detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
