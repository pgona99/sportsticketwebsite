# 🎬 Azure Deployment - Visual Walkthrough

Step-by-step screenshots & diagrams for Azure deployment.

---

## 📊 Deployment Architecture

```
YOUR COMPUTER
    ↓ (git push main)
    ↓
GITHUB REPOSITORY
    ↓ (GitHub Actions triggered)
    ↓
AZURE (CI/CD Pipeline)
    ├─ 1. Checkout code
    ├─ 2. npm install
    ├─ 3. npm run build
    ├─ 4. Upload to App Service
    └─ 5. Start app
         ↓
    AZURE APP SERVICE
         ↓
    LIVE AT: https://sportsticket-app.azurewebsites.net ✅
```

---

## 🎯 6-Step Deployment Process

### **STEP 1: Azure Account Setup**

```
📍 Location: https://azure.microsoft.com/free

1. Click "Start Free"
   ↓
2. Sign in with Microsoft account
   ↓
3. Add phone number for verification
   ↓
4. Add payment method
   ↓
5. ✅ Account created + $200 free credits
   ✅ Valid for 30 days
```

**Screenshots:**
```
┌─────────────────────────────────────┐
│ Microsoft Azure Sign Up             │
├─────────────────────────────────────┤
│                                     │
│  [Sign in with Microsoft account]   │
│                                     │
│  OR                                 │
│                                     │
│  [Create new Microsoft account]     │
│                                     │
│  Get $200 free credits              │
│  Valid for 30 days                  │
│                                     │
└─────────────────────────────────────┘
```

---

### **STEP 2: Portal Dashboard**

```
📍 Location: https://portal.azure.com

You'll see:
├─ Home dashboard
├─ "Create a resource" button (top)
├─ Recent resources
└─ Quick links
```

**Action:** Click **"Create a resource"**

---

### **STEP 3: Create Resource Group**

```
📍 Search for: "Resource Group"

Form to fill:
┌─────────────────────────────┐
│ Create Resource Group       │
├─────────────────────────────┤
│ Subscription: Free Trial    │
│ Name: sportsticket-rg       │
│ Region: East US             │
│                             │
│ [Review + Create]  [Create] │
└─────────────────────────────┘

✅ Status: Creating... (30 seconds)
✅ Status: Succeeded
```

---

### **STEP 4: Create App Service**

```
📍 Search for: "App Service"

BASICS TAB - Form:
┌─────────────────────────────────┐
│ Create App Service              │
├─────────────────────────────────┤
│ Subscription: Free Trial        │
│ Resource Group: sportsticket-rg │
│ Name: sportsticket-app          │
│ Publish: Code                   │
│ Runtime stack: Node 18 LTS      │
│ OS: Linux                       │
│ Region: East US                 │
│                                 │
│ APP SERVICE PLAN (Create New):  │
│   Name: sportsticket-plan       │
│   Pricing: Free F1              │
│                                 │
│ [Review + Create]  [Create]     │
└─────────────────────────────────┘

✅ Status: Creating... (60 seconds)
✅ Status: Succeeded
✅ Resource created successfully
```

---

### **STEP 5: Connect GitHub**

```
📍 Location: App Service → Deployment Center

AUTHENTICATION:
┌─────────────────────────────────┐
│ Deployment Center               │
├─────────────────────────────────┤
│ Select source: GitHub           │
│                                 │
│ [Authorize]                     │
│ ↓ (Opens GitHub auth dialog)    │
│ ✅ Authorized                   │
└─────────────────────────────────┘

SETTINGS:
┌─────────────────────────────────┐
│ GitHub Details                  │
├─────────────────────────────────┤
│ Organization: YOUR_USERNAME     │
│ Repository: sportsticketwebsite │
│ Branch: main                    │
│ Workflow: (auto-generated)      │
│                                 │
│ [Save]                          │
└─────────────────────────────────┘

✅ Saved - Workflow created
✅ Auto-deployment enabled
```

---

### **STEP 6: Push to GitHub**

```
📍 Your terminal/command line

$ cd your-project
$ git add .
$ git commit -m "Deploy to Azure"
$ git push origin main

↓ GitHub detects push
↓ Triggers GitHub Actions workflow
↓ Azure CI/CD pipeline starts
  ├─ npm install
  ├─ npm run build
  ├─ Deploy to App Service
  └─ Restart app
↓
✅ Deployed! (2-3 mins)
✅ Live at: https://sportsticket-app.azurewebsites.net
```

---

## 🔍 Monitoring Deployments

### **View Deployment Status (Azure Portal)**

```
📍 Location: App Service → Deployment Center → Logs

┌────────────────────────────────────┐
│ Deployment History                 │
├────────────────────────────────────┤
│ Commit: "Deploy to Azure"          │
│ Branch: main                       │
│ Status: ✅ Succeeded               │
│ Duration: 2m 34s                   │
│ Triggered: 2026-08-31 22:45 UTC   │
│                                    │
│ [View Logs]  [Redeploy]            │
├────────────────────────────────────┤
│ Previous Commits:                  │
│ • "Add database schema"      ✅    │
│ • "Fix login issue"          ✅    │
│ • "Initial setup"            ✅    │
└────────────────────────────────────┘
```

---

## 🌐 Access Your App

### **Option A: Direct URL**

```
Go to: https://sportsticket-app.azurewebsites.net

You'll see:
┌─────────────────────────────────┐
│ SportTicket                   🎫 │
├─────────────────────────────────┤
│  Your Next Game Awaits          │
│  [Search bar] [Search button]   │
│                                 │
│  Featured Events                │
│  ┌──────────┐ ┌──────────┐     │
│  │ 🏟️ Event │ │ 🏟️ Event │ ... │
│  │ Lakers   │ │ Yankees  │     │
│  │ $150     │ │ $85      │     │
│  └──────────┘ └──────────┘     │
│                                 │
│  [Login] [Cart] [Events]        │
└─────────────────────────────────┘
```

---

### **Option B: Azure Portal**

```
1. Go to portal.azure.com
2. Search: "sportsticket-app"
3. Click on App Service
4. In overview, find "Default domain"
5. Click or copy the URL
6. Open in browser ✅
```

---

## ✅ Test Your Deployment

### **Checklist**

```
BASIC FUNCTIONALITY:
□ Page loads without errors
□ All images display
□ Navigation bar visible
□ Events grid displays 6 events
□ Search bar functional
□ Buttons clickable

LOGIN FUNCTIONALITY:
□ Login page accessible at /login
□ Email field accepts input
□ Password field masks input
□ Demo credentials work:
  Email: demo@sportticket.com
  Password: demo123
□ Login successful → Redirected to home

API FUNCTIONALITY:
□ Open DevTools → Network tab
□ Check /api/events response:
  Status: 200
  Shows 6 events with details
□ Events have: id, name, price, category, etc.

RESPONSIVE:
□ Works on desktop
□ Works on tablet
□ Works on mobile
```

---

## 🔄 Auto-Deployment Flow

### **Every Git Push → Auto Deploy**

```
YOUR CODE CHANGES:
│
├─ File: app/page.tsx
│  Change: Update heading text
│  Save file
│
├─ Terminal:
│  git add .
│  git commit -m "Update heading"
│  git push origin main
│
├─ GITHUB:
│  ✓ Receives commit
│  ✓ Detects push to main
│  ✓ Triggers GitHub Actions
│
├─ AZURE CI/CD:
│  Step 1: Checkout code
│  Step 2: Setup Node 18
│  Step 3: npm install
│  Step 4: npm run build
│  Step 5: Deploy to App Service
│  Step 6: Restart app
│
├─ AZURE APP SERVICE:
│  ✓ Receives new code
│  ✓ Restarts app
│  ✓ Ready to serve requests
│
└─ LIVE CHANGE:
   ✓ Your change goes live
   ✓ Users see new heading
   ✓ All in ~2-3 minutes!
```

---

## 🚨 Troubleshooting Visual Guide

### **App Not Loading?**

```
SYMPTOMS: Gets error 502, 503, or blank page

DIAGNOSIS FLOW:
│
├─ Check 1: Deployment succeeded?
│  Go to: Deployment Center → Logs
│  ✓ Status shows "Succeeded"?
│  ✗ If failed → Check build errors
│
├─ Check 2: App running?
│  Go to: App Service → Overview
│  ✓ Status shows "Running"?
│  ✗ If stopped → Click "Start"
│
├─ Check 3: Check logs
│  Run: az webapp log tail --name sportsticket-app ...
│  ✓ Any error messages?
│  ✗ Fix and redeploy
│
└─ Check 4: Cold start?
   Sometimes takes 30 seconds first time
   ✓ Refresh browser after 1 minute
```

---

## 🎯 Deployment Status Page

### **Real-time Status**

```
DEPLOYMENT CENTER VIEW:

┌──────────────────────────────────┐
│ Status: IN PROGRESS              │
│ ◌ Build          (checking)      │
│ ◌ Deploy         (pending)       │
│ ◌ Running        (pending)       │
└──────────────────────────────────┘

OR

┌──────────────────────────────────┐
│ Status: ✅ SUCCEEDED             │
│ ✓ Build          (completed)     │
│ ✓ Deploy         (completed)     │
│ ✓ Running        (active)        │
└──────────────────────────────────┘
```

---

## 🎉 Success Indicators

### **You'll Know It's Working When:**

```
✅ Azure Portal shows:
   Status: Running (green)
   
✅ Browser shows:
   https://sportsticket-app.azurewebsites.net
   (No errors)
   
✅ Page displays:
   - SportTicket logo
   - Navigation bar
   - Hero section
   - Event cards
   
✅ API works:
   DevTools → Network → /api/events
   Response 200 with 6 events
   
✅ Login works:
   demo@sportticket.com / demo123
   Logs in successfully
   
✅ Auto-deploy works:
   Push to GitHub → Auto-deploys
   Takes ~2-3 minutes
```

---

## 📞 Quick Reference

### **Important URLs**

```
Azure Portal:        https://portal.azure.com
Your App:           https://sportsticket-app.azurewebsites.net
GitHub Repo:        https://github.com/YOUR_USER/sportsticketwebsite
Deployment Center:  Azure Portal → App Service → Deployment Center
Application Logs:   Azure Portal → App Service → Log Stream
```

### **Important Commands**

```bash
# View real-time logs
az webapp log tail --name sportsticket-app --resource-group sportsticket-rg

# Restart app
az webapp restart --name sportsticket-app --resource-group sportsticket-rg

# View deployment status
az webapp deployment slot list --name sportsticket-app --resource-group sportsticket-rg

# Delete everything (cleanup)
az group delete --name sportsticket-rg
```

---

## 🎊 DEPLOYMENT COMPLETE!

Your app is now:
- ☁️ Hosted on Azure
- 🚀 Auto-deploying from GitHub
- 🌍 Globally accessible
- 📊 Monitored & logged
- ✅ Production ready

**Share with friends:** `https://sportsticket-app.azurewebsites.net`

---

**Next Steps:**
1. Test your live app
2. Make a small change & git push to test auto-deploy
3. Add custom domain (optional)
4. Add database later (optional)

**Questions?** See [AZURE_DEMO.md](./AZURE_DEMO.md)

**Last Updated:** 2026-08-31
