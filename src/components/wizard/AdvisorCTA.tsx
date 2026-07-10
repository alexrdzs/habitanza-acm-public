import { useMemo, useState } from 'react';
import { MessageCircle, User } from 'lucide-react';
import { ADVISORS, whatsappLink } from '@shared/advisors';

interface Props {
  tipoPropiedad: string;
  colonia: string;
}

export function AdvisorCTA({ tipoPropiedad, colonia }: Props) {
  // Randomized per visit so the team can see whether Rogelio or Tere gets
  // more inbound WhatsApp contact from this page.
  const advisor = useMemo(() => ADVISORS[Math.floor(Math.random() * ADVISORS.length)], []);
  const [imgFailed, setImgFailed] = useState(false);

  const message = `Hola ${advisor.name.split(' ')[0]}, acabo de recibir una estimación preliminar para mi ${tipoPropiedad.toLowerCase()} en ${colonia} y me gustaría platicar sobre mi Análisis Comparativo de Mercado.`;

  return (
    <div className="relative overflow-hidden rounded-card-lg border border-neutral-200 bg-gradient-to-br from-brand-500 to-emerald-deep p-6 text-center text-white md:p-8">
      <div className="mx-auto mb-3 h-16 w-16 overflow-hidden rounded-full border-2 border-white/40 bg-white/10">
        {imgFailed ? (
          <div className="flex h-full w-full items-center justify-center">
            <User className="h-7 w-7 text-white/70" />
          </div>
        ) : (
          <img
            src={advisor.imageUrl}
            alt={advisor.name}
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
          />
        )}
      </div>
      <p className="text-[11px] font-bold uppercase tracking-wider text-white/70">{advisor.roleLabel}</p>
      <h3 className="mt-1 text-lg font-bold">{advisor.name}</h3>
      <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-white/85">
        Platica ahora mismo sobre tu propiedad y recibe tu Análisis Comparativo de Mercado completo.
      </p>
      <a
        href={whatsappLink(advisor, message)}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex items-center gap-2 rounded-pill bg-white px-7 py-3.5 text-base font-semibold text-emerald-deep shadow-lg transition-transform active:scale-95"
      >
        <MessageCircle className="h-5 w-5" />
        Hablemos ahora
      </a>
    </div>
  );
}
