// Warm the browser cache so images are already there when a later screen shows them.
// Kept in a module-level Set: an Image nobody references can be garbage collected mid-download.
const inflight = new Set<HTMLImageElement>();

export function preloadImages(urls: (string | undefined)[]) {
  for (const url of new Set(urls)) {
    if (!url) continue;
    const img = new Image();
    img.referrerPolicy = 'no-referrer'; // same as the <img> tags that will show them, so the cache entry matches
    inflight.add(img);
    img.onload = img.onerror = () => inflight.delete(img);
    img.src = url;
  }
}
