import React, { useEffect, useState } from 'react';
import api from '../api/api';
import Header from '../components/Header.jsx';

// Decode JWT to extract user ID
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
      fetchSwaps();
    } catch (err) {
      alert('Failed to update swap');
    }
  };

  const deleteSwap = async (id) => {
    if (!window.confirm('Delete this swap request?')) return;
    try {
      await api.delete(`/swaps/${id}`);
      fetchSwaps();
    } catch (err) {
      alert('Failed to delete swap');
    }
  };

  const currentUserId = parseJwt(localStorage.getItem('token'))?.id;

  return (
    <>
      <Header />
      <style>{`
        .inbox-container {
          max-width: 800px;
          margin: 2rem auto;
          padding: 0 1rem;
        }

        .inbox-container h2 {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 1.5rem;
          color: #333;
        }

        .swap-card {
          border: 1px solid #ddd;
          border-radius: 10px;
          padding: 1rem;
          margin-bottom: 1rem;
          background-color: #fdfdfd;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s ease;
        }

        .swap-card:hover {
          transform: scale(1.01);
        }

        .swap-card p {
          margin: 0.5rem 0;
          color: #444;
        }

        .swap-card strong {
          color: #222;
        }

        .swap-buttons {
          margin-top: 1rem;
        }

        .swap-buttons button {
          margin-right: 0.5rem;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 5px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .swap-buttons button:nth-child(1) {
          background-color: #4caf50;
          color: white;
        }

        .swap-buttons button:nth-child(2) {
          background-color: #f44336;
          color: white;
        }

        .swap-buttons .delete-btn {
          background-color: transparent;
          color: #f44336;
          border: 1px solid #f44336;
          margin-top: 0.5rem;
        }

        @media (max-width: 600px) {
          .swap-card {
            padding: 0.8rem;
          }

          .swap-buttons button {
            width: 100%;
            margin-bottom: 0.5rem;
          }

          .swap-buttons {
            display: flex;
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}</style>

      <div className="inbox-container">
        <h2>Swap Inbox</h2>
        {swaps.length === 0 && <p>No swap requests yet.</p>}
        {swaps.map((swap) => (
          <div key={swap._id} className="swap-card">
            <p><strong>From:</strong> {swap.fromUser?.name}</p>
            <p><strong>To:</strong> {swap.toUser?.name}</p>
            <p><strong>Offered Skill:</strong> {swap.offeredSkill}</p>
            <p><strong>Wanted Skill:</strong> {swap.wantedSkill}</p>
            <p><strong>Message:</strong> {swap.message}</p>
            <p><strong>Status:</strong> {swap.status}</p>

            {localStorage.getItem('token') &&
              swap.toUser?._id === currentUserId &&
              swap.status === 'Pending' && (
                <div className="swap-buttons">
                  <button onClick={() => updateSwapStatus(swap._id, 'Accepted')}>Accept</button>
                  <button onClick={() => updateSwapStatus(swap._id, 'Rejected')}>Reject</button>
                </div>
              )}

            {(swap.fromUser?._id === currentUserId || swap.toUser?._id === currentUserId) && (
              <div className="swap-buttons">
                <button onClick={() => deleteSwap(swap._id)} className="delete-btn">Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default SwapInboxPage;
