# 🚀 Quick Start: Deploy to Firebase

Your portfolio is now configured for Firebase deployment! Follow these steps:

## 1️⃣ Install Firebase CLI (One-time setup)
```bash
npm install -g firebase-tools
```

## 2️⃣ Login to Firebase
```bash
firebase login
```

## 3️⃣ Initialize Firebase Project
```bash
firebase init hosting
```

**Answer the prompts:**
- Project: Create new or select existing
- Public directory: `out`
- Single-page app: `y`
- Overwrite index.html: `n`

## 4️⃣ Deploy Your Portfolio
```bash
npm run deploy
```

That's it! Your site will be live at `https://your-project.web.app`

---

## 📝 What Changed?

✅ `next.config.ts` - Added static export configuration  
✅ `package.json` - Added `npm run deploy` script  
✅ `firebase.json` - Created Firebase hosting config  
✅ `.gitignore` - Added Firebase cache exclusions

---

## 🔄 Future Deployments

After the initial setup, deploying updates is simple:

```bash
npm run deploy
```

This builds your project and deploys to Firebase in one command!

---

## 📚 Full Documentation

See [firebase-deployment-guide.md](file:///C:/Users/thama/.gemini/antigravity/brain/9b72ff34-03b7-4d45-a416-a8369278ce1c/firebase-deployment-guide.md) for:
- Detailed explanations
- Troubleshooting
- Custom domain setup
- CI/CD configuration
- Advanced features
