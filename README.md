# 🎨 Scroll-Driven 3D Portfolio

A mobile-first, scroll-driven portfolio website featuring fake 3D effects using CSS + GSAP (NO Three.js). Built for high FPS on low-end phones with premium aesthetics.

## 🚀 Features

- **Mobile-First Design**: Optimized for 375px+ with smooth 60fps scrolling
- **Scroll-Driven Animation**: NO autoplay - every animation is tied to scroll position
- **Fake 3D via CSS**: Pure CSS 3D transforms with `perspective` and `preserve-3d`
- **GSAP + ScrollTrigger**: Precise scroll-scrubbed animations
- **Lenis Smooth Scroll**: Buttery smooth scrolling experience
- **Clean Design System**: Cream base (#F6F1EB) with green accents
- **Performance Optimized**: Only `transform` and `opacity` animations

## 🧱 Tech Stack

- **Framework**: React (Vite)
- **Animation**: GSAP + ScrollTrigger
- **Scrolling**: Lenis
- **Styling**: Tailwind CSS + CSS Modules
- **Typography**: Inter (Google Fonts)

## 📂 Project Structure

```
batman/
├── src/
│   ├── components/
│   │   ├── BallBlue.jsx          # Blue scroll ball
│   │   ├── BallRed.jsx           # Red scroll ball
│   │   ├── Cube.jsx              # CSS 3D cube component
│   │   ├── CubeGrid.jsx          # Portfolio cube layout
│   │   └── AboutStats.jsx        # Tech stack stats
│   ├── sections/
│   │   ├── Landing.jsx           # Hero section
│   │   ├── Portfolio.jsx         # 3D cube portfolio
│   │   ├── About.jsx             # Sticky photo + stats
│   │   └── Contact.jsx           # Liquid form
│   ├── hooks/
│   │   └── useScrollAnimations.js # Master GSAP timeline
│   ├── styles/
│   │   ├── globals.css           # Design system
│   │   └── mobile.css            # Mobile optimizations
│   ├── App.jsx                   # Main app
│   └── main.jsx                  # Entry point
└── package.json
```

## 🎯 Sections

### 1. Landing
- Full viewport hero
- Minimal headline centered
- Balls start above viewport
- **Animation**: Balls fall slightly left/right on scroll

### 2. Cube Portfolio
- 12 portfolio projects as CSS 3D cubes
- 6 from left, 6 from right
- **Animation**: Cubes rotate and translate into view
- Pure `perspective` + `rotateY` + `translateZ`

### 3. About Me (⭐ CRITICAL)
- **Sticky centered photo** (never scrolls away)
- Balls fall onto hands in photo
- **Image crossfade** when balls reach hands
- Stats animate from bottom with stagger
- Clean tech stack cards

### 4. Contact
- Organic liquid SVG filter background
- `feTurbulence` + `feDisplacementMap`
- Distortion increases on input focus
- Clean, readable form

## 🎨 Design System

```css
--cream-base: #F6F1EB
--accent-green: #2F5D50
--dark-green: #1E3D34
--blue-ball: #2D6CDF
--red-ball: #D64545
--text-dark: #1A1A1A
```

**Typography**: Inter (400, 500, 600, 700)  
**Line Height**: 1.4-1.6 for readability

## ⚙️ Installation

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Performance Rules

✅ **DO**
- Animate only `transform` and `opacity`
- Use `will-change: transform`
- Kill ScrollTriggers on unmount
- Test on 375px width minimum
- Respect `prefers-reduced-motion`

❌ **DON'T**
- Use canvas/WebGL
- Animate width/height/margin
- Run animations on load
- Cause layout thrashing
- Over-nest 3D transforms on mobile

## 🧪 Testing Checklist

- [ ] Test on 375px width (iPhone SE)
- [ ] Test scroll jank (use Chrome DevTools)
- [ ] Balls sync perfectly with scroll
- [ ] No animation runs without scroll input
- [ ] Stats appear smoothly
- [ ] Image crossfade is smooth
- [ ] Cubes rotate from correct sides
- [ ] Contact form liquid effect works
- [ ] respects reduced motion
- [ ] 60fps on low-end phones

## 🎭 Animation Details

### Ball Drop (Landing)
```javascript
scrollTrigger: {
  trigger: '#landing',
  start: 'top top',
  end: 'bottom top',
  scrub: true  // NO autoplay
}
```

### Cube Animation (Portfolio)
- Left cubes: `x: -50vw → 0`, `rotateY: -60 → 0`
- Right cubes: `x: 50vw → 0`, `rotateY: 60 → 0`
- Stagger: 0.15s
- Ease: `power2.out`

### About Section Timeline
1. Balls fall onto photo hands
2. Image crossfades (opacity transition)
3. Stats animate up with `rotateX` perspective
4. All scroll-scrubbed on single timeline

## 🔧 Mobile Optimizations

```css
@media (max-width: 480px) {
  /* Reduce ball size */
  /* Simplify cube shadows */
  /* Reduce SVG filter intensity */
  /* Disable heavy 3D transforms */
}
```

## 🌐 Browser Support

- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+
- iOS Safari 14+
- Chrome Android 90+

## 📝 Notes

- **NO Three.js** - Pure CSS 3D only
- **NO autoplay** - Scroll is the input
- **Mobile-first** - Desktop is enhancement
- Lenis handles smooth scroll
- GSAP handles precise animation timing
- All timelines cleaned up on unmount

## 🎯 Key Learnings

1. `scrub: true` ties animation to scroll position
2. `will-change: transform` improves layer creation
3. Sticky positioning + scroll choreography = magic
4. Reduce complexity on mobile for performance
5. Single timeline > multiple animations
6. Crossfade with opacity > abrupt swap

## 📄 License

MIT - Feel free to use for your own portfolio!

---

**Built with intention. Every animation serves a purpose.** ✨
