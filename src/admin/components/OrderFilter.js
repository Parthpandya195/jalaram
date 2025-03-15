import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrderFilter.css"; // Add styles

const OrderFilter = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("Pending"); // Default: Show pending orders

  useEffect(() => {
    axios.get("http://localhost:5000/api/orders")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const filteredOrders = orders.filter(order => order.status === filter);

  return (
    <div className="order-filter">
      <h2>Manage Orders</h2>
      
      <div className="filter-buttons">
        <button onClick={() => setFilter("Pending")} className={filter === "Pending" ? "active" : ""}>📌 Pending Orders</button>
        <button onClick={() => setFilter("Confirmed")} className={filter === "Confirmed" ? "active" : ""}>✅ Confirmed Orders</button>
        <button onClick={() => setFilter("Rejected")} className={filter === "Rejected" ? "active" : ""}>❌ Rejected Orders</button>
      </div>

      <div className="order-list">
        {filteredOrders.length === 0 ? <p>No {filter.toLowerCase()} orders</p> : 
          filteredOrders.map((order) => (
            <div key={order._id} className="order-card">
              <h3>Buyer: {order.buyerName}</h3>
              <p>Email: {order.email}</p>
              <p>Phone: {order.phone}</p>
              <p>Products: {order.products.length} items</p>
              <p>Status: <span className={`status-${order.status.toLowerCase()}`}>{order.status}</span></p>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default OrderFilter;
