import { useState, useEffect } from 'react';
import './HudOverlay.css';

/**
 * HudOverlay — Persistent top-corner status HUD.
 * Shows system status, node ID, signal strength, and scroll progress.
 */
export default function HudOverlay() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0) {
        setScrollProgress(Math.min(window.scrollY / max, 1));
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const signalBars = 4;
  const activeBars = Math.max(1, Math.round(scrollProgress * 5));

  return (
    <div className="hud-overlay" id="hud-overlay">
      {/* Top-left: System Status */}
      <div className="hud-overlay-left">
        <div className="hud-overlay-status">
          <span className="hud-overlay-status-dot" />
          SYS.STATUS// <span className="hud-overlay-status-online">ONLINE</span>
        </div>
        <div className="hud-overlay-progress">
          SCROLL_DEPTH: {Math.round(scrollProgress * 100)}%
          <div className="hud-overlay-progress-bar">
            <div
              className="hud-overlay-progress-fill"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Top-right: Node Info + Signal */}
      <div className="hud-overlay-right">
        <div className="hud-overlay-node">
          NODE_ID: XZ-0091
        </div>
        <div className="hud-overlay-signal">
          SIGNAL:
          <span className="hud-overlay-signal-bars">
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={`hud-overlay-bar ${i < activeBars ? 'hud-overlay-bar--active' : ''}`}
              />
            ))}
          </span>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="hud-overlay-line" />
    </div>
  );
}
