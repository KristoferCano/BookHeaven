import { useState, useEffect } from 'react';
import { mangasAPI } from '../api/endpoints';

// Hook personalizado para obtener los mangas
export function useMangas() {
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMangas();
  }, []);

  const fetchMangas = async () => {
    try {
      setLoading(true);
      const data = await mangasAPI.getAll();
      // Si data es un array, usarlo directamente; si es objeto con 'data', usar eso
      setMangas(Array.isArray(data) ? data : data.data || []);
      setError(null);
    } catch (err) {
      setError(err.message || 'Error al obtener mangas');
      setMangas([]);
    } finally {
      setLoading(false);
    }
  };

  return { mangas, loading, error, refetch: fetchMangas };
}

// Hook para obtener un manga específico
export function useManga(id) {
  const [manga, setManga] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchManga();
    }
  }, [id]);

  const fetchManga = async () => {
    try {
      setLoading(true);
      const data = await mangasAPI.getById(id);
      setManga(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Error al obtener el manga');
      setManga(null);
    } finally {
      setLoading(false);
    }
  };

  return { manga, loading, error, refetch: fetchManga };
}
