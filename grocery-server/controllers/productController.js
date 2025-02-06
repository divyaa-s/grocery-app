const Product = require('../models/Product');

// Get All Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Add a New Product
const addProduct = async (req, res) => {
  const { name, price, image, description, stock, category } = req.body;

  try {
    const newProduct = await Product.create({ name, price, image, description, stock, category });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get Product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { getProducts, addProduct, getProductById };
