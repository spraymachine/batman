import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Master scroll animations hook
 * Controls all GSAP timelines tied to scroll
 * NO autoplay - everything is scroll-scrubbed
 */
export default function useScrollAnimations() {
  useEffect(() => {
    // Prevent animations during setup
    const ctx = gsap.context(() => {
      // ============================================
      // 1. LANDING SECTION - Sun and Moon Drop Animation
      // ============================================
      const sun = document.getElementById('sun');
      const moon = document.getElementById('moon');

      if (sun && moon) {
        // Sun and Moon drop timeline - tied to landing section scroll
        gsap.timeline({
          scrollTrigger: {
            trigger: '#landing',
            start: 'top top',
            end: 'bottom top',
            scrub: true, // Scroll-scrubbed (NO autoplay)
            markers: false,
          },
        })
        .to(sun, {
          y: window.innerHeight * 0.6, // Fall 60% of viewport
          x: -50, // Slightly left
          rotation: 180, // Sun rotates
          ease: 'linear',
        }, 0)
        .to(moon, {
          y: window.innerHeight * 0.6, // Fall 60% of viewport
          x: 50, // Slightly right
          rotation: -180, // Moon counter-rotates
          ease: 'linear',
        }, 0);
      }

      // ============================================
      // 2. PORTFOLIO SECTION - Cube Animations
      // ============================================
      const leftCubes = document.querySelectorAll('.cube-left .cube');
      const rightCubes = document.querySelectorAll('.cube-right .cube');

      if (leftCubes.length > 0 || rightCubes.length > 0) {
        // Single timeline for all cubes
        const cubeTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '#portfolio',
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
            markers: false,
          },
        });

        // Left cubes: Come from left with rotation
        leftCubes.forEach((cube, index) => {
          cubeTimeline.fromTo(
            cube,
            {
              x: -window.innerWidth * 0.5, // Start off-screen left
              rotateY: -60,
              opacity: 0,
            },
            {
              x: 0,
              rotateY: 0,
              opacity: 1,
              ease: 'power2.out',
              duration: 1,
            },
            index * 0.15 // Stagger delay
          );
        });

        // Right cubes: Come from right with rotation
        rightCubes.forEach((cube, index) => {
          cubeTimeline.fromTo(
            cube,
            {
              x: window.innerWidth * 0.5, // Start off-screen right
              rotateY: 60,
              opacity: 0,
            },
            {
              x: 0,
              rotateY: 0,
              opacity: 1,
              ease: 'power2.out',
              duration: 1,
            },
            index * 0.15 // Stagger delay
          );
        });
      }

      // ============================================
      // 3. ABOUT SECTION - Stats Animation
      // ============================================
      const statsCards = document.querySelectorAll('.stat-card');

      if (statsCards.length > 0) {
        const isMobile = window.innerWidth <= 480;
        
        // Stats animate from bottom with stagger
        gsap.fromTo(
          statsCards,
          {
            y: isMobile ? 60 : 80,
            opacity: 0,
            rotateX: isMobile ? 0 : 10, // No 3D rotation on mobile
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '#about',
              start: 'top 60%',
              end: 'top 30%',
              scrub: true,
              markers: false,
            },
          }
        );
      }

      // ============================================
      // 4. CONTACT SECTION - Entrance Animation
      // ============================================
      const contactSection = document.getElementById('contact');
      
      if (contactSection) {
        gsap.fromTo(
          contactSection.querySelector('div > div'),
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '#contact',
              start: 'top 80%',
              end: 'top 50%',
              scrub: true,
              markers: false,
            },
          }
        );
      }
    });

    // Cleanup function - CRITICAL for performance
    return () => {
      ctx.revert(); // Kills all ScrollTriggers and animations
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
}

