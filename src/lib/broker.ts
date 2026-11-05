import { ADVISORS, BOSQUE_REAL_INTERLOMAS_ADVISORS, type Advisor } from '@shared/advisors';

// Event mode: the broker working the stand picks their name once on the home
// screen. It stays in this tablet's localStorage until someone changes it.
export const ALL_BROKERS: Advisor[] = [...BOSQUE_REAL_INTERLOMAS_ADVISORS, ...ADVISORS];

const KEY = 'habitanza.broker';

export function getStoredBroker(): Advisor | null {
  try {
    const name = localStorage.getItem(KEY);
    return ALL_BROKERS.find((b) => b.name === name) ?? null;
  } catch {
    return null;
  }
}

export function storeBroker(name: string) {
  try {
    localStorage.setItem(KEY, name);
  } catch {
    /* private mode: the pick just lasts for this visit */
  }
}
