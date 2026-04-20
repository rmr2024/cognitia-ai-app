#!/bin/bash

# Cognitia AI - Quick Start Script
# This script helps you set up the project locally

set -e

echo "🚀 Cognitia AI - Quick Start Setup"
echo "=================================="
echo ""

# Check Node.js version
echo "📦 Checking Node.js version..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Error: Node.js 18+ required. You have: $(node -v)"
    exit 1
fi
echo "✅ Node.js version: $(node -v)"
echo ""

# Backend setup
echo "🔧 Setting up Backend..."
cd backend

if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit backend/.env with your credentials:"
    echo "   - GROQ_API_KEY"
    echo "   - MONGO_URI"
    echo ""
    read -p "Press Enter after updating .env file..."
fi

echo "📦 Installing backend dependencies..."
npm install

echo "✅ Backend setup complete!"
echo ""

# Frontend setup
echo "🎨 Setting up Frontend..."
cd ../frontend

if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ Frontend .env created (using default localhost:5000)"
fi

echo "📦 Installing frontend dependencies..."
npm install

echo "✅ Frontend setup complete!"
echo ""

# Final instructions
cd ..
echo "✨ Setup Complete!"
echo "=================="
echo ""
echo "To start the application:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd backend && npm start"
echo ""
echo "Terminal 2 (Frontend):"
echo "  cd frontend && npm run dev"
echo ""
echo "Then open: http://localhost:5173"
echo ""
echo "📚 For deployment instructions, see DEPLOYMENT.md"
echo ""
