# Development Guide

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`

## 🎨 Customizing Your Portfolio

### 1. Update Personal Information

**Landing Section** (`src/sections/Landing.jsx`)
```javascript
<h1>Your Name</h1>
<p>Your tagline</p>
```

**About Section** (`src/sections/About.jsx`)
- Replace emoji placeholders with actual photos
- Update the about text
- Modify stats in `src/components/AboutStats.jsx`

**Contact Section** (`src/sections/Contact.jsx`)
- Update email address
- Connect form to your backend/service (e.g., Formspree, EmailJS)

### 2. Customize Projects

Edit `src/components/CubeGrid.jsx`:

```javascript
const projects = [
  { 
    name: 'Your Project Name', 
    color1: '#2F5D50', 
    color2: '#1E3D34' 
  },
  // Add more projects...
];
```

**Tips:**
- Keep 12 projects for visual balance
- Use colors from the design system
- Make project names concise (2-3 words)

### 3. Replace Placeholder Images

The About section uses emoji placeholders. Replace them with actual images:

```javascript
// In About.jsx
<img 
  src="/path-to-your-image-1.jpg" 
  alt="Your description"
  style={{
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '20px'
  }}
/>
```

**Image Requirements:**
- Format: JPG/PNG/WebP
- Size: 300x400px (portrait)
- Optimize for web (<200KB)
- Two images: one with hands up, one with hands down

### 4. Adjust Colors

Edit `src/styles/globals.css`:

```css
:root {
  --cream-base: #F6F1EB;    /* Background */
  --accent-green: #2F5D50;  /* Primary accent */
  --dark-green: #1E3D34;    /* Dark accent */
  --blue-ball: #2D6CDF;     /* Blue ball color */
  --red-ball: #D64545;      /* Red ball color */
  --text-dark: #1A1A1A;     /* Text color */
}
```

Also update `tailwind.config.js` to match.

### 5. Adjust Animation Timing

Edit `src/hooks/useScrollAnimations.js`:

**Ball drop speed:**
```javascript
y: window.innerHeight * 0.6, // Change 0.6 to adjust distance
```

**Cube stagger delay:**
```javascript
index * 0.15 // Change 0.15 for faster/slower stagger
```

**Stats appearance:**
```javascript
stagger: 0.1, // Adjust stagger timing
```

### 6. Mobile Breakpoints

Edit `src/styles/mobile.css` to adjust mobile optimizations:

```css
@media (max-width: 480px) {
  /* Your mobile-specific styles */
}
```

## 🧪 Testing Checklist

Before deploying:

- [ ] Test on Chrome, Safari, Firefox
- [ ] Test on mobile (375px width minimum)
- [ ] Test scroll performance (Chrome DevTools → Performance)
- [ ] Verify all animations are scroll-driven (not autoplay)
- [ ] Check image loading and optimization
- [ ] Test form submission
- [ ] Verify responsive design at all breakpoints
- [ ] Test with reduced motion preferences
- [ ] Check console for errors
- [ ] Test on slow 3G connection

## 📱 Mobile Testing

Use Chrome DevTools:
1. Open DevTools (F12)
2. Click device toolbar icon
3. Select "iPhone SE" or custom 375px width
4. Throttle to "Fast 3G" or "Slow 3G"
5. Check FPS in Performance tab (should be 60fps)

## 🎭 Animation Debugging

Enable ScrollTrigger markers:

```javascript
// In useScrollAnimations.js
scrollTrigger: {
  markers: true, // Shows start/end trigger points
}
```

## 🔧 Performance Tips

1. **Optimize Images**
   - Use WebP format
   - Compress with tools like TinyPNG
   - Lazy load below-fold images

2. **Reduce Bundle Size**
   - Run `npm run build` and check output
   - Target <500KB total JS

3. **Lighthouse Score**
   ```bash
   npm run build
   npm run preview
   # Run Lighthouse in Chrome DevTools
   ```
   Target: 90+ on all metrics

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag /dist folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Configure base path in vite.config.js
```

## 🐛 Common Issues

### Issue: Animations not working
**Solution**: Check that GSAP and ScrollTrigger are imported correctly

### Issue: Scroll feels janky
**Solution**: 
- Reduce number of cubes
- Disable 3D transforms on mobile
- Use `will-change: transform`

### Issue: Images not crossfading smoothly
**Solution**: Ensure both images are preloaded and positioned absolute

### Issue: Form not submitting
**Solution**: Connect to a backend service (see Contact section notes)

### Issue: Build fails
**Solution**: 
- Clear node_modules and reinstall
- Check for console errors
- Verify all imports are correct

## 📚 Resources

- [GSAP ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [Lenis Smooth Scroll](https://github.com/studio-freight/lenis)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

## 💡 Pro Tips

1. **Use semantic comments**: Explain *why*, not *what*
2. **Test early and often**: Don't wait until the end
3. **Optimize images first**: Biggest performance gain
4. **Keep it simple**: Remove features that don't serve a purpose
5. **Mobile first**: Always start with mobile design
6. **Scroll is the interface**: Don't add unnecessary navigation
7. **60fps or bust**: If it's not smooth, simplify it

## 🎯 Next Steps

Once you've customized:

1. Add real project images to cubes
2. Connect contact form to backend
3. Add analytics (Google Analytics, Plausible)
4. Set up custom domain
5. Add meta tags for SEO
6. Create Open Graph images
7. Add schema.org markup
8. Set up monitoring (Sentry, LogRocket)

Happy building! 🚀

