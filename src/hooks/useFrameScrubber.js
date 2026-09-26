import { useEffect, useRef, useCallback } from 'react';

/**
 * useFrameScrubber — Preloads frame images and draws the current frame
 * to a canvas based on a progress value (0–1).
 *
 * Uses requestAnimationFrame to avoid layout thrashing — never draws
 * directly in scroll handlers.
 *
 * @param {React.RefObject<HTMLCanvasElement>} canvasRef
 * @param {string[]} frameSources — array of frame image URLs in order
 * @returns {{ setProgress: (p: number) => void, framesLoaded: boolean }}
 */
export function useFrameScrubber(canvasRef, frameSources) {
  const framesRef = useRef([]);
  const loadedRef = useRef(false);
  const pendingFrameRef = useRef(0);
  const rafRef = useRef(null);
  const lastDrawnRef = useRef(-1);

  // Preload all frames on mount
  useEffect(() => {
    if (!frameSources || frameSources.length === 0) return;

    let cancelled = false;
    const imgs = [];
    let loadCount = 0;

    frameSources.forEach((src, i) => {
      const img = new Image();
      img.onload = () => {
        if (cancelled) return;
        loadCount++;
        if (loadCount >= frameSources.length) {
          loadedRef.current = true;
          // Draw first frame immediately
          drawFrame(0);
        }
      };
      img.onerror = () => {
        if (cancelled) return;
        loadCount++;
        if (loadCount >= frameSources.length) {
          loadedRef.current = true;
        }
      };
      img.src = src;
      imgs[i] = img;
    });

    framesRef.current = imgs;

    return () => {
      cancelled = true;
    };
  }, [frameSources]);

  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = framesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Resize canvas to viewport
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.scale(dpr, dpr);
    }

    // Cover-fit the image
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = w / h;
    let drawW, drawH, drawX, drawY;
    if (imgRatio > canvasRatio) {
      drawH = h;
      drawW = h * imgRatio;
      drawX = (w - drawW) / 2;
      drawY = 0;
    } else {
      drawW = w;
      drawH = w / imgRatio;
      drawX = 0;
      drawY = (h - drawH) / 2;
    }

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, [canvasRef]);

  // rAF loop — consumes pendingFrameRef
  useEffect(() => {
    const loop = () => {
      const idx = pendingFrameRef.current;
      if (idx !== lastDrawnRef.current && loadedRef.current) {
        drawFrame(idx);
        lastDrawnRef.current = idx;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame]);

  // Resize handler
  useEffect(() => {
    const onResize = () => {
      lastDrawnRef.current = -1; // force redraw
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const setProgress = useCallback((p) => {
    const total = framesRef.current.length;
    if (total === 0) return;
    const idx = Math.min(Math.max(Math.round(p * (total - 1)), 0), total - 1);
    pendingFrameRef.current = idx;
  }, []);

  return { setProgress, framesLoaded: loadedRef.current };
}
