import { useEffect, useRef } from 'react';

/**
 * Starfield Component - MOBILE FIRST, ULTRA HD
 * Generates crisp, sharp stars across the viewport
 * Accounts for device pixel ratio for Retina/high-DPI displays
 * Stars move subtly on scroll (parallax effect)
 */
export default function Starfield() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true, // Better performance on mobile
    });

    // Get device pixel ratio for crisp rendering on high-DPI screens
    const dpr = window.devicePixelRatio || 1;
    
    // Store logical dimensions
    let logicalWidth = window.innerWidth;
    let logicalHeight = window.innerHeight;

    // Setup canvas for high-DPI rendering
    const setupCanvas = () => {
      logicalWidth = window.innerWidth;
      logicalHeight = window.innerHeight;
      
      // Set actual canvas size (physical pixels)
      canvas.width = logicalWidth * dpr;
      canvas.height = logicalHeight * dpr;
      
      // Scale context to match device pixel ratio
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      
      // Enable crisp rendering
      ctx.imageSmoothingEnabled = false;
    };

    setupCanvas();

    // Generate stars with parallax depth
    const stars = [];
    const isMobile = window.innerWidth <= 768;
    // More stars on mobile for denser sky, but smaller for performance
    const starCount = isMobile ? 250 : 200;

    for (let i = 0; i < starCount; i++) {
      // Vary star sizes - smaller stars are sharper
      const sizeCategory = Math.random();
      let radius;
      if (sizeCategory < 0.6) {
        radius = 0.5 + Math.random() * 0.3; // 60% tiny stars (0.5-0.8px)
      } else if (sizeCategory < 0.9) {
        radius = 0.8 + Math.random() * 0.5; // 30% small stars (0.8-1.3px)
      } else {
        radius = 1.3 + Math.random() * 0.7; // 10% medium stars (1.3-2px)
      }

      stars.push({
        baseX: Math.random() * logicalWidth,
        baseY: Math.random() * logicalHeight,
        radius: radius,
        opacity: Math.random() * 0.4 + 0.5, // Brighter stars (0.5-0.9)
        twinkleSpeed: Math.random() * 0.015 + 0.005, // Slower, smoother twinkle
        twinkleOffset: Math.random() * Math.PI * 2,
        depth: Math.random() * 0.5 + 0.5, // 0.5 to 1.0 - controls parallax speed
      });
    }

    // Track scroll position with smoothing for crisp movement
    let scrollY = 0;
    let targetScrollY = 0;
    
    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animation loop with optimized rendering
    let animationFrame;
    let time = 0;
    let lastTime = performance.now();

    function animate(currentTime) {
      // Calculate delta time for consistent animation speed
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      // Smooth scroll interpolation for crisp movement
      scrollY += (targetScrollY - scrollY) * 0.1;

      ctx.clearRect(0, 0, logicalWidth, logicalHeight);
      
      time += deltaTime;

      stars.forEach((star) => {
        // Smoother twinkle animation
        const twinkle = Math.sin(time * star.twinkleSpeed * 60 + star.twinkleOffset);
        const opacity = Math.max(0.2, Math.min(1, star.opacity + twinkle * 0.2));

        // Apply subtle parallax movement based on scroll
        const parallaxY = scrollY * star.depth * 0.12;
        let starY = (star.baseY - parallaxY) % (logicalHeight + 50);
        if (starY < -25) starY += logicalHeight + 50;

        // Draw crisp star (no anti-aliasing blur)
        const x = Math.round(star.baseX * 2) / 2; // Snap to half-pixels for sharpness
        const y = Math.round(starY * 2) / 2;

        // Draw main star point - crisp and sharp
        ctx.beginPath();
        ctx.arc(x, y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();

        // Add subtle glow only for larger stars (not on mobile for performance)
        if (star.radius > 1.2 && !isMobile) {
          ctx.beginPath();
          ctx.arc(x, y, star.radius * 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
          ctx.fill();
        }
      });

      animationFrame = requestAnimationFrame(animate);
    }

    animationFrame = requestAnimationFrame(animate);

    // Handle resize with debounce for performance
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setupCanvas();
        // Regenerate star positions on resize
        stars.forEach(star => {
          star.baseX = Math.random() * logicalWidth;
          star.baseY = Math.random() * logicalHeight;
        });
      }, 100);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(resizeTimeout);
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
          imageRendering: 'pixelated', // Crisp rendering hint
        }}
      />
    </div>
  );
}

