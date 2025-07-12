
import React, { useEffect, useState } from 'react';
import api from '../api/api';

const SwapInboxPage = () => {
  const [swaps, setSwaps] = useState([]);

  useEffect(() => {
    fetchSwaps();
  }, []);

  const fetchSwaps = async () => {
    try {
      const { data } = await api.get('/swaps');
      setSwaps(data);
    } catch (err) {
      alert('Failed to load swaps');
    }
  };

  const updateSwapStatus = async (id, status) => {
    try {
      await api.put(`/swaps/${id}`, { status });
      fetchSwaps(); // Refresh the list
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

      {swaps.map((swap) => (
        <div
          key={swap._id}
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '8px',
          }}
        >
          <p><strong>From:</strong> {swap.fromUser?.name}</p>
          <p><strong>To:</strong> {swap.toUser?.name}</p>
          <p><strong>Offered Skill:</strong> {swap.offeredSkill}</p>
          <p><strong>Wanted Skill:</strong> {swap.wantedSkill}</p>
          <p><strong>Message:</strong> {swap.message}</p>
          <p><strong>Status:</strong> {swap.status}</p>

          <div style={{ marginTop: '10px' }}>
            <button
              onClick={() => updateSwapStatus(swap._id, 'Accepted')}
              style={{
                background: 'green',
                color: 'white',
                padding: '6px 12px',
                marginRight: '10px',
                border: 'none',
                borderRadius: '4px',
              }}
            >
              Accept
            </button>

            <button
              onClick={() => updateSwapStatus(swap._id, 'Rejected')}
              style={{
                background: 'orange',
                color: 'white',
                padding: '6px 12px',
                marginRight: '10px',
                border: 'none',
                borderRadius: '4px',
              }}
            >
              Reject
            </button>

            <button
              onClick={() => deleteSwap(swap._id)}
              style={{
                background: 'red',
                color: 'white',
                padding: '6px 12px',
                border: 'none',
                borderRadius: '4px',
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SwapInboxPage;
