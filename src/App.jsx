import { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import './styles/globals.css';
import './styles/mobile.css';
import './styles/cubes.css';

// Import components - SPACE THEME
import Starfield from './components/Starfield';
import Scene3D from './components/Scene3D';
import ErrorBoundary from './components/ErrorBoundary';
import ExperienceSelector from './components/ExperienceSelector';

// Import sections
import Landing from './sections/Landing';
import Portfolio from './sections/Portfolio';
import About from './sections/About';
import Contact from './sections/Contact';

// Import custom hook
import useScrollAnimations from './hooks/useScrollAnimations';

/**
 * Space Experience
 * The existing scroll-driven 3D portfolio, now wrapped so it can be
 * conditionally rendered after the selector screen.
 */
function SpaceExperience() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  useScrollAnimations();

  return (
    <div className="app">
      <Starfield />
      <main style={{ display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        <Landing />
        <Portfolio />
        <About />
        <Contact />
      </main>
      <ErrorBoundary>
        <Scene3D />
      </ErrorBoundary>
    </div>
  );
}

/**
 * Main App Component
 * Shows the experience selector first; once the user picks one,
 * renders the corresponding experience.
 */
function App() {
  const [experience, setExperience] = useState(null);

  return (
    <>
      {/* Selector is always present until an experience is chosen */}
      {!experience && (
        <ExperienceSelector onSelect={(id) => setExperience(id)} />
      )}

      {/* Render the chosen experience */}
      {experience === 'space' && <SpaceExperience />}
      {/* experience === 'max' and experience === 'min' will go here later */}
    </>
  );
}

export default App;
