# Docker Hub y Publicación de Imágenes

## Imágenes Docker Creadas

El proyecto contiene dos imágenes Docker:

1. **bookheaven-backend:latest** (2.06GB)
   - API Laravel con PHP 8.2
   - Nginx integrado
   - PostgreSQL ready
   - Health checks incluidos

2. **bookheaven-frontend:latest** (443MB)
   - React + Vite
   - Servido con `serve`
   - Optimizado para producción

## Publicar a Docker Hub

### Paso 1: Crear cuenta en Docker Hub (si no la tienes)

Ve a [hub.docker.com](https://hub.docker.com) y crea una cuenta.

### Paso 2: Login en Docker localmente

```bash
docker login
# Ingresa tu usuario y contraseña de Docker Hub
```

### Paso 3: Tagear las imágenes con tu usuario

Reemplaza `kristofercano` con tu usuario de Docker Hub:

```bash
# Backend
docker tag bookheaven-backend:latest kristofercano/bookheaven-api:latest
docker tag bookheaven-backend:latest kristofercano/bookheaven-api:v1.0

# Frontend
docker tag bookheaven-frontend:latest kristofercano/bookheaven-web:latest
docker tag bookheaven-frontend:latest kristofercano/bookheaven-web:v1.0
```

### Paso 4: Hacer Push a Docker Hub

```bash
# Backend
docker push kristofercano/bookheaven-api:latest
docker push kristofercano/bookheaven-api:v1.0

# Frontend
docker push kristofercano/bookheaven-web:latest
docker push kristofercano/bookheaven-web:v1.0
```

### Paso 5: Verificar en Docker Hub

Accede a tu perfil en [hub.docker.com/repositories](https://hub.docker.com/repositories) y verifica que tus imágenes estén allí.

## Usar las imágenes desde Docker Hub

Una vez publicadas, otros pueden descargar y ejecutar tu proyecto:

```bash
# Descargar imágenes
docker pull kristofercano/bookheaven-api:latest
docker pull kristofercano/bookheaven-web:latest

# Ejecutar localmente
docker run -p 8000:80 kristofercano/bookheaven-api:latest
docker run -p 3000:3000 kristofercano/bookheaven-web:latest
```

## Dockerfile Specifics

### Backend (backend/Dockerfile)
- Multi-stage build para optimizar tamaño
- PHP 8.2-FPM
- Nginx como reverse proxy
- Supervisor para gestionar procesos
- Health checks cada 30 segundos
- Soporte para PostgreSQL

### Frontend (frontend/Dockerfile)
- Node 20 Alpine
- Build stage separado con npm
- Servido con `serve` en producción
- Health checks cada 30 segundos
- Imagen lightweight (~443MB)

## Docker Compose para Desarrollo

Ejecutar todo localmente:

```bash
docker-compose up -d
```

Esto inicia:
- PostgreSQL (puerto 5432)
- Backend (puerto 8000)
- Frontend (puerto 3000)

Ver logs:
```bash
docker-compose logs -f
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
```

Detener:
```bash
docker-compose down
```

Limpiar volúmenes:
```bash
docker-compose down -v
```

## Best Practices

1. **Siempre usa etiquetas versionadas:**
   ```bash
   docker tag bookheaven-backend:latest usuario/bookheaven-api:v1.0.0
   ```

2. **Mantén tus imágenes privadas o públicas según necesites:**
   - En Docker Hub → Repositories → Settings → Visibility

3. **Usa variables de entorno en producción:**
   ```bash
   docker run \
     -e APP_ENV=production \
     -e APP_DEBUG=false \
     -e DB_HOST=your-db-host \
     usuario/bookheaven-api:latest
   ```

4. **Monitorea el tamaño de las imágenes:**
   ```bash
   docker images --no-trunc | grep bookheaven
   ```

5. **Limpiar imágenes antiguas:**
   ```bash
   docker image prune -a
   ```

## Automatización Futura

Considera configurar GitHub Actions para:
- Construir imágenes automáticamente en cada push
- Hacer push a Docker Hub automáticamente
- Ejecutar tests antes de construir

Ejemplo de workflow (`.github/workflows/docker.yml`):
```yaml
name: Docker Build and Push

on:
  push:
    branches: [main]

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: docker/setup-buildx-action@v1
      - uses: docker/login-action@v1
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
      - uses: docker/build-push-action@v2
        with:
          context: ./backend
          push: true
          tags: ${{ secrets.DOCKER_USERNAME }}/bookheaven-api:latest
```

## Troubleshooting

### Error: "no such file or directory"
Verifica que estés en el directorio correcto:
```bash
cd BookHeaven
docker-compose up
```

### Imágenes muy grandes
Las imágenes pueden ocupar mucho espacio. Usa .dockerignore para excluir archivos innecesarios.

### PostgreSQL no se conecta
Espera a que PostgreSQL esté completamente iniciado:
```bash
docker-compose up db -d
sleep 10
docker-compose up backend
```

### Frontend no puede conectar con el backend
Asegúrate que VITE_API_URL esté correctamente configurado:
```bash
docker-compose logs frontend
```
