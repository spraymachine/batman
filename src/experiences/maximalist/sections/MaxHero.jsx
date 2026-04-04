import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import TextScramble from '../components/TextScramble';
import SVGGrid from '../components/SVGGrid';

export default function MaxHero() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const [scrambleReady, setScrambleReady] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger in each word
      const words = headlineRef.current?.querySelectorAll('.hero-word');
      if (words) {
        gsap.fromTo(
          words,
          { y: 120, rotateX: -60, opacity: 0 },
          {
            y: 0,
            rotateX: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 1,
            ease: 'power4.out',
            delay: 0.3,
            onComplete: () => setScrambleReady(true),
          }
        );
      }

      // Animate the side labels
      gsap.fromTo(
        '.hero-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out', delay: 1 }
      );

      // CTA
      gsap.fromTo(
        '.hero-cta',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.4 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: 'clamp(2rem, 4vw, 6rem)',
      }}
    >
      {/* Interactive SVG background */}
      <SVGGrid />

      {/* Brutalist corner accents */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: 'clamp(60px, 10vw, 120px)',
        height: 'clamp(60px, 10vw, 120px)',
        borderLeft: '3px solid #2a31ff',
        borderTop: '3px solid #2a31ff',
        zIndex: 2,
      }} />
      <div style={{
        position: 'absolute', bottom: 0, right: 0,
        width: 'clamp(60px, 10vw, 120px)',
        height: 'clamp(60px, 10vw, 120px)',
        borderRight: '3px solid #60d35e',
        borderBottom: '3px solid #60d35e',
        zIndex: 2,
      }} />

      {/* Side index label */}
      <div
        className="hero-label"
        style={{
          position: 'absolute',
          left: 'clamp(1rem, 3vw, 3rem)',
          top: '50%',
          transform: 'translateY(-50%) rotate(-90deg)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.3em',
          color: 'rgba(96,211,94,0.5)',
          transformOrigin: 'left center',
          whiteSpace: 'nowrap',
          zIndex: 2,
        }}
      >
        001 — HERO
      </div>

      {/* Marquee ribbon */}
      <div style={{
        position: 'absolute',
        top: 'clamp(1.5rem, 3vw, 3rem)',
        left: 0,
        right: 0,
        overflow: 'hidden',
        zIndex: 1,
      }}>
        <div className="max-marquee">
          <div className="max-marquee-inner" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.4em',
            color: '#00ff87',
            gap: '3rem',
            display: 'flex',
          }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} style={{ padding: '0 1.5rem' }}>
                FRONTEND ENGINEER ★ CREATIVE DEVELOPER ★ UI ARCHITECT ★
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main headline */}
      <div
        ref={headlineRef}
        style={{
          position: 'relative',
          zIndex: 3,
          maxWidth: '1200px',
          perspective: '800px',
        }}
      >
        {/* Massive title */}
        <div style={{ overflow: 'hidden', marginBottom: '-0.15em' }}>
          <div className="hero-word" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 10vw, 9rem)',
            fontWeight: 800,
            lineHeight: 0.95,
            color: '#f8f8f8',
          }}>
            I BUILD
          </div>
        </div>
        <div style={{ overflow: 'hidden', marginBottom: '-0.15em' }}>
          <div className="hero-word glitch-text" data-text="LOUD, FAST" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 10vw, 9rem)',
            fontWeight: 800,
            lineHeight: 0.95,
            color: '#2a31ff',
            WebkitTextStroke: '1px rgba(255,255,255,0.1)',
          }}>
            LOUD, FAST
          </div>
        </div>
        <div style={{ overflow: 'hidden', marginBottom: '-0.1em' }}>
          <div className="hero-word" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 8vw, 7.5rem)',
            fontWeight: 800,
            lineHeight: 0.95,
            color: '#60d35e',
          }}>
            UNFORGETTABLE
          </div>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div className="hero-word" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 10vw, 9rem)',
            fontWeight: 800,
            lineHeight: 0.95,
            color: '#f8f8f8',
          }}>
            WEB<span style={{ color: '#2a31ff' }}>.</span>
          </div>
        </div>

        {/* Scramble subtitle */}
        <div style={{
          marginTop: 'clamp(1.5rem, 3vw, 3rem)',
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.7rem, 1.2vw, 0.95rem)',
          color: 'rgba(234,235,255,0.5)',
          maxWidth: '480px',
          lineHeight: 1.6,
          letterSpacing: '0.02em',
        }}>
          <TextScramble
            text="Creative developer obsessed with brutalist interfaces, kinetic typography, and interactions that make people stop scrolling."
            trigger={scrambleReady}
            speed={15}
          />
        </div>
      </div>

      {/* CTA */}
      <div className="hero-cta" style={{ position: 'relative', zIndex: 3, marginTop: 'clamp(2rem, 4vw, 4rem)' }}>
        <button
          className="max-magnetic-btn"
          data-cursor-hover
          onClick={() => {
            document.getElementById('max-projects')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span>VIEW WORK →</span>
        </button>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(1.5rem, 3vw, 3rem)',
        right: 'clamp(1.5rem, 3vw, 3rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        zIndex: 2,
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          letterSpacing: '0.2em',
          color: 'rgba(255,255,255,0.3)',
          writingMode: 'vertical-rl',
        }}>
          SCROLL
        </span>
        <div style={{
          width: '1px',
          height: '50px',
          background: 'linear-gradient(to bottom, #2a31ff, transparent)',
          animation: 'maxPulse 2s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes maxPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.3); }
        }
      `}</style>
    </section>
  );
}
