import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrderFilter.css"; 

const OrderFilter = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("Pending");

  // ✅ Fetch orders
  const fetchOrders = () => {
    axios
      .get("http://localhost:5000/api/orders")
      .then((res) => {
        const sortedOrders = res.data.orders.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setOrders(sortedOrders);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(() => {
      console.log("🔄 Reloading orders...");
      fetchOrders();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // ✅ Update status using the /status route
  const updateStatus = (id, newStatus) => {
    axios
      .put(`http://localhost:5000/api/orders/${id}/status`, { status: newStatus })
      .then(() => {
        console.log(`✅ Order ${id} updated to ${newStatus}`);
        fetchOrders();
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
      });
  };

  const filteredOrders = orders.filter((order) => order.status === filter);

  return (
    <div className="order-filter">
      <h2>Manage Orders</h2>

      <div className="filter-buttons">
        <button onClick={() => setFilter("Pending")}>
          📌 Pending Orders
        </button>
        <button onClick={() => setFilter("Confirmed")}>
          ✅ Confirmed Orders
        </button>
        <button onClick={() => setFilter("Rejected")}>
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
              <p>Phone: {order.phone}</p>
              <p>Products: {order.products.length} items</p>

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
