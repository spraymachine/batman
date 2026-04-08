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
    let scrollListenerCleanup = null;
    
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

            // ============================================
            // 0a. ASSEMBLE-ON-ARRIVAL: "Hi, I'm" and "coding EXPERIENCES"
            // ============================================
            // Characters start scattered (opacity 0), assemble into center on mount.
            // No scroll trigger — runs once when animations initialize.
            const prefersReducedMotionLanding = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
            const scatterChars = [...headingCharsInDOM, ...subheadingChars];

            scatterChars.forEach((char, index) => {
              const direction = index % 2 === 0 ? -1 : 1;
              const scatterAmount = (Math.random() * 300 + 200) * direction;

              if (prefersReducedMotionLanding) {
                gsap.set(char, { x: 0, rotation: 0, opacity: 1 });
              } else {
                gsap.set(char, {
                  x: scatterAmount,
                  rotation: direction * 45,
                  opacity: 0,
                });
              }
            });

            if (!prefersReducedMotionLanding) {
              gsap.to(scatterChars, {
                x: 0,
                rotation: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.04,
                ease: 'power2.out',
              });
            }

            // Show landing content now that initial states are set (prevents flash of unstyled text)
            const landingContent = document.getElementById('landing-content');
            if (landingContent) gsap.set(landingContent, { opacity: 1 });

            // ============================================
            // 0b. SPHERE ANIMATION: "Mani" only (scroll-triggered)
            // ============================================
            const sphereRadius = 600;
            const totalChars = nameChars.length;

            nameChars.forEach((char, index) => {
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
            
          }
          
          // ============================================
          // 1. LANDING SECTION - Sun and Moon Drop Animation
          // ============================================
          // Positions are viewport-responsive: on mobile (narrow aspect) planets stay visible
          const getPlanetLandingPositions = () => {
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            const aspect = vw / vh;
            const CAMERA_Z = 5;
            const FOV_DEG = 50;
            const worldHeight = 2 * Math.tan((FOV_DEG * Math.PI) / 360) * CAMERA_Z;
            const worldWidth = worldHeight * aspect;
            const maxX = worldWidth / 2 - 0.15; // margin from edge
            const isMobile = vw <= 768;
            // Push planets further out on mobile so they don't block content
            const sunX = isMobile ? -Math.min(maxX, 1.6) : -2.5;
            const moonX = isMobile ? Math.min(maxX, 1.6) : 2.5;
            const sunStartX = isMobile ? -1.3 : -2;
            const moonStartX = isMobile ? 1.3 : 2;
            return { sunStartX, moonStartX, sunX, moonX };
          };

          const prefersReducedMotionPlanets = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

          // Mobile: scale planets down so they don't dominate the narrow viewport
          const isMobilePlanets = viewportWidth <= 768;
          const mobileInitialScale = isMobilePlanets ? 0.65 : 1;
          if (isMobilePlanets) {
            gsap.set(sun3D.scale, { x: mobileInitialScale, y: mobileInitialScale, z: mobileInitialScale });
            gsap.set(moon3D.scale, { x: mobileInitialScale, y: mobileInitialScale, z: mobileInitialScale });
          }

          // Set initial positions: beside landing text (y=0), no off-screen start
          const initPos = getPlanetLandingPositions();
          gsap.set(sun3D.position, { x: initPos.sunStartX, y: 0, z: 0 });
          gsap.set(moon3D.position, { x: initPos.moonStartX, y: 0, z: 0 });

          // Main scroll-driven position timeline: horizontal drift from beside text to final positions
          // Created paused; plays after spin completes (or immediately if reduced-motion)
          const landingTimeline = gsap.timeline({
            paused: true,
            scrollTrigger: {
              trigger: '#landing',
              start: 'top top',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true,
              markers: false,
            },
          });

          landingTimeline.fromTo(
            sun3D.position,
            { x: () => getPlanetLandingPositions().sunStartX, y: 0, z: 0 },
            { x: () => getPlanetLandingPositions().sunX, y: 0, z: 0, ease: 'linear' },
            0
          );
          landingTimeline.fromTo(
            moon3D.position,
            { x: () => getPlanetLandingPositions().moonStartX, y: 0, z: 0 },
            { x: () => getPlanetLandingPositions().moonX, y: 0, z: 0, ease: 'linear' },
            0
          );

          // Spin-on-first-scroll: 2 full rotations in place, then enable position timeline + continuous rotation
          const startPositionTimeline = () => {
            landingTimeline.play();
            // Continue from current rotation (where spin left us) to avoid jittery handoff
            const sunStartY = sun3D.rotation.y;
            const moonStartY = moon3D.rotation.y;
            gsap.fromTo(
              sun3D.rotation,
              { y: sunStartY },
              {
                y: sunStartY + Math.PI * 6,
                ease: 'none',
                scrollTrigger: {
                  trigger: 'body',
                  start: 'top top',
                  end: 'bottom bottom',
                  scrub: 0.5,
                  markers: false,
                },
              }
            );
            gsap.fromTo(
              moon3D.rotation,
              { y: moonStartY },
              {
                y: moonStartY - Math.PI * 6,
                ease: 'none',
                scrollTrigger: {
                  trigger: 'body',
                  start: 'top top',
                  end: 'bottom bottom',
                  scrub: 0.5,
                  markers: false,
                },
              }
            );
          };

          if (prefersReducedMotionPlanets) {
            startPositionTimeline();
          } else {
            let spinTriggered = false;
            const SPIN_DURATION = 1.6;
            const TWO_ROTATIONS = Math.PI * 4;

            const triggerSpin = () => {
              if (spinTriggered) return;
              spinTriggered = true;
              if (scrollListenerCleanup) {
                scrollListenerCleanup();
                scrollListenerCleanup = null;
              }

              gsap.to(sun3D.rotation, {
                y: `+=${TWO_ROTATIONS}`,
                duration: SPIN_DURATION,
                ease: 'power2.inOut',
                overwrite: 'auto',
              });
              gsap.to(moon3D.rotation, {
                y: `+=${-TWO_ROTATIONS}`,
                duration: SPIN_DURATION,
                ease: 'power2.inOut',
                overwrite: 'auto',
              });

              gsap.delayedCall(SPIN_DURATION, startPositionTimeline);
            };

            // Race condition fix: if models loaded after user already scrolled
            // (common on slow mobile connections), skip the spin and go straight
            // to the position timeline so planets animate correctly.
            if (window.scrollY > 5) {
              startPositionTimeline();
            } else {
              const onFirstScroll = () => {
                if (window.scrollY > 5) triggerSpin();
              };
              scrollListenerCleanup = () => window.removeEventListener('scroll', onFirstScroll);
              window.addEventListener('scroll', onFirstScroll, { passive: true });
            }
          }
          
          // ============================================
          // 2. CONTINUOUS ROTATION - Tied to entire page scroll
          // Created inside startPositionTimeline (after spin) so it doesn't overwrite the spin
          // ============================================
          
          // ============================================
          // 3. PORTFOLIO SECTION - Drift Sun/Moon down on mobile
          // ============================================
          // On mobile the planets block portfolio cubes when stuck at y=0.
          // Gently lower them during portfolio scroll so content stays readable.
          if (isMobilePlanets) {
            const portfolioDrift = gsap.timeline({
              scrollTrigger: {
                trigger: '#portfolio',
                start: 'top 80%',
                end: 'bottom 80%',
                scrub: 1,
                invalidateOnRefresh: true,
                markers: false,
              },
            });
            portfolioDrift.to(sun3D.position, { y: -1.2, ease: 'none' }, 0);
            portfolioDrift.to(moon3D.position, { y: -1.2, ease: 'none' }, 0);
          }
          
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
            
            // Target: over the image with each planet's bottom edge aligned to the lower border.
            const getAboutTargets = () => {
              const rect = aboutImage.getBoundingClientRect();
              const vw = window.innerWidth;
              const aspect = vw / window.innerHeight;
              const worldHeight = 2 * Math.tan((CAMERA_FOV_DEG * Math.PI) / 360) * CAMERA_Z;
              const worldWidth = worldHeight * aspect;
              const maxWorldX = worldWidth / 2 - 0.2;
              const scale = getAboutScale();
              const sunHalfHeightWorld = (window.sun3DHalfHeight ?? 0.5) * scale;
              const moonHalfHeightWorld = (window.moon3DHalfHeight ?? 0.5) * scale;

              // Slightly tighter on phones so the planets sit on the picture without spilling off the card.
              const isPhone = window.innerWidth <= 480;
              const insetXPx = isPhone
                ? Math.min(68, rect.width * 0.18)
                : Math.min(90, rect.width * 0.2);
              const leftXPx = rect.left + insetXPx;
              const rightXPx = rect.right - insetXPx;
              const targetYPx = rect.top + rect.height / 2; // halfway of the pic

              let leftWorld = screenToWorldAtZ0(leftXPx, targetYPx);
              let rightWorld = screenToWorldAtZ0(rightXPx, targetYPx);

              leftWorld = { ...leftWorld, y: leftWorld.y + sunHalfHeightWorld };
              rightWorld = { ...rightWorld, y: rightWorld.y + moonHalfHeightWorld };

              // Clamp to visible world bounds (prevents planets off-screen on narrow viewports)
              leftWorld = { ...leftWorld, x: Math.max(-maxWorldX, leftWorld.x) };
              rightWorld = { ...rightWorld, x: Math.min(maxWorldX, rightWorld.x) };

              return { leftWorld, rightWorld };
            };

            const getAboutScale = () => {
              if (window.innerWidth <= 480) return 0.55;
              if (window.innerWidth <= 768) return 0.6;
              return 0.8;
            };

            const aboutState = { progress: 0 };

            aboutTimeline.to(aboutState, {
              progress: 1,
              ease: 'none',
              onUpdate: () => {
                const { leftWorld, rightWorld } = getAboutTargets();
                const scale = getAboutScale();
                const landingPositions = getPlanetLandingPositions();
                const baseScale = isMobilePlanets ? mobileInitialScale : 1;
                const currentScale = gsap.utils.interpolate(baseScale, scale, aboutState.progress);

                gsap.set(sun3D.position, {
                  x: gsap.utils.interpolate(landingPositions.sunX, leftWorld.x, aboutState.progress),
                  y: gsap.utils.interpolate(0, leftWorld.y, aboutState.progress),
                  z: 0,
                });

                gsap.set(moon3D.position, {
                  x: gsap.utils.interpolate(landingPositions.moonX, rightWorld.x, aboutState.progress),
                  y: gsap.utils.interpolate(0, rightWorld.y, aboutState.progress),
                  z: 0,
                });

                gsap.set(sun3D.scale, {
                  x: currentScale,
                  y: currentScale,
                  z: currentScale,
                });

                gsap.set(moon3D.scale, {
                  x: currentScale,
                  y: currentScale,
                  z: currentScale,
                });
              },
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

            const lerp = (a, b, t) => a + (b - a) * t;

            /**
             * Untransformed layout center in viewport px.
             * We correct the measured center by scroll delta so trajectories stay centered even while the page scrolls.
             */
            const getBaseCenterPx = (info) => {
              const dy = window.scrollY - info.measuredScrollY;
              return { x: info.initialCenter.x, y: info.initialCenter.y - dy };
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
              // === Gravity slingshot choreography (entry from below → transition → flyby → fade) ===
              const slingshotState = { t: 0 };
              const transitionState = { blend: 0 };

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
              orbitTl.to({}, { duration: 0.1 }, entryPhaseEnd);

              // ============================================
              // PHASE C: SMOOTH TRANSITION TO SLINGSHOT START
              // ============================================
              const transitionStart = entryPhaseEnd + 0.1;
              const transitionDuration = 0.52;

              // === Slingshot helpers (2D screen-space) ===
              // Cubic Bézier utilities (no extra deps) for a gravity-bend flyby.
              const bezier = (t, p0, p1, p2, p3) => {
                const u = 1 - t;
                const u2 = u * u;
                const u3 = u2 * u;
                const t2 = t * t;
                const t3 = t2 * t;
                return u3 * p0 + 3 * u2 * t * p1 + 3 * u * t2 * p2 + t3 * p3;
              };

              const bezierTangent = (t, p0, p1, p2, p3) => {
                const u = 1 - t;
                // Derivative of cubic Bézier
                return (
                  3 * u * u * (p1 - p0) +
                  6 * u * t * (p2 - p1) +
                  3 * t * t * (p3 - p2)
                );
              };

              const getFlybyR = () => {
                // Mobile: smaller, tighter flyby so it fits narrow viewports.
                // Desktop: slightly wider for drama.
                return isMobile
                  ? clamp(52, window.innerWidth * 0.16, 108)
                  : clamp(74, window.innerWidth * 0.18, 150);
              };

              const getSlingshotPosition = (info, localT, radiusExtra = 0) => {
                const { sun, moon } = getPlanetsCenterPx();
                const planet = info.side === 'right' ? moon : sun; // Right cubes → Moon, Left cubes → Sun

                const ringCountSafe = info.ringCount || 1;
                const lane =
                  (info.ringIndex - (ringCountSafe - 1) / 2) / ringCountSafe; // roughly [-0.5..0.5]

                const r = getFlybyR() + radiusExtra;
                // Mirror horizontally for the Moon side (approach from top-right → exit bottom-left).
                const xMul = info.side === 'right' ? -1 : 1;

                // Control points (clockwise-ish bend around planet)
                const p0 = { x: planet.x + xMul * (-r * 1.2), y: planet.y + (-r * 0.9) + lane * (r * 0.18) };
                const p1 = { x: planet.x + xMul * (-r * 0.35), y: planet.y + (r * 0.25) + lane * (r * 0.22) };
                const p2 = { x: planet.x + xMul * (r * 0.35), y: planet.y + (r * 0.6) + lane * (r * 0.16) };
                const p3 = { x: planet.x + xMul * (r * 1.25), y: planet.y + (r * 0.92) + lane * (r * 0.14) };

                const x = bezier(localT, p0.x, p1.x, p2.x, p3.x);
                const y = bezier(localT, p0.y, p1.y, p2.y, p3.y);

                const tx = bezierTangent(localT, p0.x, p1.x, p2.x, p3.x);
                const ty = bezierTangent(localT, p0.y, p1.y, p2.y, p3.y);
                const speed = Math.sqrt(tx * tx + ty * ty);

                const distToPlanet = Math.sqrt(
                  Math.pow(x - planet.x, 2) + Math.pow(y - planet.y, 2)
                );

                return { x, y, tx, ty, speed, distToPlanet, r };
              };

              // Assign a consistent sequence index so left/right cubes stream in a single readable order.
              const sequenceIndexByEl = new Map();
              orderedInfos.forEach((info, idx) => sequenceIndexByEl.set(info.el, idx));

              // Blend the line formation into the slingshot start position.
              orbitTl.set(transitionState, { blend: 0 }, transitionStart);
              orbitTl.to(
                transitionState,
                {
                  blend: 1,
                  ease: 'power2.inOut',
                  duration: transitionDuration,
                  onUpdate: () => {
                    cubeInfo.forEach((info) => {
                      const base = getBaseCenterPx(info);
                      const p = getSlingshotPosition(info, 0);
                      const targetX = p.x - base.x;
                      const targetY = p.y - base.y;

                      info.setX(targetX * transitionState.blend);
                      info.setY(targetY * transitionState.blend);
                      info.setRY(0);
                      info.setScale(lerp(1, 0.98, transitionState.blend));
                      info.setOpacity(lerp(1, 1, transitionState.blend));
                    });
                  },
                },
                transitionStart
              );

              // ============================================
              // PHASE D: SLINGSHOT FLYBY (scroll-linked)
              // ============================================
              const transitionEnd = transitionStart + transitionDuration;
              const slingshotStart = transitionEnd;
              const STAGGER = 0.07; // stream spacing between cubes
              const slingshotEndT = 1 + STAGGER * Math.max(0, orderedInfos.length - 1);
              const slingshotDuration = 0.62; // scroll-linked duration budget for the whole stream

              orbitTl.set(slingshotState, { t: 0 }, slingshotStart);
              orbitTl.to(
                slingshotState,
                {
                  t: slingshotEndT,
                  ease: 'none',
                  duration: slingshotDuration,
                  onUpdate: () => {
                    cubeInfo.forEach((info) => {
                      const base = getBaseCenterPx(info);
                      const seqIdx = sequenceIndexByEl.get(info.el) ?? 0;
                      const localT = slingshotState.t - seqIdx * STAGGER;

                      // Clamp to path range for stable math, but manage opacity around edges.
                      const tClamped = clamp(0, localT, 1);
                      const p = getSlingshotPosition(info, tClamped);

                      info.setX(p.x - base.x);
                      info.setY(p.y - base.y);

                      // Subtle self spin for energy (kept small so it reads on mobile)
                      const spinDir = info.side === 'right' ? 1 : -1;
                      info.setRY(spinDir * (tClamped * 220 + info.ringIndex * 10));

                      // Pop near the planet: closer distance → slightly larger/brighter
                      const closeT = 1 - clamp(0, p.distToPlanet / (p.r * 0.95), 1);
                      const scale = lerp(0.92, 1.12, closeT);

                      // Fade in/out based on streaming window around [0..1]
                      const fadeIn = clamp(0, localT / 0.12, 1);
                      const fadeOut = 1 - clamp(0, (localT - 1) / 0.22, 1);
                      const alpha = fadeIn * fadeOut;

                      info.setScale(scale);
                      info.setOpacity(lerp(0.55, 1, closeT) * alpha);
                    });
                  },
                },
                slingshotStart
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
      if (scrollListenerCleanup) {
        scrollListenerCleanup();
      }
      if (animationContext) {
        animationContext.revert();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
}
