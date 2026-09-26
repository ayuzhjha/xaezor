import { useState, useEffect, useRef } from 'react';
import { useAppPhase } from '../context/AppPhaseContext';
import './LoadingScreen.css';

const BOOT_MESSAGES = [
  'ESTABLISHING UPLINK...',
  'CALIBRATING NEURAL CORE...',
  'DECRYPTING PROTOCOLS...',
  'XAEZOR CORE: ONLINE',
];

export default function LoadingScreen({ progress }) {
  const { advanceTo } = useAppPhase();
  const [msgIndex, setMsgIndex] = useState(0);
  const [displayedMsg, setDisplayedMsg] = useState('');
  const intervalRef = useRef(null);

  // Cycle boot messages based on progress
  useEffect(() => {
    const idx = Math.min(
      Math.floor(progress * BOOT_MESSAGES.length),
      BOOT_MESSAGES.length - 1
    );
    setMsgIndex(idx);
  }, [progress]);

  // Typewriter effect for current message
  useEffect(() => {
    const msg = BOOT_MESSAGES[msgIndex];
    let charIdx = 0;
    setDisplayedMsg('');

    intervalRef.current = setInterval(() => {
      charIdx++;
      setDisplayedMsg(msg.slice(0, charIdx));
      if (charIdx >= msg.length) {
        clearInterval(intervalRef.current);
      }
    }, 25);

    return () => clearInterval(intervalRef.current);
  }, [msgIndex]);

  // When fully loaded, advance to 'ready'
  useEffect(() => {
    if (progress >= 1) {
      const timeout = setTimeout(() => advanceTo('ready'), 800);
      return () => clearTimeout(timeout);
    }
  }, [progress, advanceTo]);

  const circumference = 2 * Math.PI * 52;
  const dashOffset = circumference * (1 - progress);

  return (
    <div className="loading-screen" id="loading-screen">
      {/* Scan lines */}
      <div className="loading-scanlines" />

      {/* Grid background */}
      <div className="loading-grid" />

      {/* Progress ring */}
      <div className="loading-ring-container">
        <svg className="loading-ring" viewBox="0 0 120 120">
          {/* Track */}
          <circle
            cx="60" cy="60" r="52"
            fill="none"
            stroke="rgba(0,212,255,0.08)"
            strokeWidth="2"
          />
          {/* Progress arc */}
          <circle
            className="loading-ring-progress"
            cx="60" cy="60" r="52"
            fill="none"
            stroke="url(#ring-gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 60 60)"
          />
          {/* Outer decorative ring */}
          <circle
            className="loading-ring-outer"
            cx="60" cy="60" r="57"
            fill="none"
            stroke="rgba(0,212,255,0.1)"
            strokeWidth="0.5"
            strokeDasharray="4 8"
          />
          {/* Inner hex decoration */}
          <polygon
            className="loading-hex"
            points="60,20 94,40 94,80 60,100 26,80 26,40"
            fill="none"
            stroke="rgba(0,212,255,0.06)"
            strokeWidth="0.5"
          />
          <defs>
            <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d4ff" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#c026d3" />
            </linearGradient>
          </defs>
        </svg>

        {/* Percentage text */}
        <div className="loading-percent">
          {Math.round(progress * 100)}
          <span className="loading-percent-sign">%</span>
        </div>
      </div>

      {/* Boot message */}
      <div className="loading-message">
        <span className="loading-message-prefix">&gt; </span>
        <span className="loading-message-text">{displayedMsg}</span>
        <span className="loading-cursor">▌</span>
      </div>

      {/* XAEZOR wordmark */}
      <div className="loading-wordmark">XAEZOR</div>

      {/* Decorative corner brackets */}
      <div className="loading-corner loading-corner--tl" />
      <div className="loading-corner loading-corner--tr" />
      <div className="loading-corner loading-corner--bl" />
      <div className="loading-corner loading-corner--br" />
    </div>
  );
}
