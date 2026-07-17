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
  // Give the icon tile a subtle emerald->brand-green gradient (used for the
  // second batch, whose rows stay plain white). Ignored when a row shows a
  // real illustration.
  brandIcon?: boolean;
}

// A compact row: a visual on the left with the name beside it, so almost all
// fraccionamientos fit on screen at a glance. The visual is a rich per-zone
// illustration when one exists (shared/neighborhoodImages.ts -- e.g. an
// Airbnb-style 3D icon), which gives the list real character; until that
// artwork lands it falls back to a themed lucide icon that at least hints at
// the neighborhood (a lake, a golf flag, woods, hills). Both are assigned in
// one place each, so they're easy to customize.
function ColoniaRow({ label, active, disabled, onSelect, icon, dashed, brandIcon }: ColoniaRowProps) {
  const Icon = icon ?? neighborhoodIcon(label);
  const image = dashed ? undefined : neighborhoodImage(label);
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = !!image && !imgFailed;

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={cn(
        'flex w-full items-center gap-3 rounded-2xl border p-2.5 text-left transition-all disabled:opacity-40',
        active
          ? 'border-brand-500 bg-brand-500/5'
          : dashed
            ? 'border-dashed border-neutral-300 hover:border-brand-400 hover:bg-brand-500/5'
            : 'border-neutral-200 bg-parchment-card hover:border-brand-500 hover:bg-brand-500/5'
      )}
    >
      <div
        className={cn(
          'relative flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl transition-colors',
          // The tile also backs a transparent-background illustration, so it
          // keeps a soft surface even in the image case.
          active
            ? 'bg-gradient-to-br from-brand-400 to-brand-500 text-white'
            : dashed
              ? 'bg-transparent text-neutral-400'
              : brandIcon
                ? 'bg-gradient-to-br from-emerald-deep to-brand-500 text-white'
                : 'bg-gradient-to-br from-neutral-100 to-neutral-200 text-emerald-deep'
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
          <Icon className="h-6 w-6" strokeWidth={1.75} />
        )}
      </div>

      <span
        className={cn(
          'min-w-0 flex-1 text-sm font-semibold leading-tight',
          dashed && !active ? 'text-neutral-500' : 'text-neutral-800'
        )}
      >
        {label}
      </span>

      {active && (
        <div className="flex h-6 w-6 flex-shrink-0 animate-in items-center justify-center rounded-full bg-brand-500 shadow-sm zoom-in-50 duration-200">
          <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
        </div>
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

  return (
    <WizardShell
      title={COPY.location.title}
      description={COPY.location.description}
      step={{ current: 1, total: 3 }}
      onBack={props.onBack}
    >
      <div className="flex flex-col gap-4">
        <div>
          {/* Collapse the primary batch once "ver más" is open: the visitor
              browsing the secondary list has clearly skipped these, so keep
              them from adding scroll. */}
          {!showMore && (
            <div className="animate-in fade-in flex flex-col gap-2 duration-200">
              {ZONA_ESMERALDA_COLONIAS.map((c) => (
                <ColoniaRow
                  key={c}
                  label={c}
                  active={props.colonia === c}
                  disabled={isAdvancing && props.colonia !== c}
                  onSelect={() => handleSelect(c)}
                />
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowMore((v) => !v)}
            className={cn(
              'flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all',
              !showMore && 'mt-3',
              showMore || isExtendedSelection
                ? 'border-brand-500 bg-brand-500/5'
                : 'border-neutral-200 bg-parchment-card hover:border-brand-500 hover:bg-brand-500/5'
            )}
          >
            {/* A little cluster of themed icons -- a "there's more" teaser in
                the same icon language as the rows, not a plain dashed button. */}
            <div className="flex flex-shrink-0 items-center">
              {TEASER_ICONS.map((Icon, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-lg border-2 border-parchment-card bg-neutral-100 text-emerald-deep shadow-sm',
                    i > 0 && '-ml-3'
                  )}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </div>
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
                <ColoniaRow
                  key={c}
                  label={c}
                  active={props.colonia === c}
                  disabled={isAdvancing && props.colonia !== c}
                  brandIcon
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
