import { MessageCircle } from 'lucide-react';
import { whatsappLink, type Advisor } from '@shared/advisors';
import { AdvisorAvatar } from './AdvisorAvatar';

interface Props {
  advisor: Advisor;
  tipoPropiedad: string;
  colonia: string;
}

// A persistent bottom bar rather than a card at the end of a long scroll --
// the WhatsApp CTA stays reachable no matter where on the reveal screen the
// visitor is reading.
export function AdvisorCTA({ advisor, tipoPropiedad, colonia }: Props) {
  const message = `Hola ${advisor.name.split(' ')[0]}, acabo de recibir una estimación preliminar para mi ${tipoPropiedad.toLowerCase()} en ${colonia} y me gustaría platicar sobre mi Análisis Comparativo de Mercado.`;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-parchment-card/95 shadow-[0_-8px_24px_-16px_rgba(16,32,26,0.25)] backdrop-blur-sm">
      <div className="mx-auto flex max-w-md items-center gap-3 px-4 py-3">
        <AdvisorAvatar advisor={advisor} className="h-10 w-10 border border-neutral-200" iconClassName="h-4 w-4" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-bold text-neutral-900">{advisor.name}</p>
          <p className="truncate text-[10.5px] text-neutral-500">{advisor.roleLabel}</p>
        </div>
        <a
          href={whatsappLink(advisor, message)}
          target="_blank"
          rel="noreferrer"
          className="flex flex-shrink-0 items-center gap-1.5 rounded-pill bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform active:scale-95 hover:bg-brand-600"
        >
          <MessageCircle className="h-4 w-4" />
          Hablemos ahora
        </a>
      </div>
    </div>
  );
}
