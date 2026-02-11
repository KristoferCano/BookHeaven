import apiClient from './client';

// ==================
// LIBROS API
// ==================

export const librosAPI = {
  // Listar todos los libros
  getAll: async (params = {}) => {
    try {
      const response = await apiClient.get('/libros', { params });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo libros:', error);
      throw error;
    }
  },

  // Obtener un libro específico
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/libros/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo libro ${id}:`, error);
      throw error;
    }
  },

  // Crear un nuevo libro (admin)
  create: async (data) => {
    try {
      const formData = new FormData();
      formData.append('nombre', data.nombre);
      formData.append('descripcion', data.descripcion);
      formData.append('autor', data.autor);
      if (data.imagen) formData.append('imagen', data.imagen);
      if (data.pdf) formData.append('pdf', data.pdf);

      const response = await apiClient.post('/libros', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      console.error('Error creando libro:', error);
      throw error;
    }
  },

  // Actualizar libro (admin)
  update: async (id, data) => {
    try {
      const formData = new FormData();
      if (data.nombre) formData.append('nombre', data.nombre);
      if (data.descripcion) formData.append('descripcion', data.descripcion);
      if (data.autor) formData.append('autor', data.autor);
      if (data.imagen) formData.append('imagen', data.imagen);
      if (data.pdf) formData.append('pdf', data.pdf);

      const response = await apiClient.put(`/libros/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      console.error(`Error actualizando libro ${id}:`, error);
      throw error;
    }
  },

  // Eliminar libro (admin)
  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/libros/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error eliminando libro ${id}:`, error);
      throw error;
    }
  }
};

// ==================
// MANGAS API
// ==================

export const mangasAPI = {
  // Listar todos los mangas
  getAll: async (params = {}) => {
    try {
      const response = await apiClient.get('/mangas', { params });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo mangas:', error);
      throw error;
    }
  },

  // Obtener un manga específico
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/mangas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo manga ${id}:`, error);
      throw error;
    }
  },

  // Crear un nuevo manga (admin)
  create: async (data) => {
    try {
      const formData = new FormData();
      formData.append('nombre', data.nombre);
      formData.append('descripcion', data.descripcion);
      formData.append('autor', data.autor);
      if (data.imagen) formData.append('imagen', data.imagen);

      const response = await apiClient.post('/mangas', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      console.error('Error creando manga:', error);
      throw error;
    }
  },

  // Actualizar manga (admin)
  update: async (id, data) => {
    try {
      const formData = new FormData();
      if (data.nombre) formData.append('nombre', data.nombre);
      if (data.descripcion) formData.append('descripcion', data.descripcion);
      if (data.autor) formData.append('autor', data.autor);
      if (data.imagen) formData.append('imagen', data.imagen);

      const response = await apiClient.put(`/mangas/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      console.error(`Error actualizando manga ${id}:`, error);
      throw error;
    }
  },

  // Eliminar manga (admin)
  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/mangas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error eliminando manga ${id}:`, error);
      throw error;
    }
  }
};

// ==================
// COMICS API
// ==================

export const comicsAPI = {
  // Listar todos los cómics
  getAll: async (params = {}) => {
    try {
      const response = await apiClient.get('/comics', { params });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo cómics:', error);
      throw error;
    }
  },

  // Obtener un cómic específico
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/comics/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo cómic ${id}:`, error);
      throw error;
    }
  }
};
