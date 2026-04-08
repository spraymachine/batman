import { useRef } from 'react';
import { LaserFlow } from '../components/LaserFlow';

/**
 * Landing Section - SPACE THEME
 * Full viewport, minimal headline
 * Sun and Moon start above viewport and fall on scroll
 */
export default function Landing() {
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);

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
        overflow: 'hidden',
      }}
    >
      {/* LaserFlow - Bottom corners */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 'min(1080px, 65vh)',
          zIndex: 2,
          pointerEvents: 'none',
          overflow: 'visible',
        }}
      >
        {/* Left - bottom left corner */}
        <div style={{ width: '1080px', height: '1080px', position: 'absolute', left: 0, bottom: 0 }}>
          <LaserFlow
            color="#ffffff"
            wispDensity={1.6}
            flowSpeed={0.7}
            verticalSizing={3.6}
            horizontalSizing={1.8}
            fogIntensity={0.45}
            fogScale={0.3}
            wispSpeed={15}
            wispIntensity={5}
            flowStrength={0.25}
            decay={1.1}
            horizontalBeamOffset={-0.5}
            verticalBeamOffset={-0.5}
          />
        </div>

        {/* Right - bottom right corner */}
        <div style={{ width: '1080px', height: '1080px', position: 'absolute', right: 0, bottom: 0 }}>
          <LaserFlow
            color="#ffffff"
            wispDensity={1.6}
            flowSpeed={0.7}
            verticalSizing={3.6}
            horizontalSizing={1.8}
            fogIntensity={0.45}
            fogScale={0.3}
            wispSpeed={15}
            wispIntensity={5}
            flowStrength={0.25}
            decay={1.1}
            horizontalBeamOffset={0.5}
            verticalBeamOffset={-0.5}
          />
        </div>
      </div>

      <div
        id="landing-content"
        style={{
          textAlign: 'center',
          maxWidth: '800px',
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          position: 'relative',
          zIndex: 4,
          opacity: 0,
        }}
      >
        {/* Orbital ring decoration */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(280px, 55vw, 480px)',
          height: 'clamp(280px, 55vw, 480px)',
          borderRadius: '50%',
          border: '1px solid rgba(0, 212, 255, 0.08)',
          pointerEvents: 'none',
          zIndex: -1,
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(30deg)',
          width: 'clamp(360px, 70vw, 620px)',
          height: 'clamp(200px, 38vw, 340px)',
          borderRadius: '50%',
          border: '1px solid rgba(183, 148, 246, 0.06)',
          pointerEvents: 'none',
          zIndex: -1,
        }} />

        <h1
          ref={headingRef}
          id="landing-heading"
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: '700',
            color: 'var(--silver-white)',
            marginBottom: '20px',
            lineHeight: '1.2',
            textShadow: '0 0 40px rgba(232, 244, 248, 0.15)',
            letterSpacing: '-0.01em',
          }}
        >
          Hi, I'm <span id="landing-name">Mani</span>
        </h1>

        {/* Divider line with gradient */}
        <div style={{
          width: 'clamp(60px, 12vw, 100px)',
          height: '1px',
          margin: '0 auto 20px',
          background: 'linear-gradient(90deg, transparent, var(--aurora-blue), var(--aurora-purple), transparent)',
          opacity: 0.6,
        }} />

        <p
          ref={subheadingRef}
          id="landing-subheading"
          style={{
            fontSize: 'clamp(0.75rem, 1.5vw, 0.95rem)',
            color: 'var(--aurora-blue)',
            opacity: 0.9,
            fontWeight: '500',
            lineHeight: '1.6',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            textShadow: '0 0 20px rgba(0, 212, 255, 0.4)',
          }}
        >
          coding EXPERIENCES
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
          zIndex: 4,
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
