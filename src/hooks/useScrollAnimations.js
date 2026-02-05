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
        // Get inner elements for spinning
        const sunCore = sun.querySelector('.sun-core');
        const moonSurface = moon.querySelector('.moon-surface');

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
          ease: 'linear',
        }, 0)
        .to(moon, {
          y: window.innerHeight * 0.6, // Fall 60% of viewport
          x: 50, // Slightly right
          ease: 'linear',
        }, 0);

        // Add continuous spinning tied to scroll for entire page
        if (sunCore && moonSurface) {
          gsap.to(sunCore, {
            rotation: 360 * 3, // 3 full rotations across entire page
            ease: 'none',
            scrollTrigger: {
              trigger: 'body',
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.5, // Smooth scrubbing
              markers: false,
            },
          });

          gsap.to(moonSurface, {
            rotation: -360 * 3, // 3 full rotations opposite direction
            ease: 'none',
            scrollTrigger: {
              trigger: 'body',
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.5, // Smooth scrubbing
              markers: false,
            },
          });
        }
      }

      // ============================================
      // 2. PORTFOLIO SECTION - Cube Animations
      // ============================================
      const leftCubes = document.querySelectorAll('.cube-left .cube');
      const rightCubes = document.querySelectorAll('.cube-right .cube');
      const isMobile = window.innerWidth <= 768;

      if (leftCubes.length > 0 || rightCubes.length > 0) {
        if (isMobile) {
          // MOBILE: "X" Pattern Animation
          // Left cubes: left → center → right
          // Right cubes: right → center → left
          
          const cubeTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: '#portfolio',
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: true,
              markers: false,
            },
          });

          leftCubes.forEach((cube, index) => {
            // Left cubes cross from left to right through center
            cubeTimeline.fromTo(
              cube,
              {
                x: -window.innerWidth * 0.8, // Start further left
                rotateY: -90,
                opacity: 0,
              },
              {
                keyframes: [
                  // Move to center first
                  { x: 0, rotateY: 0, opacity: 1, duration: 0.5 },
                  // Continue to right
                  { x: window.innerWidth * 0.8, rotateY: 90, opacity: 0, duration: 0.5 }
                ],
                ease: 'power1.inOut',
              },
              index * 0.15 // Stagger delay
            );
          });

          rightCubes.forEach((cube, index) => {
            // Right cubes cross from right to left through center
            cubeTimeline.fromTo(
              cube,
              {
                x: window.innerWidth * 0.8, // Start further right
                rotateY: 90,
                opacity: 0,
              },
              {
                keyframes: [
                  // Move to center first
                  { x: 0, rotateY: 0, opacity: 1, duration: 0.5 },
                  // Continue to left
                  { x: -window.innerWidth * 0.8, rotateY: -90, opacity: 0, duration: 0.5 }
                ],
                ease: 'power1.inOut',
              },
              index * 0.15 // Stagger delay
            );
          });
        } else {
          // DESKTOP: Original Animation (cubes stop at center)
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
      }

      // ============================================
      // 3. ABOUT SECTION - Sun & Moon Converge to Image Bottom
      // ============================================
      if (sun && moon) {
        const aboutImage = document.querySelector('.about-image');
        const aboutSection = document.getElementById('about');
        
        if (aboutImage && aboutSection) {
          // Sun and Moon gradually converge to center and move to bottom 2/3 of image
          // This happens throughout the About section scroll
          gsap.timeline({
            scrollTrigger: {
              trigger: '#about',
              start: 'top bottom', // Start as About enters viewport
              end: 'center center', // End when About center reaches viewport center
              scrub: true,
              markers: false,
            },
          })
          .to(sun, {
            x: -60, // Position to left of center (side by side with moon)
            y: () => {
              // Calculate Y position for bottom 2/3 of the image
              const aboutTop = aboutSection.offsetTop;
              const imageHeight = 500; // Image height from About.jsx
              const viewportHeight = window.innerHeight;
              // Position at bottom third of image (2/3 down from top of image)
              return aboutTop - viewportHeight / 2 + imageHeight * (2/3);
            },
            ease: 'power2.inOut',
          }, 0)
          .to(moon, {
            x: 60, // Position to right of center (side by side with sun)
            y: () => {
              // Calculate Y position for bottom 2/3 of the image
              const aboutTop = aboutSection.offsetTop;
              const imageHeight = 500; // Image height from About.jsx
              const viewportHeight = window.innerHeight;
              // Position at bottom third of image (2/3 down from top of image)
              return aboutTop - viewportHeight / 2 + imageHeight * (2/3);
            },
            ease: 'power2.inOut',
          }, 0);
        }
      }

      // ============================================
      // 4. ABOUT SECTION - Image Animation
      // ============================================
      const aboutImage = document.querySelector('.about-image');

      if (aboutImage) {
        // Image fades in and scales up
        gsap.fromTo(
          aboutImage,
          {
            scale: 0.8,
            opacity: 0,
            rotateY: -20,
          },
          {
            scale: 1,
            opacity: 1,
            rotateY: 0,
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
      // 5. CONTACT SECTION - Entrance Animation
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

