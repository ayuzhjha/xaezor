import { createContext, useContext, useState, useCallback } from 'react';

/**
 * App-level phase state machine:
 *   'loading' → 'ready' → 'hyperloop' → 'main'
 */
const AppPhaseContext = createContext(null);

const PHASES = ['loading', 'ready', 'hyperloop', 'main'];

export function AppPhaseProvider({ children }) {
  const [phase, setPhase] = useState('loading');
  const [transitioning, setTransitioning] = useState(false);

  const advanceTo = useCallback((nextPhase) => {
    if (!PHASES.includes(nextPhase)) {
      console.warn(`Unknown phase: ${nextPhase}`);
      return;
    }
    setTransitioning(true);
    // Brief fade-out before switching
    setTimeout(() => {
      setPhase(nextPhase);
      setTransitioning(false);
    }, 400);
  }, []);

  return (
    <AppPhaseContext.Provider value={{ phase, transitioning, advanceTo }}>
      {children}
    </AppPhaseContext.Provider>
  );
}

export function useAppPhase() {
  const ctx = useContext(AppPhaseContext);
  if (!ctx) throw new Error('useAppPhase must be inside AppPhaseProvider');
  return ctx;
}
