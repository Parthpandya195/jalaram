import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminOrders.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  // ✅ Fetch orders
  const fetchOrders = () => {
    axios.get("http://localhost:5000/api/orders")
      .then((res) => {
        const pendingOrders = res.data.filter(order => order.status === "Pending");
        setOrders(pendingOrders);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  };

  // ✅ Fetch orders initially and reload every 10 seconds
  useEffect(() => {
    fetchOrders(); // Initial fetch

    const interval = setInterval(() => {
      console.log("🔄 Reloading orders...");
      fetchOrders();
    }, 10000); // Reload every 10 seconds

    return () => clearInterval(interval);  // ✅ Cleanup interval on component unmount
  }, []);

  const confirmOrder = (id) => {
    axios.put(`http://localhost:5000/api/orders/${id}/confirm`).then(() => {
      alert("✅ Payment Confirmed!");
      fetchOrders(); // ✅ Refresh orders after confirmation
    });
  };

  const rejectOrder = (id) => {
    axios.put(`http://localhost:5000/api/orders/${id}/reject`).then(() => {
      alert("❌ Payment Rejected!");
      fetchOrders(); // ✅ Refresh orders after rejection
    });
    const confirmOrder = (id, sendEmail = false) => {
      const route = sendEmail 
        ? `http://localhost:5000/api/orders/${id}/confirm-email` 
        : `http://localhost:5000/api/orders/${id}/confirm`;
    
      axios.put(route)
        .then(() => {
          alert(sendEmail ? "✅ Order Confirmed & Email Sent!" : "✅ Order Confirmed!");
          fetchOrders();  // Reload orders
        })
        .catch((error) => {
          console.error("Error confirming order:", error);
        });
    };
    
  };

  return (
    <div className="admin-orders">
      <h2>Pending Orders</h2>
      {orders.length === 0 ? (
        <p>No pending orders</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order">
            <h3>Buyer: {order.buyerName}</h3>
            <p>Email: {order.email}</p>
            <p>Phone: {order.phone}</p>
            <p>Products: {order.products.length} items</p>
            <p>Status: {order.status}</p>
            <button onClick={() => confirmOrder(order._id)}>✅ Confirm Order</button>
            <button onClick={() => rejectOrder(order._id)}>❌ Reject Order</button>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrders;
