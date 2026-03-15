/**
 * About Me Section - SPACE THEME
 * Clean text-focused about section with centered image
 */
import meImage from '../assets/me.png';

export default function About() {
  return (
    <section
      id="about"
      className="section"
      style={{
        minHeight: '100vh',
        position: 'relative',
        padding: '80px 20px',
        zIndex: 1,
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

      {/* About Me Image */}
      <div
        id="about-image"
        className="about-image"
        style={{
          width: '500px',
          height: '500px',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <img
          src={meImage}
          alt="Mani"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </div>
    </section>
  );
}

