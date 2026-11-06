import { useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { COPY } from '@shared/copy';
import { buildWhatsAppMessage, whatsappLink } from '@shared/advisors';
import { estimatePreliminaryRange } from '@shared/pricing';
import type { ShareLinkData } from '@shared/shareLink';
import { ValuationShareCard } from '../components/wizard/ValuationShareCard';
import { formatMillions, formatPhone } from '../lib/utils';
import { shareMarket } from '../lib/shareMarket';

// What the client opens from the WhatsApp link: their range card, no wizard.
export function SharedValuationPage({ data }: { data: ShareLinkData }) {
  const { colonia, tipoPropiedad, advisor, m2 } = data;
  const estimate = estimatePreliminaryRange(
    tipoPropiedad === 'Terreno' ? { tipoPropiedad, colonia, m2Terreno: m2 } : { tipoPropiedad, colonia, m2Construccion: m2 }
  );

  useEffect(() => {
    document.title = COPY.share.pageTitle;
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  if (!estimate) return null;

  return (
    <main className="flex min-h-screen flex-col items-center bg-parchment px-4 py-8">
      <div className="w-full max-w-[400px] overflow-hidden rounded-2xl border border-neutral-200 shadow-sm">
        <ValuationShareCard
          fluid
          tipoPropiedad={tipoPropiedad}
          colonia={colonia}
          low={estimate.low}
          high={estimate.high}
          market={shareMarket(colonia, tipoPropiedad)}
          brokerName={advisor?.name ?? 'Habitanza'}
          brokerPhone={advisor ? formatPhone(advisor.phone) : ''}
          brokerPhoto={advisor?.imageUrl}
        />
      </div>
      {advisor && (
        <a
          href={whatsappLink(
            advisor,
            buildWhatsAppMessage(advisor, '', tipoPropiedad, colonia, `${formatMillions(estimate.low)} - ${formatMillions(estimate.high)}`)
          )}
          className="mt-5 flex w-full max-w-[400px] items-center justify-center gap-2 rounded-pill bg-brand-500 bg-brand-gradient px-4 py-3.5 text-sm font-semibold text-white"
        >
          <MessageCircle className="h-4 w-4" />
          {COPY.share.pageCta(advisor.name.split(' ')[0])}
        </a>
      )}
    </main>
  );
}
