import { TEAM_MEMBERS } from '@shared/team';
import { AdvisorAvatar } from './AdvisorAvatar';

// The full active roster (see shared/team.ts) as a plain photo+name
// marquee -- no cards, no titles, just faces -- so this reads as "here are
// the real professionals behind Habitanza" rather than another form-y
// module. Scrolls opposite the expertise-card marquee further down this
// same screen so the two don't read as one continuous conveyor.
export function TeamSection() {
  return (
    <div className="space-y-3">
      <div className="text-center">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-brass">
          Tu equipo en la zona
        </p>
        <h3 className="mt-1 text-base font-bold text-neutral-900">Personas reales, no un call center</h3>
      </div>

      <div className="-mx-4 overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
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
    </div>
  );
}
