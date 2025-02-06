const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');



const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('🔹 Login attempt:', { email, password });

        let user = await User.findOne({ email });
        let isAdmin = false;

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

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, isAdmin },  
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OWJhNGYxMjk3MmRlMDdiZTc1MGMxYyIsImlhdCI6MTczODMzODQ2MCwiZXhwIjoxNzM4MzQyMDYwfQ.mGx-_UMYaYo4ey6n2IGfywBRTUj_XYgBydi-MbhtIak', 
            { expiresIn: '1h' }
        );

        console.log('✅ Login successful, sending response');

        res.json({ 
            token, 
            user: { id: user._id, email: user.email, isAdmin } 
        });

    } catch (error) {
        console.error('🔥 Login error:', error);
        res.status(500).json({ msg: "Server error", error });
    }
};


const registerUser = async (req, res) => {
    try {
        const { email, password, isAdmin } = req.body;

        // Check if user/admin already exists
        let existingUser = await User.findOne({ email });
        let existingAdmin = await Admin.findOne({ email });

        if (existingUser || existingAdmin) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save in correct collection
        let newUser;
        if (isAdmin) {
            newUser = new Admin({ email, password: hashedPassword });
        } else {
            newUser = new User({ email, password: hashedPassword });
        }

        await newUser.save();
        res.status(201).json({ msg: "User registered successfully" });

    } catch (error) {
        console.error("🔥 Registration error:", error);
        res.status(500).json({ msg: "Server error" });
    }
};


const logoutUser = async (req, res) => {
    try {
        res.json({ msg: "Logout successful" });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error });
    }
};


module.exports = {
    loginUser,
    registerUser,
    logoutUser,
};

