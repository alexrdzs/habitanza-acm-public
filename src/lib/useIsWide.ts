import { useEffect, useState } from 'react';

// True on tablet-landscape / desktop widths (Tailwind `lg`), where the app
// switches to its two-panel layout. Matches the `lg:` classes used in CSS.
const QUERY = '(min-width: 1024px)';

export function useIsWide() {
  const [wide, setWide] = useState(() => window.matchMedia(QUERY).matches);
  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = () => setWide(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return wide;
}
