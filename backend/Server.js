import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import orderRoutes from "./routes/orderRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import products from "./routes/product.js"
import authRoutes from "./routes/auth.js"; 
import Order from "./models/order.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ CORS settings
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOptions));

// ✅ MongoDB Connection
connectDB();

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/testing", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));

// ✅ Use the routes
app.use("/api/orders", orderRoutes);       // Orders route
app.use("/api/blog-contact", blogRoutes);
app.use("/api/products", products);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);  
app.put("/api/orders/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ msg: `Order status updated to ${status}` });
  } catch (error) {
    console.error("❌ Error updating order status:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

app.get("/", (req, res) => {
  res.send("✅ Server is up and running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
