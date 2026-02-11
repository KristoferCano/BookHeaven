import { useState, useEffect } from 'react';
import { librosAPI } from '../api/endpoints';

// Hook personalizado para obtener los libros
export function useLibros() {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLibros();
  }, []);

  const fetchLibros = async () => {
    try {
      setLoading(true);
      const data = await librosAPI.getAll();
      // Si data es un array, usarlo directamente; si es objeto con 'data', usar eso
      setLibros(Array.isArray(data) ? data : data.data || []);
      setError(null);
    } catch (err) {
      setError(err.message || 'Error al obtener libros');
      setLibros([]);
    } finally {
      setLoading(false);
    }
  };

  return { libros, loading, error, refetch: fetchLibros };
}

// Hook para obtener un libro específico
export function useLibro(id) {
  const [libro, setLibro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchLibro();
    }
  }, [id]);

  const fetchLibro = async () => {
    try {
      setLoading(true);
      const data = await librosAPI.getById(id);
      setLibro(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Error al obtener el libro');
      setLibro(null);
    } finally {
      setLoading(false);
    }
  };

  return { libro, loading, error, refetch: fetchLibro };
}
