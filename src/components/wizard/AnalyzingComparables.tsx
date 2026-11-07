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
export function buildPool(colonia: string) {
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
        'relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border bg-neutral-100 transition-all duration-[1400ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]',
        !show ? 'translate-y-2 scale-95 opacity-0' : dim ? 'scale-90 opacity-25 grayscale' : 'scale-100 opacity-100',
        'border-neutral-200'
      )}
      style={{ transitionDelay: `${(show && !filtered ? index : filtered ? (picked ? 0 : index * 45) : 0) * (filtered ? 1 : 110)}ms` }}
    >
      {failed ? (
        <div className="flex h-full w-full items-center justify-center">
          <Home className="h-4 w-4 text-neutral-300" />
        </div>
      ) : (
        <img
          src={optimizedPhotoUrl(listing.photo!, 200)}
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

// Two strips drifting in opposite directions (the global marquee classes; reduced
// motion freezes them). Each strip mixes selected and set-aside photos, so the
// narrowing is visible in both while they move.
function Strip({ items, offset, reverse, filtered }: { items: Pool; offset: number; reverse?: boolean; filtered: boolean }) {
  // Two back-to-back copies: the track scrolls exactly one copy, so the loop point is invisible.
  return (
    <div className={cn('flex w-max', reverse ? 'marquee-track-reverse' : 'marquee-track', '[animation-duration:48s]')}>
      {[0, 1].map((copy) => (
        <div key={copy} className="flex gap-2 pr-2">
          {items.map((p, i) => (
            <Tile key={i} {...p} index={offset + i} show filtered={filtered} />
          ))}
        </div>
      ))}
    </div>
  );
}

type Pool = ReturnType<typeof buildPool>;

// stage: 0-1 = reviewing everything, 2+ = filtered down to the selection.
export function AnalyzingComparables({ colonia, stage }: { colonia: string; stage: number }) {
  const pool = useMemo(() => buildPool(colonia), [colonia]);
  const rows = useMemo(() => {
    const picked = pool.filter((p) => p.picked);
    const rest = pool.filter((p) => !p.picked);
    // Alternate selected / set-aside inside each strip, half of each per strip.
    const mix = (pk: Pool, rs: Pool) => pk.flatMap((p, i) => (rs[i] ? [p, rs[i]] : [p]));
    const half = Math.ceil(picked.length / 2);
    const restHalf = Math.ceil(rest.length / 2);
    return [mix(picked.slice(0, half), rest.slice(0, restHalf)), mix(picked.slice(half), rest.slice(restHalf))];
  }, [pool]);
  if (pool.filter((p) => p.picked).length === 0) return null;
  const filtered = stage >= 2;
  const picked = pool.filter((p) => p.picked).length;

  return (
    <div className="w-full">
      {/* Bleeds to the card edges; the strips fade out at both sides. */}
      <div className="-mx-6 animate-in space-y-2 overflow-hidden duration-[1400ms] fade-in [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] md:-mx-8">
        <Strip items={rows[0]} offset={0} filtered={filtered} />
        <Strip items={rows[1]} offset={rows[0].length} reverse filtered={filtered} />
      </div>
      <p className="mt-3 text-center text-xs text-neutral-500">
        {filtered ? COPY.analyzing.selectedLabel(picked) : COPY.analyzing.reviewingLabel(pool.length)}
      </p>
    </div>
  );
}
