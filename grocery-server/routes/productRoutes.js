const express = require('express');
const { getProducts, addProduct, getProductById } = require('../controllers/productController');
const router = express.Router();

// Get All Products
router.get('/', getProducts);

// Add a New Product
router.post('/', addProduct);

// Get a Single Product by ID
router.get('/:id', getProductById);

module.exports = router;
