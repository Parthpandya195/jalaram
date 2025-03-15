import React, { useState } from "react";
import axios from "axios";
import "./OrderTracking.css";

const OrderTracking = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);

  const trackOrder = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
      setOrder(res.data);
    } catch (error) {
      alert("Order not found!");
    }
  };

  return (
    <div className="order-tracking">
      <h2>Track Your Order</h2>
      <input type="text" placeholder="Enter Order ID" onChange={(e) => setOrderId(e.target.value)} />
      <button onClick={trackOrder}>Track</button>

      {order && (
        <div className="order-details">
          <h3>Order Status: {order.status}</h3>
          <p><strong>Buyer:</strong> {order.buyerName}</p>
          <p><strong>Email:</strong> {order.email}</p>
          <p><strong>Phone:</strong> {order.phone}</p>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
