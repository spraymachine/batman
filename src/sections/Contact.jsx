import { useState } from 'react';

/**
 * Contact Section - SPACE THEME
 * Deep-space form card with aurora accents, nebula SVG background,
 * and cosmic glow states on interaction.
 */
export default function Contact() {
  const [focusedInput, setFocusedInput] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section
      id="contact"
      className="section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'transparent',
      }}
    >
      {/* Nebula SVG background */}
      <svg
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
          zIndex: 1,
          opacity: focusedInput ? 0.5 : 0.35,
          transition: 'opacity 0.6s ease',
        }}
        aria-hidden="true"
      >
        <defs>
          <filter id="nebula-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={focusedInput ? '0.013' : '0.008'}
              numOctaves="4"
              seed="5"
            >
              <animate attributeName="baseFrequency" dur="30s"
                values="0.008;0.013;0.008" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale={focusedInput ? '45' : '28'}>
              <animate attributeName="scale" dur="6s"
                values="28;42;28" repeatCount="indefinite" />
            </feDisplacementMap>
            <feColorMatrix type="matrix"
              values="0   0.5 0.1 0 0.05
                      0.1 0.1 0.8 0 0.05
                      0.4 0   0.7 0 0.2
                      0   0   0   1 0" />
          </filter>
          <radialGradient id="nebula-gradient" cx="50%" cy="50%" r="70%">
            <stop offset="0%"   stopColor="#00ff87" stopOpacity="0.22" />
            <stop offset="35%"  stopColor="#00d4ff" stopOpacity="0.16" />
            <stop offset="65%"  stopColor="#b794f6" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#000010" stopOpacity="0.05" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%"
          fill="url(#nebula-gradient)"
          filter="url(#nebula-filter)" />
      </svg>

      {/* Star-dot decorations */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }} aria-hidden="true">
        {[
          [12, 18], [88, 12], [6, 72], [92, 68], [50, 5], [22, 90],
          [76, 85], [38, 15], [65, 92], [15, 50], [84, 40], [45, 78],
        ].map(([x, y], i) => (
          <circle key={i} cx={`${x}%`} cy={`${y}%`}
            r={i % 3 === 0 ? 1.5 : 1}
            fill={i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#b794f6' : '#00ff87'}
            opacity={0.3 + (i % 4) * 0.12}
          />
        ))}
      </svg>

      {/* Form card */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '520px',
          background: 'linear-gradient(160deg, rgba(0,4,20,0.97) 0%, rgba(0,8,30,0.95) 100%)',
          backdropFilter: 'blur(24px)',
          padding: 'clamp(28px, 5vw, 48px)',
          borderRadius: '16px',
          border: '1px solid rgba(0, 212, 255, 0.15)',
          boxShadow:
            '0 0 0 1px rgba(183, 148, 246, 0.08), ' +
            '0 24px 64px rgba(0, 0, 0, 0.6), ' +
            '0 0 80px rgba(0, 212, 255, 0.06), ' +
            `inset 0 1px 0 rgba(232, 244, 248, 0.06)`,
        }}
      >
        {/* Top accent bar */}
        <div style={{
          position: 'absolute',
          top: 0, left: '10%', right: '10%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #00d4ff, #b794f6, #00ff87, transparent)',
          borderRadius: '0 0 2px 2px',
          opacity: 0.7,
        }} />

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(20px, 4vw, 32px)' }}>
          {/* Coordinate label */}
          <div style={{
            fontFamily: 'monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.3em',
            color: 'rgba(0, 212, 255, 0.5)',
            marginBottom: '12px',
            textTransform: 'uppercase',
          }}>
            TRANSMISSION — 0xC0NT4CT
          </div>

          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            fontWeight: '700',
            lineHeight: 1.1,
            marginBottom: '10px',
            background: 'linear-gradient(135deg, var(--silver-white) 0%, var(--aurora-blue) 50%, var(--aurora-purple) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 18px rgba(0, 212, 255, 0.25))',
          }}>
            Let's Talk
          </h2>
          <p style={{
            fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
            color: 'rgba(232, 244, 248, 0.45)',
            lineHeight: 1.6,
            fontStyle: 'italic',
          }}>
            Have a cosmic project in mind? Launch a message.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

          {/* Name */}
          <Field
            id="name" label="Name" type="text"
            focused={focusedInput === 'name'}
            onFocus={() => setFocusedInput('name')}
            onBlur={() => setFocusedInput(null)}
          />

          {/* Email */}
          <Field
            id="email" label="Email" type="email"
            focused={focusedInput === 'email'}
            onFocus={() => setFocusedInput('email')}
            onBlur={() => setFocusedInput(null)}
          />

          {/* Message */}
          <Field
            id="message" label="Message" type="textarea" rows={5}
            focused={focusedInput === 'message'}
            onFocus={() => setFocusedInput('message')}
            onBlur={() => setFocusedInput(null)}
          />

          {/* Submit */}
          <button
            type="submit"
            style={{
              marginTop: '4px',
              padding: 'clamp(12px, 2vw, 16px) clamp(24px, 4vw, 36px)',
              fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)',
              fontWeight: '600',
              letterSpacing: '0.06em',
              color: '#000a18',
              background: submitted
                ? 'linear-gradient(135deg, var(--aurora-green), #00d4ff)'
                : 'linear-gradient(135deg, var(--aurora-green), var(--aurora-blue))',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.35s ease',
              boxShadow: '0 4px 20px rgba(0, 255, 135, 0.3), 0 0 40px rgba(0, 255, 135, 0.1)',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 212, 255, 0.45), 0 0 60px rgba(183, 148, 246, 0.2)';
              e.currentTarget.style.background = 'linear-gradient(135deg, var(--aurora-blue), var(--aurora-purple))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 255, 135, 0.3), 0 0 40px rgba(0, 255, 135, 0.1)';
              e.currentTarget.style.background = 'linear-gradient(135deg, var(--aurora-green), var(--aurora-blue))';
            }}
          >
            {submitted ? '✓ Signal Received' : 'Launch Message 🚀'}
          </button>
        </form>

        {/* Footer link */}
        <div style={{
          marginTop: '24px',
          textAlign: 'center',
          fontFamily: 'monospace',
          fontSize: '0.7rem',
          color: 'rgba(232, 244, 248, 0.3)',
          letterSpacing: '0.05em',
        }}>
          Or transmit directly to{' '}
          <a href="mailto:hello@example.com" style={{
            color: 'var(--aurora-green)',
            textDecoration: 'none',
            textShadow: '0 0 8px rgba(0, 255, 135, 0.4)',
            transition: 'text-shadow 0.3s',
          }}>
            hello@example.com
          </a>
        </div>

        {/* Bottom accent bar */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: '20%', right: '20%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(183, 148, 246, 0.4), transparent)',
        }} />
      </div>
    </section>
  );
}

/* ─── Reusable field component ─────────────────────────────── */
function Field({ id, label, type, rows, focused, onFocus, onBlur }) {
  const focusGlowColors = {
    name:    'rgba(0, 255, 135, 0.35)',
    email:   'rgba(0, 212, 255, 0.35)',
    message: 'rgba(183, 148, 246, 0.35)',
  };
  const focusBorderColors = {
    name:    'rgba(0, 255, 135, 0.6)',
    email:   'rgba(0, 212, 255, 0.6)',
    message: 'rgba(183, 148, 246, 0.6)',
  };
  const labelColors = {
    name:    'var(--aurora-green)',
    email:   'var(--aurora-blue)',
    message: 'var(--aurora-purple)',
  };

  const baseInputStyle = {
    width: '100%',
    padding: 'clamp(10px, 1.5vw, 13px) clamp(12px, 2vw, 16px)',
    fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)',
    border: `1px solid ${focused ? focusBorderColors[id] : 'rgba(0, 212, 255, 0.1)'}`,
    borderRadius: '8px',
    background: 'rgba(0, 8, 28, 0.7)',
    color: 'var(--silver-white)',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: focused
      ? `0 0 0 3px ${focusGlowColors[id]}, inset 0 0 20px rgba(0,0,0,0.3)`
      : 'inset 0 0 20px rgba(0,0,0,0.3)',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  };

  return (
    <div>
      <label htmlFor={id} style={{
        display: 'block',
        fontSize: 'clamp(0.7rem, 1.2vw, 0.75rem)',
        fontWeight: '600',
        fontFamily: 'monospace',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: focused ? labelColors[id] : 'rgba(232, 244, 248, 0.4)',
        marginBottom: '6px',
        transition: 'color 0.3s ease',
      }}>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id} required rows={rows}
          onFocus={onFocus} onBlur={onBlur}
          style={{ ...baseInputStyle, resize: 'vertical', minHeight: '110px' }}
        />
      ) : (
        <input
          id={id} type={type} required
          onFocus={onFocus} onBlur={onBlur}
          style={baseInputStyle}
        />
      )}
    </div>
  );
}
