#!/bin/bash

echo "🚀 Starting deployment process..."

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -f "manage.py" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build React app
echo "🔨 Building React app..."
npm run build

# Check if build was successful
if [ ! -d "build" ]; then
    echo "❌ Build failed! Please check the error messages above."
    exit 1
fi

echo "✅ Build completed successfully!"
echo ""
echo "🎯 Next steps:"
echo "1. Push your code to GitHub:"
echo "   git add ."
echo "   git commit -m 'Prepare for deployment'"
echo "   git push origin main"
echo ""
echo "2. Deploy to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Import your GitHub repository"
echo "   - Configure as Create React App"
echo ""
echo "3. Deploy to Render:"
echo "   - Go to https://render.com"
echo "   - Create new Web Service"
echo "   - Connect your GitHub repository"
echo "   - Choose Python 3 environment"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions!"
echo ""
echo "🌐 Your app will be accessible at:"
echo "   Frontend: https://your-app.vercel.app"
echo "   Backend: https://your-app-backend.onrender.com"
echo ""
echo "💰 Both services are 100% FREE with no time limits!"
