import { useState } from 'react';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import {
  ZONA_ESMERALDA_COLONIAS,
  ZONA_ESMERALDA_COLONIAS_EXTENDED,
  OTHER_COLONIA_VALUE,
} from '@shared/validation';
import { coloniaPhoto, sampleListingPhotos, optimizedPhotoUrl } from '@shared/comparableListings';
import { NEIGHBORHOOD_AERIAL_BG } from '@shared/neighborhoods';
import { COPY } from '@shared/copy';
import { WizardShell } from './WizardShell';
import { inputClass, labelClass } from './formStyles';
import { cn } from '../../lib/utils';

interface Props {
  colonia: string;
  setColonia: (v: string) => void;
  coloniaOtra: string;
  setColoniaOtra: (v: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

// Selecting a card advances automatically -- this is the pause that lets the
// checkmark register before the screen changes, not a network wait.
const AUTO_ADVANCE_DELAY_MS = 400;

// A decorative "browse more" teaser on the expand trigger, echoing an
// Airbnb-style "show all photos" tile. Derived from whatever listings exist
// in shared/comparableListings.ts, not tied to specific colonia names.
const TEASER_PHOTOS = sampleListingPhotos(3);

interface ColoniaCardProps {
  colonia: string;
  active: boolean;
  disabled: boolean;
  onSelect: () => void;
}

function ColoniaCard({ colonia, active, disabled, onSelect }: ColoniaCardProps) {
  // A single shared aerial (if configured) gives every card the same neutral
  // backdrop; otherwise we dim the fraccionamiento's own real property photo
  // as ambient texture. Either way the *name* is the hero, so a missing or
  // unrepresentative photo degrades gracefully to a branded gradient instead
  // of pretending a house shot stands in for the whole zone.
  const backdrop = NEIGHBORHOOD_AERIAL_BG ?? coloniaPhoto(colonia);
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = !!backdrop && !imgFailed;

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className="group w-full text-left transition-opacity disabled:opacity-40"
    >
      <div
        className={cn(
          'relative aspect-[4/5] w-full overflow-hidden rounded-2xl border-2 transition-all duration-200',
          // Branded gradient is the base layer, so it also serves as the
          // fallback when there's no photo (or one fails to load).
          'bg-gradient-to-br from-emerald-deep to-neutral-900',
          active
            ? 'scale-[0.97] border-brand-500 shadow-[0_0_0_3px_rgba(37,211,102,0.25)]'
            : 'border-white/10 group-hover:border-white/25'
        )}
      >
        {showImage && (
          <img
            src={optimizedPhotoUrl(backdrop, 320)}
            srcSet={`${optimizedPhotoUrl(backdrop, 320)} 320w, ${optimizedPhotoUrl(backdrop, 640)} 640w`}
            sizes="(min-width: 640px) 240px, 45vw"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
          />
        )}

        {/* Dim the backdrop so the name always reads as the hero: a soft
            overall darken plus a stronger bottom-up gradient behind the text. */}
        <div className="absolute inset-0 bg-neutral-950/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/25 to-transparent" />

        {active && (
          <div className="absolute right-2.5 top-2.5 flex h-7 w-7 animate-in items-center justify-center rounded-full bg-brand-500 shadow-md zoom-in-50 duration-200">
            <Check className="h-4 w-4 text-white" strokeWidth={3} />
          </div>
        )}

        <p className="absolute inset-x-0 bottom-0 line-clamp-3 p-3 text-[15px] font-bold leading-tight text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]">
          {colonia}
        </p>
      </div>
    </button>
  );
}

interface ColoniaPillProps {
  label: string;
  active: boolean;
  disabled: boolean;
  dashed?: boolean;
  onSelect: () => void;
}

function ColoniaPill({ label, active, disabled, dashed, onSelect }: ColoniaPillProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={cn(
        'flex w-full items-center justify-between rounded-pill border px-4 py-3.5 text-left text-sm font-medium transition-all disabled:opacity-40',
        active
          ? 'border-brand-500 bg-brand-500 text-white'
          : dashed
            ? 'border-dashed border-neutral-300 text-neutral-500 hover:border-neutral-400 hover:bg-neutral-50'
            : 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50'
      )}
    >
      {label}
      {active && <Check className="h-4 w-4 flex-shrink-0" strokeWidth={3} />}
    </button>
  );
}

export function WizardLocationStep(props: Props) {
  const mapLabel = props.colonia === OTHER_COLONIA_VALUE ? props.coloniaOtra : props.colonia;

  const isExtendedSelection =
    !!props.colonia &&
    props.colonia !== OTHER_COLONIA_VALUE &&
    !(ZONA_ESMERALDA_COLONIAS as readonly string[]).includes(props.colonia);

  // Start expanded if the visitor already picked something from the "ver
  // más" panel (e.g. navigating back to this step), so their choice stays
  // visible instead of collapsing behind a generic "Ver más" label.
  const [showMore, setShowMore] = useState(isExtendedSelection);
  const [isAdvancing, setIsAdvancing] = useState(false);

  function handleSelect(c: string) {
    if (isAdvancing) return;
    props.setColonia(c);
    setIsAdvancing(true);
    window.setTimeout(() => props.onContinue(), AUTO_ADVANCE_DELAY_MS);
  }

  function handleSelectOtra() {
    if (isAdvancing) return;
    props.setColonia(OTHER_COLONIA_VALUE);
  }

  const canContinueOtra = props.coloniaOtra.trim().length > 0;

  return (
    <WizardShell
      title={COPY.location.title}
      description={COPY.location.description}
      step={{ current: 1, total: 3 }}
      onBack={props.onBack}
    >
      <div className="flex flex-col gap-4">
        <div>
          <div className="grid grid-cols-2 gap-3">
            {ZONA_ESMERALDA_COLONIAS.map((c) => (
              <ColoniaCard
                key={c}
                colonia={c}
                active={props.colonia === c}
                disabled={isAdvancing && props.colonia !== c}
                onSelect={() => handleSelect(c)}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowMore((v) => !v)}
            className={cn(
              'mt-3 flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all',
              showMore || isExtendedSelection
                ? 'border-brand-500 bg-brand-500/5'
                : 'border-neutral-200 bg-parchment-card hover:border-neutral-300'
            )}
          >
            {/* A little fan of real property photos -- an Airbnb-style
                "show more" teaser instead of a plain dashed button. */}
            <div className="relative h-12 w-14 flex-shrink-0">
              {TEASER_PHOTOS.map((photo, i) => (
                <img
                  key={photo}
                  src={optimizedPhotoUrl(photo, 80)}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className={cn(
                    'absolute h-9 w-9 rounded-lg border-2 border-white object-cover shadow-sm',
                    i === 0 && '-left-0 top-0 -rotate-6',
                    i === 1 && 'right-0 top-0 rotate-6',
                    i === 2 && 'bottom-0 left-1/2 -translate-x-1/2 shadow-md'
                  )}
                />
              ))}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold leading-tight text-neutral-900">
                {!showMore && isExtendedSelection ? mapLabel || COPY.location.moreOptionsTitle : COPY.location.moreOptionsTitle}
              </p>
              <p className="text-xs text-neutral-500">
                {COPY.location.moreOptionsSubtitle(ZONA_ESMERALDA_COLONIAS_EXTENDED.length)}
              </p>
            </div>
            {showMore ? (
              <ChevronUp className="h-4 w-4 flex-shrink-0 text-neutral-400" />
            ) : (
              <ChevronDown className="h-4 w-4 flex-shrink-0 text-neutral-400" />
            )}
          </button>
        </div>

        {showMore && (
          <div className="animate-in fade-in slide-in-from-top-2 flex flex-col gap-3 rounded-2xl border border-neutral-200/70 bg-parchment-card/80 p-4 backdrop-blur-md duration-300">
            <p className={labelClass}>{COPY.location.expandedPanelLabel}</p>
            <div className="flex flex-col gap-2">
              {ZONA_ESMERALDA_COLONIAS_EXTENDED.map((c) => (
                <ColoniaPill
                  key={c}
                  label={c}
                  active={props.colonia === c}
                  disabled={isAdvancing && props.colonia !== c}
                  onSelect={() => handleSelect(c)}
                />
              ))}
              <ColoniaPill
                label={COPY.location.otherLabel}
                active={props.colonia === OTHER_COLONIA_VALUE}
                disabled={isAdvancing}
                dashed
                onSelect={handleSelectOtra}
              />
            </div>

            {props.colonia === OTHER_COLONIA_VALUE && (
              <div className="animate-in fade-in slide-in-from-top-1 flex flex-col gap-3 duration-200">
                <div>
                  <label className={labelClass}>{COPY.location.otherInputLabel}</label>
                  <input
                    className={inputClass}
                    value={props.coloniaOtra}
                    onChange={(e) => props.setColoniaOtra(e.target.value)}
                    maxLength={120}
                    autoFocus
                  />
                </div>
                <button
                  type="button"
                  onClick={() => props.onContinue()}
                  disabled={!canContinueOtra}
                  className="rounded-pill bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-brand-600"
                >
                  {COPY.location.continueLabel}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </WizardShell>
  );
}
