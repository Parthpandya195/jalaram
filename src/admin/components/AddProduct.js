  import { useState } from 'react';
  import axios from 'axios';
  import ManageProducts from './ManageProducts';
  import './AddProduct.css';

  const AddProduct = () => {
    const [product, setProduct] = useState({ name: '', image: '', price: '', description: '' });

    const handleSubmit = async (e) => {
      e.preventDefault();
      await axios.post('http://localhost:5000/api/products', product);
      alert('Product added!');
    };

    return (
      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="id" onChange={(e) => setProduct({ ...product, id: e.target.value })} />
        <input type="text" placeholder="Name" onChange={(e) => setProduct({ ...product, name: e.target.value })} />
        <input type="text" placeholder="Image URL" onChange={(e) => setProduct({ ...product, image: e.target.value })} />
        <input type="number" placeholder="Price" onChange={(e) => setProduct({ ...product, price: e.target.value })} />
        <textarea placeholder="Description" onChange={(e) => setProduct({ ...product, description: e.target.value })}></textarea>
        <button type="submit">Add Product</button>
      </form>
    );
  };

  export default AddProduct;
