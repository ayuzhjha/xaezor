import { useEffect, useRef, useState } from 'react';
import { useAppPhase } from '../context/AppPhaseContext';
import { gsap } from 'gsap';
import './HyperloopIntro.css';

const DURATION_MS = 1200;

// Resolve video path via URL constructor (graceful if file missing)
const hyperloopSrc = new URL('../assets/video/hyperloop.mp4', import.meta.url).href;

export default function HyperloopIntro() {
  const { advanceTo } = useAppPhase();
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start playback
    video.play().catch(() => { });

    // Hold last frame if video ends before 3s
    video.addEventListener('ended', () => {
      video.pause();
    });

    // 3-second forced transition
    timerRef.current = setTimeout(() => {
      triggerExit();
    }, DURATION_MS);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  const triggerExit = () => {
    if (exiting) return;
    setExiting(true);
    clearTimeout(timerRef.current);

    // White flash + scale transition via GSAP
    const tl = gsap.timeline({
      onComplete: () => advanceTo('main'),
    });
    tl.to(containerRef.current, {
      backgroundColor: 'rgba(0,212,255,0.15)',
      duration: 0.15,
      ease: 'power2.in',
    })
      .to(containerRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.35,
        ease: 'power2.out',
      });
  };

  const handleSkip = () => {
    triggerExit();
  };

  return (
    <div className="hyperloop" ref={containerRef} id="hyperloop-intro">
      <video
        ref={videoRef}
        className="hyperloop-video"
        src={hyperloopSrc}
        muted
        autoPlay
        playsInline
      />

      {/* Vignette overlay */}
      <div className="hyperloop-vignette" />

      {/* Skip button */}
      <button
        className="hyperloop-skip"
        id="hyperloop-skip-btn"
        onClick={handleSkip}
      >
        SKIP ▸
      </button>
    </div>
  );
}
