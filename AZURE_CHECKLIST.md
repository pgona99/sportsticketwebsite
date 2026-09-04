# ✅ Azure Deployment Checklist

Complete pre-deployment & deployment checklist.

---

## 📋 PRE-DEPLOYMENT CHECKLIST (Do First!)

### **Code Ready?**

- [ ] All files are committed to git
- [ ] No uncommitted changes: `git status` shows clean
- [ ] Pushed to GitHub: `git push origin main`
- [ ] Latest code visible on GitHub.com

### **App Works Locally?**

- [ ] `npm install` completed successfully
- [ ] `npm run build` completes without errors
- [ ] `npm start` runs without crashing
- [ ] App works at `http://localhost:3000`
- [ ] Login page works: `http://localhost:3000/login`
- [ ] Demo login successful: demo@sportticket.com / demo123

### **Git Status**

```bash
# Run this to verify:
git status
# Should show: "On branch main, nothing to commit, working tree clean"

git log --oneline
# Should show your commits

git remote -v
# Should show your GitHub repo
```

---

## 🎯 AZURE ACCOUNT SETUP (5 mins)

### **Create Account**

- [ ] Go to [azure.microsoft.com/free](https://azure.microsoft.com/free)
- [ ] Click "Start Free"
- [ ] Sign in with Microsoft account (or create one)
- [ ] Add phone number for verification
- [ ] Add payment method
- [ ] Agree to terms
- [ ] Account created ✅

### **Verify**

- [ ] Can access [portal.azure.com](https://portal.azure.com)
- [ ] See "Home" dashboard
- [ ] See $200 free credits notification

---

## 🚀 DEPLOYMENT SETUP (10 mins)

### **Create Resource Group**

- [ ] Portal → "Create a resource"
- [ ] Search: "Resource Group"
- [ ] Create new:
  - Name: `sportsticket-rg`
  - Region: `East US`
- [ ] Click "Create"
- [ ] Wait for "Deployment succeeded"

### **Create App Service**

- [ ] Portal → "Create a resource"
- [ ] Search: "App Service"
- [ ] Fill form:
  - [ ] Resource Group: `sportsticket-rg` ✓
  - [ ] Name: `sportsticket-app`
  - [ ] Publish: `Code` ✓
  - [ ] Runtime: `Node 18 LTS` ✓
  - [ ] OS: `Linux` ✓
  - [ ] Region: `East US` ✓
  - [ ] App Service Plan: Create new
    - [ ] Name: `sportsticket-plan`
    - [ ] Pricing: `Free F1` ✓
- [ ] Click "Review + Create"
- [ ] Click "Create"
- [ ] Wait for "Deployment succeeded"

### **Verify App Service Created**

- [ ] Can see App Service in portal
- [ ] Status shows "Running"
- [ ] Default domain visible (e.g., sportsticket-app.azurewebsites.net)

---

## 🔗 GITHUB CONNECTION (3 mins)

### **Connect GitHub to Azure**

- [ ] Go to App Service → "Deployment Center"
- [ ] Select Source: `GitHub`
- [ ] Click "Authorize"
- [ ] Authorize with GitHub account
- [ ] Select Organization: `YOUR_GITHUB_USERNAME`
- [ ] Select Repository: `sportsticketwebsite`
- [ ] Select Branch: `main`
- [ ] Click "Save"

### **Verify Connection**

- [ ] See "Deployment settings" saved
- [ ] See GitHub Actions workflow created
- [ ] `.github/workflows/azure_*.yml` file created automatically

---

## 🎬 DEPLOY (2 mins)

### **Automatic Deploy Option**

```bash
# Make a test change
cd /path/to/sportsticketwebsite
echo "# Deployed to Azure" >> README.md

# Commit and push
git add .
git commit -m "Deploy to Azure"
git push origin main
```

- [ ] GitHub receives push
- [ ] GitHub Actions triggered automatically
- [ ] Can see workflow running at: GitHub → Actions tab
- [ ] Azure receives deployment signal
- [ ] App automatically deployed

### **Manual Deploy Option (If needed)**

```bash
# Install Azure CLI
brew install azure-cli

# Login
az login
# (opens browser for authentication)

# Deploy
az webapp up \
  --name sportsticket-app \
  --resource-group sportsticket-rg \
  --runtime "NODE|18-lts"
```

- [ ] CLI login successful
- [ ] Deployment started
- [ ] Watch for "Deployment successful" message

---

## ✅ VERIFY DEPLOYMENT

### **Check Azure Portal**

- [ ] Go to App Service
- [ ] Status shows: `Running` ✓
- [ ] Deployment Center shows latest commit
- [ ] Deployment status: `Succeeded` ✓

### **Check GitHub Actions**

- [ ] GitHub repo → Actions tab
- [ ] Latest workflow: `Build and deploy Node.js app to Azure Web App`
- [ ] Status: ✅ (green checkmark)
- [ ] All steps completed

### **Check Live App**

- [ ] Open browser
- [ ] Go to: `https://sportsticket-app.azurewebsites.net`
- [ ] Page loads without error ✓
- [ ] SportTicket heading visible ✓
- [ ] Events display ✓

---

## 🧪 TEST FUNCTIONALITY

### **Basic Functionality**

- [ ] Homepage loads at root `/`
- [ ] All event cards display
- [ ] Images load correctly
- [ ] Navigation bar visible
- [ ] Buttons clickable
- [ ] No console errors (DevTools → Console)

### **Login Functionality**

- [ ] Navigate to `/login`
- [ ] Login page displays
- [ ] Enter demo credentials:
  - Email: `demo@sportticket.com`
  - Password: `demo123`
- [ ] Click "Sign In"
- [ ] Successfully logged in ✓
- [ ] Redirected to home page ✓

### **API Functionality**

- [ ] Open DevTools (F12)
- [ ] Go to Network tab
- [ ] Refresh page
- [ ] Look for API requests:
  - [ ] `GET /api/events` → Status 200 ✓
  - [ ] Response includes 6 events
  - [ ] Each event has: id, name, price, category, etc.

### **Responsive Design**

- [ ] Desktop view works ✓
- [ ] Tablet view works (resize browser) ✓
- [ ] Mobile view works (F12 → Toggle device toolbar) ✓

---

## 🔧 POST-DEPLOYMENT (Optional)

### **Configure Environment**

- [ ] App Service → Configuration
- [ ] Application settings:
  - [ ] `NODE_ENV` = `production`
  - [ ] `WEBSITE_NODE_DEFAULT_VERSION` = `18.17.0`
- [ ] Click "Save"
- [ ] Wait for app to restart

### **Enable Monitoring**

- [ ] App Service → Application Insights
- [ ] Click "Enable"
- [ ] Create new: `sportsticket-insights`
- [ ] Click "Apply"
- [ ] Monitor → View metrics

### **Add Custom Domain (Optional)**

- [ ] App Service → Custom domains
- [ ] Click "Add custom domain"
- [ ] Enter domain (if you have one)
- [ ] Follow DNS configuration steps
- [ ] Wait for SSL certificate (automatic)

### **Scale Up (Optional)**

- [ ] App Service → Scale up (App Service plan)
- [ ] Current: `Free F1`
- [ ] Options:
  - [ ] Stay on Free (no charge)
  - [ ] Upgrade to B1 ($10.50/month)
  - [ ] Upgrade to B2 ($41.40/month)
- [ ] Only upgrade if needed later

---

## 🔄 AUTO-DEPLOYMENT VERIFICATION

### **Test Auto-Deploy**

- [ ] Make small code change (e.g., update heading text)
- [ ] Save file
- [ ] Commit and push:
  ```bash
  git add .
  git commit -m "Test auto-deploy"
  git push origin main
  ```
- [ ] Watch GitHub Actions (GitHub → Actions tab)
- [ ] Wait for deployment to complete (~2-3 mins)
- [ ] Refresh live app in browser
- [ ] Verify change appears ✓

---

## 🚨 TROUBLESHOOTING CHECKLIST

### **If App Won't Load:**

- [ ] Check App Service status in portal (should be "Running")
- [ ] Check deployment logs:
  - [ ] Deployment Center → Logs
  - [ ] Status should be "Succeeded"
- [ ] Check Azure logs:
  ```bash
  az webapp log tail --name sportsticket-app --resource-group sportsticket-rg
  ```
- [ ] Look for error messages
- [ ] Fix issue and redeploy:
  ```bash
  git add .
  git commit -m "Fix deployment issue"
  git push origin main
  ```

### **If Deployment Fails:**

- [ ] Check GitHub Actions logs
- [ ] Look for build or deploy errors
- [ ] Common issues:
  - [ ] Missing dependencies: `npm install`
  - [ ] Build errors: `npm run build` locally
  - [ ] Runtime errors: Check `.env` variables
- [ ] Fix in local code
- [ ] Push to GitHub again

### **If Things Break:**

- [ ] Rollback to previous version:
  - [ ] Deployment Center → Click previous commit
  - [ ] Click "Redeploy"
  - [ ] App rolls back instantly
- [ ] Or restart app:
  ```bash
  az webapp restart --name sportsticket-app --resource-group sportsticket-rg
  ```

---

## 📊 FINAL VERIFICATION

### **All Systems Go?**

```
✅ Azure Account Created
✅ App Service Deployed
✅ GitHub Connected
✅ Code Deployed
✅ App Running
✅ Homepage Loads
✅ Login Works
✅ API Responds
✅ Auto-Deploy Works
✅ Live URL Accessible
```

### **Your App is Live at:**

```
https://sportsticket-app.azurewebsites.net
```

### **Share URL:**

Email / Slack / Twitter:
```
Check out my sports ticket booking app deployed on Azure!
🎫 https://sportsticket-app.azurewebsites.net

Login with:
Email: demo@sportticket.com
Password: demo123
```

---

## 🎉 YOU DID IT!

Your SportTicket app is now:
- ☁️ Running on Microsoft Azure
- 🚀 Auto-deploying from GitHub
- 🌍 Accessible worldwide
- ✅ Production-ready
- 📊 Monitored and logged

---

## 📚 Next Steps

### **Immediate:**
1. Share URL with friends
2. Celebrate! 🎉

### **This Week:**
1. Test thoroughly
2. Get feedback
3. Make improvements

### **Later:**
1. Add custom domain
2. Add database (PostgreSQL)
3. Upgrade plan if needed
4. Add more features

---

## 📞 Need Help?

- **Azure Docs:** [learn.microsoft.com/azure/app-service](https://learn.microsoft.com/azure/app-service)
- **Troubleshooting:** See [AZURE_DEPLOYMENT.md](./AZURE_DEPLOYMENT.md)
- **Visual Guide:** See [AZURE_VISUAL_GUIDE.md](./AZURE_VISUAL_GUIDE.md)
- **Questions:** Check [CLOUD_COMPARISON.md](./CLOUD_COMPARISON.md)

---

**✅ Ready to Deploy? Follow the checklist above!**

**Last Updated:** 2026-08-31
