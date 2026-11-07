import { useState } from 'react';
import { ChevronDown, ChevronUp, Check, Plus, type LucideIcon } from 'lucide-react';
import {
  ZONA_ESMERALDA_COLONIAS,
  ZONA_ESMERALDA_COLONIAS_EXTENDED,
  OTHER_COLONIA_VALUE,
} from '@shared/validation';
import { neighborhoodIcon } from '@shared/neighborhoodIcons';
import { neighborhoodImage } from '@shared/neighborhoodImages';
import { COPY } from '@shared/copy';
import { WizardShell } from './WizardShell';
import { labelClass } from './formStyles';
import { PlaceSearch } from './PlaceSearch';
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
const AUTO_ADVANCE_DELAY_MS = 250;

// A small cluster of themed icons on the expand trigger -- a "there's more"
// teaser that speaks the same icon language as the rows. Derived from the
// first few extended fraccionamientos so it stays in sync with the list.
const TEASER_ICONS = ZONA_ESMERALDA_COLONIAS_EXTENDED.slice(0, 3).map(neighborhoodIcon);

interface ColoniaRowProps {
  label: string;
  active: boolean;
  disabled: boolean;
  onSelect: () => void;
  // Defaults to the fraccionamiento's themed icon (shared/neighborhoodIcons).
  // Override only for the free-text "otra" row, which isn't a real colonia.
  icon?: LucideIcon;
  // Dashed treatment for the "otra" entry, to read as an escape hatch rather
  // than a first-class option.
  dashed?: boolean;
}

// A square tile: the visual (icon or illustration) is the main element, the
// fraccionamiento name sits under it. Same look as the property type tiles. The visual is a rich per-zone
// illustration when one exists (shared/neighborhoodImages.ts -- e.g. an
// Airbnb-style 3D icon), which gives the list real character; until that
// artwork lands it falls back to a themed lucide icon that at least hints at
// the neighborhood (a lake, a golf flag, woods, hills). Both are assigned in
// one place each, so they're easy to customize.
function ColoniaRow({ label, active, disabled, onSelect, icon, dashed }: ColoniaRowProps) {
  const Icon = icon ?? neighborhoodIcon(label);
  const image = dashed ? undefined : neighborhoodImage(label);
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = !!image && !imgFailed;

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      aria-pressed={active}
      className={cn(
        'relative flex min-h-[150px] flex-col items-center justify-center gap-3 rounded-2xl border-2 px-2 py-5 lg:min-h-[190px] lg:gap-4 text-center transition-all active:scale-[0.97] disabled:opacity-40',
        active
          ? 'border-brand-500 bg-selected-gradient dark:bg-brand-100'
          : dashed
            ? 'border-dashed border-neutral-300 bg-parchment-card hover:border-brand-400'
            : 'border-neutral-200 bg-parchment-card hover:border-neutral-300 dark:border-transparent dark:bg-[#eceff4]'
      )}
    >
      <div
        className={cn(
          'relative flex h-20 w-20 flex-shrink-0 lg:h-24 lg:w-24 items-center justify-center overflow-hidden rounded-2xl transition-colors',
          active
            ? 'bg-gradient-to-br from-brand-400 to-brand-500 text-white'
            : dashed
              ? 'bg-transparent text-neutral-400'
              : 'bg-gradient-to-br from-neutral-100 to-neutral-200 text-emerald-deep dark:from-white dark:to-white dark:text-[#15803d]'
        )}
      >
        {showImage ? (
          <img
            src={image}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <Icon className="h-8 w-8" strokeWidth={1.75} />
        )}
      </div>

      <span className={cn('text-sm font-semibold leading-tight lg:text-base', dashed && !active ? 'text-neutral-500' : 'text-neutral-800 dark:text-[#19202A]')}>
        {label}
      </span>

      {active && (
        <span className="absolute right-2 top-2 flex h-5 w-5 animate-in items-center justify-center rounded-full bg-brand-500 shadow-sm zoom-in-50 duration-200">
          <Check className="h-3 w-3 text-white" strokeWidth={3} />
        </span>
      )}
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

  const moreButton = (
          <button
            type="button"
            onClick={() => setShowMore((v) => !v)}
            className={cn(
              'flex w-full items-center gap-4 rounded-2xl border p-3 text-left transition-all',
              !showMore && 'min-h-[50px] px-3',
              showMore || isExtendedSelection
                ? 'border-brand-500 bg-selected-gradient'
                : 'border-neutral-200 bg-parchment-card hover:border-brand-500 hover:bg-brand-500/5'
            )}
          >
            {/* A little cluster of themed icons -- a "there's more" teaser in
                the same icon language as the rows, not a plain dashed button. */}
            <div className="relative ml-3 h-8 w-12 flex-shrink-0">
              {TEASER_ICONS.map((Icon, i) => (
                <div
                  key={i}
                  style={{ transform: `translateX(${(i - 1) * 12}px) rotate(${(i - 1) * 18}deg)`, zIndex: i === 1 ? 2 : 1 }}
                  className="absolute bottom-0 left-1/2 -ml-3.5 flex h-7 w-7 origin-bottom items-center justify-center rounded-md border border-neutral-200 bg-white text-emerald-deep shadow-sm"
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                </div>
              ))}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-bold leading-tight text-neutral-900">
                {!showMore && isExtendedSelection ? mapLabel || COPY.location.moreOptionsTitle : COPY.location.moreOptionsTitle}
              </p>
              <p className="mt-0.5 text-[13px] text-neutral-500">
                {COPY.location.moreOptionsSubtitle(ZONA_ESMERALDA_COLONIAS_EXTENDED.length)}
              </p>
            </div>
            {showMore ? (
              <ChevronUp className="h-4 w-4 flex-shrink-0 text-neutral-400" />
            ) : (
              <ChevronDown className="h-4 w-4 flex-shrink-0 text-neutral-400" />
            )}
          </button>
  );

  return (
    <WizardShell
      title={COPY.location.title}
      onBack={props.onBack}
    >
      <div className="flex flex-col gap-4">
        <div>
          {/* Collapse the primary batch once "ver más" is open: the visitor
              browsing the secondary list has clearly skipped these, so keep
              them from adding scroll. */}
          {!showMore && (
            <div className="animate-in fade-in grid grid-cols-3 gap-3 duration-200">
              {ZONA_ESMERALDA_COLONIAS.map((c) => (
                <ColoniaRow
                  key={c}
                  label={c}
                  active={props.colonia === c}
                  disabled={isAdvancing && props.colonia !== c}
                  onSelect={() => handleSelect(c)}
                />
              ))}
              <div className="col-span-3">{moreButton}</div>
            </div>
          )}

          {showMore && moreButton}
        </div>

        {showMore && (
          <div className="animate-in fade-in slide-in-from-top-2 flex flex-col gap-3 rounded-2xl border border-neutral-200/70 bg-parchment-card/80 p-4 backdrop-blur-md duration-300">
            <p className={labelClass}>{COPY.location.expandedPanelLabel}</p>
            <div className="grid grid-cols-3 gap-2">
              {ZONA_ESMERALDA_COLONIAS_EXTENDED.map((c) => (
                <ColoniaRow
                  key={c}
                  label={c}
                  active={props.colonia === c}
                  disabled={isAdvancing && props.colonia !== c}
                  onSelect={() => handleSelect(c)}
                />
              ))}
              <ColoniaRow
                label={COPY.location.otherLabel}
                active={props.colonia === OTHER_COLONIA_VALUE}
                disabled={isAdvancing}
                icon={Plus}
                dashed
                onSelect={handleSelectOtra}
              />
            </div>

            {props.colonia === OTHER_COLONIA_VALUE && (
              <div className="animate-in fade-in slide-in-from-top-1 flex flex-col gap-3 duration-200">
                <div>
                  <label className={labelClass}>{COPY.location.otherInputLabel}</label>
                  <PlaceSearch value={props.coloniaOtra} onChange={props.setColoniaOtra} />
                </div>
                <button
                  type="button"
                  onClick={() => props.onContinue()}
                  disabled={!canContinueOtra}
                  className="rounded-pill bg-brand-500 bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700"
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
