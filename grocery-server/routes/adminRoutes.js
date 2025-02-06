const express = require('express');
const { getDashboardStats, manageUsers, manageProducts } = require('../controllers/adminController');
const router = express.Router();

// Get Admin Dashboard Stats
router.get('/stats', getDashboardStats);

// Manage Users
router.get('/users', manageUsers);

// Manage Products
router.get('/products', manageProducts);

module.exports = router;
