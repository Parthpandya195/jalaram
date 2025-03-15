import React from "react";
import "./Cart.css";

const Cart = ({ cart, removeFromCart, onCheckout }) => {
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div key={item._id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div>
              <p>{item.name}</p>
              <p>Price: ₹{item.price}</p>
              <button onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          </div>
        ))
      )}
      {cart.length > 0 && <button onClick={onCheckout}>Proceed to Checkout</button>}
    </div>
  );
};

export default Cart;
