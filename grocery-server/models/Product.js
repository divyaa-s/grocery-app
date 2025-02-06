// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: false }  // Optional: Add image URL if you have images for products
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
