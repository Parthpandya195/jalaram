import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// ✅ Store new order
router.post("/", async (req, res) => {
  console.log("🔥 Received Order Data:", req.body);  // Debug log

  const { buyerName, email, phone, products, deliveryDetails, status } = req.body;

  if (!buyerName || !email || !phone || !deliveryDetails || products.length === 0) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newOrder = new Order({
      buyerName,
      email,
      phone,
      address: deliveryDetails.address,  // Mapping address correctly
      products: products.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      status: status || "Pending"
    });

    await newOrder.save();
    console.log("✅ Order saved successfully:", newOrder);

    res.status(201).json({ success: true, message: "Order saved successfully!", order: newOrder });

  } catch (error) {
    console.error("❌ Error saving order:", error);
    res.status(500).json({ success: false, message: "Failed to save order" });
  }
});

// ✅ Fetch all orders with pagination & sorting
router.get("/", async (req, res) => {
  const { page = 1, limit = 10, sort = "-createdAt" } = req.query;

  try {
    const orders = await Order.find()
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalOrders = await Order.countDocuments();

    res.status(200).json({
      totalPages: Math.ceil(totalOrders / limit),
      currentPage: parseInt(page),
      orders,
    });

  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

// ✅ Fetch a single order by ID
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);

  } catch (error) {
    console.error("❌ Error fetching order by ID:", error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
});

// ✅ Update order status by ID
router.put("/:id/status", async (req, res) => {
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "✅ Order status updated successfully!",
      order: updatedOrder,
    });

  } catch (error) {
    console.error("❌ Error updating order status:", error);
    res.status(500).json({ message: "Failed to update order status" });
  }
});
router.get("/track/:phone", async (req, res) => {
  const { phone } = req.params;

  try {
    const orders = await Order.find({ phone });

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this number" });
    }

    res.status(200).json(orders);

  } catch (error) {
    console.error("❌ Error tracking order:", error);
    res.status(500).json({ message: "Failed to track order" });
  }
});
// ✅ Delete order by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "✅ Order deleted successfully",
      order: deletedOrder
    });

  } catch (error) {
    console.error("❌ Error deleting order:", error);
    res.status(500).json({ message: "Failed to delete order" });
  }
});
// ✅ Cancel all orders by phone number
router.put("/cancel/:phone", async (req, res) => {
  const { phone } = req.params;

  try {
    const result = await Order.updateMany(
      { phone },
      { $set: { status: "Cancelled" } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "No orders found for this number." });
    }

    res.status(200).json({ message: "✅ All orders cancelled successfully!" });
  } catch (error) {
    console.error("❌ Error cancelling orders:", error);
    res.status(500).json({ message: "Failed to cancel orders." });
  }
});

export default router;
