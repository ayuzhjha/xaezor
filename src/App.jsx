/**
 * XAEZOR — Futuristic AI SaaS Landing Page
 *
 * App-level phase switcher. Renders one of:
 *   LoadingScreen → EnterButton → HyperloopIntro → MainExperience
 *
 * Phase state is managed via AppPhaseContext.
 */
import { useMemo, useEffect } from 'react';
import { useAppPhase } from './context/AppPhaseContext';
import { usePreloadAssets } from './hooks/usePreloadAssets';
import LoadingScreen from './components/LoadingScreen';
import EnterButton from './components/EnterButton';
import HyperloopIntro from './components/HyperloopIntro';
import MainExperience from './components/MainExperience';
import TargetCursor from './components/TargetCursor';

// ── Asset imports for preloading ──
// These resolve to URLs at build time via Vite's asset handling.
import hudImg1 from './assets/hud/hud1.png';
import hudImg2 from './assets/hud/hud2.png';
import hudImg3 from './assets/hud/hud3.png';
import hyperloopSrc from './assets/video/hyperloop.mp4';
import bgVideoSrc from './assets/video/bgvdeo.mp4';
import shootSfx from './assets/sounds/shoot.wav';

export default function App() {
  const { phase, transitioning } = useAppPhase();

  // Assets to preload — uses real progress tracking
  const assets = useMemo(() => ({
    images: [hudImg1, hudImg2, hudImg3].filter(Boolean),
    videos: [hyperloopSrc, bgVideoSrc].filter(Boolean),
  }), []);

  const { progress } = usePreloadAssets(assets);

  // Global click sound effect
  useEffect(() => {
    const playShootSound = (e) => {
      // e.button === 0 is left click
      if (e.button === 0) {
        const audio = new Audio(shootSfx);
        audio.volume = 0.6; // slightly reduced volume
        audio.play().catch(err => console.log('Audio playback blocked:', err));
      }
    };
    window.addEventListener('mousedown', playShootSound);
    return () => window.removeEventListener('mousedown', playShootSound);
  }, []);

  return (
    <div className={`app scanlines ${transitioning ? 'phase-fade-exit-active' : ''}`}>
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2}
        cursorColor="#ffffff"
        cursorColorOnTarget="#B497CF"
      />

      {(phase === 'loading' || phase === 'ready') && (
        <>
          {phase === 'loading' && <LoadingScreen progress={progress} />}
          {phase === 'ready' && <EnterButton />}
        </>
      )}

      {phase === 'hyperloop' && <HyperloopIntro />}

      {phase === 'main' && <MainExperience />}
    </div>
  );
}
