const express = require('express');
const { createOrder, getOrders } = require('../controllers/orderController');
const router = express.Router();

// Create a New Order
router.post('/', createOrder);

// Get All Orders by User
router.get('/:userId', getOrders);

module.exports = router;
