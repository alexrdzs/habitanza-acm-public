import { useState } from 'react';
import { Home, Maximize } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import type { ComparableListing } from '@shared/comparableListings';

function MiniCard({ listing }: { listing: ComparableListing }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="w-[124px] flex-shrink-0 snap-center overflow-hidden rounded-xl border border-white/15 bg-white/[0.04]">
      <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
        {imgFailed || !listing.photo ? (
          <div className="flex h-full w-full items-center justify-center">
            <Home className="h-5 w-5 text-white/30" />
          </div>
        ) : (
          <img
            src={listing.photo}
            alt={listing.tipo}
            loading="lazy"
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
          />
        )}
      </div>
      <div className="space-y-0.5 p-2">
        <p className="truncate font-mono text-[11px] font-semibold tabular-nums text-white">
          {formatCurrency(listing.precio)}
        </p>
        <p className="flex items-center gap-1 text-[10px] text-neutral-400">
          <Maximize className="h-2.5 w-2.5" />
          {listing.m2}m²
        </p>
      </div>
    </div>
  );
}

interface Props {
  listings: ComparableListing[];
}

export function ComparableListingCards({ listings }: Props) {
  if (listings.length === 0) return null;

  return (
    <div className="flex snap-x gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {listings.map((listing, i) => (
        <MiniCard key={i} listing={listing} />
      ))}
    </div>
  );
}
