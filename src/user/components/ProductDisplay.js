import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductDisplay.css';
import CartPopup from './CartPopup';

const ProductDisplay = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartVisible, setCartVisible] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(Array.isArray(res.data) ? res.data : res.data.data || []);
      } catch (err) {
        console.error('Error fetching products:', err.message);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item._id === product._id);
    if (existingItem) {
      setCart(cart.map((item) =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    // 🛒 Add a pulse animation when adding to cart
    const cartBtn = document.querySelector('.cart-btn');
    cartBtn.classList.add('pulse');
    setTimeout(() => cartBtn.classList.remove('pulse'), 600);
  };

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  if (loading) return <div className="loading-spinner">🌀 Loading products...</div>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="product-display-container">
      {/* 🛒 Cart Button */}
      <div className="cart-button-container">
        <button className="cart-btn" onClick={toggleCart}>
          🛒 Cart ({cart.length})
        </button>
      </div>

      {/* ✅ Products Grid */}
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <div className="product-image-wrapper">
                <img src={product.image} alt={product.name} className="product-image" />
              </div>
              <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">₹{product.price}</p>
                <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                  ➕ Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="error-message">No products available.</p>
        )}
      </div>

      {/* 🛒 Cart Popup */}
      {cartVisible && <CartPopup cart={cart} setCart={setCart} onClose={toggleCart} />}
    </div>
  );
};

export default ProductDisplay;
