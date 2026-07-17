// Shared Google Maps building blocks reused by ComparablesMap.tsx and
// AnalyzingMap.tsx. No component here anymore -- the location step dropped
// its own map in favor of a colonia photo grid; the map now only appears
// during the analyzing screen and on the reveal screen's Mercado de la zona
// card.

import { useEffect, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';

// Same muted style array the authenticated ACM tool uses for its property
// map, so this feels like the same product rather than a bare default map.
export const MAP_STYLES = [
  { featureType: 'all', elementType: 'geometry', stylers: [{ color: '#f5f5f5' }] },
  { featureType: 'all', elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
  { featureType: 'all', elementType: 'labels.text.stroke', stylers: [{ color: '#f5f5f5' }] },
  { featureType: 'administrative', elementType: 'geometry.fill', stylers: [{ color: '#dee2e6' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.park', stylers: [{ visibility: 'on' }, { color: '#d2e7d6' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#dadada' }] },
  { featureType: 'water', stylers: [{ visibility: 'on' }, { color: '#c3e1ff' }] },
];

// Dark counterpart, tuned to the app's green-grey / emerald palette (see
// index.css) rather than a generic Google night theme: the base geometry
// matches the dark card surfaces, water reads as a deep blue-grey, parks a
// muted forest green, and labels are a light grey-green with a near-black
// stroke so they stay legible. The brand-green (#25D366) markers layered on
// top pop against it. Mirrors MAP_STYLES feature-for-feature so the two are
// easy to keep in sync.
export const MAP_STYLES_DARK = [
  { featureType: 'all', elementType: 'geometry', stylers: [{ color: '#16211b' }] },
  { featureType: 'all', elementType: 'labels.text.fill', stylers: [{ color: '#8fa096' }] },
  { featureType: 'all', elementType: 'labels.text.stroke', stylers: [{ color: '#0e1712' }] },
  { featureType: 'administrative', elementType: 'geometry.fill', stylers: [{ color: '#2a352f' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.park', stylers: [{ visibility: 'on' }, { color: '#173529' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#2b352f' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#3a463f' }] },
  { featureType: 'water', stylers: [{ visibility: 'on' }, { color: '#0e1a20' }] },
];

// The map style is a JS options array, not CSS, so prefers-color-scheme
// can't reach it -- read it at runtime and re-render if the system theme
// flips while the page is open.
export function useMapStyles() {
  const [isDark, setIsDark] = useState(
    () => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return isDark ? MAP_STYLES_DARK : MAP_STYLES;
}

// Warms the Google Maps JS API ahead of the analyzing ("radar") screen.
// LandingPage renders this as soon as a neighborhood is picked, so during the
// two steps before the map appears (basics + contact) the script loads in the
// background and the analyzing map -- and later the reveal's ComparablesMap --
// render without the "Cargando mapa..." flash. Renders nothing: useLoadScript
// shares one global load keyed by loader id, so this just kicks off the same
// load the map components would otherwise trigger on mount, only earlier. Must
// use the exact same options object as those calls so the loader dedupes
// instead of warning about a re-init. Only mounted when a key exists.
export function MapPreloader({ apiKey }: { apiKey: string }) {
  useLoadScript({ googleMapsApiKey: apiKey });
  return null;
}

// Google's Maps JS API doesn't animate zoom changes on its own (panTo does
// animate, setZoom snaps) -- this steps one level at a time so zooming in
// feels like flying in rather than jump-cutting.
export function smoothZoomTo(map: google.maps.Map, targetZoom: number) {
  const current = map.getZoom();
  if (current === undefined || current === targetZoom) return;
  const next = current + (targetZoom > current ? 1 : -1);
  const listener = map.addListener('zoom_changed', () => {
    google.maps.event.removeListener(listener);
    setTimeout(() => smoothZoomTo(map, targetZoom), 60);
  });
  map.setZoom(next);
}
