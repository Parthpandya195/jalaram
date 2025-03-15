import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminOrders.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/orders")
      .then((res) => {
        // Filter only orders with status "Pending"
        const pendingOrders = res.data.filter(order => order.status === "Pending");
        setOrders(pendingOrders);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const confirmOrder = (id) => {
    axios.put(`http://localhost:5000/api/orders/${id}/confirm`).then(() => {
      alert("✅ Payment Confirmed!");
      setOrders(orders.filter((order) => order._id !== id));
    });
  };

  const rejectOrder = (id) => {
    axios.put(`http://localhost:5000/api/orders/${id}/reject`).then(() => {
      alert("❌ Payment Rejected!");
      setOrders(orders.filter((order) => order._id !== id));
    });
  };

  return (
    <div className="admin-orders">
      <h2>Pending Orders</h2>
      {orders.length === 0 ? <p>No pending orders</p> : orders.map((order) => (
        <div key={order._id} className="order">
          <h3>Buyer: {order.buyerName}</h3>
          <p>Email: {order.email}</p>
          <p>Phone: {order.phone}</p>
          <p>Products: {order.products.length} items</p>
          <p>Status: {order.status}</p>
          <button onClick={() => confirmOrder(order._id)}>✅ Confirm Payment</button>
          <button onClick={() => rejectOrder(order._id)}>❌ Reject Payment</button>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
