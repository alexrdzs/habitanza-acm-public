import { useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { COPY } from '@shared/copy';
import { buildWhatsAppMessage, whatsappLink } from '@shared/advisors';
import { estimatePreliminaryRange } from '@shared/pricing';
import type { ShareLinkData } from '@shared/shareLink';
import { Logo } from '../components/Logo';
import { AdvisorAvatar } from '../components/wizard/AdvisorAvatar';
import { PropertyFicha } from '../components/wizard/PropertyFicha';
import { ValuationShareCard } from '../components/wizard/ValuationShareCard';
import { formatMillions, formatPhone } from '../lib/utils';
import { shareMarket } from '../lib/shareMarket';

// What the client opens from the WhatsApp link: their range card, no wizard.
export function SharedValuationPage({ data }: { data: ShareLinkData }) {
  const { colonia, tipoPropiedad, advisor, m2, terreno, antiguedad, recamaras, banos, estacionamientos } = data;
  const isTerreno = tipoPropiedad === 'Terreno';
  const str = (n?: number) => (n === undefined ? '' : String(n));
  const estimate = estimatePreliminaryRange(
    isTerreno ? { tipoPropiedad, colonia, m2Terreno: m2 } : { tipoPropiedad, colonia, m2Construccion: m2, antiguedad }
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
          footer={
            <PropertyFicha
              colonia=""
              tipoPropiedad={tipoPropiedad}
              m2Construccion={isTerreno ? '' : String(m2)}
              m2Terreno={isTerreno ? String(m2) : str(terreno)}
              recamaras={str(recamaras)}
              banos={str(banos)}
              estacionamientos={str(estacionamientos)}
              antiguedad={antiguedad ?? ''}
              amenidades={[]}
              showHighlights={false}
            />
          }
        />
      </div>
      {advisor && (
        <div className="mt-4 grid w-full max-w-[400px] grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-center gap-4 rounded-2xl border border-neutral-200/70 bg-parchment-card/80 p-4 backdrop-blur-md">
          <div className="flex flex-col items-center text-center">
            <AdvisorAvatar advisor={advisor} className="h-16 w-16" iconClassName="h-7 w-7" />
            <p className="mt-2 break-words text-sm font-semibold leading-tight text-neutral-900">{advisor.name}</p>
          </div>
          <div>
            <p className="text-base font-bold leading-tight text-neutral-900">{COPY.share.meetingTitle}</p>
            <p className="mt-1 text-xs text-neutral-600">{COPY.share.meetingBody}</p>
            <a
              href={whatsappLink(
                advisor,
                buildWhatsAppMessage(advisor, '', tipoPropiedad, colonia, `${formatMillions(estimate.low)} - ${formatMillions(estimate.high)}`)
              )}
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-pill bg-brand-500 bg-brand-gradient px-3 py-3 text-[13px] font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4 shrink-0" />
              <span className="truncate">{COPY.share.pageCta(advisor.name.split(' ')[0])}</span>
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
