import { createContext, useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const logoutTimer = useRef(null);

  const clearLogoutTimer = useCallback(() => {
    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
      logoutTimer.current = null;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    Cookies.remove('user');
    clearLogoutTimer();
  }, [clearLogoutTimer]);

  const startLogoutTimer = useCallback(() => {
    clearLogoutTimer();
    logoutTimer.current = setTimeout(logout, 5 * 60 * 1000); // 5 minutes
  }, [logout, clearLogoutTimer]);

  useEffect(() => {
    const userData = Cookies.get('user');
    if (userData) {
      setUser(JSON.parse(userData));
      startLogoutTimer();
    }
  }, [startLogoutTimer]);

  const login = useCallback((userData) => {
    setUser(userData);
    Cookies.set('user', JSON.stringify(userData), { expires: 1 });
    startLogoutTimer();
  }, [startLogoutTimer]);

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
