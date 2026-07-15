import { CheckCircle2 } from 'lucide-react';
import { TEAM_MEMBERS } from '@shared/team';
import { COPY } from '@shared/copy';
import { AdvisorAvatar } from './AdvisorAvatar';
import { SectionChip } from './SectionChip';

// The full active roster (see shared/team.ts) as a plain photo+first-name
// row -- no cards, no titles, just faces -- so this reads as "here are
// the real professionals behind Habitanza" rather than another form-y
// module. Static on purpose: the roster is six people, and a marquee
// implied an endless roster that doesn't exist while hiding half the team
// at any moment. Showing everyone at once is the more credible claim, and
// it leaves the hero with one moving strip (the expertise cards) instead
// of three competing ones.
export function TeamSection() {
  return (
    <div className="space-y-5 rounded-card-lg border border-neutral-200/70 bg-parchment-card/80 p-6 text-left backdrop-blur-md md:p-8">
      <div className="space-y-2 text-center">
        <SectionChip label={COPY.team.eyebrow} variant="neutral" center />
        <h3 className="text-base font-bold text-neutral-900">{COPY.team.title}</h3>
        <p className="mt-1 text-sm text-neutral-500">{COPY.team.subline}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 py-1">
        {TEAM_MEMBERS.map((member) => (
          <div key={member.name} className="flex w-16 flex-col items-center gap-2 text-center">
            <AdvisorAvatar
              advisor={member}
              className="h-16 w-16 border-2 border-white shadow-sm"
              iconClassName="h-6 w-6 text-neutral-400"
            />
            <p className="text-xs font-semibold leading-tight text-neutral-800">{member.firstName}</p>
          </div>
        ))}
      </div>

      <p className="text-center text-xs font-semibold text-emerald-deep">{COPY.team.experienceStatement}</p>

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
