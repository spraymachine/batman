/**
 * CSS 3D Cube Component
 * Pure HTML/CSS 3D transformation (NO Three.js)
 * Each cube represents one portfolio project
 */
export default function Cube({ project, side = 'left', index }) {
  const cubeSize = 150; // Base size in pixels
  const halfSize = cubeSize / 2;

  return (
    <div
      className={`cube-container cube-${side}`}
      data-cube-index={index}
      style={{
        width: `${cubeSize}px`,
        height: `${cubeSize}px`,
        position: 'relative',
        margin: '20px',
      }}
    >
      <div
        className="cube preserve-3d will-animate"
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Front Face */}
        <div
          className="cube-face cube-front"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: `linear-gradient(135deg, ${project.color1}, ${project.color2})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '600',
            color: '#fff',
            backfaceVisibility: 'hidden',
            transform: `translateZ(${halfSize}px)`,
            border: '2px solid rgba(255,255,255,0.2)',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          {project.name}
        </div>

        {/* Back Face */}
        <div
          className="cube-face cube-back"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: `linear-gradient(135deg, ${project.color2}, ${project.color1})`,
            backfaceVisibility: 'hidden',
            transform: `rotateY(180deg) translateZ(${halfSize}px)`,
            border: '2px solid rgba(255,255,255,0.2)',
          }}
        />

        {/* Right Face */}
        <div
          className="cube-face cube-right"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: project.color1,
            backfaceVisibility: 'hidden',
            transform: `rotateY(90deg) translateZ(${halfSize}px)`,
            border: '2px solid rgba(255,255,255,0.2)',
          }}
        />

        {/* Left Face */}
        <div
          className="cube-face cube-left"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: project.color1,
            backfaceVisibility: 'hidden',
            transform: `rotateY(-90deg) translateZ(${halfSize}px)`,
            border: '2px solid rgba(255,255,255,0.2)',
          }}
        />

        {/* Top Face */}
        <div
          className="cube-face cube-top"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: project.color2,
            backfaceVisibility: 'hidden',
            transform: `rotateX(90deg) translateZ(${halfSize}px)`,
            border: '2px solid rgba(255,255,255,0.2)',
          }}
        />

        {/* Bottom Face */}
        <div
          className="cube-face cube-bottom"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: project.color2,
            backfaceVisibility: 'hidden',
            transform: `rotateX(-90deg) translateZ(${halfSize}px)`,
            border: '2px solid rgba(255,255,255,0.2)',
          }}
        />
      </div>
    </div>
  );
}


