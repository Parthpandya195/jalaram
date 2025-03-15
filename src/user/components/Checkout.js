import React, { useState } from "react";
import axios from "axios";
import "./Checkout.css";

const Checkout = ({ cart, onClose }) => {
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleOrder = async () => {
    if (!deliveryDetails.name || !deliveryDetails.email || !deliveryDetails.phone || !deliveryDetails.address) {
      alert("Please fill all details!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/order", {
        buyerName: deliveryDetails.name,
        email: deliveryDetails.email,
        phone: deliveryDetails.phone,
        products: cart,
        deliveryDetails,
      });

      alert("✅ Order placed successfully! Cash on Delivery.");
      onClose();
    } catch (error) {
      console.error("Error placing order:", error);
      alert("❌ Failed to place order.");
    }
  };

  return (
    <div className="checkout-popup">
      <h2>Enter Delivery Details</h2>

      <input type="text" placeholder="Full Name" onChange={(e) => setDeliveryDetails({ ...deliveryDetails, name: e.target.value })} />
      <input type="email" placeholder="Email" onChange={(e) => setDeliveryDetails({ ...deliveryDetails, email: e.target.value })} />
      <input type="text" placeholder="Phone Number" onChange={(e) => setDeliveryDetails({ ...deliveryDetails, phone: e.target.value })} />
      <textarea placeholder="Address" onChange={(e) => setDeliveryDetails({ ...deliveryDetails, address: e.target.value })} />
      
      <button onClick={handleOrder}>Place Order</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default Checkout;
