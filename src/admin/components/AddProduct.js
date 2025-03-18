import { useState } from 'react';
import axios from 'axios';
import ManageProducts from './ManageProducts';
import './AddProduct.css';

const AddProduct = () => {
  const [product, setProduct] = useState({ name: '', image: '', price: '', description: '', id: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/products', product);
      alert('✅ Product added!');

      // ✅ Clear the form by resetting the product state
      setProduct({ name: '', image: '', price: '', description: '', id: '' });

    } catch (error) {
      console.error("❌ Error adding product:", error);
      alert('Failed to add product.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="ID"
        value={product.id}                                      // ✅ Bind value to product state
        onChange={(e) => setProduct({ ...product, id: e.target.value })}
      />
      <input
        type="text"
        placeholder="Name"
        value={product.name}                                   // ✅ Bind value to product state
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={product.image}                                  // ✅ Bind value to product state
        onChange={(e) => setProduct({ ...product, image: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={product.price}                                  // ✅ Bind value to product state
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={product.description}                            // ✅ Bind value to product state
        onChange={(e) => setProduct({ ...product, description: e.target.value })}
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
