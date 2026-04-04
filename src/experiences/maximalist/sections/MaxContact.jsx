import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextScramble from '../components/TextScramble';
import useIsMobile from '../../../hooks/useIsMobile';

gsap.registerPlugin(ScrollTrigger);

const TERMINAL_LINES = [
  '> initializing contact protocol...',
  '> status: READY',
  '> awaiting transmission_',
];

export default function MaxContact() {
  const sectionRef = useRef(null);
  const mobile = useIsMobile();
  const [terminalReady, setTerminalReady] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => setTerminalReady(true),
      });

      gsap.fromTo('.contact-title-word',
        { y: 100, opacity: 0 },
        {
          y: 0, opacity: 1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
          stagger: 0.1,
          duration: 0.8,
          ease: 'power4.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Terminal typing effect
  useEffect(() => {
    if (!terminalReady) return;
    let line = 0;
    const interval = setInterval(() => {
      line++;
      setVisibleLines(line);
      if (line >= TERMINAL_LINES.length) clearInterval(interval);
    }, 600);
    return () => clearInterval(interval);
  }, [terminalReady]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: 'clamp(4rem, 8vw, 10rem) clamp(2rem, 4vw, 6rem)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#0a0a0a',
      }}
    >
      {/* Huge background text */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(12rem, 25vw, 30rem)',
        fontWeight: 800,
        color: 'rgba(42,49,255,0.04)',
        lineHeight: 0.85,
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        userSelect: 'none',
      }}>
        SAY
        <br />
        HI
      </div>

      {/* Section label */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6rem',
        letterSpacing: '0.35em',
        color: '#60d35e',
        marginBottom: '1rem',
        position: 'relative',
        zIndex: 2,
      }}>
        005 — CONTACT
      </div>

      <div className="max-divider" style={{ marginBottom: 'clamp(3rem, 5vw, 5rem)', position: 'relative', zIndex: 2 }} />

      {/* Main content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
        gap: mobile ? '2.5rem' : 'clamp(3rem, 5vw, 6rem)',
        maxWidth: '1200px',
        alignItems: mobile ? 'stretch' : 'center',
      }}>
        {/* Left: Big CTA typography */}
        <div>
          <div style={{ overflow: 'hidden' }}>
            <div className="contact-title-word" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 7vw, 7rem)',
              fontWeight: 800,
              lineHeight: 0.9,
              color: '#f8f8f8',
            }}>
              LET'S
            </div>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div className="contact-title-word" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 7vw, 7rem)',
              fontWeight: 800,
              lineHeight: 0.9,
              color: '#2a31ff',
            }}>
              BUILD
            </div>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div className="contact-title-word" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 7vw, 7rem)',
              fontWeight: 800,
              lineHeight: 0.9,
              color: '#60d35e',
            }}>
              SOMETHING
            </div>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div className="contact-title-word glitch-text" data-text="WILD." style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 7vw, 7rem)',
              fontWeight: 800,
              lineHeight: 0.9,
              color: '#f8f8f8',
            }}>
              WILD<span style={{ color: '#2a31ff' }}>.</span>
            </div>
          </div>

          <div style={{ marginTop: 'clamp(2rem, 3vw, 3rem)' }}>
            <a
              href="mailto:hello@mani.dev"
              className="max-magnetic-btn"
              data-cursor-hover
              style={{ textDecoration: 'none' }}
            >
              <span>START A PROJECT →</span>
            </a>
          </div>
        </div>

        {/* Right: Terminal block */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '2px solid rgba(42,49,255,0.3)',
          padding: 'clamp(1.5rem, 2.5vw, 2.5rem)',
          fontFamily: 'var(--font-mono)',
        }}>
          {/* Terminal header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840' }} />
            <span style={{
              fontSize: '0.55rem',
              color: 'rgba(255,255,255,0.25)',
              marginLeft: '0.5rem',
              letterSpacing: '0.1em',
            }}>
              contact.sh
            </span>
          </div>

          {/* Terminal output */}
          <div style={{ minHeight: '120px' }}>
            {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
              <div key={i} style={{
                fontSize: 'clamp(0.65rem, 0.9vw, 0.8rem)',
                color: i === 1 ? '#60d35e' : 'rgba(234,235,255,0.5)',
                marginBottom: '0.6rem',
                letterSpacing: '0.03em',
              }}>
                <TextScramble text={line} trigger={true} speed={20} />
              </div>
            ))}
            {visibleLines >= TERMINAL_LINES.length && (
              <div style={{
                marginTop: '1.5rem',
                fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.3)',
              }}>
                <span style={{ color: '#60d35e' }}>→</span> hello@mani.dev
                <br />
                <span style={{ color: '#2a31ff' }}>→</span> github.com/mani
                <br />
                <span style={{ color: '#eaebff' }}>→</span> linkedin.com/in/mani
              </div>
            )}
          </div>

          {/* Blinking cursor */}
          <div style={{
            marginTop: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
          }}>
            <span style={{ color: '#60d35e', fontSize: '0.75rem' }}>$</span>
            <div style={{
              width: '8px',
              height: '14px',
              background: '#60d35e',
              animation: 'maxBlink 1s step-end infinite',
            }} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(1.5rem, 3vw, 3rem)',
        left: 'clamp(2rem, 4vw, 6rem)',
        right: 'clamp(2rem, 4vw, 6rem)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 2,
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          letterSpacing: '0.15em',
          color: 'rgba(255,255,255,0.2)',
        }}>
          &copy; 2026 MANI — ALL RIGHTS RESERVED
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          letterSpacing: '0.15em',
          color: 'rgba(255,255,255,0.2)',
        }}>
          BUILT WITH OBSESSION
        </span>
      </div>

      <style>{`
        @keyframes maxBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
