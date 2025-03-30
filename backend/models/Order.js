import mongoose from "mongoose";

// ✅ Reusable product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String }  // Optional image field
});

// ✅ Main order schema
const orderSchema = new mongoose.Schema({
  buyerName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  products: [productSchema],  // ✅ Using sub-schema for consistency
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Delivered", "Cancelled", "Rejected"],  // ✅ Added "Rejected" status
    default: "Pending"
  }
}, { timestamps: true });  // ✅ Adds createdAt and updatedAt fields

// ✅ Prevent OverwriteModelError
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
