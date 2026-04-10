import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import './styles/globals.css';
import './styles/mobile.css';
import './styles/cubes.css';

import Scene3D from './components/Scene3D';
import ErrorBoundary from './components/ErrorBoundary';
import ExperienceSelector from './components/ExperienceSelector';
import ThemeSwitcher from './components/ThemeSwitcher';
import MaximalistExperience from './experiences/maximalist/MaximalistExperience';
import MinimalistExperience from './experiences/minimalist/MinimalistExperience';

import Landing from './sections/Landing';
import Portfolio from './sections/Portfolio';
import About from './sections/About';
import Contact from './sections/Contact';

import useScrollAnimations from './hooks/useScrollAnimations';
import { useRoute } from './hooks/useRoute';

function SpaceExperience({ navigate }) {
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
      <main style={{ display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        <Landing />
        <Portfolio />
        <About />
        <Contact />
      </main>
      <ErrorBoundary>
        <Scene3D />
      </ErrorBoundary>
      <ThemeSwitcher current="/space" navigate={navigate} />
    </div>
  );
}

function App() {
  const { route, navigate } = useRoute();

  if (route === '/space') return <SpaceExperience navigate={navigate} />;
  if (route === '/max')   return <MaximalistExperience navigate={navigate} />;
  if (route === '/min')   return <MinimalistExperience navigate={navigate} />;
  return <ExperienceSelector navigate={navigate} />;
}

export default App;
