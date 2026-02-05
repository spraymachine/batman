# 🏗️ Architecture Overview

## Component Hierarchy

```
App.jsx
├── BallBlue.jsx (fixed position)
├── BallRed.jsx (fixed position)
└── main
    ├── Landing.jsx
    │   └── (Hero content)
    │
    ├── Portfolio.jsx
    │   └── CubeGrid.jsx
    │       ├── Cube.jsx (x6 from left)
    │       └── Cube.jsx (x6 from right)
    │
    ├── About.jsx
    │   ├── Image 1 (sticky)
    │   ├── Image 2 (sticky, crossfade)
    │   └── AboutStats.jsx
    │       ├── StatCard (Languages)
    │       ├── StatCard (Frontend)
    │       ├── StatCard (Backend)
    │       └── StatCard (Cloud & Tools)
    │
    └── Contact.jsx
        ├── SVG Filter Background
        └── Form
            ├── Name Input
            ├── Email Input
            ├── Message Textarea
            └── Submit Button
```

## Data Flow

```
User Scrolls
    ↓
Lenis Smooth Scroll
    ↓
GSAP ScrollTrigger Listens
    ↓
useScrollAnimations Hook
    ↓
Timeline Animations Execute
    ↓
├── Ball positions update (translateY, translateX, rotate)
├── Cube transforms update (translateX, rotateY, opacity)
├── About image opacity crossfade
├── Stats cards animate up (translateY, rotateX, opacity)
└── Contact section fades in
```

## Scroll Trigger Points

```
Viewport Position          Animation State
─────────────────────────────────────────────

[Landing Top]             Balls above viewport
    ↓
 Scroll 25%               Balls start falling
    ↓
 Scroll 50%               Balls mid-fall, slight rotation
    ↓
[Landing Bottom]          Balls at 60% viewport height

[Portfolio Top 80%]       Cubes start appearing
    ↓
 Scroll                   Cubes rotate + translate
    ↓
[Portfolio Bottom 20%]    All cubes visible, rotated 0°

[About Top]               Balls continue to photo
    ↓
 Scroll 30%               Balls reaching hands
    ↓
 Scroll 50%               Image crossfade triggers
    ↓
 Scroll 70%               Stats start appearing
    ↓
[About Bottom]            Stats fully visible

[Contact Top 80%]         Form starts fading in
    ↓
[Contact Top 50%]         Form fully visible
```

## CSS 3D Transform Layers

```
Cube Structure (3D Space):

         [Top Face]
            ↑
            |
[Left] ← [Front] → [Right]
            |
            ↓
        [Bottom]
            |
          [Back]

Each face:
- position: absolute
- transform: rotateY/X(angle) translateZ(distance)
- backface-visibility: hidden

Container:
- transform-style: preserve-3d
- perspective: 1200px
```

## Animation Timeline Structure

```javascript
// Landing Section
Timeline 1: Ball Drop
├─ Start: Landing top in viewport
├─ End: Landing bottom leaves viewport
├─ Blue Ball: y += 60vh, x -= 50px, rotate 45deg
└─ Red Ball: y += 60vh, x += 50px, rotate -45deg

// Portfolio Section
Timeline 2: Cube Entrance
├─ Start: Portfolio top at 80% viewport
├─ End: Portfolio bottom at 20% viewport
├─ Left Cubes (staggered 0.15s):
│   └─ from: x: -50vw, rotateY: -60, opacity: 0
│   └─ to: x: 0, rotateY: 0, opacity: 1
└─ Right Cubes (staggered 0.15s):
    └─ from: x: 50vw, rotateY: 60, opacity: 0
    └─ to: x: 0, rotateY: 0, opacity: 1

// About Section
Timeline 3: Photo Interaction
├─ Start: About top at viewport top
├─ End: About bottom at viewport bottom
├─ 0.0s: Balls fall to photo (y: photoY, scale: 0.8)
├─ 0.5s: Image 1 opacity: 1 → 0
├─ 0.5s: Image 2 opacity: 0 → 1 (simultaneous)
└─ 0.7s: Stats cards appear (y: 80→0, opacity: 0→1, rotateX: 10→0)

// Contact Section
Timeline 4: Form Entrance
├─ Start: Contact top at 80% viewport
└─ End: Contact top at 50% viewport
```

## State Management

```
No global state required!

Component-level state:
├── Contact.jsx
│   └── focusedInput (for liquid filter intensity)
│
└── useScrollAnimations.js
    └── GSAP timelines (managed by gsap.context)

All animation state managed by GSAP + ScrollTrigger
```

## Performance Optimization Strategy

```
Level 1: All Devices
├── Only animate transform & opacity
├── Use will-change: transform
├── backface-visibility: hidden on 3D elements
└── Clean up ScrollTriggers on unmount

Level 2: Mobile (<768px)
├── Reduce ball size (80px → 60px)
├── Reduce cube size (150px → 120px)
├── Simplify shadows
└── Reduce SVG filter intensity

Level 3: Touch Devices
├── Disable Lenis smooth scroll on touch
├── Flatten 3D transforms (preserve-3d → flat)
└── Increase touch target sizes (44px min)

Level 4: Reduced Motion
├── Disable all animations
├── Remove filters
└── Instant transitions
```

## File Dependencies

```
App.jsx
├── imports Lenis
├── imports useScrollAnimations
├── imports BallBlue
├── imports BallRed
└── imports sections (Landing, Portfolio, About, Contact)

useScrollAnimations.js
├── imports gsap
└── imports ScrollTrigger (plugin)

All sections
├── import styles from globals.css
└── import styles from mobile.css

main.jsx
└── imports App.jsx

index.html
└── loads main.jsx
```

## Build Output

```
npm run build →

dist/
├── index.html (0.96 KB)
├── assets/
│   ├── index-[hash].css (5.27 KB)
│   └── index-[hash].js (334.89 KB)
└── vite.svg

Total: ~341 KB (gzipped: ~115 KB)
```

## CSS Architecture

```
globals.css
├── CSS Variables (design system)
├── Base resets
├── Typography
├── Section base styles
├── 3D transform utilities
└── Scrollbar styles

mobile.css
├── @media (max-width: 480px) - Phone
├── @media (max-width: 768px) - Tablet
├── @media (orientation: landscape) - Landscape
├── @media (hover: none) - Touch
├── @media (prefers-reduced-motion) - Accessibility
└── @media (prefers-color-scheme: dark) - Dark mode

Tailwind (utility classes)
└── Used minimally for quick layouts
```

## Hooks Architecture

```javascript
useScrollAnimations()
│
├── useEffect(() => {
│   │
│   ├── gsap.context(() => {
│   │   │
│   │   ├── Ball Drop Timeline
│   │   ├── Cube Animation Timeline
│   │   ├── About Section Timeline
│   │   └── Contact Entrance Timeline
│   │   })
│   │
│   └── return cleanup (kills all ScrollTriggers)
│   })
│
└── Called once on App mount
```

## Critical Render Path

```
1. index.html loads
    ↓
2. main.jsx initializes React
    ↓
3. App.jsx renders
    ↓
4. Lenis initializes (smooth scroll)
    ↓
5. useScrollAnimations hook runs
    ↓
6. GSAP creates ScrollTriggers
    ↓
7. All sections render
    ↓
8. Balls render (fixed position)
    ↓
9. User scrolls → animations execute
```

## Design Patterns Used

1. **Compound Components**: Cube → CubeGrid
2. **Custom Hooks**: useScrollAnimations
3. **Singleton Pattern**: Lenis instance
4. **Observer Pattern**: ScrollTrigger watching scroll
5. **Factory Pattern**: Timeline creation
6. **Cleanup Pattern**: useEffect return function

## Key Technical Decisions

| Decision | Reason |
|----------|--------|
| React (not Next.js) | Simpler setup, client-side only |
| Vite (not CRA) | Faster builds, better DX |
| Lenis (not Locomotive) | Lighter, smoother on mobile |
| GSAP (not Framer Motion) | Better ScrollTrigger integration |
| CSS 3D (not Three.js) | Better performance on mobile |
| Inline styles (some cases) | Dynamic values from JS |
| Tailwind + Custom CSS | Balance of utility & control |

## Browser Rendering Flow

```
User Scrolls
    ↓
requestAnimationFrame
    ↓
Lenis calculates smooth position
    ↓
ScrollTrigger updates progress
    ↓
GSAP updates transform values
    ↓
Browser composites layers (GPU)
    ↓
Render at 60fps
```

## Testing Strategy

```
Unit Tests (Not Implemented)
└── Component rendering
└── Prop validation

Integration Tests (Not Implemented)
└── Scroll behavior
└── Animation triggers

Manual Testing (Required)
├── Visual inspection
├── Scroll smoothness
├── Mobile responsive
├── Performance profiling
└── Cross-browser compatibility
```

---

**This architecture prioritizes:**
- Performance (60fps on mobile)
- Simplicity (no over-engineering)
- Maintainability (clear structure)
- Scalability (easy to extend)


