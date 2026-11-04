import { useCallback, useEffect, useMemo, useRef } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { NEIGHBORHOOD_COORDINATES, ZONA_ESMERALDA_CENTER } from '@shared/neighborhoods';
import { readyComparableListings } from '@shared/comparableListings';
import { smoothZoomTo } from './NeighborhoodMap';

// Pastel, Airbnb/Apple Maps-like style (same as the ACM tool): no POI icons or
// transit, soft parks and water, white roads.
const MAP_STYLE = [
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

// Lucide map-pin glyph as a data URI, brand green with a white outline.
const PIN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0Z" fill="#27C840" stroke="#ffffff" stroke-width="1.5"/><circle cx="12" cy="10" r="3" fill="#ffffff"/></svg>`;
const PIN_URL = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(PIN_SVG)}`;

interface Props {
  colonia: string;
  /** How many search pins to show around the chosen fraccionamiento (0 = none). */
  pinCount: number;
}

const OVERVIEW_ZOOM = 12;
// The ficha card grows down from the top of the panel, so the radar sits in the lower part where it is never covered.
const RADAR_TOP = 0.68;
// Map center that puts `target` at RADAR_TOP of the panel height (at zoom z).
function offsetCenter(map: google.maps.Map, target: google.maps.LatLngLiteral, z: number) {
  const h = map.getDiv().clientHeight || 700;
  const degPerPx = (360 / (256 * 2 ** z)) * Math.cos((target.lat * Math.PI) / 180);
  return { lat: target.lat - (0.5 - RADAR_TOP) * h * degPerPx, lng: target.lng };
}
const COLONIA_ZOOM = 14;
export const MAX_PINS = 45;
// Spread of the search pins around the fraccionamiento, in degrees (~2.4 km tall, ~1.7 km wide).
const SPREAD_LAT = 0.022;
const SPREAD_LNG = 0.016;

// Deterministic scatter per fraccionamiento, so the pins don't jump around on
// re-render. These are decorative search markers ("looking through the zone"),
// not listings. Real comparables are drawn separately, in solid green.
function scatter(seed: string): { dx: number; dy: number }[] {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  const rnd = () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
  return Array.from({ length: MAX_PINS }, () => {
    const a = rnd() * Math.PI * 2;
    const r = Math.sqrt(rnd());
    return { dx: Math.cos(a) * r, dy: Math.sin(a) * r };
  });
}

// Decorative map for the side panel. Shows the whole zone until a
// fraccionamiento is chosen, then flies to it and drops the real comparable
// listings as brand-green dots. A radar pulse sits at the center so the panel
// feels like it is analyzing the area. Without a Maps key it falls back to a
// soft gradient with the same radar.
export function ZoneMap({ colonia, pinCount }: Props) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  const { isLoaded } = useLoadScript({ googleMapsApiKey: apiKey || '' });
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  const points = useMemo(() => scatter(colonia || 'zona'), [colonia]);
  const center = NEIGHBORHOOD_COORDINATES[colonia];

  // Fly to the fraccionamiento and (re)build the markers when it changes.
  const sync = useCallback(
    (map: google.maps.Map) => {
      markersRef.current.forEach((m) => m.setMap(null));
      markersRef.current = [];
      if (!colonia || !center) {
        map.panTo(offsetCenter(map, ZONA_ESMERALDA_CENTER, OVERVIEW_ZOOM));
        smoothZoomTo(map, OVERVIEW_ZOOM);
        return;
      }
      points.forEach((pt) => {
        markersRef.current.push(
          new google.maps.Marker({
            position: { lat: center.lat + pt.dy * SPREAD_LAT, lng: center.lng + pt.dx * SPREAD_LNG },
            map: null,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 5,
              fillColor: '#38BDF8',
              fillOpacity: 0.95,
              strokeColor: '#ffffff',
              strokeWeight: 1.5,
            },
          })
        );
      });
      map.panTo(offsetCenter(map, center, COLONIA_ZOOM));
      smoothZoomTo(map, COLONIA_ZOOM);
    },
    [colonia, center, points]
  );

  // Real comparables: always visible once the fraccionamiento is chosen.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !colonia) return;
    const real = readyComparableListings(colonia).map(
      (c) =>
        new google.maps.Marker({
          position: { lat: c.lat, lng: c.lng },
          map,
          icon: { url: PIN_URL, scaledSize: new google.maps.Size(34, 34) },
          zIndex: 10,
        })
    );
    return () => real.forEach((m) => m.setMap(null));
  }, [colonia, isLoaded]);

  useEffect(() => {
    if (mapRef.current) sync(mapRef.current);
  }, [sync]);

  // Narrowing: show only the first pinCount pins.
  useEffect(() => {
    const map = mapRef.current;
    markersRef.current.forEach((m, i) => {
      const show = i < pinCount;
      if (show && !m.getMap()) {
        m.setMap(map);
        m.setAnimation(google.maps.Animation.DROP);
      } else if (!show && m.getMap()) m.setMap(null);
    });
  }, [pinCount, sync]);

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-neutral-100 to-neutral-200">
      {apiKey && isLoaded && (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={ZONA_ESMERALDA_CENTER}
          zoom={OVERVIEW_ZOOM}
          onLoad={(map) => {
            mapRef.current = map;
            sync(map);
          }}
          options={{ styles: MAP_STYLE, disableDefaultUI: true, gestureHandling: 'none', clickableIcons: false }}
        />
      )}
      {!(apiKey && isLoaded) && (
        // No map available (no key, or still loading): soft street grid so the panel still reads as a map.
        <svg className="absolute inset-0 h-full w-full text-white" fill="none" stroke="currentColor" aria-hidden>
          <g strokeLinecap="round" opacity="0.9">
            <path d="M-20 120 C120 90 220 200 460 150" strokeWidth="12" />
            <path d="M-20 360 C140 330 260 420 460 380" strokeWidth="8" />
            <path d="M80 -20 C110 140 60 300 130 520" strokeWidth="10" />
            <path d="M290 -20 C260 160 340 320 300 520" strokeWidth="7" />
            <path d="M-20 520 C160 470 300 560 460 500" strokeWidth="6" />
          </g>
        </svg>
      )}
      {!(apiKey && isLoaded) && colonia && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {points.map((pt, i) => (
            <span
              key={i}
              className={`absolute h-2.5 w-2.5 rounded-full border border-white bg-sky-400 shadow-sm transition-all duration-500 ${
                i < pinCount ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
              }`}
              style={{ left: `${50 + pt.dx * 42}%`, top: `${68 + pt.dy * 18}%`, transitionDelay: `${(i % 9) * 40}ms` }}
            />
          ))}
        </div>
      )}
      {/* Radar at the center (where the map pans to). */}
      <div className="pointer-events-none absolute left-1/2 top-[68%] -translate-x-1/2 -translate-y-1/2">
        <span className="absolute -inset-10 animate-ping rounded-full bg-brand-500/15 [animation-duration:3s]" />
        <span className="absolute -inset-5 animate-ping rounded-full bg-brand-500/20 [animation-delay:1s] [animation-duration:3s]" />
        <span className="relative block h-4 w-4 rounded-full border-[3px] border-white bg-brand-500 shadow-lg" />
      </div>
    </div>
  );
}
