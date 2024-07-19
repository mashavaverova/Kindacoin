import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/DashAdmin';
import UserDashboard from './pages/DashUser';
import MinerDashboard from './pages/DashMiner';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard />} roles={['admin']} />} />
          <Route path="/user" element={<ProtectedRoute element={<UserDashboard />} roles={['user']} />} />
          <Route path="/miner" element={<ProtectedRoute element={<MinerDashboard />} roles={['miner']} />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
