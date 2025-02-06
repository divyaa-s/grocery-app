const mongoose = require('mongoose');

// Define the schema
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Removes extra spaces
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Validation: Price must be non-negative
  },
  image: {
    type: String,
    required: true,
  },
});

// Create the model
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
