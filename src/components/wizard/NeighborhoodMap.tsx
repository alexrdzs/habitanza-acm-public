import { useCallback, useEffect, useRef } from 'react';
import { useLoadScript, GoogleMap } from '@react-google-maps/api';
import { MapPin } from 'lucide-react';
import { NEIGHBORHOOD_COORDINATES, ZONA_ESMERALDA_CENTER } from '@shared/neighborhoods';

// Same muted style array the authenticated ACM tool uses for its property
// map, so this feels like the same product rather than a bare default map.
// Exported for reuse by ComparablesMap.tsx.
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

const SELECTED_ZOOM = 15;

// Google's Maps JS API doesn't animate zoom changes on its own (panTo does
// animate, setZoom snaps) -- this steps one level at a time so picking a
// colonia feels like flying in rather than jump-cutting. Exported for reuse
// by AnalyzingMap.tsx.
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

interface Props {
  colonia: string;
}

function MapFallback({ colonia }: { colonia: string }) {
  return (
    <div className="flex h-52 flex-col items-center justify-center gap-1.5 rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 text-center">
      <MapPin className="h-6 w-6 text-brand-500" />
      <p className="text-sm font-semibold text-neutral-700">{colonia || 'Zona Esmeralda'}</p>
      <p className="text-xs text-neutral-400">Atizapán de Zaragoza</p>
    </div>
  );
}

export function NeighborhoodMap({ colonia }: Props) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  const { isLoaded } = useLoadScript({ googleMapsApiKey: apiKey || '' });
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    const bounds = new google.maps.LatLngBounds();
    Object.values(NEIGHBORHOOD_COORDINATES).forEach((coord) => bounds.extend(coord));
    map.fitBounds(bounds, 24);
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  // Overview -> zoom-in transition: small dots for every colonia by default,
  // swapping to a single large "selected" pin once one is picked.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isLoaded) return;

    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    if (!colonia || !NEIGHBORHOOD_COORDINATES[colonia]) {
      Object.values(NEIGHBORHOOD_COORDINATES).forEach((coord) => {
        markersRef.current.push(
          new google.maps.Marker({
            position: coord,
            map,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 6,
              fillColor: '#25D366',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2,
            },
          })
        );
      });
      const bounds = new google.maps.LatLngBounds();
      Object.values(NEIGHBORHOOD_COORDINATES).forEach((coord) => bounds.extend(coord));
      map.fitBounds(bounds, 24);
      return;
    }

    const center = NEIGHBORHOOD_COORDINATES[colonia];
    markersRef.current.push(new google.maps.Marker({ position: center, map, animation: google.maps.Animation.DROP }));
    map.panTo(center);
    smoothZoomTo(map, SELECTED_ZOOM);
  }, [colonia, isLoaded]);

  if (!apiKey) {
    return <MapFallback colonia={colonia} />;
  }

  return (
    <div className="h-52 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 shadow-inner">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={ZONA_ESMERALDA_CENTER}
          zoom={12}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{ styles: MAP_STYLES, disableDefaultUI: true, gestureHandling: 'cooperative' }}
        />
      ) : (
        <div className="flex h-full items-center justify-center text-sm text-neutral-400">Cargando mapa...</div>
      )}
    </div>
  );
}
