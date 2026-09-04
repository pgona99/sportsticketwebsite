# ☁️ Azure Cloud Deployment Demo

Complete guide showing how to deploy SportTicket to Microsoft Azure.

---

## 📋 Table of Contents

1. **Azure Options** — Different services explained
2. **Setup Guide** — Step-by-step deployment
3. **Cost Breakdown** — What you'll pay
4. **Configuration** — Environment setup
5. **Comparison** — Azure vs Vercel vs Other platforms
6. **Post-Deployment** — Monitoring & scaling

---

## 🎯 Azure Services for Next.js

### **Option 1: Azure App Service (Recommended)** ⭐
Best for Next.js apps - similar to Heroku

**Pros:**
- ✅ Easy to deploy
- ✅ Built-in CI/CD
- ✅ Free tier available
- ✅ Integrated with Azure Database
- ✅ Auto-scaling
- ✅ 99.95% uptime SLA

**Cons:**
- ⚠️ Slightly more complex than Vercel
- ⚠️ More configuration needed

**Cost:**
- **Free:** Limited preview tier
- **Cheap:** $10-15/month (B1 plan)
- **Professional:** $30+/month (B2+ plan)

---

### **Option 2: Azure Container Instances** 🐳
For containerized Next.js apps

**Pros:**
- ✅ Pay per second
- ✅ Lightweight
- ✅ Good for CI/CD

**Cons:**
- ⚠️ More complex setup
- ⚠️ Need Docker knowledge

**Cost:**
- Starting at $0.0015 per second (very cheap!)

---

### **Option 3: Azure Static Web Apps** 🌐
For static/serverless Next.js

**Pros:**
- ✅ Very cheap ($0-50/month)
- ✅ Integrated GitHub CI/CD
- ✅ Built-in auth
- ✅ Free SSL

**Cons:**
- ⚠️ Limited to static generation
- ⚠️ Limited API support

**Cost:**
- **Free:** Limited tier
- **Standard:** $10/month

---

## 🚀 Setup Guide: Azure App Service

### **Step 1: Create Azure Account**

1. Go to [azure.microsoft.com/free](https://azure.microsoft.com/free)
2. Sign up with Microsoft account
3. Get $200 free credits (valid 30 days)

### **Step 2: Create Resource Group**

```bash
# Install Azure CLI
brew install azure-cli

# Login
az login

# Create resource group
az group create \
  --name sportsticket-rg \
  --location eastus
```

### **Step 3: Create App Service Plan**

```bash
# Create app service plan
az appservice plan create \
  --name sportsticket-plan \
  --resource-group sportsticket-rg \
  --sku B1 \
  --is-linux
```

**Plan Options:**
- `B1`: $10.50/month (1 GB RAM, shared core)
- `B2`: $41.40/month (1.75 GB RAM, shared core)
- `P1V2`: $81.60/month (1.75 GB, dedicated)

### **Step 4: Create Web App**

```bash
# Create web app
az webapp create \
  --resource-group sportsticket-rg \
  --plan sportsticket-plan \
  --name sportsticket-app \
  --runtime "NODE|18-lts"
```

Your app will be at:
```
https://sportsticket-app.azurewebsites.net
```

### **Step 5: Configure Environment Variables**

```bash
# Set environment variables
az webapp config appsettings set \
  --resource-group sportsticket-rg \
  --name sportsticket-app \
  --settings \
    NODE_ENV=production \
    WEBSITE_NODE_DEFAULT_VERSION=18.17.0
```

### **Step 6: Deploy from GitHub**

#### **Option A: GitHub Actions (Recommended)**

1. Go to Azure Portal → Your App → Deployment Center
2. Select "GitHub"
3. Authorize GitHub
4. Select your repository & branch
5. Azure auto-creates workflow file
6. Push to `main` branch → Auto-deploy!

#### **Option B: Git Deployment**

```bash
# Get deployment credentials
az webapp deployment source config-local-git \
  --resource-group sportsticket-rg \
  --name sportsticket-app

# Add Azure as git remote
git remote add azure https://sportsticket-app.scm.azurewebsites.net/sportsticket-app.git

# Deploy
git push azure main
```

#### **Option C: Azure CLI Zip Deploy**

```bash
# Build project
npm run build

# Create deployment package
zip -r deploy.zip .next package.json public

# Deploy
az webapp deployment source config-zip \
  --resource-group sportsticket-rg \
  --name sportsticket-app \
  --src deploy.zip
```

---

## 🗄️ Add Database to Azure

### **Option A: Azure Database for PostgreSQL**

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
```

**Cost:** $35-100/month

### **Option B: Azure SQL Database**

```bash
# Create SQL server
az sql server create \
  --name sportsticket-sql \
  --resource-group sportsticket-rg \
  --admin-user sqladmin \
  --admin-password MySecurePassword123!

# Create database
az sql db create \
  --server sportsticket-sql \
  --resource-group sportsticket-rg \
  --name sportsticket_db
```

**Cost:** $15-50/month

### **Option C: Azure Cosmos DB**

For NoSQL/document storage

**Cost:** $25-100+/month

---

## 📊 Configuration Files

### **.github/workflows/azure-deploy.yml** (Auto-generated)

```yaml
name: Build and deploy Node.js app to Azure Web App

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Set up Node.js version
        uses: actions/setup-node@v1
        with:
          node-version: '18.x'
      
      - name: npm install, build, and test
        run: |
          npm install
          npm run build --if-present
          npm run test --if-present
      
      - name: Upload artifact
        uses: actions/upload-artifact@v2
        with:
          name: node-app
          path: |
            .next
            public
            package.json
            package-lock.json
            node_modules/

  deploy:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Download artifact
        uses: actions/download-artifact@v2
        with:
          name: node-app
      
      - name: 'Deploy to Azure Web App'
        uses: azure/webapps-deploy@v2
        with:
          app-name: sportsticket-app
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
          package: .
```

### **.env.production** (Azure Environment)

```env
NODE_ENV=production
DATABASE_URL=postgresql://dbadmin:password@sportsticket-db.postgres.database.azure.com/sportsticketdb
WEBSITE_ENABLE_SYNC_UPDATE_SITE=true
```

---

## 💰 Azure Pricing Breakdown

### **App Service (Monthly)**
| Plan | CPU | Memory | Cost |
|------|-----|--------|------|
| Free | Shared | 1 GB | **$0** |
| B1 | Shared | 1 GB | **$10.50** |
| B2 | Shared | 1.75 GB | **$41.40** |
| S1 | Dedicated | 1.75 GB | **$70.40** |

### **Database (Monthly)**
| Service | Tier | Cost |
|---------|------|------|
| PostgreSQL | Basic B1 | **$35** |
| SQL Database | Basic | **$5** |
| Cosmos DB | Free Tier | **$0-25** |

### **Total Cost Example**
```
App Service (B1):     $10.50
PostgreSQL (Basic):   $35.00
Storage (100 GB):     $2.00
Bandwidth:            ~$5.00
─────────────────
TOTAL/MONTH:         ~$52.50
```

**With free credits:** FREE for first month! 💰

---

## 🔄 Deployment Steps (Quick Summary)

### **Method 1: GitHub Integration (Easiest)**
```
1. Connect GitHub repo
2. Select main branch
3. Azure auto-deploys on push
4. Done! ✅
```

### **Method 2: Git Push**
```bash
git remote add azure <your-azure-git-url>
git push azure main
```

### **Method 3: Azure CLI**
```bash
npm run build
az webapp deployment source config-zip \
  --resource-group sportsticket-rg \
  --name sportsticket-app \
  --src deploy.zip
```

---

## 📊 Comparison Matrix

| Feature | Vercel | Azure App Service | AWS Elastic Beanstalk |
|---------|--------|-------------------|----------------------|
| **Ease of Use** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Startup Cost** | $0 | $0 (free tier) | $0 (free tier) |
| **Monthly Cost** | $20+ | $10+ | $10+ |
| **Deployment Speed** | <1 min | 2-5 mins | 5-10 mins |
| **Auto-scaling** | ✅ | ✅ | ✅ |
| **Database Included** | ❌ | ✅ | ❌ |
| **GitHub Integration** | ✅ | ✅ | ✅ |
| **Serverless** | ✅ | ❌ | ❌ |
| **Custom Domain** | ✅ | ✅ | ✅ |
| **Global CDN** | ✅ | ✅ | ✅ |

---

## 🎯 Step-by-Step Deployment

### **1. Prepare Your Code**
```bash
cd /Users/prashanthkumargona/Desktop/Projects\ AI/sportsticketwebsite

# Ensure build works
npm run build

# Test locally
npm start
# Visit http://localhost:3000
```

### **2. Add Azure Files**

Create `.azure/config.json`:
```json
{
  "app_name": "sportsticket-app",
  "resource_group": "sportsticket-rg",
  "region": "eastus",
  "sku": "B1"
}
```

### **3. Deploy to Azure**

```bash
# Option A: Using GitHub (Recommended)
# 1. Push to GitHub
git push origin main

# 2. Go to Azure Portal
# 3. App → Deployment Center → GitHub
# 4. Select repo and branch
# 5. Azure deploys automatically

# Option B: Using Azure CLI
az webapp up \
  --name sportsticket-app \
  --resource-group sportsticket-rg \
  --plan sportsticket-plan \
  --runtime "NODE|18-lts"
```

### **4. Verify Deployment**

```bash
# Check deployment status
az webapp show \
  --name sportsticket-app \
  --resource-group sportsticket-rg \
  --query state

# View logs
az webapp log tail \
  --name sportsticket-app \
  --resource-group sportsticket-rg
```

Your app is now at: `https://sportsticket-app.azurewebsites.net`

---

## 🔐 Post-Deployment Setup

### **1. Add Custom Domain**
```bash
az webapp config hostname add \
  --webapp-name sportsticket-app \
  --resource-group sportsticket-rg \
  --hostname www.sportsticket.com
```

### **2. Enable Auto-Scaling**
```bash
# Create autoscale settings
az monitor autoscale create \
  --resource-group sportsticket-rg \
  --resource sportsticket-plan \
  --resource-type "Microsoft.Web/serverfarms" \
  --min-count 1 \
  --max-count 3 \
  --count 1
```

### **3. Set Up Monitoring**
```bash
# Enable Application Insights
az monitor app-insights component create \
  --app sportsticket-insights \
  --location eastus \
  --resource-group sportsticket-rg
```

### **4. Add SSL Certificate**
Azure auto-provides free SSL with custom domains (via Lets Encrypt)

---

## 🔗 Useful Azure Commands

```bash
# List all resources
az resource list --resource-group sportsticket-rg

# View app details
az webapp show --name sportsticket-app --resource-group sportsticket-rg

# View logs
az webapp log tail --name sportsticket-app --resource-group sportsticket-rg

# Restart app
az webapp restart --name sportsticket-app --resource-group sportsticket-rg

# Delete everything (cleanup)
az group delete --name sportsticket-rg
```

---

## 🎯 Why Choose Azure?

### **✅ Advantages**
- Enterprise-grade infrastructure
- Integrated database services
- Built-in CI/CD with GitHub
- Excellent auto-scaling
- Global data centers
- Microsoft ecosystem integration
- Free tier available

### **❌ Disadvantages**
- Slightly steeper learning curve than Vercel
- More configuration needed
- UI can be overwhelming for beginners
- Longer deployment times (2-5 mins vs Vercel's <1 min)

---

## 🚀 My Recommendation

### **For Quick Demo:** Vercel ✅
- Fastest setup (~5 mins)
- No configuration
- Perfect for testing
- Free tier sufficient

### **For Production with Database:** Azure 🎯
- Integrated database
- Better for scaling
- More control
- Enterprise features
- $10-50/month

### **For Maximum Control:** AWS EC2
- Full server control
- Most configuration needed
- Most expensive
- Steepest learning curve

---

## 📚 Azure Resources

- [Azure Web Apps Docs](https://docs.microsoft.com/en-us/azure/app-service/)
- [Azure for Node.js](https://docs.microsoft.com/en-us/azure/javascript/)
- [Azure Pricing Calculator](https://azure.microsoft.com/en-us/pricing/calculator/)
- [Azure CLI Reference](https://docs.microsoft.com/en-us/cli/azure/)

---

## 🤔 Decision Time

### **Choose Azure If:**
- ✅ You need integrated database
- ✅ You want enterprise features
- ✅ You have $0-50/month budget
- ✅ You like Microsoft ecosystem
- ✅ You need advanced monitoring

### **Choose Vercel If:**
- ✅ You want simplest setup
- ✅ You need fastest deployment
- ✅ You prefer GitHub integration
- ✅ You have $0-20/month budget

### **Use Both If:**
- ✅ Deploy to Vercel first (free, fast)
- ✅ Later migrate to Azure (with database)
- ✅ Keep Vercel as backup

---

## 🎯 What Should I Do?

**Choose one:**

1. **Keep current setup** (Mock data + Vercel) — Best for now ✅
2. **Deploy to Vercel** — 5 minutes, free ⚡
3. **Deploy to Azure App Service** — Better with database 🗄️
4. **Deploy to both** — Vercel + Azure fallback 🔄

**Ready to deploy to Azure?** Let me know! 🚀
