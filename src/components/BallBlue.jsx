import { useEffect, useRef } from 'react';

/**
 * Blue Ball Component
 * Fixed positioned, scroll-driven animation only
 * Falls slightly left during scroll
 */
export default function BallBlue() {
  const ballRef = useRef(null);

  return (
    <div
      ref={ballRef}
      id="ball-blue"
      className="ball-blue will-animate"
      style={{
        position: 'fixed',
        top: '-100px', // Start above viewport
        left: '20%',
        width: '80px',
        height: '80px',
        backgroundColor: 'var(--blue-ball)',
        borderRadius: '50%',
        boxShadow: '0 10px 30px rgba(45, 108, 223, 0.3)',
        zIndex: 100,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}


