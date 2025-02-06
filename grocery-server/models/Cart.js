const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Link to User model
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Link to Product model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  totalPrice: {
    type: Number,
    default: 0, // Optionally calculated at the backend
  },
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
