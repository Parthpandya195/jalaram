import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String },
  phone: { type: String },
  message: { type: String, required: true },
});

export default mongoose.model("Contact", contactSchema);
