import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function obtenerDocentes() {
  const { data } = await api.get('/docentes');
  return data;
}

export async function crearDocente(payload) {
  const { data } = await api.post('/docentes', payload);
  return data;
}

export async function actualizarDocente(id, payload) {
  const { data } = await api.put(`/docentes/${id}`, payload);
  return data;
}

export async function eliminarDocente(id) {
  const { data } = await api.delete(`/docentes/${id}`);
  return data;
}

export default api;
