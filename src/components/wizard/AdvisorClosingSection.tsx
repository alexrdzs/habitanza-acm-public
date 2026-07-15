import type { RefObject } from 'react';
import { MessageCircle } from 'lucide-react';
import { AdvisorAvatar } from './AdvisorAvatar';
import { SectionChip } from './SectionChip';
import { TEAM_MEMBERS } from '@shared/team';
import { COPY } from '@shared/copy';
import { whatsappLink, buildWhatsAppMessage, type Advisor } from '@shared/advisors';

interface Props {
  advisor: Advisor;
  nombre: string;
  tipoPropiedad: string;
  colonia: string;
  // Observed by the reveal screen so the sticky WhatsApp bar yields while
  // this card's CTA is on screen (no two green buttons stacked at once).
  ctaRef: RefObject<HTMLDivElement | null>;
}

// The closing card, bookending the dark price panel at the top: same near
// black surface as the full ACM report's dark hero and footer. The assigned
// advisor gets the only inline CTA on the screen (section 03 is value-only
// now), and the rest of the team appears below so "a real team is behind
// this" lands right before the visitor decides to reach out.
export function AdvisorClosingSection({ advisor, nombre, tipoPropiedad, colonia, ctaRef }: Props) {
  const advisorFirstName = advisor.name.split(' ')[0];
  const message = buildWhatsAppMessage(advisor, nombre, tipoPropiedad, colonia);
  // "Other" team members: everyone except the assigned advisor. Matched by
  // first name because the advisor pool and the roster spell some names
  // differently ("Tere López B." vs "Tere López"); first names are unique
  // across the roster.
  const otherMembers = TEAM_MEMBERS.filter((m) => m.firstName !== advisorFirstName);

  return (
    <div className="overflow-hidden rounded-card-lg bg-ink text-white shadow-[0_1px_2px_rgba(12,10,9,0.08),0_16px_36px_-16px_rgba(12,10,9,0.45)]">
      <div className="p-6 md:p-8">
        <SectionChip label={COPY.reveal.closing.chip} variant="brand" center />

        <div ref={ctaRef} className="mx-auto mt-6 flex max-w-sm flex-col items-center text-center">
          <AdvisorAvatar
            advisor={advisor}
            className="h-20 w-20 flex-shrink-0 border-2 border-brand-500/70 bg-neutral-800"
            iconClassName="h-8 w-8 text-neutral-400"
          />
          <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-brand-400">{advisor.roleLabel}</p>
          <p className="mt-0.5 text-base font-bold text-white">{advisor.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-neutral-300">
            {COPY.reveal.advisorParagraph(advisorFirstName, advisor.gender, colonia)}
          </p>
          <a
            href={whatsappLink(advisor, message)}
            target="_blank"
            rel="noreferrer"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-pill bg-brand-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_-8px_rgba(37,211,102,0.55)] transition-transform active:scale-95 hover:bg-brand-600"
          >
            <MessageCircle className="h-4 w-4" />
            {COPY.reveal.acm.ctaLabel(advisorFirstName)}
          </a>
        </div>

        {otherMembers.length > 0 && (
          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="text-center text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              {COPY.reveal.closing.teamLabel}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-4">
              {otherMembers.map((member) => (
                <div key={member.name} className="flex w-16 flex-col items-center gap-2 text-center">
                  <AdvisorAvatar
                    advisor={member}
                    className="h-14 w-14 border-2 border-white/15 bg-neutral-800"
                    iconClassName="h-5 w-5 text-neutral-400"
                  />
                  <p className="text-[11px] font-semibold leading-tight text-neutral-300">{member.firstName}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
