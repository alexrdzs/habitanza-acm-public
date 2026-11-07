// Shared Google Maps building blocks reused by ComparablesMap.tsx and
// AnalyzingMap.tsx. No component here anymore -- the location step dropped
// its own map in favor of a colonia photo grid; the map now only appears
// during the analyzing screen and on the reveal screen's Mercado de la zona
// card.

import { useEffect, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';

// Pastel, Airbnb/Apple Maps-like style (same as the ACM tool): no POI icons or
// transit, soft parks and water, white roads. One source for every map in the
// flow (wizard panel, analyzing, reveal).
export const MAP_STYLES = [
  { elementType: 'geometry', stylers: [{ color: '#f7f5f0' }] },
  { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#9b9a96' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#f7f5f0' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ visibility: 'on' }, { color: '#dcecdd' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'landscape.natural', elementType: 'geometry', stylers: [{ color: '#eef1ea' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
  { featureType: 'road', elementType: 'labels', stylers: [{ visibility: 'simplified' }] },
  { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#fbf3e3' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#fbe3bf' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#c9e6f2' }] },
  { featureType: 'administrative', elementType: 'geometry', stylers: [{ visibility: 'off' }] },
];

// Dark counterpart: same features, carbon surfaces that match the dark tokens
// in index.css (parchment #131316, cards #1c1c20), muted forest parks and a
// deep blue-grey water. The brand-green markers pop against it.
export const MAP_STYLES_DARK = [
  { elementType: 'geometry', stylers: [{ color: '#1c1c20' }] },
  { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8a8a92' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#1c1c20' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ visibility: 'on' }, { color: '#1f2e25' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'landscape.natural', elementType: 'geometry', stylers: [{ color: '#18181c' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#2e2e34' }] },
  { featureType: 'road', elementType: 'labels', stylers: [{ visibility: 'simplified' }] },
  { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#34343b' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#40404a' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#14222b' }] },
  { featureType: 'administrative', elementType: 'geometry', stylers: [{ visibility: 'off' }] },
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
