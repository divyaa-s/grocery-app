const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');
const homeRoutes = require('./routes/homeRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // For parsing JSON bodies

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/home', homeRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: 'Server Error' });
});

module.exports = app;
