# 🚀 QUICK DEPLOYMENT COMMANDS

## Prerequisites Setup

### 1. Get Groq API Key
```bash
# Visit: https://console.groq.com
# Sign up → API Keys → Create New Key
# Copy the key (starts with gsk_)
```

### 2. Setup MongoDB Atlas
```bash
# Visit: https://cloud.mongodb.com
# Create account → Build Database → Free (M0)
# Database Access → Add User → Save credentials
# Network Access → Add IP → 0.0.0.0/0
# Connect → Drivers → Copy connection string
```

---

## Local Development

### First Time Setup
```bash
# Clone repository
git clone https://github.com/yourusername/cognitia-ai-app.git
cd cognitia-ai-app

# Run setup script
chmod +x setup.sh
./setup.sh

# Edit backend/.env with your credentials
nano backend/.env
```

### Start Development Servers
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend  
cd frontend
npm run dev

# Open: http://localhost:5173
```

### Test Locally
```bash
# Health check
curl http://localhost:5000/api/health

# Test AI endpoint
curl -X POST http://localhost:5000/api/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"Hello, how are you?"}'
```

---

## Production Deployment

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for production deployment"
git push origin main
```

### Step 2: Deploy Backend to Render

#### Via Render Dashboard
```bash
1. Go to: https://dashboard.render.com
2. Click: New + → Web Service
3. Connect: Your GitHub repository
4. Configure:
   Name: cognitia-ai-backend
   Region: Oregon (US West)
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free

5. Environment Variables:
   NODE_ENV = production
   PORT = 10000
   GROQ_API_KEY = gsk_your_key_here
   MONGO_URI = mongodb+srv://user:pass@cluster.mongodb.net/cognitia
   ALLOWED_ORIGINS = https://your-app.vercel.app

6. Click: Create Web Service
7. Wait for deployment (~5-10 minutes)
8. Copy URL: https://cognitia-ai-backend.onrender.com
```

#### Test Backend
```bash
# Health check
curl https://cognitia-ai-backend.onrender.com/api/health

# Should return: {"status":"ok"}
```

### Step 3: Deploy Frontend to Vercel

#### Via Vercel Dashboard
```bash
1. Go to: https://vercel.com/dashboard
2. Click: Add New... → Project
3. Import: Your GitHub repository
4. Configure:
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install

5. Environment Variables:
   VITE_API_URL = https://cognitia-ai-backend.onrender.com/api

6. Click: Deploy
7. Wait for deployment (~2-5 minutes)
8. Copy URL: https://your-project.vercel.app
```

#### Via Vercel CLI (Alternative)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel --prod

# Follow prompts
# Set VITE_API_URL when asked
```

### Step 4: Update Backend CORS
```bash
1. Go to: Render Dashboard
2. Select: cognitia-ai-backend service
3. Click: Environment
4. Edit: ALLOWED_ORIGINS
5. Value: https://your-project.vercel.app
6. Click: Save Changes
# Service will auto-redeploy
```

### Step 5: Final Test
```bash
# Open frontend
open https://your-project.vercel.app

# Test:
1. Enter a question
2. Click submit
3. Verify AI response appears
4. Check browser console for errors
```

---

## Update Deployment

### Update Backend
```bash
cd backend
# Make changes
git add .
git commit -m "Update: description"
git push origin main
# Render auto-deploys from GitHub
```

### Update Frontend
```bash
cd frontend
# Make changes
git add .
git commit -m "Update: description"
git push origin main
# Vercel auto-deploys from GitHub
```

### Manual Redeploy

#### Render
```bash
# Dashboard → Service → Manual Deploy → Deploy latest commit
```

#### Vercel
```bash
# Dashboard → Project → Deployments → Redeploy
# Or via CLI:
cd frontend
vercel --prod
```

---

## Environment Variables Reference

### Backend (Render)
```env
NODE_ENV=production
PORT=10000
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxx
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/cognitia?retryWrites=true&w=majority
ALLOWED_ORIGINS=https://your-app.vercel.app,https://www.your-domain.com
```

### Frontend (Vercel)
```env
VITE_API_URL=https://cognitia-ai-backend.onrender.com/api
```

---

## Monitoring Commands

### Check Backend Logs (Render)
```bash
# Via Dashboard: Service → Logs
# Or via CLI:
render logs -s cognitia-ai-backend
```

### Check Frontend Logs (Vercel)
```bash
# Via Dashboard: Project → Deployments → View Function Logs
# Or via CLI:
vercel logs
```

### Check MongoDB Metrics
```bash
# Via Dashboard: Database → Metrics
# Monitor: Connections, Storage, Operations
```

---

## Troubleshooting Commands

### Backend Issues
```bash
# Check if backend is running
curl https://your-backend.onrender.com/api/health

# Test AI endpoint
curl -X POST https://your-backend.onrender.com/api/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"test"}'

# Check Render logs
# Dashboard → Service → Logs

# Verify environment variables
# Dashboard → Service → Environment
```

### Frontend Issues
```bash
# Check build logs
# Vercel Dashboard → Project → Deployments → Latest → View Build Logs

# Verify environment variables
# Vercel Dashboard → Project → Settings → Environment Variables

# Test API connection
# Open browser console on your site
# Check Network tab for API calls
```

### Database Issues
```bash
# Test connection locally
mongosh "mongodb+srv://user:pass@cluster.mongodb.net/cognitia"

# Check Atlas dashboard
# Database → Metrics → Connections

# Verify IP whitelist
# Network Access → IP Access List
```

---

## Rollback Commands

### Rollback Backend (Render)
```bash
# Dashboard → Service → Events
# Find previous successful deployment
# Click: Redeploy
```

### Rollback Frontend (Vercel)
```bash
# Dashboard → Project → Deployments
# Find previous deployment
# Click: ... → Promote to Production
```

---

## Useful URLs

### Development
- Local Frontend: http://localhost:5173
- Local Backend: http://localhost:5000
- Backend Health: http://localhost:5000/api/health

### Production
- Render Dashboard: https://dashboard.render.com
- Vercel Dashboard: https://vercel.com/dashboard
- MongoDB Atlas: https://cloud.mongodb.com
- Groq Console: https://console.groq.com

### Documentation
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- MongoDB Docs: https://docs.mongodb.com
- Groq Docs: https://console.groq.com/docs

---

## Quick Reference

### Install Dependencies
```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

### Run Tests
```bash
# Backend syntax check
cd backend && node --check server.js

# Frontend build test
cd frontend && npm run build
```

### View Logs
```bash
# Backend (local)
cd backend && npm start

# Frontend (local)
cd frontend && npm run dev

# Production: Use dashboards
```

### Clean Install
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

## Emergency Contacts

- **Render Support**: https://render.com/support
- **Vercel Support**: https://vercel.com/support
- **MongoDB Support**: https://support.mongodb.com
- **Groq Support**: https://console.groq.com/support

---

**Quick Start**: `./setup.sh` → Edit `.env` → `npm start` (backend) → `npm run dev` (frontend)

**Deploy**: Push to GitHub → Render (backend) → Vercel (frontend) → Update CORS → Test

**Update**: Make changes → `git push` → Auto-deploys

---

**Last Updated**: 2026-04-20
