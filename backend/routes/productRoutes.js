import express from "express";
import { getAllProducts, addProduct, deleteProduct } from "../controllers/productController.js";

const router = express.Router();

// ✅ Route to Get All Products
router.get("/", getAllProducts);

// ✅ Route to Add a New Product
router.post("/", addProduct);

// ✅ Route to Delete a Product by ID
router.delete("/:id", deleteProduct);

export default router;
