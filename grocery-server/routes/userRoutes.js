const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const router = express.Router();

// Get User Profile
router.get('/:userId', getUserProfile);

// Update User Profile
router.put('/:userId', updateUserProfile);

module.exports = router;
