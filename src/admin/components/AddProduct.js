import { useState } from "react";
import axios from "axios";
import "./AddProduct.css";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    image: "",
    price: "",
    description: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Ensure proper types before sending data
    const productToSend = {
      name: product.name,
      image: product.image,
      price: Number(product.price),   // Convert price to a number
      description: product.description
    };

    try {
      const response = await axios.post("http://localhost:5000/api/products", productToSend);
      console.log("✅ Product added:", response.data);

      alert("✅ Product added successfully!");

      // ✅ Clear form after submission
      setProduct({ name: "", image: "", price: "", description: "" });

    } catch (error) {
      console.error("❌ Error adding product:", error.response?.data || error.message);
      alert(`Failed to add product: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        value={product.image}
        onChange={(e) => setProduct({ ...product, image: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={product.price}
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        value={product.description}
        onChange={(e) => setProduct({ ...product, description: e.target.value })}
        required
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
