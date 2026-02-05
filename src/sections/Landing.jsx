/**
 * Landing Section - SPACE THEME
 * Full viewport, minimal headline
 * Sun and Moon start above viewport and fall on scroll
 */
export default function Landing() {
  return (
    <section
      id="landing"
      className="section"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        position: 'relative',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          maxWidth: '800px',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: '700',
            color: 'var(--silver-white)',
            marginBottom: '20px',
            lineHeight: '1.2',
            textShadow: '0 0 20px rgba(0, 255, 135, 0.5), 0 0 40px rgba(0, 212, 255, 0.3)',
          }}
        >
          Creative Frontend
          <br />
          <span style={{ 
            background: 'linear-gradient(135deg, var(--aurora-green), var(--aurora-blue))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Engineer
          </span>
        </h1>
        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--silver-white)',
            opacity: 0.8,
            fontWeight: '400',
            lineHeight: '1.6',
          }}
        >
          Building cosmic scroll-driven experiences across the universe
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: 0.6,
        }}
      >
        <span
          style={{
            fontSize: '12px',
            fontWeight: '500',
            color: 'var(--aurora-green)',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: '2px',
            height: '30px',
            background: 'linear-gradient(180deg, var(--aurora-green), var(--aurora-blue))',
            borderRadius: '2px',
            boxShadow: '0 0 10px rgba(0, 255, 135, 0.5)',
          }}
        />
      </div>
    </section>
  );
}


