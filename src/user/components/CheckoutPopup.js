import React, { useState } from "react";
import axios from "axios";
import "./CheckoutPopup.css";

const CheckoutPopup = ({ cart = [], onClose, clearCart }) => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [errors, setErrors] = useState({});
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // ✅ Form Validation
  const validateForm = () => {
    const newErrors = {};

    // ✅ Name Validation
    if (!deliveryDetails.name.trim()) {
      newErrors.name = "Name is required";
    }

    // ✅ Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(deliveryDetails.email)) {
      newErrors.email = "Invalid email format";
    }

    // ✅ Phone Number Validation (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(deliveryDetails.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    // ✅ Address Validation
    if (!deliveryDetails.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;  // ✅ Form is valid if no errors
  };

  // ✅ Handle Order Submission
  const handleOrder = async () => {
    if (!validateForm()) {
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

    try {
      const res = await axios.post("http://localhost:5000/api/orders", orderData);
      if (res.data.success) {
        setOrderPlaced(true);
        clearCart();

        // ✅ Reload page after 2 seconds for a smooth transition
        setTimeout(() => {
          window.location.reload();
        }, 2000);  
      }
    } catch (error) {
      console.error("Error placing order:", error.response ? error.response.data : error);
    }
  };

  return (
    <div className="checkout-popup">
      <div className="checkout-content">
        {orderPlaced ? (
          <h2>✅ Order Placed Successfully! <br /> Our team will contact you soon. 🚀</h2>
        ) : (
          <>
            <h2>🛒 Enter Delivery Details</h2>

            <div className="form-group">
              <input
                type="text"
                placeholder="Full Name"
                value={deliveryDetails.name}
                onChange={(e) => setDeliveryDetails({ ...deliveryDetails, name: e.target.value })}
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={deliveryDetails.email}
                onChange={(e) => setDeliveryDetails({ ...deliveryDetails, email: e.target.value })}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Phone Number"
                value={deliveryDetails.phone}
                onChange={(e) => setDeliveryDetails({ ...deliveryDetails, phone: e.target.value })}
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <textarea
                placeholder="Address"
                value={deliveryDetails.address}
                onChange={(e) => setDeliveryDetails({ ...deliveryDetails, address: e.target.value })}
              />
              {errors.address && <span className="error">{errors.address}</span>}
            </div>

            <button className="submit-btn" onClick={handleOrder}>
              🚀 Submit Order
            </button>
          </>
        )}

        <button className="close-btn" onClick={onClose}>❌ Close</button>
      </div>
    </div>
  );
};

export default CheckoutPopup;
