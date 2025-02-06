const express = require('express');
const { getHomeData } = require('../controllers/homeController');
const router = express.Router();

// Get Home Page Data
router.get('/', getHomeData);

module.exports = router;
