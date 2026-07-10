import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import { MapPin } from 'lucide-react';
import { NEIGHBORHOOD_COORDINATES, ZONA_ESMERALDA_CENTER } from '@shared/neighborhoods';

// Same muted style array the authenticated ACM tool uses for its property
// map, so this feels like the same product rather than a bare default map.
const MAP_STYLES = [
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

interface Props {
  colonia: string;
}

function MapFallback({ colonia }: { colonia: string }) {
  return (
    <div className="flex h-48 flex-col items-center justify-center gap-1.5 rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 text-center">
      <MapPin className="h-6 w-6 text-brand-500" />
      <p className="text-sm font-semibold text-neutral-700">{colonia || 'Selecciona tu colonia'}</p>
      <p className="text-xs text-neutral-400">Zona Esmeralda, Atizapán de Zaragoza</p>
    </div>
  );
}

export function NeighborhoodMap({ colonia }: Props) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  const { isLoaded } = useLoadScript({ googleMapsApiKey: apiKey || '' });

  if (!apiKey) {
    return <MapFallback colonia={colonia} />;
  }

  const center = NEIGHBORHOOD_COORDINATES[colonia] ?? ZONA_ESMERALDA_CENTER;

  return (
    <div className="h-48 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 shadow-inner">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={center}
          zoom={14}
          options={{ styles: MAP_STYLES, disableDefaultUI: true, gestureHandling: 'cooperative' }}
        >
          <Marker position={center} />
        </GoogleMap>
      ) : (
        <div className="flex h-full items-center justify-center text-sm text-neutral-400">Cargando mapa...</div>
      )}
    </div>
  );
}
