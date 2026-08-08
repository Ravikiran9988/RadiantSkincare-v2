import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach user token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle global API response structures
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (localStorage.getItem('token') && !window.location.pathname.includes('/login')) {
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
      }
    }
    return Promise.reject(error);
  }
);

// Auth Service Endpoints
export const register = (userData) => api.post('/register', userData);
export const verifyOtp = (data) => api.post('/verify-otp', data);
export const login = (credentials) => api.post('/login', credentials);
export const getCurrentUser = () => api.get('/user/me');

// Profile Service Endpoints
export const updateProfile = (data) => api.put('/user/update-profile', data);
export const changePassword = (data) => api.put('/user/change-password', data);

// Dashboard Endpoints
export const fetchDashboardData = () => api.get('/dashboard/data');
export const updateChecklist = (checklist) => api.post('/dashboard/update-checklist', { checklist });
export const addAnalysisHistory = (entry) => api.post('/dashboard/add-history', { entry });

// Submission Endpoints
export const submitSkinAnalysis = (formData) =>
  api.post('/submit', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

// Unified AI Model Service
export const analyzeSkin = async (formData) => {
  const res = await api.post('/ai/analyze-skin', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export default api;
