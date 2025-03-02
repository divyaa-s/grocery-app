const mongoose = require('mongoose');

// Define schema for admin users
const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    name: { type: String, required: true},
});

// Create model for admin
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
