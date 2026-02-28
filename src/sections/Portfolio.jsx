import CubeGrid from '../components/CubeGrid';

/**
 * Portfolio Section - SPACE THEME
 * Features CSS 3D cubes coming from left and right
 * Scroll-scrubbed animations with perspective
 */
export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="section"
      style={{
        minHeight: 'auto', // Let content determine height
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '80px 20px 200px 20px', // Extra bottom padding to push About down
        position: 'relative',
        zIndex: 1, // Lower z-index so Sun/Moon appear on top
        overflow: 'hidden', // Prevent orbiting cubes from visually overlapping Landing/About
        backgroundColor: 'transparent', // Transparent to show starfield
      }}
    >
      <div
        style={{
          textAlign: 'center',
          marginBottom: '60px',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '700',
            color: 'var(--silver-white)',
            marginBottom: '16px',
            textShadow: '0 0 20px rgba(0, 255, 135, 0.4)',
          }}
        >
          Selected Works
        </h2>
        <p
          style={{
            fontSize: '1.125rem',
            color: 'var(--silver-white)',
            opacity: 0.7,
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          Projects launched across the cosmos with code and creativity
        </p>
      </div>

      <CubeGrid />
    </section>
  );
}

