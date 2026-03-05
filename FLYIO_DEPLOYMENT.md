# Fly.io Backend Deployment Guide

## Prerequisites
1. Install Flyctl: https://fly.io/docs/hands-on/install-flyctl/
2. Create Fly.io account: https://fly.io
3. Login: `flyctl auth login`

## Environment Variables Setup

Before deploying, set these secret variables in Fly.io:

```bash
flyctl secrets set \
  APP_KEY="base64:Y4QTm+kVlrjtCQf62cggIXtq2dUgRr8JpR8Jr2EQXss=" \
  DB_HOST="<your-postgres-host>" \
  DB_DATABASE="bookheaven" \
  DB_USERNAME="bookheaven_user" \
  DB_PASSWORD="<your-postgres-password>" \
  MAIL_USERNAME="zcripta@gmail.com" \
  MAIL_PASSWORD="sgcm dkkj zxsz vqbu" \
  FRONTEND_URL="https://book-heaven-henna.vercel.app" \
  SANCTUM_STATEFUL_DOMAINS="book-heaven-henna.vercel.app"
```

## If Using Fly Managed Postgres

```bash
# Create PostgreSQL database
flyctl postgres create

# This will output connection details
# Use those values for DB_HOST, DB_USERNAME, DB_PASSWORD
```

## If Using Existing Render Database

Update these in Fly.io secrets:
```
DB_HOST=dpg-d6kuquh5pdvs73bohev0-a.oregon-postgres.render.com
DB_DATABASE=bookheaven
DB_USERNAME=bookheaven_user
DB_PASSWORD=LmZUKj41gJ3aSag2DXdXP7neksvTG0Lo
```

## Deploy

```bash
# First time deployment
flyctl launch

# Or if already configured
flyctl deploy

# Check logs
flyctl logs

# Check status
flyctl status
```

## Troubleshooting

If migrations fail:
```bash
flyctl ssh console
php artisan migrate --force
php artisan db:seed --force
exit
```

## Connect Frontend to Backend

Update your frontend environment variable:
```
VITE_API_URL=https://bookheaven.fly.dev
```

(Change `bookheaven` to your actual Fly.io app name)
