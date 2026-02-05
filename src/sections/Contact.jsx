import { useState } from 'react';

/**
 * Contact Section - SPACE THEME
 * Cosmic nebula background with space distortion
 * Distortion increases on input focus
 */
export default function Contact() {
  const [focusedInput, setFocusedInput] = useState(null);

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
      {/* Cosmic Nebula SVG Filter Background */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          opacity: 0.6,
        }}
      >
        <defs>
          <filter id="nebula-filter">
            {/* Base turbulence for nebula effect */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency={focusedInput ? '0.012' : '0.008'}
              numOctaves="4"
              seed="5"
            >
              <animate
                attributeName="baseFrequency"
                dur="25s"
                values="0.008;0.012;0.008"
                repeatCount="indefinite"
              />
            </feTurbulence>

            {/* Displacement for cosmic waves */}
            <feDisplacementMap
              in="SourceGraphic"
              scale={focusedInput ? '40' : '25'}
            >
              <animate
                attributeName="scale"
                dur="5s"
                values="25;35;25"
                repeatCount="indefinite"
              />
            </feDisplacementMap>

            {/* Color matrix for space colors */}
            <feColorMatrix
              type="matrix"
              values="0 0.8 0 0 0.2
                      0 0.3 0.9 0 0.1
                      0.7 0 0.8 0 0.3
                      0 0 0 1 0"
            />
          </filter>

          {/* Radial gradient for nebula */}
          <radialGradient id="nebula-gradient">
            <stop offset="0%" stopColor="#00ff87" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#b794f6" stopOpacity="0.1" />
          </radialGradient>
        </defs>

        {/* Background shape with filter applied */}
        <rect
          width="100%"
          height="100%"
          fill="url(#nebula-gradient)"
          filter="url(#nebula-filter)"
        />
      </svg>

      {/* Contact Form */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '500px',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(20px)',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 255, 135, 0.3), 0 0 100px rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(0, 255, 135, 0.2)',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '700',
            color: 'var(--silver-white)',
            marginBottom: '12px',
            textAlign: 'center',
            textShadow: '0 0 20px rgba(0, 255, 135, 0.5)',
          }}
        >
          Let's Talk
        </h2>
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--silver-white)',
            opacity: 0.8,
            marginBottom: '32px',
            textAlign: 'center',
          }}
        >
          Have a cosmic project in mind? Launch a message.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert('Form submitted! (Demo only)');
          }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--aurora-green)',
                marginBottom: '8px',
              }}
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              onFocus={() => setFocusedInput('name')}
              onBlur={() => setFocusedInput(null)}
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '16px',
                border: '2px solid rgba(0, 255, 135, 0.3)',
                borderRadius: '8px',
                backgroundColor: 'rgba(5, 8, 16, 0.6)',
                color: 'var(--silver-white)',
                outline: 'none',
                transition: 'all 0.3s ease',
                boxShadow: focusedInput === 'name' ? '0 0 20px rgba(0, 255, 135, 0.4)' : 'none',
              }}
            />
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--aurora-green)',
                marginBottom: '8px',
              }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '16px',
                border: '2px solid rgba(0, 255, 135, 0.3)',
                borderRadius: '8px',
                backgroundColor: 'rgba(5, 8, 16, 0.6)',
                color: 'var(--silver-white)',
                outline: 'none',
                transition: 'all 0.3s ease',
                boxShadow: focusedInput === 'email' ? '0 0 20px rgba(0, 255, 135, 0.4)' : 'none',
              }}
            />
          </div>

          {/* Message Textarea */}
          <div>
            <label
              htmlFor="message"
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--aurora-green)',
                marginBottom: '8px',
              }}
            >
              Message
            </label>
            <textarea
              id="message"
              required
              rows="5"
              onFocus={() => setFocusedInput('message')}
              onBlur={() => setFocusedInput(null)}
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '16px',
                border: '2px solid rgba(0, 255, 135, 0.3)',
                borderRadius: '8px',
                backgroundColor: 'rgba(5, 8, 16, 0.6)',
                color: 'var(--silver-white)',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
                transition: 'all 0.3s ease',
                boxShadow: focusedInput === 'message' ? '0 0 20px rgba(0, 255, 135, 0.4)' : 'none',
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-button"
            style={{
              padding: '14px 32px',
              fontSize: '16px',
              fontWeight: '600',
              color: 'var(--space-dark)',
              background: 'linear-gradient(135deg, var(--aurora-green), var(--aurora-blue))',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0, 255, 135, 0.4), 0 0 20px rgba(0, 255, 135, 0.2)',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(135deg, var(--aurora-blue), var(--aurora-purple))';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(0, 255, 135, 0.6), 0 0 30px rgba(0, 212, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(135deg, var(--aurora-green), var(--aurora-blue))';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(0, 255, 135, 0.4), 0 0 20px rgba(0, 255, 135, 0.2)';
            }}
          >
            Launch Message 🚀
          </button>
        </form>

        {/* Footer */}
        <div
          style={{
            marginTop: '32px',
            textAlign: 'center',
            fontSize: '14px',
            color: 'var(--silver-white)',
            opacity: 0.7,
          }}
        >
          Or reach me at{' '}
          <a
            href="mailto:hello@example.com"
            style={{
              color: 'var(--aurora-green)',
              textDecoration: 'none',
              fontWeight: '600',
              textShadow: '0 0 10px rgba(0, 255, 135, 0.5)',
            }}
          >
            hello@example.com
          </a>
        </div>
      </div>
    </section>
  );
}


