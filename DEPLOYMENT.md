# Vercel Deployment Guide - SportTicket

## 📦 Pre-Deployment Checklist

- ✅ Next.js 16.3.4 configured
- ✅ TypeScript setup complete
- ✅ All API endpoints working
- ✅ Environment variables ready
- ✅ Project is production-ready

---

## 🚀 Deployment Steps

### **Step 1: Prepare Your Project**

Make sure you have a GitHub account and your project is pushed to a GitHub repository.

```bash
# Initialize git (if not already done)
git init

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/sportsticketwebsite.git

# Commit and push your changes
git add .
git commit -m "Initial release - SportTicket v0.1.0"
git branch -M main
git push -u origin main
```

---

### **Step 2: Connect to Vercel**

#### Option A: Using Vercel CLI (Recommended)

1. **Install Vercel CLI globally:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy from your project directory:**
   ```bash
   cd /Users/prashanthkumargona/Desktop/Projects\ AI/sportsticketwebsite
   vercel
   ```

3. **Follow the prompts:**
   - Link to your Vercel account (or create one at vercel.com)
   - Set your project name: `sportsticketwebsite`
   - Confirm project settings
   - Wait for deployment to complete

#### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Select your `sportsticketwebsite` repository
5. Click "Import"
6. Environment variables setup (see below)
7. Click "Deploy"

---

### **Step 3: Configure Environment Variables (Optional)**

For production database and API keys, add to Vercel:

1. Go to your Vercel project dashboard
2. Navigate to **Settings → Environment Variables**
3. Add variables:

```env
DATABASE_URL=postgresql://user:password@host/dbname
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production
```

Currently, the app uses mock data, so this is optional.

---

### **Step 4: Verify Deployment**

After deployment completes:

1. **Visit your live site:**
   ```
   https://sportsticketwebsite.vercel.app
   ```

2. **Test features:**
   - Navigate the home page
   - Try login with demo credentials
   - Browse events

3. **Check deployment logs:**
   ```bash
   vercel logs
   ```

---

## 📝 Environment Variables Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| `DATABASE_URL` | PostgreSQL connection | `postgresql://user:pass@host/db` |
| `JWT_SECRET` | Session signing key | `your_secret_key_here` |
| `NODE_ENV` | Environment | `production` |
| `NEXT_PUBLIC_API_URL` | Frontend API URL | `https://api.example.com` |

---

## 🔄 Continuous Deployment

**Vercel automatically deploys when you:**
- Push to `main` branch
- Create pull requests (preview deployments)
- Merge PRs to `main`

### Deploy from CLI:
```bash
vercel --prod
```

### Preview Deployment (testing):
```bash
vercel
```

---

## 🆘 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
vercel --prod --force
```

### Environment Variables Not Working
- Verify they're set in Vercel dashboard
- Use `NEXT_PUBLIC_` prefix for client-side variables
- Redeploy after adding variables

### API Routes Not Working
- Ensure `/app/api/` folder structure is correct
- Check function names match route paths
- Verify no TypeScript errors: `npm run build`

### Domain Not Connecting
1. Go to Vercel dashboard → Settings → Domains
2. Add your custom domain
3. Update your domain registrar's DNS settings to point to Vercel nameservers

---

## 📊 Deployment Checklist

- [ ] GitHub repository created and pushed
- [ ] Vercel CLI installed or GitHub connected
- [ ] Build successful locally: `npm run build`
- [ ] No TypeScript errors: `npm run lint`
- [ ] Environment variables configured (if needed)
- [ ] Live site tested and working
- [ ] Custom domain configured (optional)
- [ ] Monitoring/Analytics enabled (optional)

---

## 💡 Pro Tips

1. **Preview Deployments:** Every PR gets a unique preview URL
2. **Rollback:** Easy rollback to previous deployments from Vercel dashboard
3. **Analytics:** Enable Web Analytics in Vercel dashboard for free
4. **Bandwidth:** Vercel includes free bandwidth tier
5. **Serverless Functions:** API routes run as Serverless Functions (auto-scaling)

---

## 🎯 Next Steps After Deployment

1. **Add Custom Domain**
   - Settings → Domains → Add Domain

2. **Enable SSL Certificate**
   - Automatic with Vercel (free)

3. **Set Up Monitoring**
   - Vercel Analytics (free tier)

4. **Configure Git Integrations**
   - Auto-deploy on push

5. **Add Database**
   - Use Vercel PostgreSQL (Postgres) or external provider

---

## 📞 Vercel Support

- **Docs:** [vercel.com/docs](https://vercel.com/docs)
- **CLI Help:** `vercel --help`
- **Community:** [GitHub Discussions](https://github.com/vercel/next.js/discussions)

---

**Version:** 0.1.0  
**Last Updated:** 2026-08-31
