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
 * Now animates 3D models instead of DOM elements
 */
export default function useScrollAnimations() {
  useEffect(() => {
    let animationContext = null;
    let checkInterval = null;
    let isInitialized = false;
    
    // Wait for 3D refs to be available (they're set in useEffect in components)
    const initAnimations = () => {
      // Prevent multiple initializations
      if (isInitialized) {
        return true;
      }
      
      const sun3D = window.sun3DRef;
      const moon3D = window.moon3DRef;
      
      if (!sun3D || !moon3D) {
        return false; // Refs not ready yet
      }
      
      isInitialized = true;
      
      // Prevent animations during setup
      animationContext = gsap.context(() => {
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;
          
          // ============================================
          // 0. LANDING SECTION - Text Character Stagger Animations
          // ============================================
          const headingEl = document.getElementById('landing-heading');
          const nameEl = document.getElementById('landing-name');
          const subheadingEl = document.getElementById('landing-subheading');
          
          if (headingEl && nameEl && subheadingEl) {
            // Create master timeline for sequential animations
            const textTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: '#landing',
                start: 'top 80%',
                end: 'top 50%',
                toggleActions: 'play none none none',
                markers: false,
              },
            });
            
            // 1. Prepare all text characters for sphere animation
            const headingText = headingEl.textContent;
            const beforeName = headingText.split('Mani')[0]; // "Hi, I'm "
            
            // Split "Hi, I'm " into characters
            const headingChars = beforeName.split('').map((char, i) => {
              const span = document.createElement('span');
              span.textContent = char === ' ' ? '\u00A0' : char;
              span.style.display = 'inline-block';
              return span;
            });
            
            // Replace "Hi, I'm " with wrapped spans
            const tempDiv = document.createElement('div');
            headingChars.forEach(span => tempDiv.appendChild(span));
            headingEl.innerHTML = tempDiv.innerHTML + '<span id="landing-name">Mani</span>';
            
            // Re-get name element after innerHTML change
            const nameElUpdated = document.getElementById('landing-name');
            
            // Set gradient color for Mani
            nameElUpdated.style.background = 'linear-gradient(135deg, var(--aurora-green), var(--aurora-blue), var(--aurora-purple))';
            nameElUpdated.style.WebkitBackgroundClip = 'text';
            nameElUpdated.style.WebkitTextFillColor = 'transparent';
            nameElUpdated.style.backgroundClip = 'text';
            nameElUpdated.style.filter = 'drop-shadow(0 0 10px rgba(0, 255, 135, 0.5))';
            
            // Split "Mani" into characters
            const nameChars = 'Mani'.split('').map((char, i) => {
              const span = document.createElement('span');
              span.textContent = char;
              span.style.display = 'inline-block';
              span.style.background = 'linear-gradient(135deg, var(--aurora-green), var(--aurora-blue), var(--aurora-purple))';
              span.style.WebkitBackgroundClip = 'text';
              span.style.WebkitTextFillColor = 'transparent';
              span.style.backgroundClip = 'text';
              return span;
            });
            
            // Replace "Mani" text with wrapped spans
            nameElUpdated.innerHTML = '';
            nameChars.forEach(span => nameElUpdated.appendChild(span));
            
            // Prepare "coding EXPERIENCES" characters
            const subheadingText = subheadingEl.textContent;
            const subheadingChars = subheadingText.split('').map((char, i) => {
              const span = document.createElement('span');
              span.textContent = char === ' ' ? '\u00A0' : char;
              span.style.display = 'inline-block';
              return span;
            });
            
            subheadingEl.textContent = '';
            subheadingChars.forEach(span => subheadingEl.appendChild(span));
            
            // Re-query headingChars from DOM (they're now actual DOM elements)
            const headingCharsInDOM = Array.from(headingEl.childNodes).filter(
              (node) => node.nodeType === Node.ELEMENT_NODE && node.id !== 'landing-name'
            );
            
            // Collect ALL characters for semi-circle sphere animation
            const allCharsForSphere = [
              ...headingCharsInDOM, // "Hi, I'm "
              ...nameChars, // "Mani"
              ...subheadingChars, // "coding EXPERIENCES"
            ];
            
            // Semi-circle sphere animation - characters move around X-axis like orbiting a sphere horizontally
            const sphereRadius = 600; // Radius of the semi-circle in pixels
            const totalChars = allCharsForSphere.length;
            
            allCharsForSphere.forEach((char, index) => {
              // Calculate angle along semi-circle (0 to 180 degrees, or 0 to π radians)
              // Distribute characters evenly along the semi-circle
              const angle = (index / (totalChars - 1 || 1)) * Math.PI; // 0 to π (semi-circle)
              
              // Calculate position on semi-circle in X-Z plane (horizontal plane, Y stays at 0)
              // X-axis is horizontal, Z-axis is depth
              const startX = sphereRadius * Math.cos(angle); // X position on semi-circle
              const startZ = sphereRadius * Math.sin(angle); // Z position (depth) - creates semi-circle arc
              const startY = 0; // Keep Y at 0 for horizontal semi-circle
              
              // Calculate rotation to face center (characters rotate around Y-axis to face inward)
              const rotationY = (angle * 180 / Math.PI) - 90; // Rotate to face center
              
              // Set initial position on semi-circle
              gsap.set(char, {
                x: startX,
                y: startY,
                z: startZ,
                opacity: 0,
                rotationY: rotationY,
                scale: 0.4,
              });
              
              // Animate from semi-circle position to final center position
              // Use keyframes to create curved motion along the semi-circle path
              textTimeline.to(
                char,
                {
                  keyframes: [
                    // First keyframe: move along curved path (midpoint of semi-circle)
                    {
                      x: startX * 0.5, // Halfway X
                      z: startZ * 0.5, // Halfway Z (creates curved path)
                      rotationY: rotationY * 0.5, // Rotate halfway
                      duration: 0.6,
                      ease: 'power2.out',
                    },
                    // Second keyframe: final position
                    {
                      x: 0, // Final X position (center)
                      y: 0, // Final Y position
                      z: 0, // Final Z position (no depth)
                      opacity: 1,
                      rotationY: 0, // Face forward
                      scale: 1,
                      duration: 0.6,
                      ease: 'power2.out',
                    },
                  ],
                },
                index * 0.04 // Stagger for wave effect along semi-circle
              );
            });
            
            // Add pulsing glow effect to "Mani" after sphere animation
            textTimeline.to(
              nameChars,
              {
                filter: 'drop-shadow(0 0 20px rgba(0, 255, 135, 0.8))',
                duration: 0.3,
                yoyo: true,
                repeat: 1,
              },
              1.2 // After sphere animation completes
            );
            
            // ============================================
            // 0.5. LANDING SECTION - Scroll-linked Character Scatter Animation
            // ============================================
            // Scatter characters horizontally (left/right) as user scrolls down
            // Only "Hi, I'm" and "coding EXPERIENCES" scatter - "Mani" stays put
            // Re-query headingChars from DOM to ensure we have valid references
            const headingCharsForScatter = Array.from(headingEl.childNodes).filter(
              (node) => node.nodeType === Node.ELEMENT_NODE && node.id !== 'landing-name'
            );
            
            const scatterChars = [
              ...headingCharsForScatter, // "Hi, I'm " (from DOM)
              ...subheadingChars, // "coding EXPERIENCES"
              // nameChars excluded - "Mani" stays fixed
            ];
            
            // Assign random horizontal scatter direction to each character
            scatterChars.forEach((char, index) => {
              // Alternate or randomize left/right direction
              const direction = index % 2 === 0 ? -1 : 1; // Alternate left/right
              const scatterAmount = (Math.random() * 300 + 200) * direction; // Random distance 200-500px
              
              // Set initial position (characters start at their normal position)
              gsap.set(char, {
                x: 0,
                rotation: 0,
              });
              
              // Animate character scatter on scroll (reversible - scroll up returns to original)
              gsap.to(char, {
                x: scatterAmount,
                rotation: direction * 45, // Rotate in scatter direction
                ease: 'power1.out', // Smooth easing
                scrollTrigger: {
                  trigger: '#landing',
                  start: 'top top', // Start scattering when landing reaches top
                  end: 'bottom top', // Fully scattered when landing bottom reaches top
                  scrub: true, // Scroll-linked (tied to scroll position) - reversible
                  markers: false,
                },
              });
            });
            
            // Ensure "Mani" stays fixed - no scatter animation
            nameChars.forEach((char) => {
              gsap.set(char, {
                x: 0,
                rotation: 0,
              });
            });
          }
          
          // ============================================
          // 1. LANDING SECTION - Sun and Moon Drop Animation
          // ============================================
          // Initial positions: Sun left (-2, 3), Moon right (2, 3)
          // Animate them falling down and slightly moving apart
          
          const landingTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: '#landing',
              start: 'top top',
              end: 'bottom top',
              scrub: true,
              markers: false,
            },
          });
          
          // Sun falls down and moves slightly left
          landingTimeline.to(sun3D.position, {
            x: -2.5, // Move more left
            y: 0, // Fall to center Y
            ease: 'linear',
          }, 0);
          
          // Moon falls down and moves slightly right
          landingTimeline.to(moon3D.position, {
            x: 2.5, // Move more right
            y: 0, // Fall to center Y
            ease: 'linear',
          }, 0);
          
          // ============================================
          // 2. CONTINUOUS ROTATION - Tied to entire page scroll
          // ============================================
          gsap.to(sun3D.rotation, {
            y: Math.PI * 6, // 3 full rotations (2π * 3)
            ease: 'none',
            scrollTrigger: {
              trigger: 'body',
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.5,
              markers: false,
            },
          });
          
          gsap.to(moon3D.rotation, {
            y: -Math.PI * 6, // 3 full rotations opposite direction
            ease: 'none',
            scrollTrigger: {
              trigger: 'body',
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.5,
              markers: false,
            },
          });
          
          // ============================================
          // 3. PORTFOLIO SECTION - Keep Sun/Moon in position
          // ============================================
          // Sun and Moon stay in their positions during portfolio scroll
          // (No animation needed here, they maintain position from Landing)
          
          // ============================================
          // 4. ABOUT SECTION - Sun & Moon Converge to Image Center + EXPAND
          // ============================================
          const aboutImage = document.querySelector('.about-image');
          const aboutSection = document.getElementById('about');
          
          if (aboutImage && aboutSection) {
            /**
             * Convert screen-space pixels (DOM rect) to Three world coords on the z=0 plane.
             * This makes the planets land exactly on the About image (instead of guessing world-unit y values).
             *
             * IMPORTANT: Must match the `Scene3D` camera values.
             */
            const CAMERA_Z = 5; // `Scene3D` camera z
            const CAMERA_FOV_DEG = 50; // `Scene3D` camera fov

            const screenToWorldAtZ0 = (xPx, yPx) => {
              const vw = window.innerWidth;
              const vh = window.innerHeight;
              const aspect = vw / vh;

              const vFov = (CAMERA_FOV_DEG * Math.PI) / 180;
              const worldHeight = 2 * Math.tan(vFov / 2) * CAMERA_Z;
              const worldWidth = worldHeight * aspect;

              // NDC in [-1, 1]
              const ndcX = (xPx / vw) * 2 - 1;
              const ndcY = -((yPx / vh) * 2 - 1);

              return {
                x: ndcX * (worldWidth / 2),
                y: ndcY * (worldHeight / 2),
              };
            };

            // Create timeline for convergence and expansion
            const aboutTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: '#about',
                start: 'top 80%',
                end: 'center top',
                scrub: 1,
                invalidateOnRefresh: true, // recompute DOM-rect → world mapping on refresh/resize
                markers: false,
              },
            });
            
            // Target: either side of the image, along its bottom edge (not below).
            // We inset from edges so planet centers sit *on* the image, not outside it.
            const getAboutTargets = () => {
              const rect = aboutImage.getBoundingClientRect();

              // Inset is a fraction of image size so it scales on mobile/desktop.
              // - X inset keeps planets inside the image width (so they sit on the image)
              // - Y inset keeps planet centers inside the image height (so they don't dip below)
              const insetXPx = Math.min(110, rect.width * 0.22); // cap for desktop, scale for mobile
              const insetYPx = Math.min(110, rect.height * 0.18); // keeps them on the bottom strip of the image

              const leftXPx = rect.left + insetXPx;
              const rightXPx = rect.right - insetXPx;
              const bottomYPx = rect.bottom - insetYPx;

              const leftWorld = screenToWorldAtZ0(leftXPx, bottomYPx);
              const rightWorld = screenToWorldAtZ0(rightXPx, bottomYPx);

              return { leftWorld, rightWorld };
            };

            // Sun converges to left bottom area of the image
            aboutTimeline.to(sun3D.position, {
              x: () => getAboutTargets().leftWorld.x,
              y: () => getAboutTargets().leftWorld.y,
              z: 0,
              ease: 'power1.inOut',
            }, 0);
            
            aboutTimeline.to(sun3D.scale, {
              x: 0.8, // Smaller size - no expansion
              y: 0.8,
              z: 0.8,
              ease: 'power1.inOut',
            }, 0);
            
            // Moon converges to right bottom area of the image
            aboutTimeline.to(moon3D.position, {
              x: () => getAboutTargets().rightWorld.x,
              y: () => getAboutTargets().rightWorld.y,
              z: 0,
              ease: 'power1.inOut',
            }, 0);
            
            aboutTimeline.to(moon3D.scale, {
              x: 0.8, // Smaller size - no expansion
              y: 0.8,
              z: 0.8,
              ease: 'power1.inOut',
            }, 0);
          }
          
          // ============================================
          // 5. PORTFOLIO SECTION - Cube Orbit Animations (scroll-only)
          // ============================================
          const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

          // Animate the cube CONTAINERS (not the inner `.cube`) to avoid breaking the CSS 3D faces.
          const leftCubeContainers = Array.from(document.querySelectorAll('.cube-container.cube-left'));
          const rightCubeContainers = Array.from(document.querySelectorAll('.cube-container.cube-right'));
          const cubeContainers = [...leftCubeContainers, ...rightCubeContainers];

          if (cubeContainers.length > 0) {
            // === Screen-space helpers ===
            // Must match `Scene3D` camera values.
            const CAMERA_Z = 5;
            const CAMERA_FOV_DEG = 50;

            const clamp = (min, v, max) => Math.min(max, Math.max(min, v));

            /**
             * Convert a Three world position to screen-space pixels.
             * Assumes the camera is at (0,0,CAMERA_Z) looking at the origin, with no rotation.
             */
            const worldToScreenPx = ({ x, y, z }) => {
              const vw = window.innerWidth;
              const vh = window.innerHeight;
              const aspect = vw / vh;

              const vFov = (CAMERA_FOV_DEG * Math.PI) / 180;
              const tan = Math.tan(vFov / 2);

              // Camera-space (camera is at z=CAMERA_Z, looking down -Z)
              const dz = z - CAMERA_Z; // typically negative (in front of camera)
              const depth = -dz;

              // Guard: avoid NaN if something ever ends up behind the camera
              const safeDepth = depth <= 0.001 ? 0.001 : depth;

              const ndcX = (x / safeDepth) / (tan * aspect);
              const ndcY = (y / safeDepth) / tan;

              return {
                x: (ndcX + 1) * 0.5 * vw,
                y: (1 - (ndcY + 1) * 0.5) * vh,
              };
            };

            const getPlanetsCenterPx = () => {
              const sun = worldToScreenPx(sun3D.position);
              const moon = worldToScreenPx(moon3D.position);
              return { sun, moon };
            };

            // === Measure initial cube centers (resting layout) ===
            const leftCount = leftCubeContainers.length || 1;
            const rightCount = rightCubeContainers.length || 1;

            const cubeInfo = [];
            let measuredScrollY = window.scrollY;

            const measureCubes = () => {
              cubeInfo.length = 0;
              measuredScrollY = window.scrollY;

              // Reset transforms before measuring so DOM rects are correct.
              gsap.set(cubeContainers, { x: 0, y: 0, rotationY: 0, scale: 1, opacity: 1 });

              const addGroup = (els, side) => {
                els.forEach((el, i) => {
                  const rect = el.getBoundingClientRect();
                  el.style.willChange = 'transform, opacity';

                  cubeInfo.push({
                    el,
                    side, // 'left' or 'right'
                    ringIndex: i,
                    ringCount: side === 'left' ? leftCount : rightCount,
                    initialCenter: {
                      x: rect.left + rect.width / 2,
                      y: rect.top + rect.height / 2,
                    },
                    measuredScrollY,
                    setX: gsap.quickSetter(el, 'x', 'px'),
                    setY: gsap.quickSetter(el, 'y', 'px'),
                    setRY: gsap.quickSetter(el, 'rotationY', 'deg'),
                    setScale: gsap.quickSetter(el, 'scale'),
                    setOpacity: gsap.quickSetter(el, 'opacity'),
                  });
                });
              };

              addGroup(leftCubeContainers, 'left');
              addGroup(rightCubeContainers, 'right');
            };

            measureCubes();

            const isMobile = window.innerWidth <= 768;
            const orbitTurns = isMobile ? 1.2 : 1.6; // keep mobile crisp
            const getOrbitR = () => clamp(70, window.innerWidth * 0.18, 140);

            const lerp = (a, b, t) => a + (b - a) * t;

            /**
             * Untransformed layout center in viewport px.
             * We correct the measured center by scroll delta so orbits stay centered even while the page scrolls.
             */
            const getBaseCenterPx = (info) => {
              const dy = window.scrollY - info.measuredScrollY;
              return { x: info.initialCenter.x, y: info.initialCenter.y - dy };
            };

            /**
             * Orbit path: horizontal (major axis on X), slight vertical tilt on Y.
             * This reads like a gravitational revolution around the planet center.
             */
            const getOrbitCenterPx = (info, orbitT, radiusExtra = 0) => {
              const { sun, moon } = getPlanetsCenterPx();
              const planet = info.side === 'right' ? sun : moon; // Right cubes → Sun, Left cubes → Moon

              const dir = info.side === 'right' ? 1 : -1;
              const ringCountSafe = info.ringCount || 1;

              // Evenly spaced in a single ring (6 cubes per side in current grid)
              const baseAngle = (info.ringIndex / ringCountSafe) * Math.PI * 2 + (info.side === 'right' ? Math.PI / 6 : -Math.PI / 6);
              const angle = baseAngle + dir * orbitT * orbitTurns * Math.PI * 2;

              const r = getOrbitR() + radiusExtra;
              // Ellipse: wide on X, shallow on Y (horizontal revolution)
              const yTilt = isMobile ? 0.18 : 0.22;
              const rx = r;
              const ry = r * yTilt;

              // Depth illusion: when sin(angle) is positive, cube is "closer" (front)
              const depth = (Math.sin(angle) + 1) / 2; // 0..1

              return {
                x: planet.x + rx * Math.cos(angle),
                y: planet.y + ry * Math.sin(angle),
                angle,
                depth,
              };
            };

            // === Reduced motion fallback ===
            if (prefersReducedMotion) {
              const reducedTl = gsap.timeline({
                scrollTrigger: {
                  trigger: '#portfolio',
                  // Start later so this sequence doesn't visually collide with Landing
                  start: 'top 35%',
                  end: 'bottom 20%',
                  scrub: 1,
                  invalidateOnRefresh: true,
                  onRefreshInit: measureCubes,
                  markers: false,
                },
              });

              // Enter from below (like the original feel), but keep it scroll-driven.
              reducedTl.set(cubeContainers, { y: () => window.innerHeight * 0.55, opacity: 0, scale: 0.9 }, 0);

              // Enter → brief settle → fade (no orbit for reduced-motion)
              reducedTl
                .to(cubeContainers, { y: 0, opacity: 1, scale: 1, ease: 'none', duration: 0.35, stagger: 0.02 }, 0.02)
                .to({}, { duration: 0.12 }) // hold
                .to(cubeContainers, { opacity: 0, ease: 'none', duration: 0.25 }, 0.75);
            } else {
              // === Full orbit choreography (entry from below → transition → orbit) ===
              const orbitState = { t: 0 };
              const driftState = { p: 0 };

              const orbitTl = gsap.timeline({
                scrollTrigger: {
                  trigger: '#portfolio',
                  // Start after Landing is mostly gone to avoid overlap.
                  start: 'top 35%',
                  end: 'bottom 20%',
                  scrub: 0.6, // Smoother scroll scrubbing (lower = smoother, more responsive)
                  invalidateOnRefresh: true,
                  onRefreshInit: measureCubes,
                  markers: false,
                },
              });

              // ============================================
              // PHASE A: ENTRY FROM BELOW (scroll-linked)
              // ============================================
              // We keep this 100% scrub-linked (ease: 'none') so it feels strictly tied to scroll.
              const entryOffsetY = () => window.innerHeight * 0.6;
              const entryStagger = 0.035; // each cube rises one-by-one (scroll linked)
              const entryDuration = 0.34; // duration per cube rise

              const maxRowIndex = cubeInfo.reduce((m, info) => Math.max(m, info.ringIndex), 0);
              const orderedInfos = [];
              for (let row = 0; row <= maxRowIndex; row += 1) {
                const left = cubeInfo.find((info) => info.ringIndex === row && info.side === 'left');
                const right = cubeInfo.find((info) => info.ringIndex === row && info.side === 'right');
                if (left) orderedInfos.push(left);
                if (right) orderedInfos.push(right);
              }

              // Initial hidden state (applied at scroll progress 0)
              orbitTl.set(
                cubeContainers,
                {
                  x: 0,
                  y: entryOffsetY(),
                  opacity: 0,
                  scale: 0.9,
                  rotationX: 28,
                  rotationY: 0,
                },
                0
              );

              // Cubes rise from below into their natural grid positions (left+right per row, wave)
              orbitTl.to(
                orderedInfos.map((i) => i.el),
                {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  rotationX: 0,
                  ease: 'none',
                  duration: entryDuration,
                  stagger: entryStagger,
                },
                0.02
              );

              const entryPhaseEnd = 0.02 + entryDuration + entryStagger * Math.max(0, orderedInfos.length - 1);

              // ============================================
              // PHASE B: SETTLE & HOLD
              // ============================================
              // Brief pause to let the entry read clearly before transition
              orbitTl.to({}, { duration: 0.14 }, entryPhaseEnd);

              // ============================================
              // PHASE C: SMOOTH TRANSITION TO ORBIT
              // ============================================
              const transitionStart = entryPhaseEnd + 0.14;
              const transitionDuration = 0.46; // a touch longer to feel seamless
              const transitionStagger = 0.02; // stagger the "fly-to-orbit" so it reads clearly

              const getPlanetPx = (info) => {
                const { sun, moon } = getPlanetsCenterPx();
                return info.side === 'right' ? sun : moon;
              };

              orderedInfos.forEach((info, idx) => {
                const t0 = transitionStart + idx * transitionStagger;

                // Create a smooth curved path: two-phase transition
                // Phase C1: Pull toward planet (curved arc upward) - more dramatic curve
                orbitTl.to(
                  info.el,
                  {
                    x: () => {
                      const base = getBaseCenterPx(info);
                      const planet = getPlanetPx(info);
                      const midX = base.x + (planet.x - base.x) * 0.55;
                      return midX - base.x;
                    },
                    y: () => {
                      const base = getBaseCenterPx(info);
                      const planet = getPlanetPx(info);
                      const midY = base.y + (planet.y - base.y) * 0.55 - window.innerHeight * 0.12;
                      return midY - base.y;
                    },
                    rotationY: info.side === 'right' ? 75 : -75,
                    scale: 0.92,
                    ease: 'power2.inOut',
                    duration: transitionDuration * 0.55,
                  },
                  t0
                );

                // Phase C2: Settle into orbit position (smooth landing with slight overshoot correction)
                orbitTl.to(
                  info.el,
                  {
                    x: () => {
                      const base = getBaseCenterPx(info);
                      const orbitStartPx = getOrbitCenterPx(info, 0);
                      return orbitStartPx.x - base.x;
                    },
                    y: () => {
                      const base = getBaseCenterPx(info);
                      const orbitStartPx = getOrbitCenterPx(info, 0);
                      return orbitStartPx.y - base.y;
                    },
                    rotationY: info.side === 'right' ? 180 : -180,
                    scale: 1,
                    ease: 'power2.inOut',
                    duration: transitionDuration * 0.45,
                  },
                  t0 + transitionDuration * 0.55
                );
              });

              // ============================================
              // PHASE D: ORBIT ANIMATION
              // ============================================
              const transitionEnd =
                transitionStart + transitionDuration + transitionStagger * Math.max(0, orderedInfos.length - 1);
              const orbitStart = transitionEnd;
              const orbitDuration = 0.4; // Longer orbit for more visible revolution

              orbitTl.to(
                orbitState,
                {
                  t: 1,
                  ease: 'none',
                  duration: orbitDuration,
                  onUpdate: () => {
                    cubeInfo.forEach((info) => {
                      const center = getOrbitCenterPx(info, orbitState.t);
                      const base = getBaseCenterPx(info);
                      info.setX(center.x - base.x);
                      info.setY(center.y - base.y);
                      // Self-rotation + depth-based scale/opacity to simulate front/back revolution
                      info.setRY((info.side === 'right' ? 1 : -1) * orbitState.t * 360);
                      info.setScale(lerp(0.88, 1.08, center.depth));
                      info.setOpacity(lerp(0.65, 1, center.depth));
                    });
                  },
                },
                orbitStart
              );

              // ============================================
              // PHASE E: DRIFT OUTWARD + FADE OUT
              // ============================================
              const fadeStart = orbitStart + orbitDuration;
              const fadeDuration = 0.2;

              orbitTl.to(
                driftState,
                {
                  p: 1,
                  ease: 'power1.out',
                  duration: fadeDuration,
                  onUpdate: () => {
                    const drift = driftState.p;
                    const driftR = drift * 100; // Slightly larger drift radius

                    cubeInfo.forEach((info) => {
                      const center = getOrbitCenterPx(info, 1, driftR);
                      const base = getBaseCenterPx(info);
                      info.setX(center.x - base.x);
                      info.setY(center.y - base.y);
                      info.setRY((info.side === 'right' ? 1 : -1) * (orbitTurns * 360 + drift * 150));
                      info.setScale(lerp(0.88, 1.08, center.depth) * (1 - drift * 0.12));
                      info.setOpacity(lerp(0.65, 1, center.depth) * (1 - drift));
                    });
                  },
                },
                fadeStart
              );
            }
          }
          
          // ============================================
          // 6. ABOUT SECTION - Image Animation
          // ============================================
          const aboutImageEl = document.querySelector('.about-image');
          
          if (aboutImageEl) {
            gsap.fromTo(
              aboutImageEl,
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
          // 7. CONTACT SECTION - Entrance Animation
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
      
      return true; // Successfully initialized
    };
    
    // Try to initialize immediately (in case refs are already set)
    if (!initAnimations()) {
      // If not ready, check periodically
      checkInterval = setInterval(() => {
        if (initAnimations()) {
          clearInterval(checkInterval);
        }
      }, 100);
    }
    
    // Cleanup function
    return () => {
      if (checkInterval) {
        clearInterval(checkInterval);
      }
      if (animationContext) {
        animationContext.revert();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
}
