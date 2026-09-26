import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useFrameScrubber } from '../hooks/useFrameScrubber';
import './ScrollCanvasBackground.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollCanvasBackground — Fixed full-viewport canvas that renders
 * scroll-scrubbed video frames. Pinned for the entire MainExperience
 * scroll length, with HUD content layered on top.
 *
 * FRAME EXTRACTION (run once):
 *   node scripts/extract-frames.mjs
 *
 * This uses Vite's import.meta.glob to eagerly load all .webp frames
 * from src/assets/frames/. If the directory is empty (frames not yet
 * extracted), the canvas remains blank — no placeholders are used.
 */

// Vite's import.meta.glob for eager loading of frame assets
const frameModules = import.meta.glob('../assets/frames/*.jpg', { eager: true, query: '?url', import: 'default' });

function getFrameSources() {
  const keys = Object.keys(frameModules);
  if (keys.length === 0) {
    console.warn(
      '[ScrollCanvasBackground] No frames found in src/assets/frames/.\n' +
      'Run: node scripts/extract-frames.mjs'
    );
    return [];
  }
  // Sort by filename to ensure sequential playback
  return keys.sort().map(key => frameModules[key]);
}

export default function ScrollCanvasBackground({ containerRef }) {
  const canvasRef = useRef(null);
  const frameSources = useRef(getFrameSources()).current;
  const { setProgress } = useFrameScrubber(canvasRef, frameSources);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!containerRef?.current) return;
    if (frameSources.length === 0) return; // no frames to scrub

    // Create ScrollTrigger to map scroll to frame progress
    triggerRef.current = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3, // tighter scrub for better scroll-linkage with HUD panels
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    return () => {
      if (triggerRef.current) {
        triggerRef.current.kill();
        triggerRef.current = null;
      }
    };
  }, [containerRef, setProgress, frameSources.length]);

  return (
    <canvas
      ref={canvasRef}
      className="scroll-canvas"
      id="scroll-canvas-bg"
    />
  );
}
