import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { useAuth } from '../context/useAuth';
import '../styles/general.css';
import logo from '../pics/logo.png';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login: loginUser } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data being sent:', formData);

    try {
      const { token, role } = await login(formData.email, formData.password);
      console.log('Response from login API:', { token, role });

      // Set user data
      const userData = { token, role };
      loginUser(userData);

      // Redirect based on role
      switch (role) {
        case 'admin':
          console.log('Navigating to /admin');
          navigate('/admin');
          break;
        case 'user':
          console.log('Navigating to /user');
          navigate('/user');
          break;
        case 'miner':
          console.log('Navigating to /miner');
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
    <div className="login-container">
      <header className="login-header">
        <img src={logo} alt="Logo" className="login-logo" />
        <h2 className="login-title">Login</h2>
      </header>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
