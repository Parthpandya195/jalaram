import React, { useState } from 'react';
import axios from 'axios';
import './OrderForm.css'; // Ensure this CSS file exists

const OrderForm = ({ cartItems }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); // ✅ Added email field
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [utr, setUtr] = useState(''); // ✅ UTR field for payment verification
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const orderData = {
        cartItems, // ✅ Include selected cart items
        name,
        email, // ✅ Now sending email
        phone,
        address,
        utr, // ✅ Now sending UTR for payment confirmation
        status: "Pending",
      };

      const response = await axios.post('http://localhost:5000/api/order', orderData);

      if (response.data.success) {
        setMessage('✅ Order placed successfully!');
        setName('');
        setEmail('');
        setPhone('');
        setAddress('');
        setUtr('');
      } else {
        setMessage('❌ Failed to place order.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setMessage('❌ Failed to place order. Please try again.');
    }
  };

  return (
    <div className="order-form-container">
      <h2>Place Your Order</h2>
      {message && <p className="order-message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Email:</label> 
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Phone:</label>
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />

        <label>Address:</label>
        <textarea value={address} onChange={(e) => setAddress(e.target.value)} required></textarea>

        <label>UTR Number:</label>
        <input type="text" value={utr} onChange={(e) => setUtr(e.target.value)} required placeholder="Enter 12-digit UTR" />

        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
};

export default OrderForm;
