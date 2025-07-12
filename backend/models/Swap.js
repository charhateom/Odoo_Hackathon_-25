const mongoose = require('mongoose');

const swapSchema = new mongoose.Schema({
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  offeredSkill: String,
  wantedSkill: String,
  message: String,
  status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' }
});

module.exports = mongoose.model('Swap', swapSchema);
