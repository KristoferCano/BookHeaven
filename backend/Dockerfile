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
RUN docker-php-ext-install -j$(nproc) \
    pdo \
    pdo_pgsql \
    pdo_mysql \
    zip \
    bcmath

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

# Stage 2: Runtime stage
FROM php:8.2-fpm

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    libpq5 \
    libzip5 \
    nginx \
    supervisor \
    curl \
    postgresql-client \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

# Copy PHP extensions from builder
COPY --from=builder /usr/local/etc/php/conf.d /usr/local/etc/php/conf.d
COPY --from=builder /usr/local/lib/php/extensions /usr/local/lib/php/extensions

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

# Create entrypoint script
RUN echo '#!/bin/bash\n\
set -e\n\
\n\
# Esperar a que la BD esté lista (solo en Render)\n\
if [ ! -z "$DB_HOST" ] && [ "$DB_HOST" != "127.0.0.1" ]; then\n\
    echo "Waiting for database at $DB_HOST:$DB_PORT..."\n\
    for i in {1..30}; do\n\
        if nc -z "$DB_HOST" "$DB_PORT" 2>/dev/null; then\n\
            echo "Database is ready!"\n\
            break\n\
        fi\n\
        echo "Attempt $i/30: Database not ready, waiting..."\n\
        sleep 2\n\
    done\n\
fi\n\
\n\
# Clear caché y generar key\n\
php artisan config:clear || true\n\
php artisan cache:clear || true\n\
php artisan key:generate --force || true\n\
\n\
# Ejecutar migraciones\n\
echo "Running migrations..."\n\
php artisan migrate --force || true\n\
\n\
# Ejecutar seeders solo si es Primera ejecución (checar si hay usuarios)\n\
if ! php artisan tinker --execute "echo \\\App\Models\User::count();" 2>/dev/null | grep -q "[1-9]"; then\n\
    echo "Database empty, running seeders..."\n\
    php artisan db:seed --force || true\n\
fi\n\
\n\
# Iniciar PHP-FPM y Nginx\n\
echo "Starting PHP-FPM and Nginx..."\n\
php-fpm -D\n\
exec nginx -g "daemon off;"\n\
' > /entrypoint.sh && chmod +x /entrypoint.sh

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/health || exit 1

# Run entrypoint script
ENTRYPOINT ["/entrypoint.sh"]
