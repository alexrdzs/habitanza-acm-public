import { MessageCircle } from 'lucide-react';
import { whatsappLink, buildWhatsAppMessage, type Advisor } from '@shared/advisors';
import { COPY } from '@shared/copy';
import { AdvisorAvatar } from './AdvisorAvatar';
import { cn } from '../../lib/utils';

interface Props {
  advisor: Advisor;
  nombre: string;
  tipoPropiedad: string;
  colonia: string;
  visible: boolean;
}

// A persistent bottom bar rather than a card at the end of a long scroll --
// the WhatsApp CTA stays reachable no matter where on the reveal screen the
// visitor is reading. Only slides into view once they've scrolled past the
// reassurance card, which already has its own inline CTA next to the firma
// -- showing both at once would be redundant.
export function AdvisorCTA({ advisor, nombre, tipoPropiedad, colonia, visible }: Props) {
  const message = buildWhatsAppMessage(advisor, nombre, tipoPropiedad, colonia);

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        // Same frosted-glass recipe as the header bar (translucent parchment
        // + backdrop blur), so the two read as a matching pair of chrome.
        'fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200/70 bg-parchment-card/80 shadow-[0_-8px_24px_-18px_rgba(16,32,26,0.25)] backdrop-blur-md transition-transform duration-300 ease-out',
        visible ? 'translate-y-0' : 'translate-y-full pointer-events-none'
      )}
    >
      <div className="mx-auto flex max-w-md items-center gap-2 px-4 py-3">
        <AdvisorAvatar advisor={advisor} className="h-9 w-9 flex-shrink-0 border border-neutral-200" iconClassName="h-4 w-4" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-bold text-neutral-900">{advisor.name}</p>
          <p className="truncate text-[10.5px] text-neutral-500">{advisor.roleLabel}</p>
        </div>
        <a
          href={whatsappLink(advisor, message)}
          target="_blank"
          rel="noreferrer"
          tabIndex={visible ? 0 : -1}
          className="flex flex-shrink-0 items-center gap-1 rounded-pill bg-brand-500 px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform active:scale-95 hover:bg-brand-600"
        >
          <MessageCircle className="h-4 w-4" />
          {COPY.advisorCta.ctaLabel}
        </a>
      </div>
    </div>
  );
}
