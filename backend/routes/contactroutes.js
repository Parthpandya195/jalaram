import express from "express";
import Contact from "../models/Contact.js";  // ✅ Import the Contact model

const router = express.Router();

// ✅ Route to handle contact form submissions
router.post("/", async (req, res) => {
  const { fullname, email, subject, phone, message } = req.body;

  // ✅ Validate the form data
  if (!fullname || !email || !subject || !phone || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // ✅ Save the form data to MongoDB
    const newContact = new Contact({
      fullname,
      email,
      subject,
      phone,
      message
    });

    await newContact.save();

    res.status(201).json({ message: "✅ Message saved successfully!" });

  } catch (error) {
    console.error("❌ Error saving message:", error);
    res.status(500).json({ message: "❌ Server error. Try again later." });
  }
});

export default router;
