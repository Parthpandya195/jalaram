import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductDisplay = () => {
  const [products, setProducts] = useState([]); // Ensure initial state is an array
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        // Check if response data is wrapped in an object
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else if (res.data.data && Array.isArray(res.data.data)) {
          setProducts(res.data.data);
        } else {
          throw new Error('Unexpected data format from API');
        }
      } catch (err) {
        console.error('Error fetching products:', err.message);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product._id} style={{ marginBottom: '20px' }}>
            <h3>{product.name}</h3>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
            <p>Price: ${product.price}</p>
            <p>{product.description}</p>
          </div>
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default ProductDisplay;
