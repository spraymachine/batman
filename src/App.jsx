import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import './styles/globals.css';
import './styles/mobile.css';

// Import components - SPACE THEME
import Sun from './components/Sun';
import Moon from './components/Moon';
import Starfield from './components/Starfield';

// Import sections
import Landing from './sections/Landing';
import Portfolio from './sections/Portfolio';
import About from './sections/About';
import Contact from './sections/Contact';

// Import custom hook
import useScrollAnimations from './hooks/useScrollAnimations';

/**
 * Main App Component
 * Mobile-first, scroll-driven 3D portfolio
 * Tech: React + GSAP + ScrollTrigger + Lenis + Tailwind
 */
function App() {
  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false, // Disable on touch for better mobile performance
      touchMultiplier: 2,
      infinite: false,
    });

    // Sync Lenis with GSAP ScrollTrigger
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  // Initialize all scroll animations
  useScrollAnimations();

  return (
    <div className="app">
      {/* Space Background Effects */}
      <Starfield />
      {/* Northern Lights removed for clear night sky */}

      {/* Main Sections - Scroll is the navigation */}
      <main style={{ display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        <Landing />
        <Portfolio />
        <About />
        <Contact />
      </main>
      
      {/* Global Scroll Elements - Sun and Moon (rendered AFTER main for proper z-index stacking) */}
      <Sun />
      <Moon />

      {/* Performance indicator - remove in production */}
      <div
        style={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          fontSize: '10px',
          color: 'var(--aurora-green)',
          opacity: 0.5,
          zIndex: 9999,
          pointerEvents: 'none',
          fontFamily: 'monospace',
        }}
      >
        Scroll-driven 🌌
      </div>
    </div>
  );
}

export default App;
