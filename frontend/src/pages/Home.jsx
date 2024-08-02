import { Link } from 'react-router-dom';
import '../styles/general.css';
import logo from '../pics/logo.png';

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <img src={logo} alt="Logo" className="home-logo" />
        <h2 className="home-title">KindaCoin App</h2>
      </header>
      <div className="home-buttons">
        <Link to="/login" className="button-link">
          <button className="home-button">Login</button>
        </Link>
        <Link to="/register" className="button-link">
          <button className="home-button">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
