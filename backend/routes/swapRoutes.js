
const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  sendSwapRequest,
  getMySwaps,
  updateSwapStatus,
  deleteSwap,
  getSwapById,
} = require('../controllers/swapController');

router.post('/', protect, sendSwapRequest);
router.get('/', protect, getMySwaps);
router.put('/:id', protect, updateSwapStatus);
router.delete('/:id', protect, deleteSwap);
router.get('/:id', protect, getSwapById); // Optional, for viewing a single swap

module.exports = router;
