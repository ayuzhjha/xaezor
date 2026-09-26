import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * usePreloadAssets — Preloads images and videos, returns real progress (0–1).
 *
 * @param {{ images: string[], videos: string[] }} assets
 * @returns {{ progress: number, loaded: boolean }}
 */
export function usePreloadAssets(assets) {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const abortRef = useRef(false);

  useEffect(() => {
    abortRef.current = false;
    const allItems = [
      ...(assets.images || []),
      ...(assets.videos || []),
    ];
    const total = allItems.length;
    if (total === 0) {
      setProgress(1);
      setLoaded(true);
      return;
    }

    let count = 0;
    const tick = () => {
      if (abortRef.current) return;
      count++;
      setProgress(count / total);
      if (count >= total) {
        setLoaded(true);
      }
    };

    // Preload images
    (assets.images || []).forEach((src) => {
      const img = new Image();
      img.onload = tick;
      img.onerror = tick; // count errors to avoid stalling
      img.src = src;
    });

    // Preload videos
    (assets.videos || []).forEach((src) => {
      const video = document.createElement('video');
      video.preload = 'auto';
      video.muted = true;
      video.oncanplaythrough = tick;
      video.onerror = tick;
      video.src = src;
      video.load();
    });

    return () => {
      abortRef.current = true;
    };
  }, [assets]);

  return { progress, loaded };
}
