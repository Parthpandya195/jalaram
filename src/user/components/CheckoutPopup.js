import React, { useState } from "react";
import axios from "axios";
import "./CheckoutPopup.css";

const CheckoutPopup = ({ cart = [], onClose, clearCart }) => {
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [deliveryDetails, setDeliveryDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleOrder = async () => {
    if (!deliveryDetails.name || !deliveryDetails.email || !deliveryDetails.phone || !deliveryDetails.address) {
      alert("Please fill all the required fields!");
      return;
    }

    const orderData = {
      buyerName: deliveryDetails.name,
      email: deliveryDetails.email,
      phone: deliveryDetails.phone,
      products: cart,
      deliveryDetails,
      status: "Pending",
    };

    console.log("Sending Order Data:", orderData); // Debugging log

    try {
      const res = await axios.post("http://localhost:5000/api/order", orderData);

      if (res.data.success) {
        setOrderPlaced(true);
        clearCart();
      }
    } catch (error) {
      console.error("Error placing order:", error.response ? error.response.data : error);
      // alert("Failed to place order.");
    }
  };

  return (
    <div className="checkout-popup">
      <div className="checkout-content">
        {orderPlaced ? (
          <h2>✅ Order Placed Successfully! <br /> our Team will contact you soon </h2>
        ) : (
          <>
            <h2>Enter Delivery Details</h2>
            <input type="text" placeholder="Full Name" onChange={(e) => setDeliveryDetails((prev) => ({ ...prev, name: e.target.value }))} />
            <input type="email" placeholder="Email" onChange={(e) => setDeliveryDetails((prev) => ({ ...prev, email: e.target.value }))} />
            <input type="text" placeholder="Phone Number" onChange={(e) => setDeliveryDetails((prev) => ({ ...prev, phone: e.target.value }))} />
            <textarea placeholder="Address" onChange={(e) => setDeliveryDetails((prev) => ({ ...prev, address: e.target.value }))} />

            <button onClick={handleOrder}>Submit Order</button>
          </>
        )}

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CheckoutPopup;
