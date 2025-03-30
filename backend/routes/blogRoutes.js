import express from "express";
import BlogContact from "../models/BlogContact.js";

const router = express.Router();

// ✅ Route to handle form submission
router.post("/", async (req, res) => {
  const { fullname, email, subject, phone, message } = req.body;

  // ✅ Basic validation
  if (!fullname || !email || !subject || !phone || !message) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const newContact = new BlogContact({
      fullname,
      email,
      subject,
      phone,
      message,
    });

    await newContact.save();
    res.status(201).json({ success: true, message: "Message saved successfully!" });

  } catch (error) {
    console.error("❌ Error saving message:", error);
    res.status(500).json({ success: false, message: "Failed to save message" });
  }
});

export default router;
