# Desplegar BookHeaven en Render

## Estructura de Despliegue

El proyecto está configurado para desplegar en Render con:
- **Backend:** API Laravel en un Web Service
- **Base de Datos:** PostgreSQL en una instancia de Render

## Pasos para Desplegar en Render

### 1. Preparar el Backend

El Dockerfile del backend ya está configurado. Asegúrate de que:
- ✓ El archivo `backend/Dockerfile` existe
- ✓ El archivo `docker-compose.yml` existe para testing local
- ✓ El archivo `.env.example` tiene la configuración correcta

### 2. Crear servicio de Base de Datos en Render

1. Ve a [render.com](https://render.com)
2. Dashboard → New +
3. Selecciona **PostgreSQL**
4. Configura:
   - **Name:** `bookheaven-db`
   - **Database:** `bookheaven`
   - **User:** `bookheaven`
   - Render generará automáticamente la contraseña
5. Copia el **Internal Database URL** (será necesario)

### 3. Crear Web Service para el Backend

1. En Render Dashboard → New +
2. Selecciona **Web Service**
3. Conecta tu repositorio GitHub: `KristoferCano/BookHeaven`
4. Configura:
   - **Name:** `bookheaven-api`
   - **Root Directory:** `backend`
   - **Runtime:** `Docker`
   - **Build Command:** (Render lo detectará automáticamente)
   - **Start Command:** (Render lo detectará automáticamente)

### 4. Configurar Variables de Entorno en Render

En el Web Service, ve a **Environment** y agrega:

```
APP_NAME=BookHeaven
APP_ENV=production
APP_DEBUG=false
APP_URL=https://bookheaven-api.onrender.com

DB_CONNECTION=pgsql
DB_HOST=<DATABASE_HOST_DESDE_POSTGRESQL_SERVICE>
DB_PORT=5432
DB_DATABASE=bookheaven
DB_USERNAME=bookheaven
DB_PASSWORD=<DATABASE_PASSWORD_DESDE_POSTGRESQL_SERVICE>

SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database

MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=465
MAIL_USERNAME=<TU_MAILTRAP_USERNAME>
MAIL_PASSWORD=<TU_MAILTRAP_PASSWORD>
MAIL_FROM_ADDRESS=noreply@bookheaven.com

SANCTUM_STATEFUL_DOMAINS=bookheaven.com,www.bookheaven.com
```

**Variables Críticas:**
- `APP_KEY`: Genera una con `php artisan key:generate --show` localmente
- `DB_HOST`, `DB_PASSWORD`: Copia desde el servicio PostgreSQL

### 5. Desplegar

1. Haz clic en **Deploy** en Render
2. Espera a que se complete el build (5-10 minutos)
3. Una vez completado, Render ejecutará automáticamente:
   - `php artisan migrate --force` (si lo configuras)
   - El servidor estará disponible en `https://bookheaven-api.onrender.com`

## Desarrollo Local con Docker

Para probar el proyecto localmente con Docker:

```bash
# Crear archivo .env local
cp backend/.env.example backend/.env

# Construir y ejecutar
docker-compose up -d

# Ejecutar migraciones
docker-compose exec backend php artisan migrate

# Ver logs
docker-compose logs -f backend
```

## Configuración Post-Despliegue

### Ejecutar Migraciones en Render

Opción 1: Usar Render Shell
```bash
# En Render Dashboard → Web Service → Shell
php artisan migrate --force
php artisan db:seed  # Si tienes seeders
```

Opción 2: Crear un script de deploy
Crea un archivo `render-build.sh` en la raíz del backend:

```bash
#!/bin/bash
set -e

echo "Installing dependencies..."
composer install --no-dev --prefer-dist

echo "Generating app key..."
php artisan key:generate || true

echo "Running migrations..."
php artisan migrate --force

echo "Caching configuration..."
php artisan config:cache || true

echo "Build complete!"
```

Y en Render Web Service, establece:
- **Build Command:** `bash render-build.sh`

## Conectar Frontend con Backend

En el archivo `frontend/.env`:

```
VITE_API_URL=https://bookheaven-api.onrender.com/api
BACKEND_URL=https://bookheaven-api.onrender.com
```

## Monitoreo

En Render Dashboard puedes:
- Ver los logs en tiempo real
- Verificar el estado del servicio
- Revisar métricas de CPU/Memoria
- Configurar alertas

## Troubleshooting

### El servicio no inicia
- Revisa los logs en Render → Web Service → Logs
- Verifica que todas las variables de entorno estén configuradas
- Asegúrate que el `Dockerfile` es correcto

### Migraciones fallan
- Conecta con Shell en Render
- Ejecuta `php artisan migrate:rollback` si es necesario
- Revisa los logs de migración

### Base de datos no se conecta
- Verifica que `DB_HOST`, `DB_PORT`, `DB_USERNAME` y `DB_PASSWORD` sean correctos
- Desde el Web Service, prueba la conexión:
  ```bash
  php artisan tinker
  >>> DB::connection()->getPdo();
  ```

## Estructura de Archivos Docker

```
backend/
├── Dockerfile              # Imagen Docker del backend
├── .dockerignore          # Archivos ignorados en build
├── nginx-main.conf        # Configuración principal de Nginx
├── default_server.conf    # Configuración del servidor virtual
├── nginx-optimization.conf # Optimizaciones (ya existía)
├── supervisord.conf       # Gestor de procesos
├── .env.example           # Variables de entorno (actualizado)
└── ...

docker-compose.yml         # Orquestación para desarrollo local
```

## URLs Importantes

- **Backend (después de desplegar):** `https://bookheaven-api.onrender.com`
- **Health Check:** `https://bookheaven-api.onrender.com/health`
- **API Base:** `https://bookheaven-api.onrender.com/api`

## Notas Importantes

1. **Render tiene instancias gratuitas que se pausan después de 15 minutos sin uso.** Para producción, usa instancias de pago.

2. **PostgreSQL es la base de datos recomendada en Render** (no soportan bien SQLite)

3. **Aumenta el timeout de build en Render si necesario** (Settings → Build & Deploy)

4. **Personaliza `APP_URL` según tu dominio personalizado**

## ¿Necesitas un dominio personalizado?

En Render Web Service → Settings → Custom Domains, agrega tu dominio y sigue los pasos para actualizar los registros DNS.
