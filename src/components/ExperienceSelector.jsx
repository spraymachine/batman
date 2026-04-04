import { useState, useEffect } from 'react';

/**
 * ExperienceSelector
 * Full-screen portal shown before any experience loads.
 * Clicking "SPACE" transitions into the existing space portfolio.
 * The other two cards are placeholders (coming soon).
 */
export default function ExperienceSelector({ navigate }) {
  const [mounted, setMounted] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Stagger entrance
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  function handleSelect(id) {
    if (!['space', 'max', 'min'].includes(id)) return;
    setExiting(true);
    setTimeout(() => navigate(`/${id}`), 900);
  }

  return (
    <div style={styles.root(exiting)}>
      {/* Ambient radial glow behind everything */}
      <div style={styles.ambientGlow} />

      {/* Heading */}
      <div style={styles.header(mounted)}>
        <p style={styles.subtitle}>SELECT YOUR EXPERIENCE</p>
        <h1 style={styles.title}>MANI</h1>
      </div>

      {/* Cards */}
      <div style={styles.grid(mounted)}>
        <SpaceCard onClick={() => handleSelect('space')} />
        <MaximalisticCard onClick={() => handleSelect('max')} />
        <MinimalisticCard onClick={() => handleSelect('min')} />
      </div>

      {/* Footer hint */}
      <p style={styles.hint(mounted)}>hover to preview · click to enter</p>
    </div>
  );
}

/* ─── SPACE CARD ─────────────────────────────────────────────── */
function SpaceCard({ onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      style={styles.card(hovered, 'space')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      aria-label="Enter Space experience"
    >
      {/* Star particles */}
      <StarParticles />

      {/* Gradient layers */}
      <div style={styles.spaceGradient(hovered)} />
      <div style={styles.spaceNebula} />

      {/* Mini sun + moon icons */}
      <div style={styles.orbitRow}>
        <span style={styles.sunIcon(hovered)}>☀</span>
        <div style={styles.orbitLine(hovered)} />
        <span style={styles.moonIcon(hovered)}>☽</span>
      </div>

      {/* Label */}
      <div style={styles.cardLabel}>
        <p style={styles.cardTag('space')}>01</p>
        <h2 style={styles.cardTitle('space', hovered)}>SPACE</h2>
        <p style={styles.cardDesc('space')}>Cosmic · Scroll-driven · 3D</p>
      </div>

      {/* Enter arrow */}
      <div style={styles.enterArrow(hovered)}>
        ENTER →
      </div>

      {/* Border glow */}
      <div style={styles.cardBorder('space', hovered)} />
    </button>
  );
}

/* ─── MAXIMALISTIC CARD ──────────────────────────────────────── */
function MaximalisticCard({ onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      style={styles.card(hovered, 'max')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      aria-label="Enter Maximalist experience"
    >
      {/* Bold gradient background */}
      <div style={styles.maxBg} />
      <div style={styles.maxGrid(hovered)} />

      {/* Geometric decoration */}
      <div style={styles.maxHexRow}>
        {['#2a31ff', '#60d35e', '#eaebff', '#60d35e', '#2a31ff'].map((c, i) => (
          <div key={i} style={styles.maxHex(c, i, hovered)} />
        ))}
      </div>

      {/* Label */}
      <div style={styles.cardLabel}>
        <p style={styles.cardTag('max')}>02</p>
        <h2 style={styles.cardTitle('max', hovered)}>MAXIMAL</h2>
        <p style={styles.cardDesc('max')}>Brutalist · Bold · Electric</p>
      </div>

      {/* Enter arrow */}
      <div style={styles.enterArrowMax(hovered)}>
        ENTER →
      </div>

      <div style={styles.cardBorder('max', hovered)} />
    </button>
  );
}

/* ─── MINIMALISTIC CARD ──────────────────────────────────────── */
function MinimalisticCard({ onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      style={styles.card(hovered, 'min')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      aria-label="Enter Minimalist experience"
    >
      {/* Clean white background */}
      <div style={styles.minBg} />

      {/* Thin horizontal lines decoration */}
      <div style={styles.minLines(hovered)}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={styles.minLine(i, hovered)} />
        ))}
      </div>

      {/* Single geometric accent */}
      <div style={styles.minCircle(hovered)} />

      {/* Label */}
      <div style={styles.cardLabel}>
        <p style={styles.cardTag('min')}>03</p>
        <h2 style={styles.cardTitle('min', hovered)}>MINIMAL</h2>
        <p style={styles.cardDesc('min')}>Clean · Still · Type-first</p>
      </div>

      {/* Enter arrow */}
      <div style={styles.enterArrowMin(hovered)}>
        ENTER →
      </div>

      <div style={styles.cardBorder('min', hovered)} />
    </button>
  );
}

/* ─── STAR PARTICLES (pure CSS, no canvas) ───────────────────── */
function StarParticles() {
  const stars = Array.from({ length: 40 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    delay: Math.random() * 4,
    dur: Math.random() * 3 + 2,
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 'inherit' }}>
      {stars.map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            background: '#fff',
            opacity: 0,
            animation: `selectorTwinkle ${s.dur}s ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── STYLES ─────────────────────────────────────────────────── */
const styles = {
  root: (exiting) => ({
    position: 'fixed',
    inset: 0,
    zIndex: 999999,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'clamp(1.5rem, 3vh, 3rem)',
    background: '#000',
    transition: 'opacity 0.8s ease, transform 0.8s ease',
    opacity: exiting ? 0 : 1,
    transform: exiting ? 'scale(1.04)' : 'scale(1)',
    overflowX: 'hidden',
    overflowY: 'auto',
  }),

  ambientGlow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '120vw',
    height: '120vh',
    background:
      'radial-gradient(ellipse at 30% 50%, rgba(183,148,246,0.07) 0%, transparent 60%),' +
      'radial-gradient(ellipse at 70% 50%, rgba(0,212,255,0.05) 0%, transparent 60%)',
    pointerEvents: 'none',
  },

  header: (mounted) => ({
    textAlign: 'center',
    transition: 'opacity 0.8s ease, transform 0.8s ease',
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(-20px)',
  }),

  subtitle: {
    fontFamily: 'monospace',
    fontSize: '0.7rem',
    letterSpacing: '0.35em',
    color: 'rgba(232,244,248,0.35)',
    marginBottom: '0.5rem',
  },

  title: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 'clamp(2rem, 5vw, 4rem)',
    fontWeight: 900,
    letterSpacing: '0.2em',
    color: '#e8f4f8',
    lineHeight: 1,
  },

  grid: (mounted) => ({
    display: 'flex',
    gap: 'clamp(0.75rem, 1.5vw, 1.5rem)',
    padding: '0 clamp(1rem, 3vw, 3rem)',
    transition: 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s',
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(30px)',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '1100px',
    boxSizing: 'border-box',
  }),

  hint: (mounted) => ({
    fontFamily: 'monospace',
    fontSize: '0.65rem',
    letterSpacing: '0.2em',
    color: 'rgba(232,244,248,0.2)',
    transition: 'opacity 1s ease 0.5s',
    opacity: mounted ? 1 : 0,
  }),

  /* Card base */
  card: (hovered, variant) => {
    const cursors = { space: 'pointer', max: 'pointer', min: 'pointer' };
    return {
      position: 'relative',
      width: 'clamp(240px, 30vw, 320px)',
      flex: '1 1 auto',
      height: 'clamp(260px, 40vh, 460px)',
      borderRadius: '12px',
      overflow: 'hidden',
      cursor: cursors[variant],
      background: 'transparent',
      border: 'none',
      padding: 0,
      flexShrink: 1,
      minWidth: 0,
      transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
      transform: hovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
    };
  },

  /* ── Space card styles ── */
  spaceGradient: (hovered) => ({
    position: 'absolute',
    inset: 0,
    background: hovered
      ? 'linear-gradient(160deg, #0a0014 0%, #050020 40%, #000810 100%)'
      : 'linear-gradient(160deg, #06000e 0%, #030015 40%, #000508 100%)',
    transition: 'background 0.5s ease',
  }),

  spaceNebula: {
    position: 'absolute',
    inset: 0,
    background:
      'radial-gradient(ellipse at 60% 30%, rgba(183,148,246,0.18) 0%, transparent 55%),' +
      'radial-gradient(ellipse at 20% 70%, rgba(0,212,255,0.12) 0%, transparent 50%)',
  },

  orbitRow: {
    position: 'absolute',
    top: '22%',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    zIndex: 2,
  },

  sunIcon: (hovered) => ({
    fontSize: 'clamp(1.4rem, 3vw, 2rem)',
    filter: hovered
      ? 'drop-shadow(0 0 12px #ffd700) drop-shadow(0 0 24px #ff6b35)'
      : 'drop-shadow(0 0 6px #ffd700)',
    transition: 'filter 0.4s ease',
    lineHeight: 1,
  }),

  orbitLine: (hovered) => ({
    width: 'clamp(28px, 4vw, 40px)',
    height: '1px',
    background: hovered
      ? 'linear-gradient(90deg, #ffd700, rgba(255,255,255,0.4), #c0c0c0)'
      : 'linear-gradient(90deg, rgba(255,215,0,0.4), rgba(255,255,255,0.15), rgba(192,192,192,0.4))',
    transition: 'background 0.4s ease',
  }),

  moonIcon: (hovered) => ({
    fontSize: 'clamp(1.2rem, 2.5vw, 1.7rem)',
    filter: hovered
      ? 'drop-shadow(0 0 10px #c0c0c0) drop-shadow(0 0 20px #e8f4f8)'
      : 'drop-shadow(0 0 5px #c0c0c0)',
    transition: 'filter 0.4s ease',
    lineHeight: 1,
    color: '#d0d8e0',
  }),

  /* ── Maximalistic card styles ── */
  maxBg: {
    position: 'absolute',
    inset: 0,
    background:
      'linear-gradient(135deg, #08081a 0%, #0e1040 30%, #081a10 70%, #08081a 100%)',
  },

  maxGrid: (hovered) => ({
    position: 'absolute',
    inset: 0,
    backgroundImage:
      'linear-gradient(rgba(0,212,255,0.06) 1px, transparent 1px),' +
      'linear-gradient(90deg, rgba(0,212,255,0.06) 1px, transparent 1px)',
    backgroundSize: '32px 32px',
    opacity: hovered ? 1 : 0.5,
    transition: 'opacity 0.4s ease',
  }),

  maxHexRow: {
    position: 'absolute',
    top: '18%',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '0.5rem',
    zIndex: 2,
  },

  maxHex: (color, i, hovered) => ({
    width: 'clamp(20px, 2.5vw, 28px)',
    height: 'clamp(22px, 2.8vw, 32px)',
    background: color,
    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
    opacity: hovered ? 0.9 : 0.55,
    transform: hovered ? `translateY(${i % 2 === 0 ? -4 : 4}px)` : 'translateY(0)',
    transition: `opacity 0.3s ease ${i * 0.06}s, transform 0.3s ease ${i * 0.06}s`,
    boxShadow: hovered ? `0 0 12px ${color}` : 'none',
    filter: hovered ? `drop-shadow(0 0 6px ${color})` : 'none',
  }),

  /* ── Minimalistic card styles ── */
  minBg: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(160deg, #f5f5f5 0%, #ffffff 50%, #eeeeee 100%)',
  },

  minLines: (hovered) => ({
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: '3rem 1.5rem',
    zIndex: 1,
    opacity: hovered ? 1 : 0.5,
    transition: 'opacity 0.4s ease',
  }),

  minLine: (i, hovered) => ({
    height: '1px',
    background: `rgba(0,0,0,${0.06 + i * 0.01})`,
    transform: hovered ? 'scaleX(1)' : `scaleX(${0.5 + i * 0.07})`,
    transformOrigin: 'left',
    transition: `transform 0.5s ease ${i * 0.04}s`,
  }),

  minCircle: (hovered) => ({
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: hovered ? 'clamp(52px, 7vw, 70px)' : 'clamp(44px, 6vw, 60px)',
    height: hovered ? 'clamp(52px, 7vw, 70px)' : 'clamp(44px, 6vw, 60px)',
    borderRadius: '50%',
    border: '1.5px solid rgba(0,0,0,0.15)',
    transition: 'width 0.4s ease, height 0.4s ease, border-color 0.4s ease',
    zIndex: 2,
    borderColor: hovered ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.15)',
  }),

  /* ── Shared card inner elements ── */
  cardLabel: {
    position: 'relative',
    zIndex: 3,
    padding: 'clamp(1rem, 2vw, 1.5rem)',
    textAlign: 'left',
  },

  cardTag: (variant) => ({
    fontFamily: 'monospace',
    fontSize: '0.65rem',
    letterSpacing: '0.2em',
    color: variant === 'min' ? 'rgba(0,0,0,0.35)' : 'rgba(232,244,248,0.35)',
    marginBottom: '0.3rem',
  }),

  cardTitle: (variant, hovered) => {
    const colors = {
      space: hovered ? '#e8f4f8' : 'rgba(232,244,248,0.85)',
      max: hovered ? '#00ff87' : '#7ec8e3',
      min: hovered ? '#000000' : 'rgba(0,0,0,0.7)',
    };
    return {
      fontFamily: "'Inter', sans-serif",
      fontSize: 'clamp(1.4rem, 3vw, 2rem)',
      fontWeight: 800,
      letterSpacing: '0.12em',
      color: colors[variant],
      lineHeight: 1,
      marginBottom: '0.4rem',
      transition: 'color 0.3s ease',
    };
  },

  cardDesc: (variant) => ({
    fontFamily: 'monospace',
    fontSize: '0.65rem',
    letterSpacing: '0.12em',
    color: variant === 'min' ? 'rgba(0,0,0,0.4)' : 'rgba(232,244,248,0.4)',
  }),

  enterArrow: (hovered) => ({
    position: 'absolute',
    top: 'clamp(0.75rem, 1.5vw, 1rem)',
    right: 'clamp(0.75rem, 1.5vw, 1rem)',
    fontFamily: 'monospace',
    fontSize: '0.65rem',
    letterSpacing: '0.15em',
    color: '#00ff87',
    opacity: hovered ? 1 : 0,
    transform: hovered ? 'translateX(0)' : 'translateX(-6px)',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
    zIndex: 4,
  }),

  enterArrowMin: (hovered) => ({
    position: 'absolute',
    top: 'clamp(0.75rem, 1.5vw, 1rem)',
    right: 'clamp(0.75rem, 1.5vw, 1rem)',
    fontFamily: 'monospace',
    fontSize: '0.65rem',
    letterSpacing: '0.15em',
    color: '#111',
    opacity: hovered ? 1 : 0,
    transform: hovered ? 'translateX(0)' : 'translateX(-6px)',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
    zIndex: 4,
  }),

  enterArrowMax: (hovered) => ({
    position: 'absolute',
    top: 'clamp(0.75rem, 1.5vw, 1rem)',
    right: 'clamp(0.75rem, 1.5vw, 1rem)',
    fontFamily: 'monospace',
    fontSize: '0.65rem',
    letterSpacing: '0.15em',
    color: '#60d35e',
    opacity: hovered ? 1 : 0,
    transform: hovered ? 'translateX(0)' : 'translateX(-6px)',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
    zIndex: 4,
  }),

  comingSoon: (variant) => ({
    position: 'absolute',
    top: 'clamp(0.75rem, 1.5vw, 1rem)',
    right: 'clamp(0.75rem, 1.5vw, 1rem)',
    fontFamily: 'monospace',
    fontSize: '0.55rem',
    letterSpacing: '0.18em',
    padding: '0.2rem 0.5rem',
    borderRadius: '3px',
    background: variant === 'min' ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.07)',
    border: `1px solid ${variant === 'min' ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.1)'}`,
    color: variant === 'min' ? 'rgba(0,0,0,0.4)' : 'rgba(232,244,248,0.4)',
    zIndex: 4,
  }),

  cardBorder: (variant, hovered) => {
    const glows = {
      space: 'rgba(0,255,135,0.5)',
      max: 'rgba(0,212,255,0.5)',
      min: 'rgba(0,0,0,0.3)',
    };
    const borders = {
      space: hovered ? 'rgba(0,255,135,0.4)' : 'rgba(232,244,248,0.08)',
      max: hovered ? 'rgba(0,212,255,0.5)' : 'rgba(0,212,255,0.12)',
      min: hovered ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.1)',
    };
    return {
      position: 'absolute',
      inset: 0,
      borderRadius: '12px',
      border: `1px solid ${borders[variant]}`,
      boxShadow: hovered ? `inset 0 0 30px ${glows[variant]}22, 0 0 30px ${glows[variant]}33` : 'none',
      pointerEvents: 'none',
      transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
      zIndex: 5,
    };
  },
};
