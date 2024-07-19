
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../context/useAuth';

const ProtectedRoute = ({ element, roles }) => {
  const { user, isAdmin, isUser, isMiner } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles.includes('admin') && !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  if (roles.includes('user') && !isUser()) {
    return <Navigate to="/" replace />;
  }

  if (roles.includes('miner') && !isMiner()) {
    return <Navigate to="/" replace />;
  }

  return element;
};

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoute;
