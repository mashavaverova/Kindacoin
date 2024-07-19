import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user data from cookies if available
    const userData = Cookies.get('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    Cookies.set('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('user');
  };

  const isAdmin = () => user && user.role === 'admin';
  const isUser = () => user && user.role === 'user';
  const isMiner = () => user && user.role === 'miner';

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, isUser, isMiner }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
