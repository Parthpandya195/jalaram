import express from "express";
import BlogContact from "../models/BlogContact.js";

const router = express.Router();

// ✅ POST: Store contact form data in MongoDB
router.post("/", async (req, res) => {
  try {
    const { fullname, email, subject, phone, message } = req.body;

    if (!fullname || !email || !subject || !phone || !message) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const newContact = new BlogContact({ fullname, email, subject, phone, message });
    await newContact.save();

    res.status(201).json({ success: true, message: "✅ Data saved successfully!" });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ success: false, message: "❌ Server error. Try again." });
  }
});

// ✅ GET: Retrieve all blog contacts (for admin view)
router.get("/", async (req, res) => {
  try {
    const contacts = await BlogContact.find();
    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ success: false, message: "❌ Server error. Try again." });
  }
});

export default router;
