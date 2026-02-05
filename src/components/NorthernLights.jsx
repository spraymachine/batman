/**
 * Northern Lights Component
 * Animated aurora borealis effect
 * Using CSS animations for performance
 */
export default function NorthernLights() {
  return (
    <>
      <div
        className="aurora-layer-1"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '60%',
          zIndex: 1,
          pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgba(0, 255, 135, 0.15) 0%, transparent 100%)',
          animation: 'aurora-wave-1 12s ease-in-out infinite',
          mixBlendMode: 'screen',
        }}
      />
      
      <div
        className="aurora-layer-2"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '50%',
          zIndex: 1,
          pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgba(0, 212, 255, 0.1) 0%, transparent 100%)',
          animation: 'aurora-wave-2 15s ease-in-out infinite',
          mixBlendMode: 'screen',
        }}
      />
      
      <div
        className="aurora-layer-3"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '70%',
          zIndex: 1,
          pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgba(183, 148, 246, 0.08) 0%, transparent 100%)',
          animation: 'aurora-wave-3 18s ease-in-out infinite',
          mixBlendMode: 'screen',
        }}
      />

      <style>
        {`
          @keyframes aurora-wave-1 {
            0%, 100% { 
              opacity: 0.4; 
              transform: translateY(0) scaleY(1);
            }
            50% { 
              opacity: 0.7; 
              transform: translateY(-30px) scaleY(1.15);
            }
          }

          @keyframes aurora-wave-2 {
            0%, 100% { 
              opacity: 0.3; 
              transform: translateY(0) scaleY(1) translateX(0);
            }
            50% { 
              opacity: 0.6; 
              transform: translateY(-20px) scaleY(1.1) translateX(20px);
            }
          }

          @keyframes aurora-wave-3 {
            0%, 100% { 
              opacity: 0.2; 
              transform: translateY(0) scaleY(1) translateX(0);
            }
            50% { 
              opacity: 0.5; 
              transform: translateY(-40px) scaleY(1.2) translateX(-20px);
            }
          }
        `}
      </style>
    </>
  );
}

