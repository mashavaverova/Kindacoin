import { Link } from 'react-router-dom';
import '../styles/general.css';
import logo from '../pics/logo.png';

const Home = () => {
  return (
    <div>
    <header>
      <img src={logo} alt="Logo" />
      <h2>KindaCoin App </h2>
      
    </header>
      <Link to="/login" className="button-link">
        <button>Login</button>
      </Link>

      <Link to="/register" className="button-link">
        <button>Register</button>
      </Link>
    </div>
  );
};

export default Home;
