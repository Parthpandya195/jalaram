import React, { useState } from "react";
import ProductDisplay from "../components/ProductDisplay";
import Cart from "../components/Cart";
import Checkout from "../components/Checkout";
import OrderTracking from "../pages/OrderTracking";
import "./UserDashboard.css";

const UserDashboard = () => {
  const [cart, setCart] = useState([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item._id !== productId));
  };

  return (
    <div className="user-dashboard">
      <h1>Welcome to Your Dashboard</h1>
      <ProductDisplay addToCart={addToCart} />
      <Cart cart={cart} removeFromCart={removeFromCart} onCheckout={() => setCheckoutOpen(true)} />
      {checkoutOpen && <Checkout cart={cart} onClose={() => setCheckoutOpen(false)} />}
       <OrderTracking /> 
    </div>
  );
};

export default UserDashboard;
