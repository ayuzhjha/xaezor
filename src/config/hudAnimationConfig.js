/**
 * ═══════════════════════════════════════════════════════
 * XAEZOR — HUD Panel Animation Configuration
 * ═══════════════════════════════════════════════════════
 *
 * All tunable constants for the vanishing-point emerge animation.
 * Adjust these per-checkpoint once you see the effect against the
 * actual corridor video frames.
 *
 * The animation simulates each panel "flying out" from the corridor's
 * vanishing point toward the viewer as they scroll forward.
 */

// ── Vanishing Point ──
// X/Y percentage of the viewport where the corridor's center/vanishing
// point sits. Adjust if your corridor video's focal point is off-center.
export const VANISHING_POINT = {
  x: 50, // % from left
  y: 50, // % from top
};

// ── Scale Range ──
// Panels start at SCALE_START (tiny, at vanishing point) and grow to SCALE_END.
export const SCALE_START = 0.18;
export const SCALE_END = 1.0;

// ── Opacity Range ──
export const OPACITY_START = 0;
export const OPACITY_END = 1;

// ── Motion Blur ──
// Panels start blurred and sharpen as they approach. Blur eases to 0
// once the panel reaches BLUR_CLEAR_AT (fraction of the scale-up progress).
export const BLUR_START_PX = 8;
export const BLUR_CLEAR_AT = 0.7; // blur hits 0 at 70% of scale progress

// ── Scroll Timing ──
// Each panel's scroll range is divided into three phases:
//   1. EMERGE (fly in from vanishing point)
//   2. HOLD   (readable at rest)
//   3. RECEDE (shrink back toward vanishing point before next panel)
//
// Values are fractions of each section's scroll height.
export const EMERGE_FRACTION = 0.35; // first 35% of section = fly in
export const HOLD_FRACTION = 0.35;   // middle 35% = hold at rest
export const RECEDE_FRACTION = 0.30; // last 30% = fly out

// ── Typewriter Delay ──
// Fraction of the emerge animation that must complete before the
// typewriter headline text begins revealing.
export const TYPEWRITER_START_AT = 0.80; // start text at 80% of emerge

// ── Final Resting Positions ──
// X offset (%) from center for each alignment when the panel reaches
// its resting position. 0 = centered.
export const RESTING_POSITIONS = {
  left: -28,   // % offset from center
  right: 28,   // % offset from center
  center: 0,
};

// ── Easing ──
export const EMERGE_EASE = 'power2.out';
export const RECEDE_EASE = 'power2.in';
