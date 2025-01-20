import { Product } from '../models/Product.js'; // Use named import


// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch products. Please try again later.', 
      error: error.message 
    });
  }
};

// Add a new product
export const addProduct = async (req, res) => {
  try {
    const { id, name, image, price, description } = req.body;

    if (!id || !name || !image || !price || !description) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields (id, name, image, price, description) are required.' 
      });
    }

    const newProduct = new Product({ id, name, image, price, description });
    await newProduct.save();

    res.status(201).json({ 
      success: true, 
      message: 'Product added successfully.', 
      data: newProduct 
    });
  } catch (error) {
    console.error('Error adding product:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to add product. Please try again later.', 
      error: error.message 
    });
  }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid product ID format.' 
      });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found.' 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Product deleted successfully.', 
      data: deletedProduct 
    });
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete product. Please try again later.', 
      error: error.message 
    });
  }
};
