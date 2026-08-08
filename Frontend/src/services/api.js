import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const MODEL1_URL = import.meta.env.VITE_MODEL1_URL || 'http://localhost:5003';
const MODEL2_URL = import.meta.env.VITE_MODEL2_URL || 'http://localhost:5004';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach user or doctor token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || localStorage.getItem('doctorToken');
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
      // Clear token on 401 if token expired
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

// Consultation & Doctor Endpoints
export const getDoctors = () => api.get('/consultation/doctors');
export const scheduleConsultation = (data) => api.post('/consultation/book', data);
export const getConsultationById = (id) => api.get(`/consultation/${id}`);
export const getConsultationMessages = (id) => api.get(`/consultation/${id}/messages`);

export const doctorLogin = (credentials) => api.post('/doctor/login', credentials);
export const getDoctorProfile = () => api.get('/doctor/me');
export const getDoctorConsultations = () => api.get('/doctor/consultations');

// Chat Service Endpoints
export const fetchChatHistory = (consultationId) => api.get(`/chat/history/${consultationId}`);

// AI ML Model Services
export const analyzeSkinWithModel1 = async (formData) => {
  try {
    const res = await axios.post(`${MODEL1_URL}/api/submit`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  } catch (err) {
    // Fallback via backend proxy if direct model call is blocked
    try {
      const fallbackRes = await api.post('/submit', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return {
        success: true,
        disease: fallbackRes.data.Disease || fallbackRes.data.message,
        disclaimer: "AI-generated screening result — not a medical diagnosis. Please consult a qualified dermatologist for professional evaluation."
      };
    } catch (fallbackErr) {
      throw err;
    }
  }
};

export const getRecommendationOptions = async () => {
  const res = await axios.get(`${MODEL2_URL}/options`);
  return res.data;
};

export const getProductRecommendation = async (data) => {
  const res = await axios.post(`${MODEL2_URL}/api/recommend`, data);
  return res.data;
};

export default api;
