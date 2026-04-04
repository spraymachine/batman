import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MinContact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.min-contact-reveal').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 20, opacity: 0 },
          {
            y: 0, opacity: 1,
            scrollTrigger: { trigger: el, start: 'top 85%' },
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(6rem, 12vw, 16rem) clamp(2rem, 8vw, 12rem)',
        borderTop: '1px solid #e8e8e8',
      }}
    >
      {/* Section label */}
      <div className="min-contact-reveal" style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6rem',
        letterSpacing: '0.2em',
        color: '#bbb',
        textTransform: 'uppercase',
        marginBottom: 'clamp(3rem, 5vw, 6rem)',
      }}>
        Contact
      </div>

      {/* Big CTA */}
      <div className="min-contact-reveal">
        <h2 style={{
          fontSize: 'clamp(2.5rem, 5.5vw, 5rem)',
          fontWeight: 300,
          letterSpacing: '-0.04em',
          lineHeight: 1.1,
          color: '#111',
          maxWidth: '700px',
        }}>
          Let's work
          <br />
          together<span style={{ color: '#ccc' }}>.</span>
        </h2>
      </div>

      {/* Email link */}
      <div className="min-contact-reveal" style={{ marginTop: 'clamp(2.5rem, 4vw, 4rem)' }}>
        <a
          href="mailto:hello@mani.dev"
          className="min-link"
          style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
            fontWeight: 400,
            color: '#111',
            textDecoration: 'none',
          }}
        >
          hello@mani.dev
        </a>
      </div>

      {/* Links row */}
      <div className="min-contact-reveal" style={{
        display: 'flex',
        gap: 'clamp(2rem, 4vw, 4rem)',
        marginTop: 'clamp(1.5rem, 2vw, 2rem)',
      }}>
        {['GitHub', 'LinkedIn', 'Twitter'].map((link) => (
          <a
            key={link}
            href="#"
            className="min-link"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.12em',
              color: '#888',
              textDecoration: 'none',
              textTransform: 'uppercase',
            }}
          >
            {link}
          </a>
        ))}
      </div>

      {/* Footer */}
      <div className="min-contact-reveal" style={{
        marginTop: 'clamp(6rem, 10vw, 12rem)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '2rem',
        borderTop: '1px solid #e8e8e8',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          letterSpacing: '0.12em',
          color: '#ccc',
          textTransform: 'uppercase',
        }}>
          &copy; 2026 Mani
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          letterSpacing: '0.12em',
          color: '#ccc',
          textTransform: 'uppercase',
        }}>
          Built with intention
        </span>
      </div>
    </section>
  );
}
