const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/orderModel');

// Get Dashboard Stats
const getDashboardStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const productCount = await Product.countDocuments();
    const orderCount = await Order.countDocuments();

    res.json({ userCount, productCount, orderCount });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Manage Users
const manageUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Manage Products
const manageProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { getDashboardStats, manageUsers, manageProducts };
