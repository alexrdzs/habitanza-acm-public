import { useCallback, useEffect, useRef } from 'react';
import { useLoadScript, GoogleMap } from '@react-google-maps/api';
import { Search } from 'lucide-react';
import { NEIGHBORHOOD_COORDINATES, ZONA_ESMERALDA_CENTER } from '@shared/neighborhoods';
import { COMPARABLE_LISTINGS } from '@shared/comparableListings';
import { MAP_STYLES, smoothZoomTo } from './NeighborhoodMap';

interface Props {
  colonia: string;
  narrow: boolean;
}

function MapFallback() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 text-center">
      <Search className="h-5 w-5 animate-pulse text-brand-500" />
      <p className="px-4 text-xs text-neutral-500">Comparando contra propiedades reales en tu zona</p>
    </div>
  );
}

const OVERVIEW_ZOOM = 11;

// Starts zoomed out centered on the visitor's own colonia (with the rest of
// the zone's colonias scattered around it as dots for context), then
// narrows into that colonia's real comps once `narrow` flips true -- a
// visual for "pulling many references, then focusing on yours" rather than
// an abstract loading animation.
export function AnalyzingMap({ colonia, narrow }: Props) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  const { isLoaded } = useLoadScript({ googleMapsApiKey: apiKey || '' });
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const overviewCenter = NEIGHBORHOOD_COORDINATES[colonia] ?? ZONA_ESMERALDA_CENTER;

  const showOverview = useCallback(
    (map: google.maps.Map) => {
      markersRef.current.forEach((m) => m.setMap(null));
      markersRef.current = [];
      Object.values(NEIGHBORHOOD_COORDINATES).forEach((coord) => {
        markersRef.current.push(
          new google.maps.Marker({
            position: coord,
            map,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 5,
              fillColor: '#9CA89C',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 1.5,
            },
          })
        );
      });
      map.setCenter(overviewCenter);
      map.setZoom(OVERVIEW_ZOOM);
    },
    [overviewCenter]
  );

  const narrowToColonia = useCallback(
    (map: google.maps.Map) => {
      markersRef.current.forEach((m) => m.setMap(null));
      markersRef.current = [];
      const comps = COMPARABLE_LISTINGS[colonia] ?? [];
      const center = NEIGHBORHOOD_COORDINATES[colonia] ?? ZONA_ESMERALDA_CENTER;
      const points = comps.length > 0 ? comps.map((c) => ({ lat: c.lat, lng: c.lng })) : [center];
      points.forEach((p) => {
        markersRef.current.push(
          new google.maps.Marker({
            position: p,
            map,
            animation: google.maps.Animation.DROP,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 7,
              fillColor: '#25D366',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2,
            },
          })
        );
      });
      map.panTo(center);
      smoothZoomTo(map, 14);
    },
    [colonia]
  );

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      mapRef.current = map;
      showOverview(map);
    },
    [showOverview]
  );

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isLoaded) return;
    if (narrow) {
      narrowToColonia(map);
    }
  }, [narrow, isLoaded, narrowToColonia]);

  if (!apiKey) {
    return <MapFallback />;
  }

  return (
    <div className="h-full w-full">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={overviewCenter}
          zoom={OVERVIEW_ZOOM}
          onLoad={onLoad}
          options={{ styles: MAP_STYLES, disableDefaultUI: true, gestureHandling: 'none', clickableIcons: false }}
        />
      ) : (
        <div className="flex h-full items-center justify-center text-xs text-neutral-400">Cargando mapa...</div>
      )}
    </div>
  );
}
