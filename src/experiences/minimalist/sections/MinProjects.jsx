import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useIsMobile from '../../../hooks/useIsMobile';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    num: '01',
    title: 'Neural Interface',
    desc: 'Real-time brain-computer UI with data streaming at 60fps.',
    tech: 'React, Three.js, WebSocket',
    year: '2025',
  },
  {
    num: '02',
    title: 'Chaos Engine',
    desc: 'Generative art platform turning user input into procedural art.',
    tech: 'Canvas API, GSAP, Node.js',
    year: '2024',
  },
  {
    num: '03',
    title: 'Void Commerce',
    desc: 'E-commerce experience that rethinks convention.',
    tech: 'Next.js, Stripe, Tailwind',
    year: '2024',
  },
  {
    num: '04',
    title: 'Signal Dash',
    desc: 'Mission-critical analytics dashboard with real-time alerts.',
    tech: 'TypeScript, D3.js, PostgreSQL',
    year: '2023',
  },
];

export default function MinProjects() {
  const sectionRef = useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const mobile = useIsMobile();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.min-project-row').forEach((row) => {
        gsap.fromTo(row,
          { y: 20, opacity: 0 },
          {
            y: 0, opacity: 1,
            scrollTrigger: { trigger: row, start: 'top 88%' },
            duration: 0.7,
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
        Selected Work
      </div>

      {/* Project list — clean rows */}
      <div style={{ maxWidth: '1000px' }}>
        {PROJECTS.map((project, i) => (
          <div
            key={project.num}
            className="min-project-row"
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            style={{
              display: 'grid',
              gridTemplateColumns: mobile ? '1fr' : '48px 1fr auto',
              gap: mobile ? '0.5rem' : 'clamp(1.5rem, 3vw, 3rem)',
              alignItems: mobile ? 'start' : 'baseline',
              padding: 'clamp(1.5rem, 2.5vw, 2.5rem) 0',
              borderBottom: '1px solid #e8e8e8',
              cursor: 'pointer',
              transition: 'opacity 0.3s ease',
              opacity: hoveredIdx !== null && hoveredIdx !== i ? 0.3 : 1,
            }}
          >
            {/* Number */}
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.1em',
              color: '#ccc',
            }}>
              {project.num}
            </span>

            {/* Main content */}
            <div>
              <h3 style={{
                fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                color: '#111',
                marginBottom: '0.5rem',
                transition: 'transform 0.4s cubic-bezier(0.23,1,0.32,1)',
                transform: hoveredIdx === i ? 'translateX(8px)' : 'translateX(0)',
              }}>
                {project.title}
              </h3>
              <p style={{
                fontSize: 'clamp(0.8rem, 0.95vw, 0.9rem)',
                color: '#999',
                lineHeight: 1.6,
                maxWidth: '400px',
              }}>
                {project.desc}
              </p>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.08em',
                color: '#ccc',
                marginTop: '0.6rem',
                display: 'inline-block',
              }}>
                {project.tech}
              </span>
            </div>

            {/* Year + arrow */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                color: '#ccc',
              }}>
                {project.year}
              </span>
              <span style={{
                fontSize: '1.2rem',
                color: '#111',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: hoveredIdx === i ? 'translate(4px, -4px)' : 'translate(0, 0)',
                opacity: hoveredIdx === i ? 1 : 0.2,
              }}>
                ↗
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
