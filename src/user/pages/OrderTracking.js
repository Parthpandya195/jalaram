import React, { useState } from "react";
import axios from "axios";
import "./OrderTracking.css";

const OrderTracking = () => {
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch orders by phone number
  const trackOrder = async () => {
    if (!phone) {
      alert("Please enter a valid mobile number");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.get(`http://localhost:5000/api/orders/track/${phone}`);

      if (res.data.length === 0) {
        setError("No orders found for this mobile number.");
      } else {
        setOrders(res.data);
      }

    } catch (error) {
      console.error("❌ Error tracking order:", error);
      setError("Failed to find order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Cancel all orders by phone number
  const cancelAllOrders = async () => {
    if (!window.confirm("🚫 Are you sure you want to cancel all orders for this number?")) {
      return; // Cancel if the user clicks "No"
    }

    setLoading(true);

    try {
      await axios.put(`http://localhost:5000/api/orders/cancel/${phone}`);
      alert("✅ All orders cancelled successfully!");
      setOrders([]);
    } catch (error) {
      console.error("❌ Error cancelling orders:", error);
      alert("Failed to cancel orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-tracking">
      <h2>Track Your Order</h2>
      <input
        type="text"
        placeholder="Enter Mobile Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={trackOrder} disabled={loading}>
        {loading ? "Tracking..." : "Track Order"}
      </button>

      {error && <p className="error">{error}</p>}

      {orders.length > 0 && (
        <div className="cancel-all-container">
          <button className="cancel-all-btn" onClick={cancelAllOrders}>
            🚫 Cancel All Orders
          </button>
        </div>
      )}

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <h3>Status: <span className={`status-${order.status.toLowerCase()}`}>{order.status}</span></h3>
            <p><strong>Buyer:</strong> {order.buyerName}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Email:</strong> {order.email}</p>
            <p><strong>Products:</strong> {order.products.length} items</p>
            <p>📅 <strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTracking;
