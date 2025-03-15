import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./config/db.js"; // MongoDB connection
import User from "./models/User.js";
import bcrypt from "bcryptjs"; // bcryptjs for password hashing
import authRoutes from "./routes/Auth.js";
import productRoutes from "./routes/productRoutes.js"; // Import product routes

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOptions));
app.options("*", cors());

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/testing", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));

app.use("/api/Auth", authRoutes);
app.use("/api/products", productRoutes);

// ====================== 🆕 ORDER SYSTEM (NO PAYMENT) ======================

// ✅ Define Order Schema
const orderSchema = new mongoose.Schema(
  {
    buyerName: String,
    email: String,
    phone: String,
    products: Array, // Cart items
    deliveryDetails: Object,
    status: { type: String, default: "Pending" }, // Default status
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

// ✅ User places an order (WITHOUT PAYMENT)
app.post("/api/order", async (req, res) => {
  try {
    const { buyerName, email, phone, products, deliveryDetails } = req.body;
    
    // Validate input
    if (!buyerName || !email || !phone || !products || !deliveryDetails) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Save the order in MongoDB
    const newOrder = new Order({ buyerName, email, phone, products, deliveryDetails });
    await newOrder.save();

    res.json({ success: true, message: "✅ Order placed successfully!", orderId: newOrder._id });
  } catch (error) {
    res.status(500).json({ success: false, message: "❌ Server error. Try again." });
  }
});

// ✅ Admin fetches all orders
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ success: false, message: "❌ Server error. Try again." });
  }
});

// ✅ Admin confirms an order
app.put("/api/orders/:id/confirm", async (req, res) => {
  try {
    const orderId = req.params.id;
    await Order.findByIdAndUpdate(orderId, { status: "Confirmed" });

    res.json({ success: true, message: "✅ Order confirmed!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "❌ Server error. Try again." });
  }
});

// ✅ Admin rejects an order
app.put("/api/orders/:id/reject", async (req, res) => {
  try {
    const orderId = req.params.id;
    await Order.findByIdAndUpdate(orderId, { status: "Rejected" });

    res.json({ success: true, message: "❌ Order rejected." });
  } catch (error) {
    res.status(500).json({ success: false, message: "❌ Server error. Try again." });
  }
});

// ✅ User tracks order status by Order ID
app.get("/api/orders/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "❌ Order not found." });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ success: false, message: "❌ Server error. Try again." });
  }
});

// ✅ Root route to verify server is running
app.get("/", (req, res) => {
  res.send("✅ Server is up and running!");
});

// ✅ Error Handling Middleware (for unexpected errors)
app.use((err, req, res, next) => {
  console.error("❌ Unexpected error:", err);
  res.status(500).json({ success: false, message: "An unexpected error occurred" });
});

// ✅ Default Route for Invalid API Endpoints
app.use((req, res) => {
  res.status(404).json({ success: false, message: "❌ API endpoint not found" });
});

// ✅ Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
