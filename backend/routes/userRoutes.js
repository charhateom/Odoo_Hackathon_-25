// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const {
//   registerUser,
//   loginUser,
//   getUserProfile,
//   updateUserProfile
// } = require('../controllers/userController');
// const { getPublicUsers } = require('../controllers/userController');
// const { getUserById } = require('../controllers/userController');

// const protect = require('../middleware/auth');

// // Public
// router.post('/register', registerUser);
// router.post('/login', loginUser);

// // Protected
// router.get('/profile', protect, getUserProfile);
// router.put('/profile', protect, updateUserProfile);
// // GET /api/users/public
// router.get('/public', getPublicUsers);
// router.get('/:id', getUserById);

// module.exports = router;


const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getPublicUsers,
  getUserById
} = require('../controllers/userController');
const protect = require('../middleware/auth');

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/public', getPublicUsers);

// Protected Routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

// Must be last: dynamic user route
router.get('/:id', getUserById);

module.exports = router;
