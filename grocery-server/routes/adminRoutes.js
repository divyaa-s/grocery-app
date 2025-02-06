const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin'); // Your Admin model

// Get admin details (only one admin exists)
router.get('/', async (req, res) => {
    try {
        const admin = await Admin.findOne(); // Fetch the only admin
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
