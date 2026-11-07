import { useEffect, useRef, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { MapPin } from 'lucide-react';
import { borrowComparables } from '../../lib/borrowedComparables';
import { NEIGHBORHOOD_COORDINATES } from '@shared/neighborhoods';
import { COPY } from '@shared/copy';
import { inputClass } from './formStyles';

// Estado de México, roughly. Google only suggests places inside this box; the
// box also covers CDMX (it sits inside Edomex), so those results are filtered out.
const EDOMEX = { south: 18.35, west: -100.62, north: 20.3, east: -98.59 };

interface Suggestion {
  text: string;
  toPlace: () => google.maps.places.Place;
}

interface Props {
  value: string;
  onChange: (v: string) => void;
  // When given, the picked place goes here instead of registering borrowed
  // comparables (used by the dev-only comparables editor).
  onPlace?: (text: string, lat: number, lng: number) => void;
  placeholder?: string;
}

// Free-text fraccionamiento field with Google Places suggestions. Picking one
// registers its coordinates so the reveal can borrow the nearest zone's
// comparables. Without a key or if Places fails, it stays a plain text input.
export function PlaceSearch({ value, onChange, onPlace, placeholder }: Props) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  const { isLoaded } = useLoadScript({ googleMapsApiKey: apiKey || '' });
  const [items, setItems] = useState<Suggestion[]>([]);
  const token = useRef<google.maps.places.AutocompleteSessionToken>(undefined);
  const picked = useRef('');

  useEffect(() => {
    const q = value.trim();
    if (!isLoaded || !apiKey || q.length < 3 || q === picked.current) {
      setItems([]);
      return;
    }
    let stale = false;
    const t = window.setTimeout(async () => {
      try {
        const { AutocompleteSuggestion, AutocompleteSessionToken } = (await google.maps.importLibrary('places')) as google.maps.PlacesLibrary;
        token.current ??= new AutocompleteSessionToken();
        const { suggestions } = await AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input: q,
          sessionToken: token.current,
          includedRegionCodes: ['mx'],
          language: 'es',
          locationRestriction: EDOMEX,
        });
        if (stale) return;
        setItems(
          suggestions.flatMap((s) =>
            s.placePrediction && !/CDMX|Ciudad de México/.test(s.placePrediction.text.toString()) ? [{ text: s.placePrediction.text.toString(), toPlace: () => s.placePrediction!.toPlace() }] : []
          )
        );
      } catch {
        if (!stale) setItems([]);
      }
    }, 250);
    return () => {
      stale = true;
      window.clearTimeout(t);
    };
  }, [value, isLoaded, apiKey]);

  async function pick(s: Suggestion) {
    picked.current = s.text;
    setItems([]);
    try {
      const place = s.toPlace();
      await place.fetchFields({ fields: ['location'] });
      if (place.location) {
        const [lat, lng] = [place.location.lat(), place.location.lng()];
        if (onPlace) onPlace(s.text, lat, lng);
        else {
          borrowComparables(s.text, lat, lng);
          // Before onChange below, so the side map already finds the point when it re-renders with the new name.
          NEIGHBORHOOD_COORDINATES[s.text] = { lat, lng };
        }
      }
    } catch {
      /* no coordinates: the reveal just shows no comparables, as before */
    }
    onChange(s.text);
    token.current = undefined;
  }

  return (
    <div className="relative">
      <input
        className={inputClass}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? COPY.location.otherSearchPlaceholder}
        maxLength={120}
        autoFocus={!onPlace}
      />
      {items.length > 0 && (
        <ul className="mt-1 overflow-hidden rounded-2xl border border-neutral-200 bg-parchment-card shadow-lg">
          {items.map((s) => (
            <li key={s.text}>
              <button
                type="button"
                onClick={() => pick(s)}
                className="flex w-full items-start gap-2 px-3 py-2.5 text-left text-sm text-neutral-800 hover:bg-neutral-50"
              >
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-neutral-400" />
                <span>{s.text}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
