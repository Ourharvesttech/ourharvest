import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me')
};

// Topics API
export const topicsAPI = {
  getAll: (params) => api.get('/topics', { params }),
  getOne: (id) => api.get(`/topics/${id}`),
  create: (topicData) => api.post('/topics', topicData),
  update: (id, topicData) => api.patch(`/topics/${id}`, topicData),
  delete: (id) => api.delete(`/topics/${id}`),
  vote: (id, voteType) => api.post(`/topics/${id}/vote`, { voteType }),
  lock: (id) => api.patch(`/topics/${id}/lock`)
};

// Comments API
export const commentsAPI = {
  getByTopic: (topicId) => api.get(`/comments/topic/${topicId}`),
  create: (commentData) => api.post('/comments', commentData),
  update: (id, commentData) => api.patch(`/comments/${id}`, commentData),
  delete: (id) => api.delete(`/comments/${id}`),
  vote: (id, voteType) => api.post(`/comments/${id}/vote`, { voteType }),
  markAsSolution: (id) => api.patch(`/comments/${id}/solution`)
};

export default api; 