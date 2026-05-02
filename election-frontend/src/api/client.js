import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chatAPI = {
  ask: (query, language = 'english') =>
    apiClient.post('/api/chat', { query, language }),
};

export const eligibilityAPI = {
  getAll: () => apiClient.get('/api/eligibility'),
};

export const journeyAPI = {
  getAll: () => apiClient.get('/api/journey'),
};

export const timelineAPI = {
  getAll: () => apiClient.get('/api/timeline'),
};

export default apiClient;
