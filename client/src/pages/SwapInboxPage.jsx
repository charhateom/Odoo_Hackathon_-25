import React, { useEffect, useState } from 'react';
import api from '../api/api';

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
      alert('Failed to update swap');
    }
  };

  const deleteSwap = async (id) => {
    if (!window.confirm('Delete this swap request?')) return;
    try {
      await api.delete(`/swaps/${id}`);
      fetchSwaps(); // Refresh
    } catch (err) {
      alert('Failed to delete swap');
    }
  };

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

          {/* If current user is recipient, show accept/reject */}
          {localStorage.getItem('token') && swap.toUser?._id === parseJwt(localStorage.getItem('token')).id && swap.status === 'Pending' && (
            <>
              <button onClick={() => updateSwapStatus(swap._id, 'Accepted')}>Accept</button>
              <button onClick={() => updateSwapStatus(swap._id, 'Rejected')}>Reject</button>
            </>
          )}

          {/* Anyone involved can delete */}
          <button onClick={() => deleteSwap(swap._id)} style={{ marginLeft: '10px', color: 'red' }}>Delete</button>
        </div>
      ))}
    </div>
  );
};

//Decode JWT to extract user id
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return {};
  }
}

export default SwapInboxPage;
