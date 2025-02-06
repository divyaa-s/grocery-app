const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const productsRoutes = require('./routes/products'); // Import the products route
const authRoutes = require('./routes/authRoutes');
const userRoutes = require("./routes/userRoutes"); // Import routes


dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parses form data

app.use(cors()); // Enable CORS

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongo_uri', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1); // Exit process if DB connection fails
  }
};

connectDB();

// Use the product routes for handling product-related requests
app.use('/api/products', productsRoutes);  // This should handle all routes starting with /api/products
app.use('/api/auth', authRoutes);  // Add this line to handle authentication routes
app.use('/api/admins', require('./routes/adminRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use("/api", userRoutes); // Use the user routes

// Default Route
app.get('/', (req, res) => {
  res.send('🚀 Grocery App Server is Running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
