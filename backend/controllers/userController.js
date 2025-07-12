// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // Create Token
// const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// // Register
// exports.registerUser = async (req, res) => {
//   const { name, email, password } = req.body;
//   const exists = await User.findOne({ email });

//   if (exists) return res.status(400).json({ message: 'User already exists' });

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = await User.create({ name, email, password: hashedPassword });

//   res.status(201).json({ 
//     _id: user._id,
//     name: user.name,
//     email: user.email,
//     token: generateToken(user._id),
//   });
// };

// // Login
// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });

//   if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//   const match = await bcrypt.compare(password, user.password);
//   if (!match) return res.status(400).json({ message: 'Invalid credentials' });

//   res.json({ 
//     _id: user._id,
//     name: user.name,
//     email: user.email,
//     token: generateToken(user._id),
//   });
// };

// // Get Profile
// exports.getUserProfile = async (req, res) => {
//   res.json(req.user);
// };

// // Update Profile
// exports.updateUserProfile = async (req, res) => {
//   const user = await User.findById(req.user._id);

//   if (user) {
//     user.name = req.body.name || user.name;
//     user.location = req.body.location || user.location;
//     user.profilePhoto = req.body.profilePhoto || user.profilePhoto;
//     user.skillsOffered = req.body.skillsOffered || user.skillsOffered;
//     user.skillsWanted = req.body.skillsWanted || user.skillsWanted;
//     user.availability = req.body.availability || user.availability;
//     user.profileVisibility = req.body.profileVisibility || user.profileVisibility;

//     const updated = await user.save();
//     res.json(updated);
//   } else {
//     res.status(404).json({ message: 'User not found' });
//   }
// };


// exports.getPublicUsers = async (req, res) => {
//   try {
//     const users = await User.find({ profileVisibility: 'Public' }).select('-password');
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };


const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Create Token
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// Register
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });

  if (exists) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
};

// Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: 'Invalid credentials' });

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
};

// Get logged-in user profile
exports.getUserProfile = async (req, res) => {
  res.json(req.user);
};

// Update profile
exports.updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.location = req.body.location || user.location;
    user.profilePhoto = req.body.profilePhoto || user.profilePhoto;
    user.skillsOffered = req.body.skillsOffered || user.skillsOffered;
    user.skillsWanted = req.body.skillsWanted || user.skillsWanted;
    user.availability = req.body.availability || user.availability;
    user.profileVisibility = req.body.profileVisibility || user.profileVisibility;

    const updated = await user.save();
    res.json(updated);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// Get all public users
exports.getPublicUsers = async (req, res) => {
  try {
    const users = await User.find({ profileVisibility: 'Public' }).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get user by ID (for viewing profile)
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const user = await User.findById(id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error('getUserById error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
