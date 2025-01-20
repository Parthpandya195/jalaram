const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  quantity: Number,
  user: String,
});

module.exports = mongoose.model('Order', orderSchema);
