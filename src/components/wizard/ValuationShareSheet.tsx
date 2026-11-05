import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Download, Loader2, Share2, X } from 'lucide-react';
import { COPY } from '@shared/copy';
import { ValuationShareCard } from './ValuationShareCard';

type CardProps = Omit<React.ComponentProps<typeof ValuationShareCard>, 'brokerPhoto'> & {
  brokerPhotoUrl: string;
  firstName: string;
};

const CARD_W = 360;

// Preview of the card plus Descargar / Compartir. The blob is built inside
// the tap, and navigator.share is called right after, so iOS keeps the gesture.
export function ValuationShareSheet({ onClose, brokerPhotoUrl, firstName, ...card }: CardProps & { onClose: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [cardH, setCardH] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  // The broker photo is fetched into a data URL first (a remote <img> would
  // come out blank). If the fetch fails the card shows the initial instead.
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoSettled, setPhotoSettled] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch(brokerPhotoUrl)
      .then((r) => r.blob())
      .then(
        (b) =>
          new Promise<string>((res, rej) => {
            const fr = new FileReader();
            fr.onload = () => res(fr.result as string);
            fr.onerror = rej;
            fr.readAsDataURL(b);
          })
      )
      .then((d) => alive && setPhoto(d))
      .catch(() => {})
      .finally(() => alive && setPhotoSettled(true));
    return () => {
      alive = false;
    };
  }, [brokerPhotoUrl]);

  useLayoutEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const update = () => {
      setScale(Math.min(box.clientWidth / CARD_W, 1));
      setCardH(cardRef.current?.offsetHeight ?? 0);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(box);
    return () => ro.disconnect();
  }, [photo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  async function toBlob() {
    const htmlToImage = await import('html-to-image');
    const blob = await htmlToImage.toBlob(cardRef.current!, { pixelRatio: 3, cacheBust: true, skipAutoScale: true });
    if (!blob) throw new Error('empty');
    return blob;
  }

  function download(blob: Blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = COPY.share.fileName;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function run(action: 'download' | 'share') {
    setBusy(true);
    setError(false);
    try {
      const blob = await toBlob();
      const file = new File([blob], COPY.share.fileName, { type: 'image/png' });
      if (action === 'share' && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: COPY.share.shareTitle, text: COPY.share.message(firstName) });
      } else {
        download(blob);
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') setError(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center" onClick={onClose}>
      <div
        className="max-h-full w-full max-w-md overflow-y-auto rounded-card-lg bg-parchment-card p-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-bold text-neutral-900">{COPY.share.sheetTitle}</h3>
          <button type="button" onClick={onClose} aria-label={COPY.share.close} className="rounded-full p-1.5 text-neutral-500">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div ref={boxRef} className="w-full">
          <div className="overflow-hidden rounded-2xl border border-neutral-200" style={{ width: CARD_W * scale, height: cardH * scale || undefined }}>
            <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: CARD_W }}>
              <ValuationShareCard ref={cardRef} {...card} brokerPhoto={photo} />
            </div>
          </div>
        </div>

        {error && <p className="mt-3 text-center text-sm font-medium text-red-600">{COPY.share.error}</p>}

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled={busy || !photoSettled}
            onClick={() => run('download')}
            className="flex items-center justify-center gap-2 rounded-pill border border-neutral-300 bg-white px-4 py-3 text-sm font-semibold text-neutral-800 disabled:opacity-60"
          >
            <Download className="h-4 w-4" />
            {COPY.share.download}
          </button>
          <button
            type="button"
            disabled={busy || !photoSettled}
            onClick={() => run('share')}
            className="flex items-center justify-center gap-2 rounded-pill bg-brand-500 bg-brand-gradient px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Share2 className="h-4 w-4" />}
            {COPY.share.share}
          </button>
        </div>
      </div>
    </div>
  );
}
