import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollCanvasBackground from './ScrollCanvasBackground';
import HudOverlay from './HudOverlay';
import HudPanel from './HudPanel';
import ElectricLogo from './ElectricLogo';
import hudBigImg from '../assets/hud/hudbig.png';
import './MainExperience.css';

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  { id: 'hero-section', label: 'INITIALIZE' },
  { id: 'intro-section', label: 'SYSTEM_BRIEF' },
  { id: 'feature-1', label: 'AGENTS' },
  { id: 'feature-2', label: 'INTELLIGENCE' },
  { id: 'feature-3', label: 'SECURITY' },
  { id: 'feature-4', label: 'SCALE' },
  { id: 'integrations-section', label: 'SYSTEMS' },
  { id: 'stats-section', label: 'METRICS' },
  { id: 'tier-1', label: 'TIER: RECRUIT' },
  { id: 'tier-2', label: 'TIER: OPERATOR' },
  { id: 'tier-3', label: 'TIER: COMMAND' },
  { id: 'cta-section', label: 'FINAL_SEQUENCE' },
  { id: 'footer', label: 'TERMINATE' },
];

export default function MainExperience() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);

  // Hero parallax + fade
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const trigger = ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        gsap.set(hero, {
          opacity: 1 - p * 1.5,
          y: p * -60,
        });
      },
    });

    return () => trigger.kill();
  }, []);

  // Section observer for progress rail
  useEffect(() => {
    const triggers = SECTIONS.map((sec, index) => {
      const el = document.getElementById(sec.id);
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => {
          if (self.isActive) setActiveSection(index);
        },
      });
    });

    return () => {
      triggers.forEach(t => t && t.kill());
    };
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="main-experience custom-cursor" ref={containerRef} id="main-experience">
      {/* Scroll-scrubbed canvas background */}
      <ScrollCanvasBackground containerRef={containerRef} />

      {/* Persistent HUD overlay */}
      <HudOverlay />

      {/* Vertical Progress Rail */}
      <div className="progress-rail">
        {SECTIONS.map((sec, i) => (
          <div
            key={sec.id}
            className={`progress-dot-wrapper cursor-target ${i === activeSection ? 'active' : ''}`}
            onClick={() => scrollToSection(sec.id)}
            title={sec.label}
          >
            <div className="progress-dot"></div>
            <div className="progress-label">{sec.label}</div>
          </div>
        ))}
      </div>

      {/* Dark overlay for text readability */}
      <div className="main-overlay" />

      {/* ═══ CHECKPOINT 1: HERO ═══ */}
      <section className="main-section main-hero" ref={heroRef} id="hero-section">
        <div className="hero-hud-container" style={{ position: 'relative', width: '100%', maxWidth: '1600px', margin: '0 auto', padding: '0 2vw' }}>
          {/* HUD Frame Background */}
          <img src={hudBigImg} alt="HUD Frame" style={{ width: '100%', height: '100%', display: 'block', pointerEvents: 'none', filter: 'drop-shadow(0 0 20px rgba(0, 212, 255, 0.3))' }} />

          {/* Electric Logo Container inside HUD */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', height: '100%', padding: '18%' }}>
              <ElectricLogo
                src="/logo.png"
                color="#554becff"
                glowColor="#903fff"
                scale={1}
                strands={1}
                bend={0.05}
                crackle={1.5}
                arcs={1}
                speed={2.3}
                interactive
                intensity={0.95}
                glow={0}
                thickness={1.5}
                flicker={0.55}
                fill={0}
                cursorIntensity={0.75}
                cursorRadius={65}
              />
            </div>
          </div>
        </div>
        <div className="hero-content">
          <h1 className="hero-tagline">THE CORE THAT THINKS AHEAD</h1>
          <p className="hero-subline">
            Autonomous intelligence, deployed at the speed of thought.
          </p>
        </div>
        <div className="hero-scroll-cue cursor-target" onClick={() => scrollToSection('intro-section')}>
          <span className="hero-scroll-arrow">↓</span>
          <span className="hero-scroll-text">INITIALIZE SEQUENCE</span>
        </div>

        {/* Decorative hex grid */}
        <div className="hero-hex-decoration" />
      </section>

      {/* ═══ CHECKPOINT 2: INTRO ═══ */}
      <section className="main-section main-section--center" id="intro-section">
        <HudPanel
          variant="landscape"
          align="center"
          label="// SYSTEM_BRIEF"
          headline="One core. Every decision."
          body="XAEZOR is the AI operating layer built for teams who can't afford to wait for insight. It reads, reasons, and acts — continuously, autonomously, without a queue."
        />
      </section>

      {/* ═══ CHECKPOINT 3: FEATURES ═══ */}
      <section className="main-section main-section--left" id="feature-1">
        <HudPanel
          variant="portrait-a"
          align="left"
          label="01 // AUTONOMOUS AGENTS"
          icon="agents"
          headline="Agents that don't wait for orders"
          body="Deploy self-directed AI agents that plan, execute, and course-correct across your workflows — no babysitting required."
          tag="ACTIVE 24/7"
        />
      </section>

      <section className="main-section main-section--right" id="feature-2">
        <HudPanel
          variant="portrait-b"
          align="right"
          label="02 // REAL-TIME INTELLIGENCE"
          icon="intelligence"
          headline="Answers before you finish asking"
          body="XAEZOR ingests live data streams and surfaces the signal instantly — sub-second reasoning across millions of data points."
          tag="LATENCY: 40ms AVG"
        />
      </section>

      <section className="main-section main-section--left" id="feature-3">
        <HudPanel
          variant="portrait-a"
          align="left"
          label="03 // SECURE BY DESIGN"
          icon="secure"
          headline="Built on a zero-trust core"
          body="End-to-end encryption, isolated agent sandboxes, and full audit trails by default — security isn't a setting, it's the architecture."
          tag="SOC2 · ISO 27001"
        />
      </section>

      <section className="main-section main-section--right" id="feature-4">
        <HudPanel
          variant="portrait-b"
          align="right"
          label="04 // INFINITE SCALE"
          icon="scale"
          headline="From one task to one million"
          body="The same core that runs your first workflow scales to run your entire company's — no re-architecture, no ceiling."
          tag="AUTO-SCALING"
        />
      </section>

      {/* ═══ NEW: INTEGRATIONS ═══ */}
      <section className="main-section main-section--center" id="integrations-section">
        <HudPanel
          variant="landscape"
          align="center"
          label="// COMPATIBLE_SYSTEMS"
          headline="Plugs into what you already run"
        >
          <div className="integrations-grid">
            {['SLACK', 'NOTION', 'GITHUB', 'SALESFORCE', 'ZAPIER'].map(sys => (
              <div key={sys} className="integration-box cursor-target">
                {sys}
              </div>
            ))}
          </div>
        </HudPanel>
      </section>

      {/* ═══ CHECKPOINT 4: STATS ═══ */}
      <section className="main-section main-section--center" id="stats-section">
        <HudPanel
          variant="landscape"
          align="center"
          label="// LIVE_METRICS"
          headline="Performance at scale"
          stats={[
            { value: '10.4M+', label: 'REQUESTS/DAY' },
            { value: '99.99%', label: 'UPTIME' },
            { value: '40ms', label: 'AVG RESPONSE' },
            { value: '280+', label: 'TEAMS ONBOARD' },
          ]}
        />
      </section>

      {/* ═══ NEW: ACCESS TIERS ═══ */}
      <section className="main-section main-section--left" id="tier-1">
        <HudPanel
          variant="portrait-a"
          align="left"
          label="// CLEARANCE_LEVELS"
          headline="RECRUIT"
          body="For individuals starting out. Core agent access, 10K requests/mo, community support."
          tag="$0/mo"
        />
      </section>

      <section className="main-section main-section--right" id="tier-2">
        <HudPanel
          variant="portrait-b"
          align="right"
          label="// CLEARANCE_LEVELS"
          headline="OPERATOR"
          body="For growing teams. Full agent suite, 1M requests/mo, priority support, SSO."
          tag="$49/mo"
          recommended={true}
        />
      </section>

      <section className="main-section main-section--left" id="tier-3">
        <HudPanel
          variant="portrait-a"
          align="left"
          label="// CLEARANCE_LEVELS"
          headline="COMMAND"
          body="For scaled operations. Unlimited requests, dedicated infrastructure, custom SLAs."
          tag="CONTACT SALES"
        />
      </section>

      {/* ═══ CHECKPOINT 5: CTA ═══ */}
      <section className="main-section main-section--center main-cta-section" id="cta-section">
        <HudPanel
          variant="landscape"
          align="center"
          label="// FINAL_SEQUENCE"
          headline="Activate XAEZOR"
          body="Your core is provisioned. Your agents are idle. All that's left is the signal to begin."
          cta={{
            label: 'INITIALIZE ACCESS',
            onClick: () => {
              console.log('CTA clicked — Initialize Access');
            },
          }}
        >
          <div className="cta-subtext">
            No credit card required · Setup in under 2 minutes
          </div>
        </HudPanel>
      </section>

      {/* ═══ NEW: SHUTDOWN FOOTER ═══ */}
      <footer className="main-footer shutdown-footer" id="footer">
        <div className="footer-overlay"></div>
        <div className="footer-terminal">
          <div className="footer-log">
            <p className="log-line">SESSION LOG: TERMINATING...</p>
            <p className="log-line">UPLINK SEVERED.</p>
            <p className="log-line blink-prompt">XAEZOR CORE: SLEEP MODE_ <span>▎</span></p>
          </div>

          <div className="footer-bottom">
            <div className="footer-brand">XAEZOR</div>
            <div className="footer-links">
              <a href="#" className="cursor-target">COMM_CHANNEL // TWITTER</a>
              <a href="#" className="cursor-target">COMM_CHANNEL // GITHUB</a>
              <a href="#" className="cursor-target">COMM_CHANNEL // DISCORD</a>
            </div>
            <div className="footer-copy">© 2026 XAEZOR SYSTEMS · ALL RIGHTS RESERVED</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
