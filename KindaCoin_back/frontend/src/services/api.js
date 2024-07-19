import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const API_URL = 'http://localhost:5001/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });

    console.log('Response from login API:', response.data); // Log the response data

    if (!response.data.success || !response.data.token) {
      throw new Error('Login failed: Missing token or success status in response');
    }

    const { token } = response.data;

    // Decode the token to extract role information
    const decodedToken = jwtDecode(token);
    const { role } = decodedToken;

    // Set token and role in cookies with secure and HTTP-only flags
    Cookies.set('token', token, { expires: 1, secure: true, sameSite: 'strict', httpOnly: true });
    Cookies.set('role', role, { expires: 1, secure: true, sameSite: 'strict', httpOnly: true });

    return { token, role }; // Return token and role for use in application
  } catch (error) {
    console.error('Login failed', error);
    throw error; // Propagate error for handling in the calling component
  }
};

export const register = (data) => api.post('/auth/register', data);

export const createTransaction = (data) => api.post('/wallet/transaction', data);

export const getTransactions = () => api.get('/wallet/transactions');

export const mineBlock = () => api.post('/block/mine');

export const listBlocks = () => api.get('/block'); // Assuming 'listBlocks' is to fetch blocks

export const getBlockchain = () => api.get('/blockchain');

export default api;
