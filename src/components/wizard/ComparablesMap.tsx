import { useCallback, useRef } from 'react';
import { useLoadScript, GoogleMap } from '@react-google-maps/api';
import { MapPin } from 'lucide-react';
import type { ComparableListing } from '@shared/comparableListings';
import { MAP_STYLES } from './NeighborhoodMap';

interface Props {
  listings: ComparableListing[];
}

function MapFallback({ count }: { count: number }) {
  return (
    <div className="flex h-40 flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 text-center">
      <MapPin className="h-5 w-5 text-brand-500" />
      <p className="px-4 text-xs text-neutral-500">{count} propiedades de referencia en la zona</p>
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
              fillColor: '#25D366',
              fillOpacity: 1,
              strokeColor: '#ffffff',
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
    <div className="h-40 overflow-hidden rounded-xl border border-neutral-200 shadow-inner">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={{ lat: listings[0].lat, lng: listings[0].lng }}
          zoom={14}
          onLoad={onLoad}
          options={{ styles: MAP_STYLES, disableDefaultUI: true, gestureHandling: 'cooperative' }}
        />
      ) : (
        <div className="flex h-full items-center justify-center text-xs text-neutral-400">Cargando mapa...</div>
      )}
    </div>
  );
}
