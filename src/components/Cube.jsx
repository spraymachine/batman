/**
 * CSS 3D Cube Component - Cosmic Crystal Shards
 * Faceted, glass-like cosmic fragments with refractive depth
 */
export default function Cube({ project, side = 'left', index, cubeIndex, accentRGB }) {
  const cubeSize = 160; // Desktop: 160px (mobile overridden in CSS to 130px)
  const halfSize = cubeSize / 2;

  // Unique rotateY rest angle per cube (12 values)
  const restRotateY = [8, -12, 15, -8, 10, -15, 12, -9, 14, -11, 9, -13][cubeIndex] ?? 0;

  return (
    <div
      className={`cube-container cube-${side}`}
      data-cube-index={index}
      style={{
        '--accent-rgb': accentRGB,
        '--hover-rot': '0deg',
        '--cube-half': `${halfSize}px`,
        width: `${cubeSize}px`,
        height: `${cubeSize}px`,
        position: 'relative',
        margin: '20px',
      }}
    >
      <div
        className="cube preserve-3d will-animate cube-crystal"
        style={{
          '--base-rot': `${restRotateY}deg`,
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: `rotateY(calc(var(--base-rot, 0deg) + var(--hover-rot, 0deg)))`,
          transition: 'transform 0.3s ease, box-shadow 0.4s ease',
        }}
      >
        {/* Front Face - with core, name, refraction line */}
        <div
          className="cube-face cube-front cube-face-front"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: `rgba(${accentRGB}, 0.08)`,
            backfaceVisibility: 'hidden',
            transform: 'translateZ(var(--cube-half))',
            border: `1px solid rgba(${accentRGB}, 0.4)`,
            clipPath: 'polygon(6% 0%, 100% 2%, 96% 100%, 0% 97%)',
            backdropFilter: 'blur(6px)',
            boxShadow: `inset 0 0 20px rgba(${accentRGB}, 0.15), 0 0 30px rgba(${accentRGB}, 0.2)`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: '14px',
          }}
        >
          <div
            className="cube-core"
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: `rgb(${accentRGB})`,
              boxShadow: `0 0 8px rgb(${accentRGB})`,
              flexShrink: 0,
            }}
          />
          <span
            className="cube-project-name"
            style={{
              fontSize: '13px',
              fontWeight: '500',
              color: 'rgba(255,255,255,0.88)',
              letterSpacing: '0.4px',
            }}
          >
            {project.name}
          </span>
        </div>

        {/* Back Face - hidden */}
        <div
          className="cube-face cube-back"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: `rgba(${accentRGB}, 0.04)`,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg) translateZ(var(--cube-half))',
            border: `1px solid rgba(${accentRGB}, 0.2)`,
            clipPath: 'polygon(2% 4%, 98% 0%, 100% 96%, 0% 92%)',
          }}
        />

        {/* Right Face */}
        <div
          className="cube-face cube-right"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: `rgba(${accentRGB}, 0.04)`,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(90deg) translateZ(var(--cube-half))',
            border: `1px solid rgba(${accentRGB}, 0.2)`,
            clipPath: 'polygon(2% 4%, 98% 0%, 100% 96%, 0% 100%)',
          }}
        />

        {/* Left Face */}
        <div
          className="cube-face cube-left"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: `rgba(${accentRGB}, 0.04)`,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(-90deg) translateZ(var(--cube-half))',
            border: `1px solid rgba(${accentRGB}, 0.2)`,
            clipPath: 'polygon(0% 2%, 98% 6%, 94% 100%, 4% 98%)',
          }}
        />

        {/* Top Face - catch light */}
        <div
          className="cube-face cube-top"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'rgba(255,255,255,0.06)',
            backfaceVisibility: 'hidden',
            transform: 'rotateX(90deg) translateZ(var(--cube-half))',
            border: '1px solid rgba(255,255,255,0.25)',
            clipPath: 'polygon(4% 2%, 98% 4%, 96% 98%, 2% 94%)',
          }}
        />

        {/* Bottom Face - near-invisible */}
        <div
          className="cube-face cube-bottom"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: `rgba(${accentRGB}, 0.04)`,
            backfaceVisibility: 'hidden',
            transform: 'rotateX(-90deg) translateZ(var(--cube-half))',
            border: `1px solid rgba(${accentRGB}, 0.15)`,
            clipPath: 'polygon(2% 4%, 96% 0%, 100% 96%, 0% 92%)',
            opacity: 0.3,
          }}
        />
      </div>
    </div>
  );
}
