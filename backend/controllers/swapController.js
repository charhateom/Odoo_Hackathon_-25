
const Swap = require('../models/Swap');

// Send a swap request
exports.sendSwapRequest = async (req, res) => {
  const { toUserId, offeredSkill, wantedSkill, message } = req.body;

  const newSwap = await Swap.create({
    fromUser: req.user._id,
    toUser: toUserId,
    offeredSkill,
    wantedSkill,
    message
  });

  res.status(201).json(newSwap);
};

// Get all swaps for logged-in user
exports.getMySwaps = async (req, res) => {
  const swaps = await Swap.find({
    $or: [{ fromUser: req.user._id }, { toUser: req.user._id }]
  })
    .populate('fromUser', 'name email')
    .populate('toUser', 'name email');

  res.json(swaps);
};

// Accept/Reject swap
exports.updateSwapStatus = async (req, res) => {
  const swap = await Swap.findById(req.params.id);
  if (!swap) return res.status(404).json({ message: 'Swap not found' });

  // Only the recipient can update status
  if (swap.toUser.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  swap.status = req.body.status;
  await swap.save();
  res.json(swap);
};

// Delete swap
exports.deleteSwap = async (req, res) => {
  try {
    const swap = await Swap.findById(req.params.id);
    if (!swap) return res.status(404).json({ message: 'Swap not found' });

    if (
      swap.fromUser.toString() !== req.user._id.toString() &&
      swap.toUser.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized to delete this' });
    }

    await Swap.deleteOne({ _id: req.params.id });
    res.json({ message: 'Swap deleted successfully' });
  } catch (err) {
    console.error('Delete Swap Error:', err.message);
    res.status(500).json({ message: 'Server error while deleting swap' });
  }
};

// Get a single swap by ID (optional)
exports.getSwapById = async (req, res) => {
  try {
    const swap = await Swap.findById(req.params.id)
      .populate('fromUser', 'name email')
      .populate('toUser', 'name email');

    if (!swap) return res.status(404).json({ message: 'Swap not found' });

    res.json(swap);
  } catch (err) {
    console.error('getSwapById Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
