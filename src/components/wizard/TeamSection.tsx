import { CheckCircle2, BadgeCheck } from 'lucide-react';
import { TEAM_MEMBERS } from '@shared/team';
import { COPY } from '@shared/copy';
import { AdvisorAvatar } from './AdvisorAvatar';

// Alex is the first entry in the team roster (see shared/team.ts), and the
// endorsement below is his signature as Director on a company-wide
// statement -- not his personal aside -- so it's shown with his full name
// and title, not just a first name like a casual quote would be.
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
          {COPY.team.eyebrow}
        </p>
        <h3 className="mt-1 text-base font-bold text-neutral-900">{COPY.team.title}</h3>
        <p className="mt-1 text-sm text-neutral-500">{COPY.team.subline}</p>
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
          <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-emerald-deep">
            <BadgeCheck className="h-3 w-3" />
            {COPY.team.endorsement.tag}
          </p>
          <p className="text-xs font-bold text-neutral-900">
            {ALEX.name} · {ALEX.roleLabel}
          </p>
          <p className="mt-0.5 text-xs leading-relaxed text-neutral-600">{COPY.team.endorsement.quote}</p>
        </div>
      </div>

      <ul className="space-y-3 border-t border-neutral-200 pt-4">
        {COPY.team.checklist.map(({ title, detail }) => (
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
