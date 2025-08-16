# Deployment Guide

This guide covers free and cheap hosting options for your clinical trials matching application.

## 🚀 Quick Deploy to Render (Recommended - Free)

### Prerequisites
- GitHub account
- Render account (free at render.com)

### Steps

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Deploy to Render**
   - Go to [render.com](https://render.com) and sign up
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` file and deploy both services

3. **Set Environment Variables**
   - In your Render dashboard, go to the backend service (`clinical-trial-search-api`)
   - Add environment variable: `OPENAI_API_KEY` with your OpenAI API key
   - The frontend will automatically get the API URL from the render.yaml

4. **Access your app**
   - Frontend: `https://clinical-trial-search.onrender.com`
   - Backend: `https://clinical-trial-search-api.onrender.com`

## 🌐 Alternative Free Hosting Options

### 1. Vercel (Frontend) + Railway (Backend)

**Frontend on Vercel:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd client
vercel
```

**Backend on Railway:**
- Go to [railway.app](https://railway.app)
- Connect GitHub repo
- Set environment variables
- Deploy

### 2. Netlify (Frontend) + Heroku (Backend)

**Frontend on Netlify:**
- Connect GitHub repo to Netlify
- Build command: `cd client && npm install && npm run build`
- Publish directory: `client/build`

**Backend on Heroku:**
```bash
# Install Heroku CLI
heroku create your-app-name
git push heroku main
```

### 3. Cyclic (Full Stack - Free Tier)
- Go to [cyclic.sh](https://cyclic.sh)
- Connect GitHub repo
- Deploy with automatic scaling

## 💰 Cheap Hosting Options ($5-10/month)

### 1. DigitalOcean App Platform
- $5/month for basic plan
- Automatic deployments from GitHub
- Built-in SSL and CDN

### 2. Railway Pro
- $5/month for hobby plan
- Better performance than free tier
- More resources

### 3. Render Paid Plans
- $7/month for starter plan
- Better performance and uptime
- Custom domains

## 🔧 Environment Variables

Make sure to set these environment variables in your hosting platform:

**Backend:**
- `OPENAI_API_KEY` - Your OpenAI API key
- `NODE_ENV` - Set to "production"
- `PORT` - Usually auto-set by hosting platform

**Frontend:**
- `REACT_APP_API_URL` - Your backend API URL

## 📝 Important Notes

1. **Free Tier Limitations:**
   - Render: Services sleep after 15 minutes of inactivity
   - Vercel: 100GB bandwidth/month
   - Netlify: 100GB bandwidth/month
   - Railway: 500 hours/month

2. **Performance:**
   - Free tiers may have slower cold starts
   - Consider upgrading for production use

3. **Domain:**
   - All platforms provide free subdomains
   - Custom domains available on paid plans

## 🚨 Troubleshooting

### Common Issues:
1. **Build failures**: Check Node.js version compatibility
2. **API errors**: Verify environment variables are set
3. **CORS issues**: Ensure frontend URL is in backend CORS config
4. **Cold starts**: Normal on free tiers, consider paid plans for better performance

### Support:
- Render: [docs.render.com](https://docs.render.com)
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Railway: [docs.railway.app](https://docs.railway.app)
