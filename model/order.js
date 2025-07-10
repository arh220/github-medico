const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  addre: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  mo: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  cartItems: [
    {
      productId: mongoose.Schema.Types.ObjectId,
      name: String,
      quantity: Number,
      price: Number,
      total: Number
    }
  ],
  subtotal: {
    type: Number
  },
  shipping: {
    type: Number
  },
  grandTotal: {
    type: Number
  },
  createdAt: { type: Date, default: Date.now }
});
const order = mongoose.model("order", checkoutSchema);
module.exports = order;
