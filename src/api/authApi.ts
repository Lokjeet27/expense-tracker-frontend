import axios from '../utils/axiosInstance';

// Login API
export const login = async (email: string, password: string) => {
  const response = await axios.post('/auth/login', { email, password });
  return response.data; // Should return { user, token }
};

// Registration API
export const register = async (user: { name: string; email: string; password: string }) => {
  const response = await axios.post('/auth/register', user);
  return response.data; // Should return { user, token }
};
