// controllers/orderController.js
const Order = require("../models/orderModel"); // Ensure this model exists

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { userId, cartItems, totalAmount } = req.body;

    if (!userId || !cartItems || cartItems.length === 0 || !totalAmount) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const newOrder = new Order({ userId, cartItems, totalAmount });
    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all orders by user
const getOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Export the functions
module.exports = { createOrder, getOrders };
