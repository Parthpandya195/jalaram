import { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageProducts.css';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data && Array.isArray(data.data)) {
          setProducts(data.data);
        } else {
          throw new Error('Unexpected data format');
        }
      } catch (error) {
        console.error('Error fetching products:', error.message);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/products/${id}`, {
          headers: { "Content-Type": "application/json" },
        });

        if (response.status === 200) {
          setProducts(products.filter((product) => product._id !== id));
          alert('Product deleted successfully!');
        } else {
          throw new Error("Failed to delete product. Try again.");
        }
      } catch (error) {
        console.error('Error deleting product:', error.response?.data?.message || error.message);
        alert('Failed to delete product: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="manage-products">
      <h1>Manage Products</h1>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p className="price">💲 {product.price}</p>
              </div>
              <button onClick={() => deleteProduct(product._id)} className="delete-btn">
                🗑️ Delete
              </button>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
