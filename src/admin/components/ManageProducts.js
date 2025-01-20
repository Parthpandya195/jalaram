import { useState, useEffect } from 'react';
import axios from 'axios';

const ManageProducts = () => {
  const [products, setProducts] = useState([]); // Ensure initial state is an array
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        
        // Check if response data is wrapped in an object with a 'data' key
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data && Array.isArray(data.data)) {
          setProducts(data.data); // Assuming the products are in 'data.data'
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

  // Delete product
  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        setProducts(products.filter((product) => product._id !== id));
        alert('Product deleted!');
      } catch (error) {
        console.error('Error deleting product:', error.message);
        alert('Failed to delete product');
      }
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Manage Products</h1>
      <ul>
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product._id}>
              <h3>{product.name}</h3>
              <img src={product.image} alt={product.name} style={{ width: '100px' }} />
              <p>{product.description}</p>
              <p>Price: {product.price}</p>
              <button onClick={() => deleteProduct(product._id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </ul>
    </div>
  );
};

export default ManageProducts;
