# 🌐 GitHub Pages - Quick Setup

## ✅ Everything is Configured!

Your portfolio is **ready to deploy** to GitHub Pages.

---

## 🚀 Deploy in 3 Steps:

### Step 1: Enable GitHub Pages

Go to your repo settings:
```
https://github.com/spraymachine/batman/settings/pages
```

Set:
- **Source:** GitHub Actions
- Click **Save**

### Step 2: Push Your Code

```bash
cd /Users/mani/Desktop/batman

git add .
git commit -m "Add GitHub Pages deployment"
git push origin main
```

### Step 3: Wait & Visit

- Watch deployment: https://github.com/spraymachine/batman/actions
- Visit your site: **https://spraymachine.github.io/batman/**

---

## 📝 What Was Configured

✅ `vite.config.js` - Base path: `/batman/`  
✅ `.github/workflows/deploy.yml` - Auto-deploy workflow  
✅ `package.json` - Deploy scripts  
✅ Build tested - Working perfectly!

---

## 🔄 Auto-Deploy

Every push to `main` branch will automatically:
1. Build your portfolio
2. Deploy to GitHub Pages
3. Update live site (2-3 minutes)

---

## 🎯 Your Live URL

```
https://spraymachine.github.io/batman/
```

---

**That's it! Push and your site goes live! 🚀**

Read **DEPLOYMENT_GUIDE.md** for detailed instructions and troubleshooting.

