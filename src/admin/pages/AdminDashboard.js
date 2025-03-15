import { useState } from 'react';
import ManageProducts from '../components/ManageProducts';
import AddProduct from '../components/AddProduct';
import './AdminDashboard.css';
import AdminUTR from '../components/AdminUTR';
import AdminOrders from '../components/AdminOrders';
import OrderFilter from '../components/OrderFilter';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Login state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Check credentials
    if (username === 'admin' && password === 'admin@001') {
      setIsAuthenticated(true); // Grant access
      setError(''); // Clear error message
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      {!isAuthenticated ? (
        <div>
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      ) : (
        <>
          <AddProduct />
          <ManageProducts />
          <AdminOrders />
          <OrderFilter/>
        </>
      )}
    </div>  
  );
};

export default AdminDashboard;
