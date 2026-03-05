#!/bin/bash
set -e

echo "🚀 Starting BookHeaven Backend Build..."

echo "📦 Installing composer dependencies..."
composer install --no-dev --optimize-autoloader --prefer-dist

echo "🔑 Generating application key..."
php artisan key:generate || true

echo "🗄️  Running database migrations..."
php artisan migrate --force

echo "⚡ Optimizing application..."
php artisan config:cache || true
php artisan route:cache || true
php artisan view:cache || true

echo "✅ Build completed successfully!"
