const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/authController'); // ✅ Now it works!

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.get('/test', (req, res) => {
    res.send('Auth route working');
});

module.exports = router;
