import mongoose from "mongoose";

const blogContactSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const BlogContact = mongoose.model("blog-contact", blogContactSchema);
export default BlogContact;
