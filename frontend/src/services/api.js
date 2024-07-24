import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://localhost:5001/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get auth token from cookies
const getAuthToken = () => Cookies.get('token');

// Add a request interceptor to include the token in the headers
api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    console.log('Response from login API:', response.data);

    if (!response.data.success || !response.data.token) {
      throw new Error('Login failed: Missing token or success status in response');
    }

    const { token } = response.data;

    const decodedToken = jwtDecode(token);
    const { role } = decodedToken;

    Cookies.set('token', token, { expires: 1, secure: true, sameSite: 'strict' });
    Cookies.set('role', role, { expires: 1, secure: true, sameSite: 'strict' });

    return { token, role };
  } catch (error) {
    console.error('Login failed', error);
    throw error;
  }
};

export const register = (data) => api.post('/auth/register', data);

export const createTransaction = async (data) => {
  try {
    const response = await api.post('/wallet/transaction', data);
    return response.data;
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
};

export const getTransactions = async () => {
  try {
    const response = await api.get('/wallet/transactions');
    console.log('Response from getTransactions API:', response.data); // Log the response data
    return response.data; // Ensure this is an array
  } catch (error) {
    console.error('Error fetching transactions', error);
    throw error;
  }
};

export const mineBlock = () => api.post('/block/mine');

export const listBlocks = () => api.get('/block');

export const getBlockchain = () => api.get('/blockchain');

export default api;
