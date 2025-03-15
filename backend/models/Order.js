import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  cartItems: [{ name: String, price: Number, image: String, quantity: Number }],
  name: String,
  email: String,
  phone: String,
  address: String,
  utr: String,
  status: { type: String, default: "Pending" },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;
