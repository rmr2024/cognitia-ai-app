# Cognitia AI - Production Deployment Guide

## 📋 Table of Contents
- [Prerequisites](#prerequisites)
- [MongoDB Atlas Setup](#mongodb-atlas-setup)
- [Backend Deployment (Render)](#backend-deployment-render)
- [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

- Node.js 18+ installed locally
- Git installed
- GitHub account
- Groq API key ([Get it here](https://console.groq.com))
- MongoDB Atlas account ([Sign up here](https://www.mongodb.com/cloud/atlas))
- Render account ([Sign up here](https://render.com))
- Vercel account ([Sign up here](https://vercel.com))

---

## MongoDB Atlas Setup

### Step 1: Create Cluster
```bash
1. Go to https://cloud.mongodb.com
2. Click "Build a Database"
3. Choose FREE tier (M0)
4. Select a cloud provider and region (closest to your users)
5. Name your cluster (e.g., "cognitia-cluster")
6. Click "Create"
```

### Step 2: Create Database User
```bash
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: cognitia_user
5. Password: Generate a secure password (save it!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"
```

### Step 3: Configure Network Access
```bash
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production, restrict to specific IPs
4. Click "Confirm"
```

### Step 4: Get Connection String
```bash
1. Go to "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Driver: Node.js, Version: 5.5 or later
5. Copy the connection string
6. Replace <password> with your database user password
7. Replace <dbname> with "cognitia"

Example:
mongodb+srv://cognitia_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/cognitia?retryWrites=true&w=majority
```

---

## Backend Deployment (Render)

### Step 1: Prepare Repository
```bash
# Ensure your code is pushed to GitHub
git add .
git commit -m "Prepare for production deployment"
git push origin main
```

### Step 2: Create Render Web Service
```bash
1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select "cognitia-ai-app" repository
```

### Step 3: Configure Service
```
Name: cognitia-ai-backend
Region: Oregon (US West) or closest to you
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: npm start
Instance Type: Free
```

### Step 4: Add Environment Variables
```
Click "Advanced" → "Add Environment Variable"

Add these variables:
- NODE_ENV = production
- PORT = 10000
- GROQ_API_KEY = your_groq_api_key_here
- MONGO_URI = your_mongodb_connection_string
- ALLOWED_ORIGINS = https://your-frontend.vercel.app
```

### Step 5: Deploy
```bash
1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Copy your backend URL: https://cognitia-ai-backend.onrender.com
```

### Step 6: Test Backend
```bash
# Test health endpoint
curl https://cognitia-ai-backend.onrender.com/api/health

# Expected response:
{"status":"ok"}
```

---

## Frontend Deployment (Vercel)

### Step 1: Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

### Step 2: Deploy via Vercel Dashboard
```bash
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Select "cognitia-ai-app"
```

### Step 3: Configure Project
```
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### Step 4: Add Environment Variables
```
Go to "Environment Variables" section

Add:
- VITE_API_URL = https://cognitia-ai-backend.onrender.com/api
```

### Step 5: Deploy
```bash
1. Click "Deploy"
2. Wait for deployment (2-5 minutes)
3. Your app will be live at: https://your-project.vercel.app
```

### Step 6: Update Backend CORS
```bash
1. Go back to Render dashboard
2. Open your backend service
3. Go to "Environment"
4. Update ALLOWED_ORIGINS to include your Vercel URL:
   ALLOWED_ORIGINS=https://your-project.vercel.app
5. Save changes (service will redeploy)
```

---

## Environment Variables

### Backend (.env)
```env
PORT=10000
NODE_ENV=production
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxx
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/cognitia
ALLOWED_ORIGINS=https://your-frontend.vercel.app,https://www.your-domain.com
```

### Frontend (.env)
```env
VITE_API_URL=https://cognitia-ai-backend.onrender.com/api
```

---

## Testing

### Local Testing
```bash
# Backend
cd backend
npm install
npm start

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

### Production Testing
```bash
# Test backend health
curl https://your-backend.onrender.com/api/health

# Test AI endpoint
curl -X POST https://your-backend.onrender.com/api/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"What is AI?"}'

# Visit frontend
open https://your-frontend.vercel.app
```

---

## Deployment Commands

### Quick Deploy Commands

#### Deploy Backend to Render
```bash
# Push changes to GitHub
git add .
git commit -m "Update backend"
git push origin main

# Render will auto-deploy from GitHub
```

#### Deploy Frontend to Vercel
```bash
# Option 1: Via Vercel CLI
cd frontend
vercel --prod

# Option 2: Push to GitHub (auto-deploy)
git add .
git commit -m "Update frontend"
git push origin main
```

---

## Troubleshooting

### Backend Issues

**Issue: "Cannot connect to MongoDB"**
```bash
Solution:
1. Check MONGO_URI is correct
2. Verify IP whitelist includes 0.0.0.0/0
3. Confirm database user credentials
4. Check Render logs: Dashboard → Service → Logs
```

**Issue: "Groq API error"**
```bash
Solution:
1. Verify GROQ_API_KEY is set correctly
2. Check API key is active at console.groq.com
3. Ensure no extra spaces in environment variable
```

**Issue: "CORS error"**
```bash
Solution:
1. Add frontend URL to ALLOWED_ORIGINS
2. Format: https://your-app.vercel.app (no trailing slash)
3. Multiple origins: separate with commas
```

### Frontend Issues

**Issue: "Failed to fetch"**
```bash
Solution:
1. Check VITE_API_URL is correct
2. Ensure backend is running
3. Verify CORS is configured
4. Check browser console for exact error
```

**Issue: "Environment variable not found"**
```bash
Solution:
1. Ensure variable starts with VITE_
2. Rebuild frontend after adding env vars
3. In Vercel: Settings → Environment Variables → Redeploy
```

### General Issues

**Issue: "Build failed"**
```bash
Solution:
1. Check Node.js version (must be 18+)
2. Delete node_modules and package-lock.json
3. Run npm install again
4. Check for syntax errors in code
```

---

## Monitoring

### Backend Monitoring (Render)
```bash
1. Go to Render Dashboard
2. Select your service
3. View "Logs" tab for real-time logs
4. View "Metrics" for performance data
```

### Frontend Monitoring (Vercel)
```bash
1. Go to Vercel Dashboard
2. Select your project
3. View "Deployments" for build logs
4. View "Analytics" for usage stats
```

---

## Updating the Application

### Update Backend
```bash
cd backend
# Make your changes
git add .
git commit -m "Update: description"
git push origin main
# Render auto-deploys
```

### Update Frontend
```bash
cd frontend
# Make your changes
git add .
git commit -m "Update: description"
git push origin main
# Vercel auto-deploys
```

---

## Security Best Practices

1. **Never commit .env files**
   - Always use .env.example as template
   - Add .env to .gitignore

2. **Rotate API keys regularly**
   - Update Groq API key every 90 days
   - Update MongoDB password periodically

3. **Restrict CORS origins**
   - Only allow your frontend domain
   - Remove localhost in production

4. **Monitor usage**
   - Check Groq API usage limits
   - Monitor MongoDB storage
   - Review Render/Vercel logs

5. **Use environment-specific configs**
   - Different keys for dev/prod
   - Separate databases for testing

---

## Cost Breakdown

### Free Tier Limits

**MongoDB Atlas (Free)**
- 512 MB storage
- Shared RAM
- No credit card required

**Render (Free)**
- 750 hours/month
- Spins down after 15 min inactivity
- 512 MB RAM

**Vercel (Free)**
- 100 GB bandwidth/month
- Unlimited deployments
- Automatic HTTPS

**Groq API (Free)**
- Rate limits apply
- Check console.groq.com for current limits

---

## Support

- **Backend Issues**: Check Render logs
- **Frontend Issues**: Check Vercel deployment logs
- **Database Issues**: Check MongoDB Atlas metrics
- **API Issues**: Check Groq console

---

## Next Steps

1. ✅ Set up MongoDB Atlas
2. ✅ Deploy backend to Render
3. ✅ Deploy frontend to Vercel
4. ✅ Test end-to-end functionality
5. ✅ Set up custom domain (optional)
6. ✅ Enable monitoring and alerts
7. ✅ Document your API endpoints

---

**Deployment Complete! 🎉**

Your Cognitia AI app is now live in production!
