# 🔧 SETUP - Instalación y Configuración

Guía completa para configurar BookHeaven en tu entorno.

## ⚡ Inicio Rápido (2 minutos)

### Con Docker
```bash
cp .env.example .env
docker-compose up -d
# Esperar 30-60 segundos
# http://localhost:5173 ✅
```

### Sin Docker
```bash
# Terminal 1
cd backend && php artisan serve

# Terminal 2
cd frontend && npm run dev
```

---

## 🐳 Setup con Docker (Recomendado)

### Requisitos
- Docker 20.10+
- Docker Compose 2.0+

### Pasos

1. **Copiar variables de entorno**
   ```bash
   cp .env.example .env
   ```

2. **Iniciar servicios**
   ```bash
   docker-compose up -d
   ```
   Esto inicia:
   - 🐘 PostgreSQL en puerto 5432
   - 🔴 Laravel API en puerto 8000
   - ⚛️ React en puerto 5173

3. **Esperar que PostgreSQL esté listo**
   ```bash
   docker-compose logs postgres
   # Buscar: "database system is ready to accept connections"
   ```

4. **Verificar que todo está corriendo**
   ```bash
   docker-compose ps
   # Todos deben estar "Up"
   ```

5. **Abrir en navegador**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000/api/libros

### Migraciones automáticas
Docker ejecuta automáticamente:
- ✅ Composer install
- ✅ php artisan key:generate
- ✅ php artisan migrate
- ✅ php artisan db:seed

---

## 💻 Setup Local (Sin Docker)

### Requisitos
- PHP 8.2+
- Node.js 20+
- PostgreSQL 14+
- Composer
- npm

### Backend Setup

1. **Instalar dependencias**
   ```bash
   cd backend
   composer install
   ```

2. **Copiar variables**
   ```bash
   cp .env.example .env
   ```
   Actualizar:
   ```env
   DB_CONNECTION=pgsql
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_DATABASE=bookheaven
   DB_USERNAME=bookheaven
   DB_PASSWORD=tu_contraseña
   ```

3. **Generar clave**
   ```bash
   php artisan key:generate
   ```

4. **Crear BD (PostgreSQL)**
   ```bash
   psql -U postgres
   CREATE DATABASE bookheaven;
   CREATE USER bookheaven WITH PASSWORD 'tu_contraseña';
   GRANT ALL PRIVILEGES ON DATABASE bookheaven TO bookheaven;
   \q
   ```

5. **Ejecutar migraciones**
   ```bash
   php artisan migrate:fresh --seed
   ```

6. **Iniciar servidor**
   ```bash
   php artisan serve
   # http://localhost:8000
   ```

### Frontend Setup

1. **Instalar dependencias**
   ```bash
   cd frontend
   npm install
   ```

2. **Crear .env**
   ```bash
   echo "VITE_API_URL=http://localhost:8000" > .env
   ```

3. **Iniciar desarrollo**
   ```bash
   npm run dev
   # http://localhost:5173
   ```

---

## 📝 Variables de Entorno (.env)

Archivo centralizado `.env.example` en la raíz con todas las variables:

```env
# ==================
# APLICACIÓN
# ==================
APP_NAME=BookHeaven
APP_ENV=local                    # local, production
APP_DEBUG=true                   # true, false
APP_KEY=                         # Generar con artisan key:generate
APP_URL=http://localhost

# ==================
# BASE DE DATOS
# ==================
DB_CONNECTION=pgsql             # pgsql (PostgreSQL)
DB_HOST=postgres                # postgres (Docker) o 127.0.0.1 (local)
DB_PORT=5432
DB_DATABASE=bookheaven
DB_USERNAME=bookheaven
DB_PASSWORD=secret

# ==================
# FRONTEND
# ==================
VITE_API_URL=http://localhost:8000
VITE_APP_TITLE=BookHeaven

# ==================
# MAIL (opcional)
# ==================
MAIL_MAILER=log                 # log, smtp
MAIL_HOST=localhost
MAIL_PORT=1025

# ==================
# CACHE & SESSION
# ==================
SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database

# ==================
# LOGS
# ==================
LOG_CHANNEL=stack
LOG_LEVEL=debug
```

> **Nota**: Los mismos valores funcionan para Frontend y Backend

---

## 🔄 Comandos Docker Útiles

### Servicios
```bash
docker-compose up -d              # Iniciar
docker-compose down               # Detener
docker-compose restart            # Reiniciar
docker-compose ps                 # Ver estado
docker-compose logs -f            # Ver logs en tiempo real
docker-compose logs -f app        # Logs solo backend
docker-compose logs -f postgres   # Logs solo BD
```

### Backend
```bash
docker-compose exec app php artisan migrate          # Migraciones
docker-compose exec app php artisan db:seed         # Seeders
docker-compose exec app php artisan tinker          # Shell PHP
docker-compose exec app php artisan test            # Tests
docker-compose exec app php artisan cache:clear    # Limpiar cache
```

### Base de Datos
```bash
# Acceder a PostgreSQL
docker-compose exec postgres psql -U bookheaven -d bookheaven

# Dentro de psql:
\dt                          # Listar tablas
SELECT * FROM libros;        # Ver datos
\q                           # Salir
```

### Frontend
```bash
docker-compose exec frontend npm run build          # Build
docker-compose exec frontend npm run lint           # Linting
```

---

## 🐘 Configurar PostgreSQL Local

### Windows
1. Descargar: https://www.postgresql.org/download/windows/
2. Instalar (anotar contraseña)
3. Usar pgAdmin para gestionar

### macOS
```bash
brew install postgresql
brew services start postgresql
createuser bookheaven
createdb -O bookheaven bookheaven
```

### Linux (Ubuntu)
```bash
sudo apt-get install postgresql postgresql-contrib
sudo -u postgres createuser bookheaven
sudo -u postgres createdb -O bookheaven bookheaven
```

---

## ✅ Verificar Instalación

### Checklist Docker
- [ ] `docker-compose ps` muestra 3 servicios "Up"
- [ ] http://localhost:5173 carga
- [ ] http://localhost:8000/api/libros retorna JSON
- [ ] `docker-compose exec postgres psql -U bookheaven -d bookheaven -c "SELECT 1"` funciona

### Checklist Local
- [ ] `php artisan serve` inicia sin errores
- [ ] `npm run dev` inicia sin errores
- [ ] http://localhost:8000/api/libros retorna datos
- [ ] http://localhost:5173 carga interfaz

---

## 🐛 Solución de Problemas

### "Connection refused" en PostgreSQL
```bash
# Docker: Esperar más tiempo
sleep 30
docker-compose exec app php artisan migrate

# Local: Verificar que PostgreSQL corre
psql -U postgres
\q
```

### "Port already in use"
```bash
# Cambiar puertos en docker-compose.yml
# O matar proceso:
lsof -i :5432
kill -9 <PID>
```

### Docker containers no inician
```bash
docker-compose down -v
docker-compose up --build -d
docker-compose logs app
```

### node_modules/vendor corrupto
```bash
# Limpiar y reconstruir
docker-compose down -v
docker-compose up --build -d
```

### Permisos denegados (Linux)
```bash
sudo usermod -aG docker $USER
newgrp docker
docker-compose up -d
```

---

## 🔐 Setup de Seguridad

Para producción, cambiar en `.env`:

```env
APP_ENV=production
APP_DEBUG=false
DB_PASSWORD=ContrasenaFuerte!23
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
# ... más configuración
```

---

## 📚 Próximos Pasos

1. **Leer [API.md](./API.md)** - Para entender endpoints
2. **Crear datos** - Usar artisan tinker o UI
3. **Desarrollar** - Agregar nuevas funcionalidades
4. **Deploy** - Ver documentación deployment

---

**¿Necesitas ayuda?** Revisa [README.md](./README.md#-soporte)
