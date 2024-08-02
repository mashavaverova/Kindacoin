
import Logout from "../components/Logout";
import '../styles/general.css'; 
import logo from '../pics/logo.png';
const AdminDashboard = () => {
    return (
      <div className="dashboard-container">
      <header className="dashboard-header">
      <img src={logo} alt="Logo" className="logo" />
        <h2 className="dashboard-title">Admin Dashboard</h2>
      </header>

      <p>Here can be functionality for Admin, like user controllers, etc</p>

        <Logout />
      </div>
    );
  };
  
  export default AdminDashboard;