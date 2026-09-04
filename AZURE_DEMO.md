# ☁️ Azure Deployment Demo - Step by Step

Complete hands-on guide to deploy SportTicket to Azure in 15 minutes.

---

## 🎯 What We'll Do

1. ✅ Create Azure account (5 mins)
2. ✅ Create App Service (5 mins)
3. ✅ Connect GitHub (2 mins)
4. ✅ Deploy automatically (2 mins)
5. ✅ Access live app (1 min)

**Total Time: ~15 minutes**

---

## 📋 Prerequisites

- ✅ GitHub account with SportTicket repo pushed
- ✅ Microsoft account (Outlook, Hotmail, or create new)
- ✅ Azure CLI (optional but helpful)
- ✅ Code already built and tested locally

---

## 🚀 STEP 1: Create Azure Account (5 mins)

### Option A: Sign Up for Free

1. Go to: **[azure.microsoft.com/free](https://azure.microsoft.com/free)**

2. Click **"Start Free"**

3. Sign in with Microsoft account (or create one)

4. Add payment method (won't charge for free tier)

5. Verify phone number

6. Accept terms & click **"Sign up"**

**Result:** $200 free credits (valid 30 days) + always-free services

---

## 🎛️ STEP 2: Create Resource Group (2 mins)

### Via Azure Portal

1. Go to [portal.azure.com](https://portal.azure.com)

2. Click **"Create a resource"** (top-left)

3. Search: **"Resource Group"**

4. Click **"Create"**

5. Fill in:
   - **Subscription:** Free Trial
   - **Resource group name:** `sportsticket-rg`
   - **Region:** East US (cheapest)

6. Click **"Review + Create"** → **"Create"**

**Result:** Resource group created ✅

---

## 🌐 STEP 3: Create App Service (3 mins)

### Via Azure Portal

1. Click **"Create a resource"**

2. Search: **"App Service"**

3. Click **"Create"**

4. Fill in form:

```
BASICS TAB:
├─ Resource Group:     sportsticket-rg
├─ Name:              sportsticket-app
├─ Publish:           Code
├─ Runtime stack:     Node 18 LTS
├─ Operating System:  Linux
├─ Region:            East US
└─ App Service Plan:  Create new
    ├─ Name: sportsticket-plan
    └─ Pricing tier: Free F1 (click "Change size" if needed)
```

5. Click **"Review + Create"**

6. Click **"Create"**

**Wait:** 30-60 seconds for deployment

**Result:** App Service created ✅

---

## 🔗 STEP 4: Connect GitHub (3 mins)

### Via Azure Portal

1. Go to your **App Service** → click on it

2. Left sidebar: **Deployment Center**

3. Select: **"GitHub"**

4. Click **"Authorize"** (connects to GitHub)

5. Select your account

6. Fill in:
```
SETTINGS:
├─ Organization:      YOUR_GITHUB_USERNAME
├─ Repository:        sportsticketwebsite
├─ Branch:            main
└─ Workflow file:     (auto-generated)
```

7. Click **"Save"**

**Azure automatically:**
- ✅ Adds GitHub Actions workflow
- ✅ Watches for commits to `main`
- ✅ Auto-deploys on push

**Result:** GitHub connected ✅

---

## 🚀 STEP 5: Deploy! (2 mins)

### Option A: Automatic (Easiest)

```bash
# In your project:
cd /Users/prashanthkumargona/Desktop/Projects\ AI/sportsticketwebsite

# Make a commit
git add .
git commit -m "Deploy to Azure"

# Push to GitHub
git push origin main

# Azure automatically:
# 1. Detects push
# 2. Runs build
# 3. Deploys app
# 4. ✅ Live in 2-3 mins!
```

### Option B: Manual Deploy (If needed)

```bash
# Install Azure CLI
brew install azure-cli

# Login
az login

# Deploy
az webapp up \
  --name sportsticket-app \
  --resource-group sportsticket-rg \
  --runtime "NODE|18-lts"
```

**Result:** Deployed! ✅

---

## ✅ STEP 6: Access Your App (1 min)

### Your app is now live at:

```
https://sportsticket-app.azurewebsites.net
```

Or find it in Azure Portal:
1. Go to App Service
2. Click on it
3. Copy **"Default domain"**
4. Open in browser

### Test it:

✅ Homepage loads?
✅ Events display?
✅ Login works?
✅ Demo account login: demo@sportticket.com / demo123

---

## 📊 Deployment Status

### In Azure Portal:

1. App Service → **Deployment Center**

2. View deployment history:
   ```
   Commit: "Deploy to Azure"
   Status: ✅ Succeeded
   Duration: ~2 mins
   ```

3. View live logs:
   ```bash
   # Via Azure CLI
   az webapp log tail \
     --name sportsticket-app \
     --resource-group sportsticket-rg
   ```

---

## 🎯 TEST CHECKLIST

- [ ] App loads at `https://sportsticket-app.azurewebsites.net`
- [ ] Homepage displays events
- [ ] Search bar visible
- [ ] Navigation works
- [ ] Login page accessible at `/login`
- [ ] Demo credentials work: demo@sportticket.com / demo123
- [ ] API endpoints working (check Network tab)

---

## 🔧 CONFIGURATION (Optional)

### Add Custom Domain

1. App Service → **Custom Domains**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., sportticket.com)
4. Follow DNS setup instructions

### Add Environment Variables

1. App Service → **Configuration**
2. Click **"New application setting"**
3. Add (if needed):
   ```
   Name:  NODE_ENV
   Value: production
   ```
4. Click **"OK"** → **"Save"**

### Scale Up

1. App Service → **Scale up (App Service plan)**
2. Choose tier:
   - F1 (Free): Current
   - B1 ($10.50/mo): Recommended
   - B2 ($41.40/mo): For higher traffic
3. Click **"Apply"**

---

## 🚨 Troubleshooting

### App Not Loading?

```bash
# Check deployment logs
az webapp log tail \
  --name sportsticket-app \
  --resource-group sportsticket-rg

# Common errors:
# "Port not listening" → Add PORT=3000 in app
# "Module not found" → Run npm install before deploy
# "Build failed" → Check build output in Azure
```

### GitHub Deployment Failed?

1. Check workflow file: `.github/workflows/azure_*.yml`
2. View Actions tab on GitHub
3. Click failed workflow
4. See error logs
5. Fix issue → Push again

### Still Having Issues?

```bash
# Full deployment trace
az webapp deployment show-log \
  --name sportsticket-app \
  --resource-group sportsticket-rg \
  --slot production
```

---

## 🎛️ ENABLE MONITORING (Optional)

### Application Insights

1. App Service → **Application Insights**
2. Click **"Enable"**
3. Create new: `sportsticket-insights`
4. Click **"Apply"**

**Get insights:**
- 📊 Performance metrics
- 🐛 Error tracking
- 📈 User analytics
- ⚡ Response times

---

## 🔄 NEXT DEPLOYMENTS

### Automatic (Every push to `main`):

```bash
cd your-project
git add .
git commit -m "Your message"
git push origin main

# Azure auto-deploys within 2-3 mins ✅
```

### View Deployment History:

1. Azure Portal → App Service
2. **Deployment Center** → **Logs**
3. See all past deployments

### Rollback (If needed):

1. Deployment Center
2. Click previous successful deployment
3. Click **"Redeploy"**
4. App rolls back instantly ✅

---

## 💾 DATABASE SETUP (Optional)

### To Add PostgreSQL Later:

```bash
# Create PostgreSQL server
az postgres server create \
  --resource-group sportsticket-rg \
  --name sportsticket-db \
  --location eastus \
  --admin-user dbadmin \
  --admin-password MySecurePassword123! \
  --sku-name B_Gen5_1 \
  --storage-size 51200

# Update connection in app:
# DATABASE_URL=postgresql://dbadmin:password@host/db
# Add to App Service → Configuration → Application Settings
```

**Cost:** +$35/month

---

## 📊 COSTS

### Your Current Setup:

```
App Service (Free):      $0/mo
Storage:                 $0/mo
Bandwidth:               Free (up to limit)
─────────────────────────────
TOTAL:                   $0/mo ✅

FREE CREDITS:            $200 (expires in 30 days)
```

### If You Upgrade:

```
App Service (B1):        $10.50/mo
Storage:                 $2/mo
Bandwidth:               ~$5/mo
─────────────────────────────
TOTAL:                   ~$18/mo

With Database (PostgreSQL): +$35/mo → $53/mo
```

---

## 🎯 SUCCESS! 🎉

Your app is now:
- ✅ Live on Azure
- ✅ Auto-deploying from GitHub
- ✅ Globally accessible
- ✅ Monitored & logged
- ✅ Ready for scale

---

## 📚 NEXT STEPS

### Immediate (Do now):
1. ✅ Test your live app
2. ✅ Share URL with friends
3. ✅ Make a code change & push to test auto-deploy

### Soon (Next week):
1. Add custom domain
2. Enable monitoring
3. Set up auto-scaling

### Later (When you grow):
1. Add PostgreSQL database
2. Upgrade to B2 plan
3. Add staging environment

---

## 🔗 USEFUL LINKS

- **Azure Portal:** [portal.azure.com](https://portal.azure.com)
- **Your App:** `https://sportsticket-app.azurewebsites.net`
- **Docs:** [learn.microsoft.com/en-us/azure/app-service/](https://learn.microsoft.com/en-us/azure/app-service/)
- **Support:** [stackoverflow.com/questions/tagged/azure-web-app-service](https://stackoverflow.com/questions/tagged/azure-web-app-service)

---

## 🤔 Common Questions

### Q: Do I need to do anything else?
**A:** No! Azure handles everything. Just push to GitHub and it deploys.

### Q: How do I stop charges?
**A:** Delete resource group (don't worry, it's under free tier anyway)

### Q: Can I rollback?
**A:** Yes! Deployment Center → Click previous version → Redeploy

### Q: How often can I deploy?
**A:** As often as you want! Every commit triggers auto-deploy.

### Q: What if deployment fails?
**A:** Check GitHub Actions logs → Fix issue → Push again

### Q: Can I use a different framework?
**A:** Yes! Azure supports Node, Python, Java, .NET, PHP, Ruby, etc.

---

## ✅ DEMO COMPLETE! 🚀

You now have:
- ☁️ Azure account with free credits
- 🌐 Live app running globally
- 🔄 Auto-deployment from GitHub
- 📊 Monitoring & logging enabled
- 💰 $0 cost (free tier)

**Share your app:** `https://sportsticket-app.azurewebsites.net`

---

**Questions? Check [AZURE_DEPLOYMENT.md](./AZURE_DEPLOYMENT.md) for detailed guide.**

**Last Updated:** 2026-08-31
