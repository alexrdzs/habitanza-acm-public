import { useState } from 'react';
import { Home, Maximize, Search } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import { optimizedPhotoUrl, type ComparableListing } from '@shared/comparableListings';

function MiniCard({ listing, index }: { listing: ComparableListing; index: number }) {
  const [imgFailed, setImgFailed] = useState(false);

  if (listing.isPlaceholder) {
    return (
      <div className="w-[124px] flex-shrink-0 snap-center rounded-xl border border-neutral-200 bg-white p-3">
        <div className="flex aspect-[4/3] items-center justify-center rounded-lg bg-parchment-card">
          <Search className="h-5 w-5 text-brass" />
        </div>
        <p className="mt-2 text-[11px] font-semibold text-neutral-700">Referencia {index + 1}</p>
        <p className="mt-0.5 text-[10px] leading-snug text-neutral-500">En investigación</p>
      </div>
    );
  }

  return (
    <div className="w-[124px] flex-shrink-0 snap-center overflow-hidden rounded-xl border border-neutral-200 bg-white">
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        {imgFailed || !listing.photo ? (
          <div className="flex h-full w-full items-center justify-center">
            <Home className="h-5 w-5 text-neutral-300" />
          </div>
        ) : (
          <img
            src={optimizedPhotoUrl(listing.photo, 160)}
            alt={listing.tipo}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
          />
        )}
      </div>
      <div className="space-y-0.5 p-2">
        <p className="truncate font-mono text-[11px] font-semibold tabular-nums text-neutral-900">
          {formatCurrency(listing.precio)}
        </p>
        <p className="flex items-center gap-1 text-[10px] text-neutral-500">
          <Maximize className="h-2.5 w-2.5" />
          {listing.m2}m²
        </p>
      </div>
    </div>
  );
}

interface Props {
  listings: ComparableListing[];
  researchLabel?: string;
}

export function ComparableListingCards({ listings, researchLabel }: Props) {
  if (listings.length === 0) return null;

  return (
    <div>
      {researchLabel && <p className="mb-2 text-xs font-medium text-neutral-600">{researchLabel}</p>}
      <div className="flex snap-x gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {listings.map((listing, i) => (
          <MiniCard key={i} listing={listing} index={i} />
        ))}
      </div>
    </div>
  );
}
