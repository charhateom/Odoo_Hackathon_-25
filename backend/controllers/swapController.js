// const Swap = require('../models/Swap');

// // Send a swap request
// exports.sendSwapRequest = async (req, res) => {
//   const { toUserId, offeredSkill, wantedSkill, message } = req.body;

//   const newSwap = await Swap.create({
//     fromUser: req.user._id,
//     toUser: toUserId,
//     offeredSkill,
//     wantedSkill,
//     message
//   });

//   res.status(201).json(newSwap);
// };

// // Get all swaps for logged in user (sent or received)
// exports.getMySwaps = async (req, res) => {
//   const swaps = await Swap.find({
//     $or: [{ fromUser: req.user._id }, { toUser: req.user._id }]
//   })
//     .populate('fromUser', 'name email')
//     .populate('toUser', 'name email');

//   res.json(swaps);
// };

// // Accept/Reject swap
// exports.updateSwapStatus = async (req, res) => {
//   const swap = await Swap.findById(req.params.id);
//   if (!swap) return res.status(404).json({ message: 'Swap not found' });

//   // Only the recipient can update status
//   if (swap.toUser.toString() !== req.user._id.toString()) {
//     return res.status(403).json({ message: 'Not authorized' });
//   }

//   swap.status = req.body.status;
//   await swap.save();
//   res.json(swap);
// };

// // Delete swap request
// exports.deleteSwap = async (req, res) => {
//   try {
//     const swap = await Swap.findById(req.params.id);
//     if (!swap) return res.status(404).json({ message: 'Swap not found' });

//     // Only sender or receiver can delete
//     if (
//       swap.fromUser.toString() !== req.user._id.toString() &&
//       swap.toUser.toString() !== req.user._id.toString()
//     ) {
//       return res.status(403).json({ message: 'Not authorized to delete this' });
//     }

//     //  Use deleteOne instead of remove
//     await Swap.deleteOne({ _id: req.params.id });

//     res.json({ message: 'Swap deleted successfully' });
//   } catch (err) {
//     console.error('Delete Swap Error:', err.message);
//     res.status(500).json({ message: 'Server error while deleting swap' });
//   }
// };


// // Get a single swap by ID
// exports.getSwapById = async (req, res) => {
//   try {
//     const swap = await Swap.findById(req.params.id)
//       .populate('fromUser', 'name email')
//       .populate('toUser', 'name email');

//     if (!swap) {
//       return res.status(404).json({ message: 'Swap not found' });
//     }

//     res.json(swap);
//   } catch (err) {
//     console.error('getSwapById Error:', err.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

import React, { useEffect, useState } from 'react';
import api from '../api/api';

// Decode JWT to get user ID
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return {};
  }
}

const SwapInboxPage = () => {
  const [swaps, setSwaps] = useState([]);

  const fetchSwaps = async () => {
    try {
      const { data } = await api.get('/swaps');
      setSwaps(data);
    } catch (err) {
      alert('Failed to load swaps');
    }
  };

  useEffect(() => {
    fetchSwaps();
  }, []);

  const updateSwapStatus = async (id, status) => {
    try {
      await api.put(`/swaps/${id}`, { status });
      fetchSwaps(); // Refresh
    } catch (err) {
      alert('Failed to update swap status');
    }
  };

  const deleteSwap = async (id) => {
    if (!window.confirm('Are you sure you want to delete this swap request?')) return;
    try {
      await api.delete(`/swaps/${id}`);
      fetchSwaps(); // Refresh
    } catch (err) {
      alert('Failed to delete swap');
    }
  };

  const currentUserId = parseJwt(localStorage.getItem('token'))?.id;

  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      <h2>Swap Inbox</h2>
      {swaps.length === 0 && <p>No swap requests yet.</p>}
      {swaps.map(swap => (
        <div key={swap._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <p><strong>From:</strong> {swap.fromUser?.name}</p>
          <p><strong>To:</strong> {swap.toUser?.name}</p>
          <p><strong>Offered Skill:</strong> {swap.offeredSkill}</p>
          <p><strong>Wanted Skill:</strong> {swap.wantedSkill}</p>
          <p><strong>Message:</strong> {swap.message}</p>
          <p><strong>Status:</strong> {swap.status}</p>

          {/* Actions based on current user and status */}
          {swap.toUser?._id === currentUserId && swap.status === 'Pending' && (
            <>
              <button onClick={() => updateSwapStatus(swap._id, 'Accepted')}>Accept</button>{' '}
              <button onClick={() => updateSwapStatus(swap._id, 'Rejected')}>Reject</button>
            </>
          )}

          {/* Anyone involved can delete */}
          {(swap.fromUser?._id === currentUserId || swap.toUser?._id === currentUserId) && (
            <button onClick={() => deleteSwap(swap._id)} style={{ color: 'red', marginLeft: '10px' }}>
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default SwapInboxPage;
