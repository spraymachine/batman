# ⚡ Quick Start

Get your portfolio running in 3 steps:

## 1. Install Dependencies
```bash
npm install
```

## 2. Start Development Server
```bash
npm run dev
```

## 3. Open Browser
Visit: `http://localhost:5173`

---

## 🎨 What You'll See

### Four Main Sections:

1. **Landing** - Hero with falling balls
2. **Portfolio** - 3D rotating cubes (12 projects)
3. **About** - Sticky photo with interactive balls + tech stats
4. **Contact** - Liquid form with SVG filters

---

## ✏️ Quick Customization

### Update Your Info (5 min)

1. **Name & Title**: Edit `src/sections/Landing.jsx`
2. **Projects**: Edit `src/components/CubeGrid.jsx`
3. **Tech Stack**: Edit `src/components/AboutStats.jsx`
4. **Email**: Edit `src/sections/Contact.jsx`

### Replace Images (10 min)

Replace emoji placeholders in `src/sections/About.jsx` with your photos:
- Image 1: You with hands up (300x400px)
- Image 2: You with hands down/relaxed (300x400px)

### Change Colors (2 min)

Edit `src/styles/globals.css`:
```css
:root {
  --cream-base: #F6F1EB;
  --accent-green: #2F5D50;
  --blue-ball: #2D6CDF;
  --red-ball: #D64545;
}
```

---

## 🚀 Deploy

### Vercel (Easiest)
```bash
npm install -g vercel
vercel
```

### Netlify
1. Run `npm run build`
2. Drag `dist/` folder to Netlify

### GitHub Pages
1. Update `base` in `vite.config.js`
2. Run `npm run build`
3. Push `dist/` to `gh-pages` branch

---

## 📱 Test on Mobile

Open Chrome DevTools:
1. Press F12
2. Click device icon
3. Select "iPhone SE"
4. Scroll and check animations

---

## 🐛 Troubleshooting

**Animations not working?**
- Hard refresh (Cmd+Shift+R or Ctrl+Shift+R)

**Build fails?**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Port 5173 in use?**
- Vite will auto-use next available port

---

## 📚 Need More Help?

- Read `DEVELOPMENT_GUIDE.md` for detailed instructions
- Read `README.md` for architecture overview
- Check console for errors (F12 in browser)

---

**That's it! Happy building! 🎉**

Your scroll-driven portfolio is ready. Now make it yours.


