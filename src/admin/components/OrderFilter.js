import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrderFilter.css"; // Add styles

const OrderFilter = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("Pending"); // Default: Show pending orders

  // ✅ Fetch orders
  const fetchOrders = () => {
    axios.get("http://localhost:5000/api/orders")
      .then((res) => {
        // ✅ Sort orders by createdAt (newest first)
        const sortedOrders = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sortedOrders);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  };

  // ✅ Automatically reload orders every 10 seconds
  useEffect(() => {
    fetchOrders();  // Initial fetch

    const interval = setInterval(() => {
      console.log("🔄 Reloading orders...");
      fetchOrders();
    }, 10000);  // Reload every 10 seconds

    return () => clearInterval(interval);  // ✅ Cleanup interval on component unmount
  }, []);

  // ✅ Update order status
  const updateStatus = (id, newStatus) => {
    axios.put(`http://localhost:5000/api/orders/${id}/status`, { status: newStatus })
      .then(() => {
        console.log(`✅ Order ${id} updated to ${newStatus}`);
        fetchOrders();  // Refresh orders
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
      });
  };

  const filteredOrders = orders.filter(order => order.status === filter);

  return (
    <div className="order-filter">
      <h2>Manage Orders</h2>
      
      <div className="filter-buttons">
        <button onClick={() => setFilter("Pending")} className={filter === "Pending" ? "active" : ""}>
          📌 Pending Orders
        </button>
        <button onClick={() => setFilter("Confirmed")} className={filter === "Confirmed" ? "active" : ""}>
          ✅ Confirmed Orders
        </button>
        <button onClick={() => setFilter("Rejected")} className={filter === "Rejected" ? "active" : ""}>
          ❌ Rejected Orders
        </button>
      </div>

      <div className="order-list">
        {filteredOrders.length === 0 ? (
          <p>No {filter.toLowerCase()} orders</p>
        ) : (
          filteredOrders.map((order) => (
            <div key={order._id} className="order-card">
              <h3>Buyer: {order.buyerName}</h3>
              <p>Email: {order.email}</p>
              <p>Phone: {order.phone}</p>
              <p>Products: {order.products.length} items</p>
              <p>Order Date: {new Date(order.createdAt).toLocaleString()}</p>

              {/* ✅ Dropdown to select status */}
              <label>Status: </label>
              <select
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderFilter;
