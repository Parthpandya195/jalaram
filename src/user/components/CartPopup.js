import React, { useState } from "react";
import CheckoutPopup from "./CheckoutPopup";
import "./CartPopup.css";

const CartPopup = ({ cart, setCart, onClose }) => {
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item._id !== productId));
  };

  return (
    <div className="cart-popup">
      <div className="cart-content">
        <h2>Your Cart</h2>
        
        {cart.length === 0 ? (
          <p>Cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-img" />
              <div>
                <p>{item.name}</p>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          ))
        )}

        <button onClick={onClose}>Close</button>
        {cart.length > 0 && <button onClick={() => setCheckoutOpen(true)}>Checkout</button>}
      </div>

      {checkoutOpen && <CheckoutPopup cart={cart} setCart={setCart} onClose={() => setCheckoutOpen(false)} />}
    </div>
  );
};

export default CartPopup;
