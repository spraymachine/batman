/**
 * About Me Section - SPACE THEME
 * Clean text-focused about section with centered image
 */
export default function About() {
  return (
    <section
      id="about"
      className="section"
      style={{
        minHeight: '100vh',
        position: 'relative',
        padding: '80px 20px',
        zIndex: 5,
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >

      {/* About Text */}
      <div
        className="about-text"
        style={{
          textAlign: 'center',
          maxWidth: '600px',
          marginBottom: '60px',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '700',
            color: 'var(--silver-white)',
            marginBottom: '16px',
            textShadow: '0 0 20px rgba(0, 255, 135, 0.5)',
          }}
        >
          About Me
        </h2>
        <p
          style={{
            fontSize: '1.125rem',
            color: 'var(--silver-white)',
            lineHeight: '1.6',
            opacity: 0.8,
          }}
        >
          I create performant, scroll-driven web experiences that traverse
          the cosmos. Every animation tells a cosmic story.
        </p>
      </div>

      {/* Placeholder Image - Centered */}
      <div
        id="about-image"
        className="about-image"
        style={{
          width: '500px',
          height: '500px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, var(--aurora-green) 0%, var(--aurora-blue) 50%, var(--aurora-purple) 100%)',
          boxShadow: `
            0 0 40px rgba(0, 255, 135, 0.4),
            0 0 80px rgba(0, 212, 255, 0.3),
            inset 0 0 60px rgba(0, 0, 0, 0.3)
          `,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '3px solid var(--silver-white)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Inner glow effect */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at center, transparent 40%, rgba(0, 0, 0, 0.4) 100%)',
          }}
        />
        <span
          style={{
            fontSize: '2rem',
            color: 'var(--silver-white)',
            fontWeight: '600',
            zIndex: 1,
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
          }}
        >
          Your Image
        </span>
      </div>
    </section>
  );
}

