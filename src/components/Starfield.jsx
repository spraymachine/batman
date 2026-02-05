import { useEffect, useRef } from 'react';

/**
 * Starfield Component
 * Generates animated stars across the viewport
 * Stars move subtly on scroll (parallax effect)
 * Performance optimized with CSS transforms
 */
export default function Starfield() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Generate stars with parallax depth
    const stars = [];
    const starCount = 200;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        baseX: Math.random() * canvas.width, // Original position
        baseY: Math.random() * canvas.height, // Original position
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2,
        depth: Math.random() * 0.5 + 0.5, // 0.5 to 1.0 - controls parallax speed
      });
    }

    // Track scroll position
    let scrollY = 0;
    
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animation loop
    let animationFrame;
    let time = 0;

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      time += 0.01;

      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const opacity = star.opacity + twinkle * 0.3;

        // Apply subtle parallax movement based on scroll
        // Deeper stars (lower depth value) move slower
        const parallaxY = scrollY * star.depth * 0.15; // Very subtle movement
        const starY = (star.baseY - parallaxY) % (canvas.height + 100);

        ctx.beginPath();
        ctx.arc(star.baseX, starY < 0 ? starY + canvas.height : starY, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();

        // Add glow for larger stars
        if (star.radius > 1) {
          ctx.beginPath();
          ctx.arc(star.baseX, starY < 0 ? starY + canvas.height : starY, star.radius * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
          ctx.fill();
        }
      });

      animationFrame = requestAnimationFrame(animate);
    }

    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Regenerate star positions on resize
      stars.forEach(star => {
        star.baseX = Math.random() * canvas.width;
        star.baseY = Math.random() * canvas.height;
      });
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        className="starfield"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}

