const Product = require('../models/Product');

// Get Home Page Data
const getHomeData = async (req, res) => {
  try {
    const products = await Product.find().limit(10);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { getHomeData };
