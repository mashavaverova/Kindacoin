// src/components/Register.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import '../styles/general.css';
import logo from '../pics/logo.png';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData);
      console.log('Registration successful:', response.data);
      navigate('/login'); // Optionally redirect to login page
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div>
    <header>
      <img src={logo} alt="Logo" />
      <h2>Register </h2>
      
    </header>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input type="text" name="name" onChange={handleChange} value={formData.name} required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" name="email" onChange={handleChange} value={formData.email} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" onChange={handleChange} value={formData.password} required />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
  );
};

export default Register;
