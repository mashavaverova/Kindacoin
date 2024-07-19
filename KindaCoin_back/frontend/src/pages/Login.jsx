import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import Cookies from 'js-cookie';
import '../styles/general.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data being sent:', formData);

    try {
      const { token, role } = await login(formData.email, formData.password);
      console.log('Role received from login:', role);

      // Store token and role in cookies
      Cookies.set('token', token, { expires: 1 });
      Cookies.set('role', role, { expires: 1 });

      // Redirect based on role
      switch (role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'user':
          navigate('/user');
          break;
        case 'miner':
          navigate('/miner');
          break;
        default:
          console.error('Unknown role:', role);
          navigate('/'); // Redirect to main page or handle default case appropriately
          break;
      }
    } catch (error) {
      console.error('Login failed', error.response ? error.response.data : error.message);
      // Handle specific errors or show user-friendly message
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
