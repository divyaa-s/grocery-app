const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Link to User model
    required: true,
  },
  address: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    default: '',
  },
  preferences: {
    type: Map,
    of: String, // Key-value pairs for user preferences
  },
});

const UserProfile = mongoose.model('UserProfile', UserProfileSchema);

module.exports = UserProfile;
