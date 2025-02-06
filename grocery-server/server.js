const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS

// ✅ Asynchronous MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || '<mongodb_uri>', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ Connected to MongoDB');
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err);
        process.exit(1); // Exit process if DB connection fails
    }
};

// ✅ Call the function to connect
connectDB();

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

// ✅ Default Route (Fixes "Cannot GET /" Error)
app.get('/', (req, res) => {
    res.send('🚀 Grocery App Server is Running!');
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
