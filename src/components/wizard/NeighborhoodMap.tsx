// Shared Google Maps building blocks reused by ComparablesMap.tsx and
// AnalyzingMap.tsx. No component here anymore -- the location step dropped
// its own map in favor of a colonia photo grid; the map now only appears
// during the analyzing screen and on the reveal screen's Mercado de la zona
// card.

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
