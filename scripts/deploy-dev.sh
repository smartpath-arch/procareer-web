#!/bin/bash
set -e

echo "🚀 Starting deployment for Development..."

cd ~/feskillspace-dev

echo "📦 Pulling latest changes..."
git pull origin dev || echo "⚠️  Git pull skipped (using GitHub Actions deploy)"

echo "🛑 Stopping existing containers..."
docker compose -f docker-compose.dev.yml down

echo "🏗️  Building and starting containers..."
docker compose -f docker-compose.dev.yml up -d --build

echo "⏳ Waiting for application to start..."
sleep 10

echo "✅ Checking container status..."
docker compose -f docker-compose.dev.yml ps

echo "🏥 Health check..."
if curl -f http://localhost:3000 > /dev/null 2>&1; then
  echo "✅ Development deployment successful!"
else
  echo "❌ Health check failed!"
  docker compose -f docker-compose.dev.yml logs --tail=50
  exit 1
fi

echo "📋 Container logs (last 20 lines):"
docker compose -f docker-compose.dev.yml logs --tail=20
