import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function MinHero() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple, elegant fade-up stagger
      gsap.fromTo(
        '.min-hero-line',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 1.2, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo(
        '.min-hero-sub',
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 1.2 }
      );
      gsap.fromTo(
        '.min-hero-scroll',
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 1.8 }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(3rem, 8vw, 10rem) clamp(2rem, 8vw, 12rem)',
        position: 'relative',
      }}
    >
      {/* Name - top left, barely there */}
      <div className="min-hero-sub" style={{
        position: 'absolute',
        top: 'clamp(2rem, 4vw, 4rem)',
        left: 'clamp(2rem, 8vw, 12rem)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        letterSpacing: '0.2em',
        color: '#888',
        textTransform: 'uppercase',
      }}>
        Mani — Portfolio
      </div>

      {/* Main title */}
      <div>
        <div style={{ overflow: 'hidden' }}>
          <h1 className="min-hero-line" style={{
            fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
            fontWeight: 300,
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            color: '#111',
          }}>
            Frontend
          </h1>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <h1 className="min-hero-line" style={{
            fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
            fontWeight: 300,
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            color: '#111',
          }}>
            Engineer<span style={{ color: '#ccc' }}>.</span>
          </h1>
        </div>
      </div>

      {/* Subtitle */}
      <p className="min-hero-sub" style={{
        marginTop: 'clamp(2rem, 4vw, 4rem)',
        maxWidth: '420px',
        fontSize: 'clamp(0.85rem, 1.1vw, 1rem)',
        lineHeight: 1.8,
        color: '#888',
        fontWeight: 400,
      }}>
        Building thoughtful, precise digital experiences
        with care for craft and attention to detail.
      </p>

      {/* Scroll indicator */}
      <div className="min-hero-scroll" style={{
        position: 'absolute',
        bottom: 'clamp(2rem, 4vw, 4rem)',
        left: 'clamp(2rem, 8vw, 12rem)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      }}>
        <div style={{
          width: '40px',
          height: '1px',
          background: '#ccc',
        }} />
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.15em',
          color: '#bbb',
          textTransform: 'uppercase',
        }}>
          Scroll
        </span>
      </div>
    </section>
  );
}
