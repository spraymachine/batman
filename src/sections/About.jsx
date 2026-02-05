import AboutStats from '../components/AboutStats';

/**
 * About Me Section - SPACE THEME
 * Clean text-focused about section
 * Stats animate in from bottom
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

      {/* Stats Section (animates from below) */}
      <div id="about-stats-wrapper">
        <AboutStats />
      </div>
    </section>
  );
}

