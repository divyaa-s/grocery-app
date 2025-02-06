const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  loginTime: {
    type: Date,
    default: Date.now,
  },
  ipAddress: {
    type: String,
  },
  successful: {
    type: Boolean,
    default: true,
  },
});

const Login = mongoose.model('Login', LoginSchema);

module.exports = Login;
