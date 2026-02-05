import { useRef } from 'react';

/**
 * Red Ball Component
 * Fixed positioned, scroll-driven animation only
 * Falls slightly right during scroll
 */
export default function BallRed() {
  const ballRef = useRef(null);

  return (
    <div
      ref={ballRef}
      id="ball-red"
      className="ball-red will-animate"
      style={{
        position: 'fixed',
        top: '-100px', // Start above viewport
        right: '20%',
        width: '80px',
        height: '80px',
        backgroundColor: 'var(--red-ball)',
        borderRadius: '50%',
        boxShadow: '0 10px 30px rgba(214, 69, 69, 0.3)',
        zIndex: 100,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}


