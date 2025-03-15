import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    buyerName: String,
    email: String,
    phone: String,
    products: [{ name: String, price: Number, image: String, quantity: Number }],
    deliveryDetails: {
      address: String,
    },
    status: { type: String, default: "Pending" }, // Pending → Confirmed
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
