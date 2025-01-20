import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = ({ productId }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        productId,
        name,
        address,
        quantity
      };
      await axios.post('http://localhost:5000/api/orders', orderData);
      setMessage('Order placed successfully!');
      setName('');
      setAddress('');
      setQuantity(1);
    } catch (error) {
      console.error('Error placing order:', error);
      setMessage('Failed to place order. Please try again.');
    }
  };

  return (
    <div>
      <h2>Place Order</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text\"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number\"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            required
          />
        </div>
        <button type="submit\">Submit Order</button>
      </form>
    </div>
  );
};

export default OrderForm;