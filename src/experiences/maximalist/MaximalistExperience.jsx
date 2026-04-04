import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './max.css';
import CustomCursor from './components/CustomCursor';
import MaxHero from './sections/MaxHero';
import MaxAbout from './sections/MaxAbout';
import MaxProjects from './sections/MaxProjects';
import MaxSkills from './sections/MaxSkills';
import MaxContact from './sections/MaxContact';
import ThemeSwitcher from '../../components/ThemeSwitcher';

gsap.registerPlugin(ScrollTrigger);

export default function MaximalistExperience({ navigate }) {
  useEffect(() => {
    // Smooth scroll to top on mount
    window.scrollTo(0, 0);

    // Refresh ScrollTrigger after layout settles
    const timeout = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="max-experience">
      <CustomCursor />
      <MaxHero />
      <MaxAbout />
      <MaxProjects />
      <MaxSkills />
      <MaxContact />
      <ThemeSwitcher current="/max" navigate={navigate} />
    </div>
  );
}
