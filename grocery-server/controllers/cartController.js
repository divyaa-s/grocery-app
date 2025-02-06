const Cart = require('../models/Cart');

// Add Item to Cart
const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const cartItem = await Cart.findOne({ user: userId, product: productId });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      await Cart.create({ user: userId, product: productId, quantity });
    }

    res.status(201).json({ message: 'Item added to cart' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get Cart Items
const getCart = async (req, res) => {
  const { userId } = req.query;

  try {
    const cartItems = await Cart.find({ user: userId }).populate('product');
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Remove Item from Cart
const removeFromCart = async (req, res) => {
  const { id } = req.params;

  try {
    await Cart.findByIdAndDelete(id);
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { addToCart, getCart, removeFromCart };
