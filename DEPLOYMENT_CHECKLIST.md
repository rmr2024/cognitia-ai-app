# Production Deployment Checklist

## Pre-Deployment

### Code Quality
- [ ] All files use ES6 modules (import/export)
- [ ] No console.logs in production code (except errors)
- [ ] Error handling implemented
- [ ] Input validation in place
- [ ] Rate limiting configured
- [ ] CORS properly configured

### Dependencies
- [ ] All dependencies installed
- [ ] No unused dependencies
- [ ] Package versions locked
- [ ] Security vulnerabilities checked (`npm audit`)

### Environment Variables
- [ ] .env.example files created
- [ ] .env files in .gitignore
- [ ] All required variables documented
- [ ] No hardcoded secrets

### Testing
- [ ] Backend health endpoint works
- [ ] API endpoints tested locally
- [ ] Frontend builds successfully
- [ ] Frontend connects to backend
- [ ] Error states handled

---

## MongoDB Atlas Setup

- [ ] Account created
- [ ] Free cluster created
- [ ] Database user created
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string obtained
- [ ] Connection tested locally

---

## Backend Deployment (Render)

### Repository Setup
- [ ] Code pushed to GitHub
- [ ] Repository is public or Render has access
- [ ] render.yaml file present

### Render Configuration
- [ ] Render account created
- [ ] New Web Service created
- [ ] Repository connected
- [ ] Root directory set to `backend`
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`
- [ ] Instance type: Free

### Environment Variables
- [ ] NODE_ENV = production
- [ ] PORT = 10000
- [ ] GROQ_API_KEY = (your key)
- [ ] MONGO_URI = (your connection string)
- [ ] ALLOWED_ORIGINS = (frontend URL)

### Verification
- [ ] Deployment successful
- [ ] Backend URL obtained
- [ ] Health endpoint accessible
- [ ] Logs show no errors
- [ ] MongoDB connection successful

---

## Frontend Deployment (Vercel)

### Vercel Configuration
- [ ] Vercel account created
- [ ] Project imported from GitHub
- [ ] Framework preset: Vite
- [ ] Root directory: frontend
- [ ] Build command: `npm run build`
- [ ] Output directory: dist

### Environment Variables
- [ ] VITE_API_URL = (backend URL from Render)

### Verification
- [ ] Deployment successful
- [ ] Frontend URL obtained
- [ ] Site loads correctly
- [ ] Can submit questions
- [ ] Receives AI responses
- [ ] No CORS errors

---

## Post-Deployment

### Backend Updates
- [ ] Update ALLOWED_ORIGINS with Vercel URL
- [ ] Redeploy backend
- [ ] Verify CORS works

### Testing
- [ ] End-to-end test from frontend
- [ ] Test error handling
- [ ] Test rate limiting
- [ ] Check MongoDB for saved queries
- [ ] Test on mobile device
- [ ] Test on different browsers

### Monitoring
- [ ] Render logs accessible
- [ ] Vercel deployment logs accessible
- [ ] MongoDB metrics visible
- [ ] Groq API usage tracked

### Documentation
- [ ] README.md updated
- [ ] DEPLOYMENT.md reviewed
- [ ] Environment variables documented
- [ ] API endpoints documented

---

## Security Checklist

- [ ] No secrets in code
- [ ] .env files not committed
- [ ] CORS restricted to frontend domain
- [ ] Rate limiting enabled
- [ ] Input validation implemented
- [ ] MongoDB network access configured
- [ ] HTTPS enabled (automatic on Render/Vercel)

---

## Performance Checklist

- [ ] Frontend build optimized
- [ ] Images optimized (if any)
- [ ] API responses cached (if applicable)
- [ ] Database indexes created (if needed)
- [ ] Error responses are fast

---

## Maintenance

### Regular Tasks
- [ ] Monitor Render logs weekly
- [ ] Check MongoDB storage usage
- [ ] Review Groq API usage
- [ ] Update dependencies monthly
- [ ] Rotate API keys quarterly

### Backup Plan
- [ ] MongoDB backups enabled
- [ ] Code backed up on GitHub
- [ ] Environment variables documented
- [ ] Deployment process documented

---

## Troubleshooting Commands

### Test Backend Locally
```bash
cd backend
npm install
npm start
curl http://localhost:5000/api/health
```

### Test Frontend Locally
```bash
cd frontend
npm install
npm run dev
# Open http://localhost:5173
```

### Test Production Backend
```bash
curl https://your-backend.onrender.com/api/health
```

### Test Production API
```bash
curl -X POST https://your-backend.onrender.com/api/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"Hello"}'
```

---

## Rollback Plan

### If Backend Fails
1. Check Render logs
2. Verify environment variables
3. Rollback to previous deployment in Render
4. Fix issue locally
5. Redeploy

### If Frontend Fails
1. Check Vercel deployment logs
2. Verify environment variables
3. Rollback to previous deployment in Vercel
4. Fix issue locally
5. Redeploy

---

## Success Criteria

✅ Backend deployed and accessible
✅ Frontend deployed and accessible
✅ End-to-end functionality works
✅ No errors in logs
✅ MongoDB storing data
✅ CORS configured correctly
✅ Rate limiting working
✅ Error handling working
✅ Mobile responsive
✅ Fast load times

---

## Next Steps After Deployment

1. Set up custom domain (optional)
2. Enable analytics (Vercel Analytics)
3. Set up monitoring alerts
4. Create user documentation
5. Plan feature roadmap
6. Gather user feedback

---

**Deployment Status: [ ] Complete**

Date: _______________
Deployed by: _______________
Backend URL: _______________
Frontend URL: _______________
