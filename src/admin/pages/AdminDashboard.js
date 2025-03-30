import { useState } from "react";
import ManageProducts from "../components/ManageProducts";
import AddProduct from "../components/AddProduct";
import AdminUTR from "../components/AdminUTR";
import AdminOrders from "../components/AdminOrders";
import OrderFilter from "../components/OrderFilter";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("addProduct"); // Default active tab

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin@001") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="admin-dashboard">
      {!isAuthenticated ? (
        <div className="admin-login-container">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      ) : (
        <>
          {/* ✅ Navbar */}
          <nav className="admin-navbar">
            <button
              className={activeTab === "addProduct" ? "active" : ""}
              onClick={() => setActiveTab("addProduct")}
            >
              ➕ Add Product
            </button>
            <button
              className={activeTab === "manageProducts" ? "active" : ""}
              onClick={() => setActiveTab("manageProducts")}
            >
              🛒 Manage Products
            </button>
            <button
              className={activeTab === "adminOrders" ? "active" : ""}
              onClick={() => setActiveTab("adminOrders")}
            >
              📦 Admin Orders
            </button>
            <button
              className={activeTab === "orderFilter" ? "active" : ""}
              onClick={() => setActiveTab("orderFilter")}
            >
              🔍 Order Filter
            </button>
            {/* <button
              className={activeTab === "utr" ? "active" : ""}
              onClick={() => setActiveTab("utr")}
            >
              💳 Admin UTR
            </button> */}
            <button
              className="logout-btn"
              onClick={() => setIsAuthenticated(false)}
            >
              🚪 Logout
            </button>
          </nav>

          {/* ✅ Component Rendering */}
          <div className="component-container">
            {activeTab === "addProduct" && <AddProduct />}
            {activeTab === "manageProducts" && <ManageProducts />}
            {activeTab === "adminOrders" && <AdminOrders />}
            {activeTab === "orderFilter" && <OrderFilter />}
            {/* {activeTab === "utr" && <AdminUTR />} */}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
