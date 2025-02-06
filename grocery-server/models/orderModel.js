// models/orderModel.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cartItems: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
