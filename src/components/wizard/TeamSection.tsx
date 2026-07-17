import { CheckCircle2 } from 'lucide-react';
import { TEAM_MEMBERS } from '@shared/team';
import { COPY } from '@shared/copy';
import { AdvisorAvatar } from './AdvisorAvatar';
import { SectionChip } from './SectionChip';

// The full active roster (see shared/team.ts) as a plain photo+first-name
// marquee -- no cards, no titles, just faces -- so this reads as "here are
// the real professionals behind Habitanza" rather than another form-y
// module. Scrolls opposite the expertise-card marquee further down the same
// screen so the two don't read as one continuous conveyor.
export function TeamSection() {
  return (
    <div className="space-y-5 rounded-card-lg border border-neutral-200/70 bg-parchment-card/80 p-6 text-left backdrop-blur-md md:p-8">
      <div className="space-y-2 text-center">
        <SectionChip label={COPY.team.eyebrow} variant="neutral" center />
        <h3 className="text-base font-bold text-neutral-900">{COPY.team.title}</h3>
        <p className="mt-1 text-sm text-neutral-500">{COPY.team.subline}</p>
      </div>

      <div className="-mx-6 overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] md:-mx-8">
        {/* Spacing lives on each item (mr-7), not as a flex gap on the track:
            gap adds space between every pair including the two duplicated
            sets, so a -50% translation lands mid-gap and the loop seam
            jumps. Per-item margin keeps the repeating unit uniform. */}
        <div className="marquee-track-reverse flex w-max">
          {[...TEAM_MEMBERS, ...TEAM_MEMBERS].map((member, i) => (
            <div
              key={`${member.name}-${i}`}
              aria-hidden={i >= TEAM_MEMBERS.length || undefined}
              className="mr-7 flex w-20 flex-shrink-0 flex-col items-center gap-2 text-center"
            >
              <AdvisorAvatar
                advisor={member}
                className="h-16 w-16 border-2 border-white shadow-sm"
                iconClassName="h-6 w-6 text-neutral-400"
              />
              <p className="text-xs font-semibold leading-tight text-neutral-800">{member.firstName}</p>
            </div>
          ))}
        </div>
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

      {/* Institutional backing line closes the card -- a credibility fact
          about the company, not a value prop about the service. Statement
          first, logo second: reads as a claim you then substantiate with the
          brand mark, not a logo caption. */}
      <div className="flex flex-col items-center gap-3 border-t border-neutral-200 pt-5">
        <p className="text-center text-[11px] leading-snug text-neutral-500">{COPY.team.backingStatement}</p>
        {/* <picture> swaps to the dark-background (white) logo purely via
            prefers-color-scheme -- no JS. See COPY.team.backingLogoUrlDark
            (currently a placeholder until the real white mark lands). */}
        <picture className="flex max-w-[60%] flex-shrink-0 justify-center">
          <source media="(prefers-color-scheme: dark)" srcSet={COPY.team.backingLogoUrlDark} />
          <img
            src={COPY.team.backingLogoUrl}
            alt="Pulppo"
            loading="lazy"
            className="h-12 w-auto opacity-80 dark:opacity-100"
          />
        </picture>
      </div>
    </div>
  );
}
