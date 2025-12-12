#!/bin/bash
set -e

echo "🚀 Starting deployment for Production..."

cd ~/feskillspace-prod

echo "📦 Pulling latest changes..."
git pull origin main || echo "⚠️  Git pull skipped (using GitHub Actions deploy)"

echo "🛑 Stopping existing containers..."
docker compose down

echo "🏗️  Building and starting containers..."
docker compose up -d --build

echo "⏳ Waiting for application to start..."
sleep 15

echo "✅ Checking container status..."
docker compose ps

echo "🏥 Health check..."
if curl -f http://localhost:3000 > /dev/null 2>&1; then
  echo "✅ Production deployment successful!"
else
  echo "❌ Health check failed!"
  docker compose logs --tail=50
  exit 1
fi

echo "📋 Container logs (last 20 lines):"
docker compose logs --tail=20

echo "🧹 Cleaning up unused Docker resources..."
docker system prune -f
