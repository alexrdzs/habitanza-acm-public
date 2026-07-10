import { useCallback, useRef } from 'react';
import { useLoadScript, GoogleMap } from '@react-google-maps/api';
import { MapPin } from 'lucide-react';
import type { ComparableListing } from '@shared/comparableListings';

// A dark variant of NeighborhoodMap.tsx's style array -- this map sits
// inside the reveal screen's dark "ink" panel, so a stock light Google Map
// would look like a jarring white rectangle rather than an integrated part
// of the card.
const DARK_MAP_STYLES = [
  { elementType: 'geometry', stylers: [{ color: '#17281F' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#17281F' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#9CA89C' }] },
  { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#2B342F' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#146C48' }, { visibility: 'on' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#2B342F' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#17281F' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#414D46' }] },
  { featureType: 'water', stylers: [{ color: '#10201A' }] },
];

interface Props {
  listings: ComparableListing[];
}

function MapFallback({ count }: { count: number }) {
  return (
    <div className="flex h-40 flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/20 bg-white/[0.04] text-center">
      <MapPin className="h-5 w-5 text-emerald-glow" />
      <p className="px-4 text-xs text-neutral-400">{count} propiedades de referencia en la zona</p>
    </div>
  );
}

export function ComparablesMap({ listings }: Props) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  const { isLoaded } = useLoadScript({ googleMapsApiKey: apiKey || '' });
  const markersRef = useRef<google.maps.Marker[]>([]);

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      markersRef.current.forEach((m) => m.setMap(null));
      markersRef.current = [];

      const bounds = new google.maps.LatLngBounds();
      listings.forEach((listing) => {
        const position = { lat: listing.lat, lng: listing.lng };
        bounds.extend(position);
        markersRef.current.push(
          new google.maps.Marker({
            position,
            map,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 7,
              fillColor: '#4ADE80',
              fillOpacity: 1,
              strokeColor: '#10201A',
              strokeWeight: 2,
            },
          })
        );
      });

      if (listings.length === 1) {
        map.setCenter(bounds.getCenter());
        map.setZoom(14);
      } else {
        map.fitBounds(bounds, 32);
      }
    },
    [listings]
  );

  if (!apiKey || listings.length === 0) {
    return <MapFallback count={listings.length} />;
  }

  return (
    <div className="h-40 overflow-hidden rounded-xl border border-white/15">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={{ lat: listings[0].lat, lng: listings[0].lng }}
          zoom={14}
          onLoad={onLoad}
          options={{ styles: DARK_MAP_STYLES, disableDefaultUI: true, gestureHandling: 'cooperative' }}
        />
      ) : (
        <div className="flex h-full items-center justify-center text-xs text-neutral-400">Cargando mapa...</div>
      )}
    </div>
  );
}
