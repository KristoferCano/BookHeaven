# Build stage - Node.js only (React + Vite)
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY ./frontend/package.json ./frontend/package-lock.json ./

# Install dependencies
RUN npm ci && npm cache clean --force

# Copy source code
COPY ./frontend/ ./

# Build the frontend
RUN npm run build

# Production stage - Nginx
FROM nginx:1.27-alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY ./frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built app from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Set proper permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]