import { useRef } from 'react';

/**
 * Moon Component (replaces Red Ball)
 * Fixed positioned, scroll-driven animation only
 * Cratered moon with soft glow
 */
export default function Moon() {
  const moonRef = useRef(null);

  return (
    <div
      ref={moonRef}
      id="moon"
      className="moon will-animate"
      style={{
        position: 'fixed',
        top: '-120px', // Start above viewport
        right: '15%',
        width: '100px',
        height: '100px',
        zIndex: 100,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      {/* Moon surface */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #f0f0f0 0%, #c0c0c0 50%, #909090 100%)',
          boxShadow: `
            0 0 20px rgba(192, 192, 192, 0.5),
            0 0 40px rgba(192, 192, 192, 0.3),
            inset -10px -10px 20px rgba(0, 0, 0, 0.3)
          `,
        }}
      >
        {/* Moon craters */}
        <div
          style={{
            position: 'absolute',
            top: '25%',
            left: '30%',
            width: '15px',
            height: '15px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(100, 100, 100, 0.4), rgba(120, 120, 120, 0.2))',
            boxShadow: 'inset 2px 2px 3px rgba(0, 0, 0, 0.5)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '55%',
            left: '60%',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(100, 100, 100, 0.4), rgba(120, 120, 120, 0.2))',
            boxShadow: 'inset 2px 2px 3px rgba(0, 0, 0, 0.5)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '45%',
            left: '20%',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(100, 100, 100, 0.3), rgba(120, 120, 120, 0.1))',
            boxShadow: 'inset 1px 1px 2px rgba(0, 0, 0, 0.4)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '70%',
            left: '40%',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(100, 100, 100, 0.3), rgba(120, 120, 120, 0.1))',
            boxShadow: 'inset 1px 1px 2px rgba(0, 0, 0, 0.4)',
          }}
        />
      </div>
    </div>
  );
}

