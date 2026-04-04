import { useState } from 'react';

const THEMES = [
  { id: '/space', label: 'SPACE' },
  { id: '/max',   label: 'MAXIMAL' },
  { id: '/min',   label: 'MINIMAL' },
];

export default function ThemeSwitcher({ current, navigate }) {
  const others = THEMES.filter((t) => t.id !== current);

  return (
    <div style={styles.root(current)}>
      {others.map((t) => (
        <Btn key={t.id} theme={t} variant={current} navigate={navigate} />
      ))}
    </div>
  );
}

function Btn({ theme, variant, navigate }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      style={styles.btn(variant, hovered)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(theme.id)}
    >
      {theme.label}
    </button>
  );
}

/* ─── STYLES ─────────────────────────────────────────────────────── */
const base = {
  position: 'fixed',
  bottom: '1.5rem',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 9999,
  display: 'flex',
  gap: '0.5rem',
  padding: '0.4rem 0.6rem',
  borderRadius: '999px',
  pointerEvents: 'auto',
};

const btnBase = {
  fontFamily: 'monospace',
  fontSize: '0.6rem',
  letterSpacing: '0.18em',
  cursor: 'pointer',
  border: 'none',
  borderRadius: '999px',
  padding: '0.35rem 0.85rem',
  transition: 'all 0.2s ease',
};

const styles = {
  root: (variant) => {
    if (variant === '/space') return {
      ...base,
      background: 'rgba(0,0,0,0.55)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255,255,255,0.08)',
    };
    if (variant === '/max') return {
      ...base,
      background: '#08081a',
      border: '1px solid rgba(0,212,255,0.3)',
    };
    // min
    return {
      ...base,
      background: '#fff',
      border: '1px solid rgba(0,0,0,0.12)',
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    };
  },

  btn: (variant, hovered) => {
    if (variant === '/space') return {
      ...btnBase,
      color: hovered ? '#00ff87' : 'rgba(232,244,248,0.55)',
      background: hovered ? 'rgba(0,255,135,0.08)' : 'transparent',
    };
    if (variant === '/max') return {
      ...btnBase,
      color: hovered ? '#00d4ff' : 'rgba(0,212,255,0.5)',
      background: hovered ? 'rgba(0,212,255,0.08)' : 'transparent',
    };
    // min
    return {
      ...btnBase,
      color: hovered ? '#000' : 'rgba(0,0,0,0.4)',
      background: hovered ? 'rgba(0,0,0,0.05)' : 'transparent',
    };
  },
};
