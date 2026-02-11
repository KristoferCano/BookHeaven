# 📡 API - Documentación de Endpoints y Desarrollo

Guía completa de endpoints, autenticación y desarrollo de la API.

## 🔐 Autenticación (Sanctum)

### Registrarse
```bash
POST /api/register
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "password123"
}

Response: 200
{
  "user": { id, name, email },
  "token": "abc123..."
}
```

### Login
```bash
POST /api/login
{
  "email": "juan@example.com",
  "password": "password123"
}

Response:
{
  "token": "abc123..."
}
```

### Logout (requiere token)
```bash
POST /api/logout
Authorization: Bearer <token>

Response: 200 { "message": "Logout successful" }
```

### Obtener usuario actual
```bash
GET /api/user
Authorization: Bearer <token>

Response: 200 { id, name, email }
```

---

## 📚 Libros API

### Listar todos los libros
```bash
GET /api/libros

Query parameters:
  - page=1              # Paginación
  - per_page=15         # Items por página
  - search=nombre       # Buscar por nombre
  - autor=valor         # Filtrar por autor

Response: 200
{
  "data": [
    {
      "id": 1,
      "nombre": "Clean Code",
      "descripcion": "Código limpio...",
      "autor": "Robert C. Martin",
      "imagen": "url/imagen.jpg",
      "pdf": "url/libro.pdf",
      "created_at": "2026-02-11"
    }
  ],
  "total": 10,
  "per_page": 15,
  "current_page": 1
}
```

### Obtener un libro específico
```bash
GET /api/libros/{id}

Response: 200
{
  "id": 1,
  "nombre": "Clean Code",
  "descripcion": "...",
  "autor": "Robert C. Martin",
  "imagen": "url",
  "pdf": "url"
}
```

### Crear libro (admin)
```bash
POST /api/libros
Authorization: Bearer <token>
Content-Type: application/json

{
  "nombre": "Clean Code",
  "descripcion": "Escritura de código limpio y mantenible",
  "autor": "Robert C. Martin",
  "imagen": "url/imagen.jpg",
  "pdf": "url/libro.pdf"
}

Response: 201
{ "id": 1, ... }
```

### Actualizar libro (admin)
```bash
PUT /api/libros/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "nombre": "Clean Code (Editado)",
  "descripcion": "...",
  "autor": "...",
  "imagen": "...",
  "pdf": "..."
}

Response: 200
{ "id": 1, ... }
```

### Eliminar libro (admin)
```bash
DELETE /api/libros/{id}
Authorization: Bearer <token>

Response: 204 (Sin contenido)
```

---

## 🎨 Mangas API

### Listar todos los mangas
```bash
GET /api/mangas

Query parameters:
  - page=1
  - per_page=15
  - search=nombre
  - autor=valor

Response: 200
{
  "data": [
    {
      "id": 1,
      "nombre": "One Piece",
      "descripcion": "Aventura de piratas...",
      "autor": "Eiichiro Oda",
      "imagen": "url/manga.jpg",
      "created_at": "2026-02-11"
    }
  ]
}
```

### Obtener un manga
```bash
GET /api/mangas/{id}

Response: 200
{ "id": 1, "nombre": "...", ... }
```

### Crear manga (admin)
```bash
POST /api/mangas
Authorization: Bearer <token>
Content-Type: application/json

{
  "nombre": "One Piece",
  "descripcion": "Aventura de piratas",
  "autor": "Eiichiro Oda",
  "imagen": "url/manga.jpg"
}

Response: 201
```

### Actualizar manga (admin)
```bash
PUT /api/mangas/{id}
Authorization: Bearer <token>

Response: 200
```

### Eliminar manga (admin)
```bash
DELETE /api/mangas/{id}
Authorization: Bearer <token>

Response: 204
```

---

## 💬 Cómics API

### Listar todos los cómics
```bash
GET /api/comics

Query parameters: page, per_page, search, autor

Response: 200
{
  "data": [
    {
      "id": 1,
      "nombre": "Batman",
      "descripcion": "El caballero oscuro",
      "autor": "Bob Kane",
      "imagen": "url",
      "created_at": "..."
    }
  ]
}
```

### Obtener cómic específico
```bash
GET /api/comics/{id}

Response: 200
```

### Crear cómic (admin)
```bash
POST /api/comics
Authorization: Bearer <token>

{
  "nombre": "Batman",
  "descripcion": "...",
  "autor": "Bob Kane",
  "imagen": "url"
}

Response: 201
```

### Actualizar cómic (admin)
```bash
PUT /api/comics/{id}
Authorization: Bearer <token>

Response: 200
```

### Eliminar cómic (admin)
```bash
DELETE /api/comics/{id}
Authorization: Bearer <token>

Response: 204
```

---

## 🧪 Testing de API

### Con cURL
```bash
# Listar libros
curl http://localhost:8000/api/libros

# Con búsqueda
curl "http://localhost:8000/api/libros?search=Clean"

# Con token
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:8000/api/libros
```

### Con Postman/Insomnia
1. Crear colección "BookHeaven"
2. Usar base URL: `http://localhost:8000`
3. Agregar endpoints en formato marcado arriba

---

## 🔨 Desarrollo Frontend - Consumir APIs

### Setup básico (ya hecho)

Archivo: `frontend/src/api/client.js`
```javascript
import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar token
client.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;
```

### Hook para obtener libros

Archivo: `frontend/src/hooks/useLibros.js`
```javascript
import { useState, useEffect } from 'react';
import client from '../api/client';

export function useLibros() {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLibros();
  }, []);

  const fetchLibros = async () => {
    try {
      const { data } = await client.get('/api/libros');
      setLibros(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { libros, loading, error, fetchLibros };
}
```

### Usar en componente React

```javascript
import { useLibros } from '../hooks/useLibros';

function LibrosList() {
  const { libros, loading, error } = useLibros();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {libros.map(libro => (
        <div key={libro.id}>
          <h3>{libro.nombre}</h3>
          <p>{libro.descripcion}</p>
          <img src={libro.imagen} alt={libro.nombre} />
        </div>
      ))}
    </div>
  );
}
```

---

## 🔨 Desarrollo Backend - Agregar Endpoints

### Crear nuevo modelo
```bash
docker-compose exec app php artisan make:model NombreModelo -m
```

### Crear controlador API
```bash
docker-compose exec app php artisan make:controller API/NombreController --model=NombreModelo --requests
```

### Registrar ruta en `routes/api.php`
```php
Route::apiResource('nombres', NombreController::class);
```

### Estructura de controlador
```php
<?php
namespace App\Http\Controllers\API;

use App\Models\Nombre;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreNombreRequest;
use App\Http\Requests\UpdateNombreRequest;

class NombreController extends Controller
{
    public function index() { }
    public function store(StoreNombreRequest $request) { }
    public function show(Nombre $nombre) { }
    public function update(UpdateNombreRequest $request, Nombre $nombre) { }
    public function destroy(Nombre $nombre) { }
}
```

---

## 🔍 Debugging

### Ver todas las rutas
```bash
docker-compose exec app php artisan route:list
```

### Ver migraciones
```bash
docker-compose exec app php artisan migrate:status
```

### Usar Tinker para testing
```bash
docker-compose exec app php artisan tinker

> Libro::all()
> Libro::find(1)
> Libro::create(['nombre' => '...'])
```

### Ver logs
```bash
docker-compose logs -f app | grep -i error
```

---

## 📊 Response Estándar

Todos los endpoints siguen este formato:

### Éxito (200, 201)
```json
{
  "data": { /* contenido */ },
  "message": "Operación exitosa"
}
```

### Error (400, 404, 500)
```json
{
  "message": "Error message",
  "errors": {
    "field": ["Error message"]
  }
}
```

---

## 🔐 Autorización

### Niveles de acceso
- ✅ **Público**: Lista y lectura
- 🔐 **Autenticado**: Crear, editar, eliminar propios
- 👨‍💼 **Admin**: Todo (actualmente sin distinción)

### Middleware
```php
// En routes/api.php
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/libros', [LibroController::class, 'store']);
    Route::put('/libros/{libro}', [LibroController::class, 'update']);
    Route::delete('/libros/{libro}', [LibroController::class, 'destroy']);
});
```

---

## 📲 Ejemplos de Uso

### Frontend - Editar libro
```javascript
const updateLibro = async (id, data) => {
  const response = await client.put(`/api/libros/${id}`, data);
  return response.data;
};
```

### Frontend - Crear manga
```javascript
const createManga = async (data) => {
  const response = await client.post('/api/mangas', data);
  return response.data;
};
```

### Backend - Validar entrada
```php
$validated = $request->validate([
    'nombre' => 'required|string|max:255',
    'descripcion' => 'string|nullable',
    'autor' => 'required|string',
    'imagen' => 'url|nullable'
]);
```

---

## 🚀 Próximos Pasos

1. **Testear APIs** - Usar Postman/curl
2. **Crear formularios** - En React para agregar datos
3. **Agregar validaciones** - Más completas
4. **Agregar paginación** - En listados largos
5. **Agregar filtros** - Por categoría, año, etc.

---

**Documentación**: [README.md](./README.md) | Configuración: [SETUP.md](./SETUP.md)
