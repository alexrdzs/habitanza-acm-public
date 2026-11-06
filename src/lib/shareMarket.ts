import { COPY } from '@shared/copy';
import { competitionLevel, totalReadyListingsCount } from '@shared/comparableListings';
import { referencePerM2 } from '@shared/pricing';
import { formatCurrency } from './utils';

// The three "Datos del mercado" points shown on the share card (image and link page).
export function shareMarket(colonia: string, tipoPropiedad: string) {
  const competition = competitionLevel(colonia);
  return [
    { title: COPY.reveal.pulse.m2Label, value: formatCurrency(referencePerM2(colonia, tipoPropiedad).perM2) },
    { title: COPY.reveal.pulse.listingsLabel, value: COPY.reveal.pulse.listingsValue(totalReadyListingsCount()) },
    ...(competition ? [{ title: COPY.reveal.pulse.competitionLabel, value: COPY.reveal.pulse.competitionLevels[competition.level] }] : []),
  ];
}
