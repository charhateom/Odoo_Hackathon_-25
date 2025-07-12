const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  location: String,
  profilePhoto: String,
  skillsOffered: [String],
  skillsWanted: [String],
  availability: String,
  profileVisibility: { type: String, enum: ['Public', 'Private'], default: 'Public' },
  isAdmin: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  feedbacks: [{ userId: String, feedback: String }]
});

module.exports = mongoose.model('User', userSchema);
