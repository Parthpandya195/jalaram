import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true } // ✅ Automatically adds createdAt and updatedAt
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
