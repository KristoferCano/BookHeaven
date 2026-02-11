import { useLibros } from '../hooks/useLibros';

// Componente para mostrar lista de libros
export function LibrosList() {
  const { libros, loading, error } = useLibros();

  if (loading) {
    return <div className="text-center p-4">Cargando libros...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-600">Error: {error}</div>;
  }

  if (!libros || libros.length === 0) {
    return <div className="text-center p-4">No hay libros disponibles</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {libros.map((libro) => (
        <div key={libro.id} className="border rounded-lg p-4 hover:shadow-lg transition">
          {libro.imagen && (
            <img
              src={`http://localhost:8000/storage/${libro.imagen}`}
              alt={libro.nombre}
              className="w-full h-40 object-cover rounded mb-2"
            />
          )}
          <h3 className="font-bold text-lg">{libro.nombre}</h3>
          <p className="text-gray-600 text-sm">{libro.autor}</p>
          <p className="text-gray-500 text-sm line-clamp-2 mt-2">{libro.descripcion}</p>
          {libro.pdf && (
            <a
              href={`http://localhost:8000/storage/${libro.pdf}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm mt-3 inline-block"
            >
              Descargar PDF
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
