# 📚 BookHeaven - Plataforma de Biblioteca Digital

[![Laravel](https://img.shields.io/badge/Laravel-12.0-FF2D20?style=flat-square&logo=laravel)](https://laravel.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![PHP](https://img.shields.io/badge/PHP-8.2-777BB4?style=flat-square&logo=php)](https://www.php.net)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org)
[![Docker](https://img.shields.io/badge/Docker-Latest-2496ED?style=flat-square&logo=docker)](https://www.docker.com)

Una plataforma web moderna para gestionar y compartir una biblioteca digital de libros, cómics y mangas. **Backend robusto con Laravel 12 + API RESTful + Frontend moderno con React 19.**

> 🚀 **Empezar en 5 minutos**: Ver [SETUP.md](./SETUP.md)

## 🌟 Características

- ✅ **Backend robusto** con Laravel 12 + API RESTful
- ✅ **Frontend moderno** con React 19 + Vite
- ✅ **Base de datos PostgreSQL** con Docker
- ✅ **Gestión de usuarios** con autenticación Sanctum
- ✅ **Catálogo dinámico** de libros, cómics y mangas
- ✅ **Almacenamiento de archivos** (PDF, portadas)
- ✅ **Desarrollo containerizado** con Docker Compose

## 🎯 características

- ✅ **Backend API RESTful** con Laravel 12 + autenticación Sanctum
- ✅ **Frontend SPA** con React 19 + Vite
- ✅ **Base de datos PostgreSQL 16** en Docker
- ✅ **Gestión de contenido**: Libros, Cómics, Mangas
- ✅ **Categorización inteligente** y búsqueda
- ✅ **Sistema de usuarios** y autenticación
- ✅ **Almacenamiento de archivos** (PDF, portadas, etc)
- ✅ **Arquitectura dockerizada** - lista para producción

## ⚡ Inicio Rápido (2 opciones)

### Opción 1: Docker (Recomendado)
```bash
# 1. Copiar variables de entorno
cp .env.example .env

# 2. Iniciar servicios
docker-compose up -d

# 3. Esperar 30-60 segundos
# 4. Abrir navegador
# Frontend: http://localhost:5173
# Backend: http://localhost:8000
```

### Opción 2: Local (Sin Docker)
Ver [SETUP.md](./SETUP.md#-instalación-local)

## 📋 Requisitos Previos

### Docker (Recomendado)
- [Docker](https://www.docker.com/products/docker-desktop) 20.10+
- [Docker Compose](https://docs.docker.com/compose) 2.0+

### Local
- [PHP](https://www.php.net) 8.2+
- [Node.js](https://nodejs.org) 20+
- [PostgreSQL](https://www.postgresql.org) 14+
- [Composer](https://getcomposer.org)

## � Configuración y Setup

> **Documentación detallada**: Ver [SETUP.md](./SETUP.md)

### Setup Rápido (Docker)
```bash
cp .env.example .env
docker-compose up -d
# Esperar 30-60 segundos
# http://localhost:5173 ✅
```

### Setup Local (Sin Docker)
```bash
# Terminal 1 - Backend
cd backend && php artisan serve

# Terminal 2 - Frontend
cd frontend && npm run dev
```

**Más detalles en [SETUP.md](./SETUP.md)**

## 📁 estructura del Proyecto

```
Heaven/
├── backend/                    # API Laravel
│   ├── app/Models/            # User, Libro, Comic, Manga
│   ├── app/Http/Controllers/  # Controladores API
│   ├── database/migrations/   # Migraciones BD
│   ├── database/seeders/      # Datos de prueba
│   ├── routes/api.php         # Rutas API
│   └── Dockerfile             # Imagen Docker
│
├── frontend/                  # Aplicación React
│   ├── src/components/        # Componentes reutilizables
│   ├── src/pages/             # Páginas
│   ├── src/api/               # Servicios HTTP
│   └── Dockerfile             # Imagen Docker
│
├── docker-compose.yml         # Orquestación servicios
├── .env.example               # Variables de entorno
└── README.md, SETUP.md, API.md # Documentación
```

## 🔌 API Endpoints

Ver documentación completa en [API.md](./API.md)

### Libros
```
GET    /api/libros           # Listar todos
GET    /api/libros/{id}      # Obtener uno
POST   /api/libros           # Crear (admin)
PUT    /api/libros/{id}      # Actualizar (admin)
DELETE /api/libros/{id}      # Eliminar (admin)
```

### Mangas
```
GET    /api/mangas           # Listar todos
GET    /api/mangas/{id}      # Obtener uno
POST   /api/mangas           # Crear (admin)
PUT    /api/mangas/{id}      # Actualizar (admin)
DELETE /api/mangas/{id}      # Eliminar (admin)
```

### Cómics
```
GET    /api/comics           # Listar todos
GET    /api/comics/{id}      # Obtener uno
POST   /api/comics           # Crear (admin)
PUT    /api/comics/{id}      # Actualizar (admin)
DELETE /api/comics/{id}      # Eliminar (admin)
```

**Ver todos los endpoints en [API.md](./API.md)**

## 🗄️ Base de Datos

### Modelos principales

**Users**
```sql
id, name, email, password, email_verified_at, timestamps
```

**Libros**
```sql
id, nombre, descripcion, autor, imagen, pdf, timestamps
```

**Mangas**
```sql
id, nombre, descripcion, autor, imagen, timestamps
```

**Comics**
```sql
id, nombre, descripcion, autor, imagen, timestamps
```

## 🔧 Comandos Útiles

### Docker
```bash
docker-compose up -d           # Iniciar
docker-compose logs -f app     # Ver logs
docker-compose down            # Detener
docker-compose ps              # Estado servicios
```

### Laravel
```bash
docker-compose exec app php artisan migrate          # Migraciones
docker-compose exec app php artisan db:seed         # Seeders
docker-compose exec app php artisan tinker          # Shell
docker-compose exec app php artisan test            # Tests
```

### React
```bash
npm run dev                     # Desarrollo
npm run build                   # Build producción
npm run lint                    # Linting
```

## 📚 Documentación

- **[README.md](./README.md)** - Este archivo (Descripción general)
- **[SETUP.md](./SETUP.md)** - Instalación y configuración detallada
- **[API.md](./API.md)** - Documentación de endpoints y desarrollo

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Backend | Laravel | 12.0 |
| Frontend | React + Vite | 19 + 7 |
| BD | PostgreSQL | 16 |
| PHP | PHP-FPM | 8.2 |
| Node | Node.js | 20 |
| Contenedores | Docker | Latest |

## 📞 Soporte

Si encuentras problemas:

1. Verifica [SETUP.md](./SETUP.md#-solución-de-problemas) - Troubleshooting
2. Revisa logs: `docker-compose logs -f`
3. Consulta [API.md](./API.md) para endpoints

## 📄 Licencia

Este proyecto está bajo licencia MIT.

---

**Última actualización**: Febrero 2026  
**Status**: ✅ Listo para producción
