# 🚀 GitHub Pages Deployment Guide

## Your Portfolio is Ready to Deploy!

**Repository:** `spraymachine/batman`  
**Future URL:** `https://spraymachine.github.io/batman/`

---

## ✅ What's Already Configured

1. **Vite Config** - Base path set to `/batman/`
2. **GitHub Actions** - Auto-deploy workflow created
3. **Build Scripts** - Package.json updated

---

## 📋 Deployment Steps

### Step 1: Enable GitHub Pages

1. Go to your GitHub repository: `https://github.com/spraymachine/batman`
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
5. Click **Save**

### Step 2: Push Your Code

If you haven't pushed your latest changes:

```bash
cd /Users/mani/Desktop/batman

# Add all files
git add .

# Commit
git commit -m "Configure GitHub Pages deployment"

# Push to main branch
git push origin main
```

### Step 3: Watch the Deployment

1. Go to **Actions** tab in your GitHub repo
2. You'll see "Deploy to GitHub Pages" workflow running
3. Wait for it to complete (green checkmark ✅)
4. The workflow will:
   - Install dependencies
   - Build your project
   - Deploy to GitHub Pages

### Step 4: Access Your Site

Once deployed, visit:
```
https://spraymachine.github.io/batman/
```

---

## 🔄 Auto-Deployment

**Your site will automatically redeploy when you:**
- Push to the `main` branch
- The GitHub Actions workflow will automatically build and deploy

**Workflow triggers:**
- Every push to `main` branch
- Manual trigger (workflow_dispatch)

---

## 🛠️ Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
# Install gh-pages package
npm install --save-dev gh-pages

# Deploy manually
npm run deploy
```

---

## 📁 What Was Changed

### 1. `vite.config.js`
```javascript
base: '/batman/', // Added for GitHub Pages
```

### 2. `.github/workflows/deploy.yml`
- Created GitHub Actions workflow
- Automatic build and deploy on push
- Uses Node 20 and npm ci

### 3. `package.json`
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

---

## 🐛 Troubleshooting

### Issue: 404 Error
**Solution:** 
- Make sure GitHub Pages source is set to "GitHub Actions"
- Check that the workflow completed successfully
- Verify base path in vite.config.js is `/batman/`

### Issue: Blank Page
**Solution:**
- Check browser console for errors
- Verify all assets are loading from `/batman/` path
- Clear browser cache and hard refresh (Cmd+Shift+R)

### Issue: Workflow Fails
**Solution:**
- Check Actions tab for error details
- Make sure all dependencies install correctly
- Verify build completes locally: `npm run build`

### Issue: CSS/Images Not Loading
**Solution:**
- All assets should use relative paths
- Vite handles this automatically with base path
- Check Network tab in DevTools

---

## 📊 Workflow Details

**Name:** Deploy to GitHub Pages

**Triggers:**
- Push to main branch
- Manual workflow dispatch

**Jobs:**
1. **Build**
   - Checkout code
   - Setup Node.js 20
   - Install dependencies (npm ci)
   - Build project
   - Upload dist folder

2. **Deploy**
   - Deploy to GitHub Pages
   - Update live site

**Permissions:**
- Read contents
- Write to pages
- ID token for deployment

---

## 🔐 Required Repository Settings

**Pages Settings:**
- ✅ GitHub Pages enabled
- ✅ Source: GitHub Actions
- ✅ Branch: (managed by Actions)

**Actions Settings:**
- ✅ Actions enabled (default)
- ✅ Workflow permissions: Read and write

---

## 🎯 Next Steps

1. **Push your code** to GitHub
2. **Enable GitHub Pages** in repository settings
3. **Wait for deployment** (2-3 minutes)
4. **Visit your site** at `https://spraymachine.github.io/batman/`
5. **Share your cosmic portfolio** with the world! 🌌

---

## 📝 Post-Deployment

### Custom Domain (Optional)

If you want to use a custom domain:

1. Go to Settings → Pages
2. Add your custom domain
3. Create CNAME record in your DNS provider
4. Wait for DNS propagation (24-48 hours)

### Analytics (Optional)

Add analytics to track visitors:
- Google Analytics
- Plausible
- Umami
- Simple Analytics

### SEO (Optional)

Improve SEO:
- Add sitemap.xml
- Add robots.txt
- Update meta tags in index.html
- Add Open Graph images

---

## ✅ Deployment Checklist

- [ ] GitHub Pages enabled in Settings
- [ ] Source set to "GitHub Actions"
- [ ] Code pushed to main branch
- [ ] GitHub Actions workflow completed
- [ ] Site accessible at https://spraymachine.github.io/batman/
- [ ] All pages load correctly
- [ ] Stars and animations working
- [ ] Mobile responsive verified
- [ ] Performance is good (test with Lighthouse)

---

## 🌟 Your Portfolio is Live!

Once deployed, your space-themed portfolio with:
- ⚫ Pitch black background
- ⭐ 200 moving stars
- ☀️ Animated Sun
- 🌙 Cratered Moon
- 🎨 3D cubes
- 📊 Stats cards
- 📧 Contact form

Will be live for the world to see!

**Share your portfolio:** `https://spraymachine.github.io/batman/`

---

**Built with React + Vite + GSAP + Tailwind**  
**Deployed with GitHub Actions** 🚀

