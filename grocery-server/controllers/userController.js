const User = require('../models/User');

// Get User Profile
const getUserProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
  const { userId } = req.params;
  const { name, email, password } = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, { name, email, password }, { new: true });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { getUserProfile, updateUserProfile };
