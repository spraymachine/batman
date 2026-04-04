import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useIsMobile from '../../../hooks/useIsMobile';

gsap.registerPlugin(ScrollTrigger);

const SKILLS_TAGS = [
  'React', 'Three.js', 'GSAP', 'WebGL', 'TypeScript',
  'Node.js', 'Figma', 'Tailwind', 'Next.js', 'Vite',
  'Framer Motion', 'SVG', 'CSS Art', 'Performance',
  'Accessibility', 'Creative Coding', 'GLSL', 'Canvas API',
];

export default function MaxAbout() {
  const sectionRef = useRef(null);
  const mobile = useIsMobile();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger fragments in from alternating sides
      gsap.utils.toArray('.about-fragment').forEach((el, i) => {
        gsap.fromTo(el,
          { x: i % 2 === 0 ? -80 : 80, opacity: 0, rotateZ: i % 2 === 0 ? -3 : 3 },
          {
            x: 0, opacity: 1, rotateZ: 0,
            scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 50%', scrub: 1 },
          }
        );
      });

      // Float in skill tags
      gsap.utils.toArray('.skill-tag').forEach((el, i) => {
        gsap.fromTo(el,
          { scale: 0, rotation: Math.random() * 30 - 15 },
          {
            scale: 1, rotation: 0,
            scrollTrigger: { trigger: el, start: 'top 90%' },
            duration: 0.5,
            delay: i * 0.04,
            ease: 'back.out(2)',
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
        position: 'relative',
        padding: 'clamp(4rem, 8vw, 10rem) clamp(2rem, 4vw, 6rem)',
        overflow: 'hidden',
      }}
    >
      {/* Section label */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6rem',
        letterSpacing: '0.35em',
        color: '#2a31ff',
        marginBottom: '1rem',
      }}>
        002 — ABOUT
      </div>

      {/* Divider */}
      <div className="max-divider" style={{ marginBottom: 'clamp(3rem, 6vw, 6rem)' }} />

      {/* Brutalist fragmented layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : 'repeat(12, 1fr)',
        gap: 'clamp(1rem, 2vw, 2rem)',
        maxWidth: '1400px',
      }}>
        {/* Big statement — spans wide */}
        <div
          className="about-fragment"
          style={{
            gridColumn: mobile ? 'auto' : '1 / 9',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
            fontWeight: 800,
            lineHeight: 0.95,
            color: '#f8f8f8',
          }}
        >
          I DON'T MAKE
          <br />
          <span style={{ color: '#2a31ff' }}>WEBSITES</span>.
          <br />
          I MAKE
          <br />
          <span style={{ color: '#60d35e' }}>EXPERIENCES</span>.
        </div>

        {/* Offset text block */}
        <div
          className="about-fragment"
          style={{
            gridColumn: mobile ? 'auto' : '7 / 13',
            gridRow: mobile ? 'auto' : '2',
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.85rem, 1.2vw, 1.05rem)',
            lineHeight: 1.7,
            color: 'rgba(234,235,255,0.6)',
            marginTop: 'clamp(2rem, 4vw, 4rem)',
            borderLeft: '3px solid #2a31ff',
            paddingLeft: 'clamp(1rem, 2vw, 2rem)',
          }}
        >
          I'm a frontend engineer who believes interfaces should feel alive.
          Every pixel is intentional. Every animation tells a story.
          I specialize in creative development — the space where engineering
          meets art and the result makes people say "how did they do that?"
        </div>

        {/* Numbers / stats — brutalist boxes */}
        <div
          className="about-fragment"
          style={{
            gridColumn: mobile ? 'auto' : '1 / 5',
            gridRow: mobile ? 'auto' : '2',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginTop: 'clamp(2rem, 4vw, 4rem)',
          }}
        >
          {[
            { num: '5+', label: 'YEARS SHIPPING CODE' },
            { num: '40+', label: 'PROJECTS DELIVERED' },
            { num: '∞', label: 'PIXELS OBSESSED OVER' },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                border: `2px solid ${i === 2 ? '#60d35e' : 'rgba(255,255,255,0.08)'}`,
                padding: 'clamp(0.8rem, 1.5vw, 1.5rem)',
                display: 'flex',
                alignItems: 'baseline',
                gap: '1rem',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 3vw, 3rem)',
                fontWeight: 800,
                color: i === 2 ? '#60d35e' : '#2a31ff',
                lineHeight: 1,
              }}>
                {stat.num}
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.4)',
              }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating skill tags */}
      <div style={{
        marginTop: 'clamp(4rem, 6vw, 8rem)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'clamp(0.5rem, 1vw, 0.8rem)',
        maxWidth: '900px',
      }}>
        {SKILLS_TAGS.map((skill, i) => (
          <span
            key={skill}
            className="skill-tag"
            data-cursor-hover
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.6rem, 0.9vw, 0.75rem)',
              letterSpacing: '0.1em',
              padding: 'clamp(0.4rem, 0.7vw, 0.6rem) clamp(0.8rem, 1.2vw, 1.2rem)',
              border: `1px solid ${i % 3 === 0 ? '#2a31ff' : i % 3 === 1 ? '#60d35e' : 'rgba(255,255,255,0.15)'}`,
              color: i % 3 === 0 ? '#eaebff' : i % 3 === 1 ? '#60d35e' : 'rgba(255,255,255,0.5)',
              cursor: 'none',
              transition: 'background 0.2s, color 0.2s, transform 0.2s',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#2a31ff';
              e.target.style.color = '#f8f8f8';
              e.target.style.transform = `rotate(${Math.random() * 6 - 3}deg) scale(1.08)`;
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = i % 3 === 1 ? '#60d35e' : i % 3 === 0 ? '#eaebff' : 'rgba(255,255,255,0.5)';
              e.target.style.transform = 'rotate(0deg) scale(1)';
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
