const express = require('express');
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');
const router = express.Router();

// Add Item to Cart
router.post('/add', addToCart);

// Get Cart Items
router.get('/', getCart);

// Remove Item from Cart
router.delete('/remove/:id', removeFromCart);

module.exports = router;
