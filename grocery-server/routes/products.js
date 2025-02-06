const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Your Product model

// Fetch all products from the database
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();  // This fetches all products from the DB
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

// Add a new product
router.post('/', async (req, res) => {
  const { name, price, img } = req.body;  // Accept name, price, and img in the body
  const newProduct = new Product({ name, price, img });

  try {
    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error adding product" });
  }
});

// Update product price
router.put('/:id', async (req, res) => {
  const { price } = req.body;  // Update only the price here

  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { price }, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
});

module.exports = router;
