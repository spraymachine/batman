import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useIsMobile from '../../../hooks/useIsMobile';

gsap.registerPlugin(ScrollTrigger);

export default function MinAbout() {
  const sectionRef = useRef(null);
  const mobile = useIsMobile();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.min-reveal').forEach((el) => {
        gsap.fromTo(el,
          { y: 24, opacity: 0 },
          {
            y: 0, opacity: 1,
            scrollTrigger: { trigger: el, start: 'top 85%' },
            duration: 0.9,
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
        padding: 'clamp(6rem, 12vw, 16rem) clamp(2rem, 8vw, 12rem)',
        borderTop: '1px solid #e8e8e8',
      }}
    >
      {/* Section label */}
      <div className="min-reveal" style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6rem',
        letterSpacing: '0.2em',
        color: '#bbb',
        textTransform: 'uppercase',
        marginBottom: 'clamp(3rem, 5vw, 6rem)',
      }}>
        About
      </div>

      {/* Two column layout with lots of space */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
        gap: mobile ? '2rem' : 'clamp(3rem, 8vw, 10rem)',
        maxWidth: '1100px',
      }}>
        {/* Left: Statement */}
        <div className="min-reveal">
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            lineHeight: 1.2,
            color: '#111',
          }}>
            I believe in
            <br />
            the power of
            <br />
            <em style={{ fontStyle: 'italic' }}>restraint</em>.
          </h2>
        </div>

        {/* Right: Body text */}
        <div className="min-reveal" style={{ paddingTop: 'clamp(0.5rem, 1vw, 1rem)' }}>
          <p style={{
            fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
            lineHeight: 1.9,
            color: '#666',
            marginBottom: '2rem',
          }}>
            Every element has a purpose. Every interaction is considered.
            I specialize in creating interfaces that feel effortless —
            the kind of work where complexity is hidden and
            clarity is what remains.
          </p>
          <p style={{
            fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
            lineHeight: 1.9,
            color: '#666',
          }}>
            With a focus on typography, spacing, and motion,
            I build experiences that respect the user's attention
            and let the content speak.
          </p>
        </div>
      </div>

      {/* Minimal stats row */}
      <div className="min-reveal" style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: mobile ? '2rem' : 'clamp(3rem, 6vw, 8rem)',
        marginTop: 'clamp(5rem, 8vw, 10rem)',
        paddingTop: 'clamp(2rem, 3vw, 3rem)',
        borderTop: '1px solid #e8e8e8',
      }}>
        {[
          { num: '5+', label: 'Years' },
          { num: '40+', label: 'Projects' },
          { num: '100%', label: 'Intention' },
        ].map((stat) => (
          <div key={stat.label}>
            <div style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              color: '#111',
              lineHeight: 1,
              marginBottom: '0.5rem',
            }}>
              {stat.num}
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.15em',
              color: '#bbb',
              textTransform: 'uppercase',
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
