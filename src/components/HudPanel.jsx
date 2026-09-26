import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import hudImg1 from '../assets/hud/hud1.png';
import hudImg2 from '../assets/hud/hud2.png';
import hudImg3 from '../assets/hud/hud3.png';

import {
  VANISHING_POINT,
  SCALE_START,
  SCALE_END,
  OPACITY_START,
  OPACITY_END,
  BLUR_START_PX,
  EMERGE_FRACTION,
  HOLD_FRACTION,
  RECEDE_FRACTION,
  TYPEWRITER_START_AT,
  RESTING_POSITIONS,
  EMERGE_EASE,
  RECEDE_EASE,
} from '../config/hudAnimationConfig';

import './HudPanel.css';

gsap.registerPlugin(ScrollTrigger);

const HUD_IMAGES = {
  'portrait-a': hudImg1,
  'portrait-b': hudImg2,
  'landscape': hudImg3,
};

const CONTENT_INSETS = {
  'portrait-a': { top: '8%', right: '4%', bottom: '14%', left: '16%' },
  'portrait-b': { top: '12%', right: '4%', bottom: '8%', left: '16%' },
  'landscape':  { top: '14%', right: '10%', bottom: '14%', left: '10%' },
};

const PANEL_SIZES = {
  'portrait-a': { width: '520px', maxWidth: '40vw', aspectHint: 'auto' },
  'portrait-b': { width: '420px', maxWidth: '35vw', aspectHint: 'auto' },
  'landscape':  { width: '750px', maxWidth: '65vw', aspectHint: 'auto' },
};

// Simple SVG Icons mapping
const ICONS = {
  'agents': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 8A3 3 0 1018 2a3 3 0 000 6zM6 8A3 3 0 106 2a3 3 0 000 6zM12 22a3 3 0 100-6 3 3 0 000 6z" />
      <path d="M6 8v3a2 2 0 002 2h8a2 2 0 002-2V8M12 13v3" />
    </svg>
  ),
  'intelligence': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 12h4l3-9 5 18 3-9h3" />
    </svg>
  ),
  'secure': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  'scale': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 3v6M21 3h-6M3 21v-6M3 21h6M14 3h-4M10 21h4M3 14v-4M21 10v4" />
    </svg>
  )
};

export default function HudPanel({
  variant = 'landscape',
  label,
  icon,
  headline,
  body,
  tag,
  cta,
  align = 'center',
  stats,
  children,
  recommended = false,
}) {
  const panelRef = useRef(null);
  const headlineRef = useRef(null);
  const [headlineRevealed, setHeadlineRevealed] = useState('');
  const [typewriterActive, setTypewriterActive] = useState(false);
  const typewriterTriggeredRef = useRef(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  const hudImage = HUD_IMAGES[variant];
  const insets = CONTENT_INSETS[variant];
  const sizes = PANEL_SIZES[variant];

  // ── Scroll-scrubbed vanishing-point animation ──
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    const section = el.closest('.main-section');
    if (!section) return;

    const restingX = RESTING_POSITIONS[align] || 0;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.3,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          const emergeEnd = EMERGE_FRACTION;
          const holdEnd = EMERGE_FRACTION + HOLD_FRACTION;

          // Toggle .hud-settled class when resting in the hold phase
          if (p >= emergeEnd && p <= holdEnd) {
            if (!el.classList.contains('hud-settled')) {
              el.classList.add('hud-settled');
            }
          } else {
            if (el.classList.contains('hud-settled')) {
              el.classList.remove('hud-settled');
            }
          }

          if (p >= emergeEnd * TYPEWRITER_START_AT && p <= holdEnd) {
            if (!typewriterTriggeredRef.current) {
              typewriterTriggeredRef.current = true;
              setTypewriterActive(true);
            }
          } else if (p > holdEnd || p < emergeEnd * 0.3) {
            if (typewriterTriggeredRef.current) {
              typewriterTriggeredRef.current = false;
              setTypewriterActive(false);
            }
          }
        },
      },
    });

    tl.fromTo(el, {
      xPercent: -restingX,
      scale: SCALE_START,
      opacity: OPACITY_START,
      filter: `blur(${BLUR_START_PX}px)`,
    }, {
      xPercent: 0,
      scale: SCALE_END,
      opacity: OPACITY_END,
      filter: 'blur(0px)',
      duration: EMERGE_FRACTION,
      ease: EMERGE_EASE,
    });

    tl.to(el, {
      xPercent: 0,
      scale: SCALE_END,
      opacity: OPACITY_END,
      filter: 'blur(0px)',
      duration: HOLD_FRACTION,
      ease: 'none',
    });

    tl.to(el, {
      xPercent: -restingX,
      scale: SCALE_START * 1.5,
      opacity: OPACITY_START,
      filter: `blur(${BLUR_START_PX}px)`,
      duration: RECEDE_FRACTION,
      ease: RECEDE_EASE,
    });

    return () => {
      tl.kill();
    };
  }, [align, variant]);

  // ── Typewriter effect ──
  useEffect(() => {
    if (!typewriterActive || !headline) {
      setHeadlineRevealed('');
      setCursorVisible(false);
      return;
    }
    
    let idx = 0;
    setHeadlineRevealed('');
    setCursorVisible(true);
    
    const interval = setInterval(() => {
      idx++;
      setHeadlineRevealed(headline.slice(0, idx));
      if (idx >= headline.length) {
        clearInterval(interval);
        // Fade out cursor ~1s after finish
        setTimeout(() => setCursorVisible(false), 1000);
      }
    }, 30);
    
    return () => clearInterval(interval);
  }, [typewriterActive, headline]);

  return (
    <div
      ref={panelRef}
      className={`hud-panel hud-panel--${variant} hud-panel--${align} ${recommended ? 'hud-panel--recommended' : ''} cursor-target`}
      style={{
        width: sizes.width,
        maxWidth: sizes.maxWidth,
        opacity: 0,
        willChange: 'transform, opacity, filter',
      }}
    >
      {/* Frosted Glass Background Layer */}
      <div className="hud-glass" />
      
      {/* Scanline Effect */}
      <div className="hud-scanline" />

      {/* HUD Frame */}
      <img
        src={hudImage}
        alt=""
        className="hud-frame-img"
        draggable={false}
      />

      {/* Content */}
      <div
        className="hud-content"
        style={{
          top: insets.top,
          right: insets.right,
          bottom: insets.bottom,
          left: insets.left,
        }}
      >
        {label && (
          <div className="hud-label-wrapper">
            {icon && ICONS[icon] && <span className="hud-icon">{ICONS[icon]}</span>}
            <div className="hud-label">{label}</div>
          </div>
        )}

        {headline && (
          <h2 className="hud-headline" ref={headlineRef}>
            {headlineRevealed}
            <span className={`hud-cursor ${cursorVisible ? 'visible' : 'hidden'}`}>▎</span>
          </h2>
        )}

        {body && (
          <p className="hud-body">{body}</p>
        )}

        {tag && (
          <div className="hud-tag">
            {tag !== 'CONTACT SALES' && <span className="hud-tag-dot" />}
            {tag}
          </div>
        )}

        {stats && (
          <div className="hud-stats">
            {stats.map((stat, i) => (
              <StatCounter key={i} value={stat.value} label={stat.label} isVisible={typewriterActive} />
            ))}
          </div>
        )}

        {cta && (
          <button className="hud-cta cursor-target" onClick={cta.onClick} id="cta-button">
            <span className="hud-cta-bracket">[</span>
            <span className="hud-cta-text">{cta.label}</span>
            <span className="hud-cta-bracket">]</span>
          </button>
        )}

        {children}
      </div>
    </div>
  );
}

function StatCounter({ value, label, isVisible }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!isVisible) return;
    const match = value.match(/^([\d.]+)(.*)$/);
    if (!match) { setDisplay(value); return; }

    const target = parseFloat(match[1]);
    const suffix = match[2] || '';
    const isDecimal = match[1].includes('.');
    const obj = { val: 0 };

    gsap.to(obj, {
      val: target,
      duration: 1.2,
      ease: 'power2.out',
      onUpdate: () => {
        setDisplay((isDecimal ? obj.val.toFixed(1) : Math.round(obj.val)) + suffix);
      },
    });
  }, [isVisible, value]);

  return (
    <div className="hud-stat" ref={ref}>
      <div className="hud-stat-value">{display}</div>
      <div className="hud-stat-label">{label}</div>
    </div>
  );
}
