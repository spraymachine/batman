import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useIsMobile from '../../../hooks/useIsMobile';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    title: 'NEURAL\nINTERFACE',
    desc: 'Real-time brain-computer UI with WebGL shaders and data streaming at 60fps.',
    tech: ['React', 'Three.js', 'WebSocket', 'GLSL'],
    color: '#2a31ff',
    accent: '#60d35e',
  },
  {
    id: 2,
    title: 'CHAOS\nENGINE',
    desc: 'Generative art platform that turns user input into procedural masterpieces.',
    tech: ['Canvas API', 'GSAP', 'Node.js', 'MongoDB'],
    color: '#60d35e',
    accent: '#2a31ff',
  },
  {
    id: 3,
    title: 'VOID\nCOMMERCE',
    desc: 'Brutalist e-commerce experience that breaks every convention and converts.',
    tech: ['Next.js', 'Stripe', 'Prisma', 'Tailwind'],
    color: '#eaebff',
    accent: '#2a31ff',
  },
  {
    id: 4,
    title: 'SIGNAL\nDASH',
    desc: 'Mission-critical analytics dashboard with real-time charts and alerts.',
    tech: ['TypeScript', 'D3.js', 'WebSocket', 'PostgreSQL'],
    color: '#2a31ff',
    accent: '#60d35e',
  },
];

export default function MaxProjects() {
  const sectionRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);
  const mobile = useIsMobile();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.fromTo(card,
          {
            y: 100,
            opacity: 0,
            rotateY: i % 2 === 0 ? -8 : 8,
          },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 55%',
              scrub: 1,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="max-projects"
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: 'clamp(4rem, 8vw, 10rem) clamp(2rem, 4vw, 6rem)',
        background: '#eaebff',
        color: '#0a0a0a',
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
        003 — PROJECTS
      </div>

      <div className="max-divider" style={{ background: '#2a31ff', marginBottom: '1rem' }} />

      {/* Massive section title */}
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(3rem, 8vw, 8rem)',
        fontWeight: 800,
        lineHeight: 0.9,
        color: '#0a0a0a',
        marginBottom: 'clamp(3rem, 6vw, 6rem)',
      }}>
        SELECTED
        <br />
        <span style={{ WebkitTextStroke: '2px #2a31ff', color: 'transparent' }}>WORK</span>
        <span style={{ color: '#60d35e' }}>.</span>
      </h2>

      {/* Project cards — broken grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : 'repeat(2, 1fr)',
        gap: 'clamp(1.5rem, 3vw, 3rem)',
        maxWidth: '1200px',
        perspective: '1000px',
      }}>
        {PROJECTS.map((project, i) => (
          <div
            key={project.id}
            className="project-card max-card"
            data-cursor-hover
            onMouseEnter={() => setActiveCard(project.id)}
            onMouseLeave={() => setActiveCard(null)}
            style={{
              background: '#0a0a0a',
              padding: 'clamp(1.5rem, 3vw, 3rem)',
              minHeight: 'clamp(240px, 30vh, 360px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderColor: activeCard === project.id ? project.accent : 'rgba(255,255,255,0.05)',
              marginTop: !mobile && i % 2 !== 0 ? 'clamp(2rem, 4vw, 5rem)' : '0',
              cursor: 'none',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Card background number */}
            <span style={{
              position: 'absolute',
              top: '-0.2em',
              right: '-0.05em',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(8rem, 15vw, 14rem)',
              fontWeight: 800,
              color: 'rgba(255,255,255,0.02)',
              lineHeight: 1,
              pointerEvents: 'none',
              transition: 'color 0.4s',
              ...(activeCard === project.id ? { color: `${project.color}11` } : {}),
            }}>
              0{project.id}
            </span>

            {/* Top: title */}
            <div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                fontWeight: 800,
                lineHeight: 0.95,
                color: activeCard === project.id ? project.color : '#f8f8f8',
                transition: 'color 0.3s',
                whiteSpace: 'pre-line',
              }}>
                {project.title}
              </h3>
            </div>

            {/* Middle: description */}
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.75rem, 1vw, 0.9rem)',
              lineHeight: 1.6,
              color: 'rgba(234,235,255,0.5)',
              maxWidth: '360px',
              marginTop: '1rem',
            }}>
              {project.desc}
            </p>

            {/* Bottom: tech stack */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.4rem',
              marginTop: '1.5rem',
            }}>
              {project.tech.map((t) => (
                <span key={t} style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.12em',
                  padding: '0.25rem 0.6rem',
                  border: `1px solid ${activeCard === project.id ? project.accent : 'rgba(255,255,255,0.1)'}`,
                  color: activeCard === project.id ? project.accent : 'rgba(255,255,255,0.4)',
                  transition: 'border-color 0.3s, color 0.3s',
                }}>
                  {t}
                </span>
              ))}
            </div>

            {/* Hover arrow */}
            <div style={{
              position: 'absolute',
              bottom: 'clamp(1rem, 2vw, 2rem)',
              right: 'clamp(1rem, 2vw, 2rem)',
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              color: project.accent,
              opacity: activeCard === project.id ? 1 : 0,
              transform: activeCard === project.id ? 'translate(0,0)' : 'translate(-10px, 10px)',
              transition: 'opacity 0.3s, transform 0.3s',
            }}>
              ↗
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
