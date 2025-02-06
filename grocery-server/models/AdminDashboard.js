const mongoose = require('mongoose');

const AdminDashboardSchema = new mongoose.Schema({
  totalUsers: {
    type: Number,
    default: 0,
  },
  totalProducts: {
    type: Number,
    default: 0,
  },
  totalOrders: {
    type: Number,
    default: 0,
  },
  totalSales: {
    type: Number,
    default: 0,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const AdminDashboard = mongoose.model('AdminDashboard', AdminDashboardSchema);

module.exports = AdminDashboard;
