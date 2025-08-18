# 🚀 Deployment Guide

This guide will help you deploy your Django + React app to Vercel (frontend) and Render (backend) - both with **100% free tiers**!

## 📋 Prerequisites

1. **GitHub Account** - Your code should be in a GitHub repository
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com) (free forever)
3. **Render Account** - Sign up at [render.com](https://render.com) (free tier, no time limit)

## 🎯 Step 1: Push Code to GitHub FIRST

**This is crucial!** Both Vercel and Render need your code to be on GitHub first.

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

## 🎯 Step 2: Deploy React Frontend to Vercel

### 2.1 Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `./` (root of your project)
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

### 2.2 Configure Environment Variables

In Vercel dashboard, add these environment variables:

- `REACT_APP_API_URL`: Your Render backend URL (we'll get this in step 3)

### 2.3 Deploy

Click "Deploy" and wait for the build to complete. You'll get a URL like: `https://your-app.vercel.app`

## 🚂 Step 3: Deploy Django Backend to Render

### 3.1 Deploy to Render

1. Go to [render.com](https://render.com) and sign in
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `your-app-backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python manage.py migrate && python manage.py create_test_user && gunicorn home.wsgi:application`
   - **Plan**: **Free** (no time limit!)

### 3.2 Configure Environment Variables

In Render dashboard, add these environment variables:

- `DEBUG`: `False`
- `SECRET_KEY`: Generate a new secret key
- `PYTHON_VERSION`: `3.11.0`

### 3.3 Get Your Backend URL

Render will provide a URL like: `https://your-app-backend.onrender.com`

## 🔧 Step 4: Update Configuration

### 4.1 Update Vercel Environment Variables

Go back to Vercel and update:

- `REACT_APP_API_URL`: Your Render backend URL

### 4.2 Update Django CORS Settings

In `home/settings/prod.py`, update:

```python
CORS_ALLOWED_ORIGINS = [
    "https://your-vercel-app.vercel.app",  # Your Vercel domain
    "http://localhost:3000",
]
```

### 4.3 Redeploy

- Vercel will automatically redeploy when you push changes
- Render will automatically redeploy when you push changes

## 🌐 Step 5: Test Your Deployment

1. **Frontend**: Visit your Vercel URL
2. **Backend**: Test your API endpoints at your Render URL
3. **Integration**: Make sure the frontend can communicate with the backend

## 📱 Custom Domain (Optional)

### Vercel Custom Domain

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Configure DNS as instructed

### Render Custom Domain

1. In Render dashboard, go to your service
2. Click "Settings" → "Custom Domains"
3. Add your custom domain
4. Configure DNS as instructed

## 🔒 Security Considerations

1. **Environment Variables**: Never commit sensitive data
2. **CORS**: Configure properly for production
3. **HTTPS**: Both Vercel and Render provide HTTPS by default
4. **Database**: Render provides PostgreSQL in their free tier

## 🚨 Troubleshooting

### Common Issues:

1. **Build Failures**: Check build logs in Vercel/Render
2. **CORS Errors**: Verify CORS settings in Django
3. **Database Connection**: Check database settings in Render
4. **Static Files**: Ensure build process completes successfully

### Debug Commands:

```bash
# Local testing
npm run build
python manage.py collectstatic
python manage.py runserver

# Check logs
# Render logs are available in the dashboard
# Vercel logs are available in the dashboard
```

## 📊 Monitoring

- **Vercel**: Built-in analytics and performance monitoring
- **Render**: Resource usage and deployment logs
- **External**: Consider adding Sentry for error tracking

## 💰 Pricing (All Free!)

- **Vercel**: Unlimited free tier, no time limit
- **Render**: Free tier with 750 hours/month, no time limit
- **Total Cost**: $0 forever! 🎉

## 🎉 Success!

Once deployed, you'll have:

- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-app-backend.onrender.com`
- **Continuous Deployment**: Automatic updates on every push
- **No Time Limits**: Both services are free forever

Your app will be accessible 24/7 from anywhere in the world! 🌍
