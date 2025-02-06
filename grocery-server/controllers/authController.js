const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');
require('dotenv').config();  // Load environment variables

// Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('🔹 Login attempt:', { email });

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ msg: "Email and password are required" });
        }

        // Find user by email
        let user = await User.findOne({ email });
        let isAdmin = false;

        // If no user found in users collection, check in the admins collection
        if (!user) {
            user = await Admin.findOne({ email });
            if (user) {
                isAdmin = true;
                console.log('✅ Admin found:', user.email);
            }
        } else {
            console.log('✅ User found:', user.email);
        }

        if (!user) {
            console.log('❌ No user or admin found');
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        console.log('🔹 Stored Password Hash:', user.password);

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('❌ Password mismatch');
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, isAdmin },  
            process.env.JWT_SECRET,  // Use environment variable for the secret key
            { expiresIn: '1h' }
        );

        console.log('✅ Login successful');
        res.json({
            token, 
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email,
                isAdmin, // Ensure `isAdmin` is included in the response
 
            }
        });

    } catch (error) {
        console.error('🔥 Login error:', error);
        res.status(500).json({ msg: "Server error" });
    }
};

// Register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ msg: "Email and password are required" });
        }

        // Check if user already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: "User already exists" });

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        let newUser = new User({ name, email, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ msg: "User registered successfully" });

    } catch (error) {
        console.error("🔥 Registration error:", error);
        res.status(500).json({ msg: "Server error" });
    }
};

// Logout user
const logoutUser = (req, res) => {
    res.json({ msg: "Logout successful" });
};

module.exports = { loginUser, registerUser, logoutUser };
