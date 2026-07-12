import { useEffect, useState } from 'react';
import { formatCurrency } from '../../lib/utils';

interface Props {
  value: number;
  className?: string;
  durationMs?: number;
  delayMs?: number;
}

const TICK_MS = 60;

function randomizeDigits(text: string): string {
  return text.replace(/\d/g, () => String(Math.floor(Math.random() * 10)));
}

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Rolls through random digits before settling on the real figure, left to
// right -- like a departures board flipping into place -- so the estimate
// reads as something just resolved rather than a static screenshot. Skips
// straight to the final value under prefers-reduced-motion. Relies on the
// effect cleanup (not a "has run" ref) to stay correct under StrictMode's
// mount/cleanup/remount double-invoke -- a ref guard here would let the
// first, cleaned-up invocation block the second, persisting one.
export function AnimatedCurrency({ value, className, durationMs = 950, delayMs = 0 }: Props) {
  const target = formatCurrency(value);
  const [display, setDisplay] = useState(() => (prefersReducedMotion() ? target : randomizeDigits(target)));

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const digitIndexes: number[] = [];
    for (let i = 0; i < target.length; i++) {
      if (/\d/.test(target[i])) digitIndexes.push(i);
    }

    let elapsed = 0;
    let interval: number;

    const startTimeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        elapsed += TICK_MS;
        const settledCount = Math.floor((elapsed / durationMs) * digitIndexes.length);

        const chars = target.split('').map((ch, i) => {
          if (!/\d/.test(ch)) return ch;
          const posIndex = digitIndexes.indexOf(i);
          return posIndex < settledCount ? ch : String(Math.floor(Math.random() * 10));
        });
        setDisplay(chars.join(''));

        if (elapsed >= durationMs) {
          window.clearInterval(interval);
          setDisplay(target);
        }
      }, TICK_MS);
    }, delayMs);

    return () => {
      window.clearTimeout(startTimeout);
      window.clearInterval(interval);
    };
    // Deliberately runs once on mount only -- target/durationMs/delayMs are
    // fixed for the lifetime of this card, not live-updating inputs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <span className={className}>{display}</span>;
}
