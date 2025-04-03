
import axios from 'axios';

// Create an instance of axios with default config
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// User profile API methods
api.updateUserProfile = async (userId, userData) => {
  try {
    const response = await api.put(`/users/${userId}`, userData);
    return { success: true, user: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to update profile' 
    };
  }
};

// Add a method to fetch recent feedback for the homepage
api.get('/feedback/recent', async () => {
  try {
    // We're using a direct API call here to bypass authentication for public data
    const response = await axios.get('http://localhost:5000/api/feedback/recent');
    return response.data;
  } catch (error) {
    console.error('Error fetching recent feedback:', error);
    return [];
  }
});

export default api;

