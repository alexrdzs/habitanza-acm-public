import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GoogleMap, OVERLAY_MOUSE_TARGET, OverlayViewF, useLoadScript } from '@react-google-maps/api';
import { NEIGHBORHOOD_COORDINATES, ZONA_ESMERALDA_CENTER } from '@shared/neighborhoods';
import { optimizedPhotoUrl, readyComparableListings } from '@shared/comparableListings';
import { cn } from '../../lib/utils';
import { buildPool } from './AnalyzingComparables';
import { smoothZoomTo, useMapStyles } from './NeighborhoodMap';

// Lucide map-pin glyph as a data URI, brand green with a white outline.
const PIN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0Z" fill="#27C840" stroke="#ffffff" stroke-width="1.5"/><circle cx="12" cy="10" r="3" fill="#ffffff"/></svg>`;
const PIN_URL = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(PIN_SVG)}`;

interface Props {
  colonia: string;
  /** How many search pins to show around the chosen fraccionamiento (0 = none). */
  pinCount: number;
  /** Analyzing step: the comparables show as photos at their real spots. Stage 0-1 = all of them, 2+ = only the selection. */
  analyzingStage?: number;
}

// Module-level so the overlays get the same function every render. A new one each time makes
// the library tear the overlay down and rebuild it, which replays the photo's fade-in.
const centerOffset = (w: number, h: number) => ({ x: -w / 2, y: -h / 2 });

// A reviewed comparable on the map. Slow fade in, and the ones not selected fade out.
function PhotoPin({ photo, index, dim }: { photo: string; index: number; dim: boolean }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <div className="animate-in fade-in zoom-in-90 duration-[1400ms] [animation-fill-mode:both]" style={{ animationDelay: `${index * 140}ms` }}>
      <div
        className={cn(
          'h-12 w-12 overflow-hidden rounded-xl border-2 border-white bg-neutral-100 shadow-[0_6px_16px_-6px_rgba(15,23,42,0.45)] transition-all duration-[1200ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]',
          dim ? 'scale-50 opacity-0' : 'scale-100 opacity-100'
        )}
      >
        <img
          src={optimizedPhotoUrl(photo, 120)}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      </div>
    </div>
  );
}

const OVERVIEW_ZOOM = 12;
// The ficha card grows down from the top of the panel, so the radar sits in the lower part where it is never covered.
const RADAR_TOP = 0.68;
// Map center that puts `target` at RADAR_TOP of the panel height (at zoom z).
function offsetCenter(map: google.maps.Map, target: google.maps.LatLngLiteral, z: number) {
  // getDiv() is undefined when Google Maps fails to load (bad key or domain). Do not crash the page.
  const h = map.getDiv()?.clientHeight || 700;
  const degPerPx = (360 / (256 * 2 ** z)) * Math.cos((target.lat * Math.PI) / 180);
  return { lat: target.lat - (0.5 - RADAR_TOP) * h * degPerPx, lng: target.lng };
}
const COLONIA_ZOOM = 14;
// Analyzing starts one step out from the fraccionamiento (not the whole zone), then closes in.
const ANALYZING_START_ZOOM = 13;
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
export function ZoneMap({ colonia, pinCount, analyzingStage }: Props) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  const { isLoaded } = useLoadScript({ googleMapsApiKey: apiKey || '' });
  const mapStyles = useMapStyles();
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  const points = useMemo(() => scatter(colonia || 'zona'), [colonia]);
  const center = NEIGHBORHOOD_COORDINATES[colonia];
  const photos = useMemo(() => (analyzingStage === undefined ? [] : buildPool(colonia).map((p) => ({ ...p, position: { lat: p.listing.lat, lng: p.listing.lng } }))), [analyzingStage === undefined, colonia]);
  const photoMode = photos.some((p) => p.picked);
  // Photo mode: a bit wider than the fraccionamiento while reviewing, then in on the fraccionamiento once narrowed to the selection.
  const zoom = photoMode && (analyzingStage ?? 0) < 2 ? ANALYZING_START_ZOOM : COLONIA_ZOOM;

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
      map.panTo(offsetCenter(map, center, zoom));
      smoothZoomTo(map, zoom);
    },
    [colonia, center, points, zoom]
  );

  // Real comparables: always visible once the fraccionamiento is chosen.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !colonia || photoMode) return;
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
  }, [colonia, isLoaded, photoMode]);

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
          options={{ styles: mapStyles, disableDefaultUI: true, gestureHandling: 'none', clickableIcons: false }}
        >
          {photoMode &&
            photos.map((p, i) => (
              <OverlayViewF
                key={i}
                position={p.position}
                mapPaneName={OVERLAY_MOUSE_TARGET}
                getPixelPositionOffset={centerOffset}
              >
                <PhotoPin photo={p.listing.photo!} index={i} dim={(analyzingStage ?? 0) >= 2 && !p.picked} />
              </OverlayViewF>
            ))}
        </GoogleMap>
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
      {/* Hidden twin at the analyzing start zoom (same style, panel-sized), so its tiles are
          already cached when the real map zooms out. Gone once the analyzing step starts. */}
      {apiKey && isLoaded && center && analyzingStage === undefined && (
        <GoogleMap
          mapContainerStyle={{ position: 'absolute', left: 0, top: 0, width: 480, height: 800, opacity: 0, pointerEvents: 'none' }}
          center={center}
          zoom={ANALYZING_START_ZOOM}
          options={{ styles: mapStyles, disableDefaultUI: true, gestureHandling: 'none', clickableIcons: false }}
        />
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
