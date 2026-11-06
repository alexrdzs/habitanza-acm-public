import { useMemo, useState } from 'react';
import { Home } from 'lucide-react';
import { COMPARABLE_LISTINGS, optimizedPhotoUrl, readyComparableListings, type ComparableListing } from '@shared/comparableListings';
import { COPY } from '@shared/copy';
import { cn } from '../../lib/utils';

const POOL_SIZE = 12;
const SELECTED_MAX = 6; // same set the reveal shows (WizardRevealStep: slice(0, 6))

// The tiles are real comparables with photo. The "selected" ones are exactly
// the ones the reveal screen will show; the rest come from the wider portfolio
// and play the part of what was reviewed and set aside. Selected and discarded
// are shuffled together so the choice is not just "the first row".
function buildPool(colonia: string) {
  const selected = readyComparableListings(colonia).filter((l) => l.photo).slice(0, SELECTED_MAX);
  const chosen = new Set(selected);
  const rest = Object.values(COMPARABLE_LISTINGS)
    .flat()
    .filter((l) => !l.isPlaceholder && l.photo && !chosen.has(l));
  // Evenly spaced across the portfolio, so the discarded ones are not all from one colonia.
  const want = POOL_SIZE - selected.length;
  const others = Array.from({ length: Math.min(want, rest.length) }, (_, i) => rest[Math.floor((i * rest.length) / want)]);
  const pool = [
    ...selected.map((listing) => ({ listing, picked: true })),
    ...others.map((listing) => ({ listing, picked: false })),
  ];
  // Seeded shuffle (same colonia, same order) so picks land all over the grid.
  let seed = [...colonia].reduce((n, c) => (n * 31 + c.charCodeAt(0)) >>> 0, 7);
  for (let i = pool.length - 1; i > 0; i--) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const j = seed % (i + 1);
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
}

function Tile({ listing, picked, index, show, filtered }: { listing: ComparableListing; picked: boolean; index: number; show: boolean; filtered: boolean }) {
  const [failed, setFailed] = useState(false);
  const dim = filtered && !picked;
  return (
    <div
      className={cn(
        'relative aspect-square overflow-hidden rounded-lg border bg-neutral-100 transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]',
        !show ? 'translate-y-2 scale-95 opacity-0' : dim ? 'scale-90 opacity-25 grayscale' : 'scale-100 opacity-100',
        'border-neutral-200'
      )}
      style={{ transitionDelay: `${(show && !filtered ? index : filtered ? (picked ? 0 : index * 25) : 0) * (filtered ? 1 : 60)}ms` }}
    >
      {failed ? (
        <div className="flex h-full w-full items-center justify-center">
          <Home className="h-4 w-4 text-neutral-300" />
        </div>
      ) : (
        <img
          src={optimizedPhotoUrl(listing.photo!, 120)}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

// stage: 0 = hidden, 1 = grid builds, 2+ = filtered down to the selection.
export function AnalyzingComparables({ colonia, stage }: { colonia: string; stage: number }) {
  const pool = useMemo(() => buildPool(colonia), [colonia]);
  if (pool.filter((p) => p.picked).length === 0) return null;
  const show = stage >= 1;
  const filtered = stage >= 2;
  const picked = pool.filter((p) => p.picked).length;

  return (
    <div className="w-full">
      <div className="grid grid-cols-6 gap-1.5">
        {pool.map((p, i) => (
          <Tile key={i} {...p} index={i} show={show} filtered={filtered} />
        ))}
      </div>
      <p className={cn('mt-2 text-center text-xs text-neutral-500 transition-opacity duration-500', show ? 'opacity-100' : 'opacity-0')}>
        {filtered ? COPY.analyzing.selectedLabel(picked) : COPY.analyzing.reviewingLabel(pool.length)}
      </p>
    </div>
  );
}
