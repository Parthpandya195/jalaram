const express = require('express');
const { placeOrder } = require('../controllers/orderController');
const router = express.Router();
const Order = require("../models/Order");
const nodemailer = require("nodemailer");

// ✅ Existing route for placing an order
router.post('/', placeOrder);

// ✅ Route for confirming an order without sending an email
router.put("/:id/confirm", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).send("Order not found");
    }

    // ✅ Update order status to "Confirmed"
    order.status = "Confirmed";
    await order.save();

    res.status(200).send("✅ Order confirmed successfully!");
  } catch (error) {
    console.error("Error confirming order:", error);
    res.status(500).send("❌ Failed to confirm order.");
  }
});

// ✅ New route for confirming an order + sending email
router.put("/:id/confirm-email", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).send("Order not found");
    }

    // ✅ Update order status to "Confirmed"
    order.status = "Confirmed";
    await order.save();

    // ✅ Email setup with Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "pandyaparth158@gmail.com",         // ✅ Your Gmail ID
        pass: "Parth@1905",                     // ✅ Your Gmail password or app password
      },
    });

    const mailOptions = {
      from: "pandyaparth158@gmail.com",
      to: order.email,                         // ✅ Send to the order's email
      subject: "Order Confirmation ✅",
      html: `
        <h1>Jalaram Interior Welcomes You</h1>
        <h2>Order Confirmed</h2>
        <p>Dear ${order.buyerName},</p>
        <p>Your order has been successfully confirmed.</p>
        <p>Our team will contact you soon for payment and re-confirmation.</p>
        <p>Thank you for shopping with us!</p>
        <p>📦 Products: ${order.products.length} items</p>
        <p>📧 Email: ${order.email}</p>
        <p>📞 Phone: ${order.phone}</p>
        <br />
        <p>Regards,</p>
        <p>Jalaram Interior Pvt Ltd</p>
        <p>PARTH PANDYA - CEO</p>
        <p>RUSHANG KAVA</p>
        <p>VIVEK BHAKHAR</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send("✅ Order confirmed and email sent!");

  } catch (error) {
    console.error("Error confirming order with email:", error);
    res.status(500).send("❌ Failed to confirm order with email.");
  }
});

module.exports = router;
