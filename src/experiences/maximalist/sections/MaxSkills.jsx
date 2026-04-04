import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TECH_STACK = [
  { name: 'REACT', level: 95, cat: 'core' },
  { name: 'TYPESCRIPT', level: 90, cat: 'core' },
  { name: 'THREE.JS', level: 85, cat: 'creative' },
  { name: 'GSAP', level: 92, cat: 'creative' },
  { name: 'NEXT.JS', level: 88, cat: 'core' },
  { name: 'WEBGL / GLSL', level: 75, cat: 'creative' },
  { name: 'TAILWIND CSS', level: 95, cat: 'core' },
  { name: 'NODE.JS', level: 80, cat: 'backend' },
  { name: 'FIGMA', level: 85, cat: 'design' },
  { name: 'CANVAS API', level: 82, cat: 'creative' },
];

export default function MaxSkills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate skill bars
      gsap.utils.toArray('.skill-bar-fill').forEach((bar) => {
        gsap.fromTo(bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            scrollTrigger: {
              trigger: bar,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 1,
            },
          }
        );
      });

      // Stagger rows
      gsap.utils.toArray('.skill-row').forEach((row, i) => {
        gsap.fromTo(row,
          { x: i % 2 === 0 ? -60 : 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: row,
              start: 'top 88%',
            },
            duration: 0.6,
            delay: i * 0.05,
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
        color: '#60d35e',
        marginBottom: '1rem',
      }}>
        004 — ARSENAL
      </div>

      <div className="max-divider" style={{ marginBottom: 'clamp(2rem, 4vw, 4rem)' }} />

      {/* Title */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 'clamp(1rem, 3vw, 3rem)',
        marginBottom: 'clamp(3rem, 5vw, 6rem)',
        flexWrap: 'wrap',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 7vw, 7rem)',
          fontWeight: 800,
          lineHeight: 0.9,
          color: '#f8f8f8',
        }}>
          TECH
          <span style={{ color: '#2a31ff' }}>_</span>
          <br />
          STACK
          <span style={{ color: '#60d35e' }}>.</span>
        </h2>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'rgba(255,255,255,0.35)',
          maxWidth: '280px',
          lineHeight: 1.6,
          letterSpacing: '0.05em',
          paddingBottom: '0.5rem',
        }}>
          Tools I use to build things that feel impossible.
          Constantly evolving. Never settling.
        </p>
      </div>

      {/* Skill bars — brutalist style */}
      <div style={{ maxWidth: '900px' }}>
        {TECH_STACK.map((skill, i) => {
          const catColors = {
            core: '#2a31ff',
            creative: '#60d35e',
            backend: '#eaebff',
            design: '#60d35e',
          };
          const barColor = catColors[skill.cat];

          return (
            <div
              key={skill.name}
              className="skill-row"
              style={{
                display: 'grid',
                gridTemplateColumns: 'clamp(100px, 15vw, 180px) 1fr auto',
                alignItems: 'center',
                gap: 'clamp(0.75rem, 1.5vw, 1.5rem)',
                padding: 'clamp(0.6rem, 1vw, 1rem) 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {/* Name */}
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.6rem, 0.85vw, 0.75rem)',
                letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.6)',
              }}>
                {skill.name}
              </span>

              {/* Bar */}
              <div style={{
                position: 'relative',
                height: 'clamp(6px, 1vw, 10px)',
                background: 'rgba(255,255,255,0.04)',
                overflow: 'hidden',
              }}>
                <div
                  className="skill-bar-fill"
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    height: '100%',
                    width: `${skill.level}%`,
                    background: barColor,
                    transformOrigin: 'left',
                  }}
                />
                {/* Notch marks */}
                {[25, 50, 75].map((pos) => (
                  <div key={pos} style={{
                    position: 'absolute',
                    left: `${pos}%`,
                    top: 0,
                    width: '1px',
                    height: '100%',
                    background: 'rgba(0,0,0,0.5)',
                  }} />
                ))}
              </div>

              {/* Percentage */}
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: barColor,
                minWidth: '32px',
                textAlign: 'right',
              }}>
                {skill.level}%
              </span>
            </div>
          );
        })}
      </div>

      {/* Category legend */}
      <div style={{
        display: 'flex',
        gap: 'clamp(1.5rem, 2.5vw, 3rem)',
        marginTop: 'clamp(2rem, 3vw, 3rem)',
        flexWrap: 'wrap',
      }}>
        {[
          { label: 'CORE', color: '#2a31ff' },
          { label: 'CREATIVE', color: '#60d35e' },
          { label: 'BACKEND', color: '#eaebff' },
        ].map((cat) => (
          <div key={cat.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: 10, height: 10, background: cat.color }} />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              letterSpacing: '0.2em',
              color: 'rgba(255,255,255,0.35)',
            }}>
              {cat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
