import { useRef } from 'react';

/**
 * Sun Component (replaces Blue Ball)
 * Fixed positioned, scroll-driven animation only
 * Glowing sun with rays effect
 */
export default function Sun() {
  const sunRef = useRef(null);

  return (
    <div
      ref={sunRef}
      id="sun"
      className="sun will-animate"
      style={{
        position: 'fixed',
        top: '-120px', // Start above viewport
        left: '15%',
        width: '100px',
        height: '100px',
        zIndex: 100,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      {/* Sun core with glow */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #ffd700 0%, #ff6b35 50%, #ff4500 100%)',
          boxShadow: `
            0 0 20px rgba(255, 215, 0, 0.8),
            0 0 40px rgba(255, 215, 0, 0.6),
            0 0 60px rgba(255, 107, 53, 0.4),
            0 0 80px rgba(255, 69, 0, 0.3)
          `,
          animation: 'sun-pulse 3s ease-in-out infinite',
        }}
      />
      
      {/* Sun rays */}
      <div
        style={{
          position: 'absolute',
          width: '120%',
          height: '120%',
          top: '-10%',
          left: '-10%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%)',
          animation: 'sun-rays 4s linear infinite',
        }}
      />

      <style>
        {`
          @keyframes sun-pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          
          @keyframes sun-rays {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

