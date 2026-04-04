import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './min.css';
import MinHero from './sections/MinHero';
import MinAbout from './sections/MinAbout';
import MinProjects from './sections/MinProjects';
import MinContact from './sections/MinContact';
import ThemeSwitcher from '../../components/ThemeSwitcher';

gsap.registerPlugin(ScrollTrigger);

export default function MinimalistExperience({ navigate }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    const timeout = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="min-experience">
      <MinHero />
      <MinAbout />
      <MinProjects />
      <MinContact />
      <ThemeSwitcher current="/min" navigate={navigate} />
    </div>
  );
}
