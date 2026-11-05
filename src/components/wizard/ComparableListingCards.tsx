import { useState } from 'react';
import { Home, Maximize, Search, TrendingDown, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import { optimizedPhotoUrl, type ComparableListing } from '@shared/comparableListings';

// A comparable is flagged when its price per m2 is 20% or more away from the
// reference shown above. Only like with like: same property type as the visitor's.
const DEVIATION_THRESHOLD = 0.2;

function deviation(listing: ComparableListing, ref?: Reference): number | undefined {
  if (!ref || !listing.tipo.startsWith(ref.tipo) || listing.m2 <= 0) return undefined;
  const d = listing.precio / listing.m2 / ref.perM2 - 1;
  return Math.abs(d) >= DEVIATION_THRESHOLD ? d : undefined;
}

interface Reference {
  perM2: number;
  tipo: string;
}

function MiniCard({ listing, index, reference }: { listing: ComparableListing; index: number; reference?: Reference }) {
  const dev = deviation(listing, reference);
  const [imgFailed, setImgFailed] = useState(false);

  if (listing.isPlaceholder) {
    return (
      <div className="w-[124px] flex-shrink-0 lg:w-full snap-center rounded-xl border border-neutral-200 bg-white dark:bg-neutral-100 p-3">
        <div className="flex aspect-[4/3] items-center justify-center rounded-lg bg-parchment-card">
          <Search className="h-5 w-5 text-amber-500" />
        </div>
        <p className="mt-2 text-[11px] md:text-xs font-semibold text-neutral-700">Referencia {index + 1}</p>
        <p className="mt-0.5 text-[10px] md:text-xs leading-snug text-neutral-500">En investigación</p>
      </div>
    );
  }

  return (
    <div className="w-[124px] flex-shrink-0 lg:w-full snap-center overflow-hidden rounded-xl border border-neutral-200 bg-white dark:bg-neutral-100">
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        <span className="absolute left-1 top-1 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-white/90 text-[9px] font-semibold text-neutral-600">
          {index + 1}
        </span>
        {imgFailed || !listing.photo ? (
          <div className="flex h-full w-full items-center justify-center">
            <Home className="h-5 w-5 text-neutral-300" />
          </div>
        ) : (
          <img
            src={optimizedPhotoUrl(listing.photo, 360)}
            alt={listing.tipo}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
          />
        )}
      </div>
      <div className="space-y-0.5 p-2 lg:space-y-1 lg:p-3">
        <p className="truncate text-[11px] md:text-xs lg:text-sm font-bold tabular-nums text-neutral-900">
          {formatCurrency(listing.precio)}
        </p>
        <p className="flex items-center gap-1 text-[10px] md:text-xs lg:text-sm text-neutral-500">
          <Maximize className="h-2.5 w-2.5" />
          {listing.m2}m²
        </p>
        <p className="flex items-center gap-1 text-[10px] tabular-nums text-neutral-400 lg:text-xs">
          ≈ {formatCurrency(Math.round(listing.precio / listing.m2))}/m²
          {dev !== undefined && (
            <span
              className="inline-flex items-center text-amber-500"
              title={`${dev > 0 ? '+' : ''}${Math.round(dev * 100)}% vs referencia`}
              aria-label={`${dev > 0 ? 'Arriba' : 'Abajo'} de la referencia por m²`}
            >
              {dev > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

interface Props {
  listings: ComparableListing[];
  researchLabel?: string;
  // The zone's price per m2 shown above, and the visitor's property type.
  reference?: Reference;
}

export function ComparableListingCards({ listings, researchLabel, reference }: Props) {
  if (listings.length === 0) return null;

  return (
    <div>
      {researchLabel && <p className="mb-2 text-xs font-medium text-neutral-600">{researchLabel}</p>}
      <div className="flex snap-x gap-2 overflow-x-auto pb-1 lg:grid lg:grid-cols-3 lg:gap-3 lg:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {listings.map((listing, i) => (
          <MiniCard key={i} listing={listing} index={i} reference={reference} />
        ))}
      </div>
    </div>
  );
}
