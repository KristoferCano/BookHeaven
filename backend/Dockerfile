# Stage 1: Build stage
FROM php:8.2-fpm as builder

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    libzip-dev \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install \
    pdo \
    pdo_pgsql \
    zip \
    bcmath \
    ctype \
    fileinfo \
    json \
    mbstring \
    tokenizer

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy composer files
COPY composer.json composer.lock* ./

# Install dependencies
RUN composer install --no-dev --no-interaction --no-progress --prefer-dist

# Copy application code
COPY . .

# Generate key
RUN php artisan key:generate || true

# Do not cache
RUN php artisan config:cache || true

# Stage 2: Runtime stage
FROM php:8.2-fpm

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    libpq5 \
    nginx \
    supervisor \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install \
    pdo \
    pdo_pgsql \
    zip \
    bcmath \
    ctype \
    fileinfo \
    json \
    mbstring \
    tokenizer

# Create app directory
WORKDIR /var/www/html

# Copy from builder
COPY --from=builder /var/www/html /var/www/html

# Copy nginx configuration
COPY nginx-main.conf /etc/nginx/nginx.conf
COPY default_server.conf /etc/nginx/conf.d/default.conf
COPY nginx-optimization.conf /etc/nginx/conf.d/optimization.conf

# Create necessary directories
RUN mkdir -p storage/logs storage/framework/cache storage/framework/sessions && \
    chmod -R 775 storage bootstrap/cache && \
    chown -R www-data:www-data /var/www/html

# Copy supervisor configuration
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Create logs directory for supervisor
RUN mkdir -p /var/log/supervisor

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/health || exit 1

# Start services
CMD ["/bin/bash", "-c", "php-fpm -D && nginx -g 'daemon off;'"]
