const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile
} = require('../controllers/userController');
const { getPublicUsers } = require('../controllers/userController');

const protect = require('../middleware/auth');

// Public
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
// GET /api/users/public
router.get('/public', getPublicUsers);

module.exports = router;
