import { useCallback, useRef } from 'react';
import { useLoadScript, GoogleMap } from '@react-google-maps/api';
import { MapPin } from 'lucide-react';
import type { ComparableListing } from '@shared/comparableListings';
import { NEIGHBORHOOD_COORDINATES } from '@shared/neighborhoods';
import { MAP_STYLES } from './NeighborhoodMap';

interface Props {
  listings: ComparableListing[];
  colonia: string;
  researchCount?: number;
}

const FALLBACK_DOT_POSITIONS = [
  'left-[27%] top-[31%]',
  'left-[40%] top-[54%]',
  'left-[57%] top-[29%]',
  'left-[70%] top-[49%]',
  'left-[49%] top-[69%]',
];

function MapFallback({ colonia, researchCount }: Pick<Props, 'colonia' | 'researchCount'>) {
  if (!researchCount) {
    return (
      <div className="flex h-40 flex-col items-center justify-center gap-1.5 rounded-xl bg-neutral-50 text-center">
        <MapPin className="h-5 w-5 text-brand-500" />
        <p className="px-4 text-xs text-neutral-500">Aún no hay referencias para mostrar en el mapa</p>
      </div>
    );
  }

  return (
    <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-xl bg-neutral-50 text-center">
      <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(to_right,rgba(214,211,209,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(214,211,209,0.35)_1px,transparent_1px)] [background-size:28px_28px]" />
      {FALLBACK_DOT_POSITIONS.slice(0, researchCount).map((position) => (
        <span key={position} className={`absolute h-2.5 w-2.5 rounded-full bg-amber-400 ring-2 ring-white ${position}`} />
      ))}
      <div className="relative z-10 rounded-lg bg-white/85 px-3 py-2 shadow-sm">
        <p className="text-xs font-medium text-neutral-700">{researchCount} referencias en investigación</p>
        <p className="mt-0.5 text-[10px] text-neutral-500">Alrededor de {colonia}</p>
      </div>
    </div>
  );
}

const RESEARCH_DOT_OFFSETS = [
  { lat: 0.0022, lng: -0.0016 },
  { lat: -0.0014, lng: -0.0024 },
  { lat: 0.0006, lng: 0.0026 },
  { lat: -0.0021, lng: 0.0011 },
  { lat: 0.0017, lng: 0.0004 },
];

export function ComparablesMap({ listings, colonia, researchCount = 0 }: Props) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  const { isLoaded } = useLoadScript({ googleMapsApiKey: apiKey || '' });
  const markersRef = useRef<google.maps.Marker[]>([]);
  // A single neighborhood center is enough for temporary dots. It is not a
  // property address and avoids asking Google for geocoding permission.
  const researchCenter = researchCount > 0 ? NEIGHBORHOOD_COORDINATES[colonia] : undefined;

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      if (listings.length > 0) {
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
        return;
      }

      if (!researchCenter) return;
      RESEARCH_DOT_OFFSETS.slice(0, researchCount).forEach((offset) => {
        markersRef.current.push(
          new google.maps.Marker({
            position: { lat: researchCenter.lat + offset.lat, lng: researchCenter.lng + offset.lng },
            map,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 5,
              fillColor: '#B6A36E',
              fillOpacity: 0.9,
              strokeColor: '#ffffff',
              strokeWeight: 1.5,
            },
          })
        );
      });
      map.setCenter(researchCenter);
      map.setZoom(14);
    },
    [listings, researchCenter, researchCount]
  );

  const center = listings[0] ? { lat: listings[0].lat, lng: listings[0].lng } : researchCenter;
  if (!apiKey || !center) return <MapFallback colonia={colonia} researchCount={researchCount} />;

  return (
    <div className="relative h-40 overflow-hidden rounded-xl border border-neutral-200 shadow-inner">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={center}
          zoom={14}
          onLoad={onLoad}
          options={{ styles: MAP_STYLES, disableDefaultUI: true, gestureHandling: 'cooperative' }}
        />
      ) : (
        <div className="flex h-full items-center justify-center text-xs text-neutral-400">Cargando mapa...</div>
      )}
      {isLoaded && researchCount > 0 && listings.length === 0 && (
        <p className="absolute bottom-2 left-2 rounded bg-white/90 px-2 py-1 text-[10px] font-medium text-neutral-600 shadow-sm">
          Referencias por validar
        </p>
      )}
    </div>
  );
}
