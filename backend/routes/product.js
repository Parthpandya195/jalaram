import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// ✅ Fetch all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// ✅ Add a new product (NO category validation)
router.post("/", async (req, res) => {
  const { name, image, price, description } = req.body;  // Removed category

  // ✅ Validate required fields
  if (!name || !image || !price || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newProduct = new Product({
      name,
      image,
      price: Number(price),      // Ensure price is saved as a number
      description
    });

    await newProduct.save();
    res.status(201).json({
      message: "✅ Product added successfully!",
      product: newProduct,
    });

  } catch (error) {
    console.error("❌ Error adding product:", error);
    res.status(500).json({ message: "Failed to add product" });
  }
});

// ✅ Update a product by ID
router.put("/:id", async (req, res) => {
  const { name, image, price, description } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, image, price: Number(price), description },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "✅ Product updated successfully!",
      product: updatedProduct,
    });

  } catch (error) {
    console.error("❌ Error updating product:", error);
    res.status(500).json({ message: "Failed to update product" });
  }
});

// ✅ Delete a product by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "✅ Product deleted successfully!" });
  } catch (error) {
    console.error("❌ Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
});

export default router;
