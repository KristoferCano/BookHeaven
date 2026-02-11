import { useMangas } from '../hooks/useMangas';

// Componente para mostrar lista de mangas
export function MangasList() {
  const { mangas, loading, error } = useMangas();

  if (loading) {
    return <div className="text-center p-4">Cargando mangas...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-600">Error: {error}</div>;
  }

  if (!mangas || mangas.length === 0) {
    return <div className="text-center p-4">No hay mangas disponibles</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {mangas.map((manga) => (
        <div key={manga.id} className="border rounded-lg p-4 hover:shadow-lg transition">
          {manga.imagen && (
            <img
              src={`http://localhost:8000/storage/${manga.imagen}`}
              alt={manga.nombre}
              className="w-full h-40 object-cover rounded mb-2"
            />
          )}
          <h3 className="font-bold text-lg">{manga.nombre}</h3>
          <p className="text-gray-600 text-sm">{manga.autor}</p>
          <p className="text-gray-500 text-sm line-clamp-2 mt-2">{manga.descripcion}</p>
          <p className="text-xs text-gray-400 mt-3">
            Creado: {new Date(manga.created_at).toLocaleDateString('es-ES')}
          </p>
        </div>
      ))}
    </div>
  );
}
