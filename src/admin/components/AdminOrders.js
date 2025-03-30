import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminOrders.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch orders
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      
      const sortedOrders = res.data.orders
        .filter((order) => order.status === "Pending")   // 🛑 Only show Pending orders
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setOrders(sortedOrders);
    } catch (error) {
      console.error("❌ Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(() => {
      console.log("🔄 Reloading orders...");
      fetchOrders();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // ✅ Update status and immediately remove order from UI
  const updateOrderStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}/status`, { status });

      // ✅ Filter the updated order out of the list immediately
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));

      alert(`✅ Order ${status} successfully!`);
    } catch (error) {
      console.error(`❌ Error updating order to ${status}:`, error);
      alert(`Failed to update order to ${status}`);
    }
  };

  return (
    <div className="admin-orders">
      <h2>Pending Orders</h2>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No pending orders available</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order">
            <h3>Buyer: {order.buyerName}</h3>
            <p>Phone: {order.phone}</p>
            <p>Products: {order.products.length} items</p>
            <p>Status: <strong>{order.status}</strong></p>
            <p>Order Date: {new Date(order.createdAt).toLocaleString()}</p>

            {/* ✅ Buttons using the unified /status route */}
            <button onClick={() => updateOrderStatus(order._id, "Confirmed")}>
              ✅ Confirm Order
            </button>
            <button onClick={() => updateOrderStatus(order._id, "Rejected")}>
              ❌ Reject Order
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrders;
