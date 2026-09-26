import { useAppPhase } from '../context/AppPhaseContext';
import enterSfx from '../assets/sounds/enter.wav';
import './EnterButton.css';

export default function EnterButton() {
  const { advanceTo } = useAppPhase();

  const handleEnter = () => {
    const audio = new Audio(enterSfx);
    audio.play().catch(e => console.log('Audio play blocked:', e));
    advanceTo('hyperloop');
  };

  return (
    <div className="enter-screen" id="enter-screen">
      {/* Decorative grid */}
      <div className="enter-grid" />

      <button
        className="enter-button cursor-target"
        id="enter-button"
        onClick={handleEnter}
        aria-label="Initialize XAEZOR"
      >
        <svg className="enter-button-ring" viewBox="0 0 120 120">
          <circle
            cx="60" cy="60" r="54"
            fill="none"
            stroke="rgba(0,212,255,0.1)"
            strokeWidth="1"
          />
          <circle
            className="enter-ring-animated"
            cx="60" cy="60" r="54"
            fill="none"
            stroke="url(#enter-gradient)"
            strokeWidth="2"
            strokeDasharray="20 320"
            strokeLinecap="round"
          />
          <circle
            className="enter-ring-outer"
            cx="60" cy="60" r="58"
            fill="none"
            stroke="rgba(0,212,255,0.06)"
            strokeWidth="0.5"
            strokeDasharray="3 9"
          />
          <defs>
            <linearGradient id="enter-gradient">
              <stop offset="0%" stopColor="#00d4ff" />
              <stop offset="100%" stopColor="#c026d3" />
            </linearGradient>
          </defs>
        </svg>
        <span className="enter-button-text">INITIALIZE</span>
      </button>

      <div className="enter-subtext">PRESS TO ENGAGE CORE</div>
    </div>
  );
}
