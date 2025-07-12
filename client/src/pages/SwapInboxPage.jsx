// import React, { useEffect, useState } from 'react';
// import api from '../api/api';
// import Header from '../components/Header.jsx';

// // Decode JWT to extract user ID
// function parseJwt(token) {
//   try {
//     return JSON.parse(atob(token.split('.')[1]));
//   } catch (e) {
//     return {};
//   }
// }

// const SwapInboxPage = () => {
//   const [swaps, setSwaps] = useState([]);

//   const fetchSwaps = async () => {
//     try {
//       const { data } = await api.get('/swaps');
//       setSwaps(data);
//     } catch (err) {
//       alert('Failed to load swaps');
//     }
//   };

//   useEffect(() => {
//     fetchSwaps();
//   }, []);

//   const updateSwapStatus = async (id, status) => {
//     try {
//       await api.put(`/swaps/${id}`, { status });
//       fetchSwaps();
//     } catch (err) {
//       alert('Failed to update swap');
//     }
//   };

//   const deleteSwap = async (id) => {
//     if (!window.confirm('Delete this swap request?')) return;
//     try {
//       await api.delete(`/swaps/${id}`);
//       fetchSwaps();
//     } catch (err) {
//       alert('Failed to delete swap');
//     }
//   };

//   const currentUserId = parseJwt(localStorage.getItem('token'))?.id;

//   return (
//     <>
//       <Header />
//       <style>{`
//         .inbox-container {
//           max-width: 800px;
//           margin: 2rem auto;
//           padding: 0 1rem;
//         }

//         .inbox-container h2 {
//           text-align: center;
//           font-size: 2rem;
//           margin-bottom: 1.5rem;
//           color: #333;
//         }

//         .swap-card {
//           border: 1px solid #ddd;
//           border-radius: 10px;
//           padding: 1rem;
//           margin-bottom: 1rem;
//           background-color: #fdfdfd;
//           box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
//           transition: transform 0.2s ease;
//         }

//         .swap-card:hover {
//           transform: scale(1.01);
//         }

//         .swap-card p {
//           margin: 0.5rem 0;
//           color: #444;
//         }

//         .swap-card strong {
//           color: #222;
//         }

//         .swap-buttons {
//           margin-top: 1rem;
//         }

//         .swap-buttons button {
//           margin-right: 0.5rem;
//           padding: 0.5rem 1rem;
//           border: none;
//           border-radius: 5px;
//           font-weight: 500;
//           cursor: pointer;
//           transition: background-color 0.2s ease;
//         }

//         .swap-buttons button:nth-child(1) {
//           background-color: #4caf50;
//           color: white;
//         }

//         .swap-buttons button:nth-child(2) {
//           background-color: #f44336;
//           color: white;
//         }

//         .swap-buttons .delete-btn {
//           background-color: transparent;
//           color: #f44336;
//           border: 1px solid #f44336;
//           margin-top: 0.5rem;
//         }

//         @media (max-width: 600px) {
//           .swap-card {
//             padding: 0.8rem;
//           }

//           .swap-buttons button {
//             width: 100%;
//             margin-bottom: 0.5rem;
//           }

//           .swap-buttons {
//             display: flex;
//             flex-direction: column;
//             align-items: stretch;
//           }
//         }
//       `}</style>

//       <div className="inbox-container">
//         <h2>Swap Inbox</h2>
//         {swaps.length === 0 && <p>No swap requests yet.</p>}
//         {swaps.map((swap) => (
//           <div key={swap._id} className="swap-card">
//             <p><strong>From:</strong> {swap.fromUser?.name}</p>
//             <p><strong>To:</strong> {swap.toUser?.name}</p>
//             <p><strong>Offered Skill:</strong> {swap.offeredSkill}</p>
//             <p><strong>Wanted Skill:</strong> {swap.wantedSkill}</p>
//             <p><strong>Message:</strong> {swap.message}</p>
//             <p><strong>Status:</strong> {swap.status}</p>

//             {localStorage.getItem('token') &&
//               swap.toUser?._id === currentUserId &&
//               swap.status === 'Pending' && (
//                 <div className="swap-buttons">
//                   <button onClick={() => updateSwapStatus(swap._id, 'Accepted')}>Accept</button>
//                   <button onClick={() => updateSwapStatus(swap._id, 'Rejected')}>Reject</button>
//                 </div>
//               )}

//             {(swap.fromUser?._id === currentUserId || swap.toUser?._id === currentUserId) && (
//               <div className="swap-buttons">
//                 <button onClick={() => deleteSwap(swap._id)} className="delete-btn">Delete</button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default SwapInboxPage;


import React, { useEffect, useState } from 'react';
import api from '../api/api';
import Header from '../components/Header.jsx';

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return {};
  }
};

const SwapInboxPage = () => {
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUserId = parseJwt(localStorage.getItem('token'))?.id;

  const fetchSwaps = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get('/swaps');
      setSwaps(data);
    } catch (err) {
      setError('Failed to load swap requests. Please try again.');
    } finally {
      setLoading(false);
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
      setError(`Failed to ${status.toLowerCase()} swap request`);
    }
  };

  const deleteSwap = async (id) => {
    if (!window.confirm('Are you sure you want to delete this swap request?')) return;
    try {
      await api.delete(`/swaps/${id}`);
      fetchSwaps();
    } catch (err) {
      setError('Failed to delete swap request');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Swap Inbox</h1>
            <p className="mt-2 text-lg text-gray-600">Manage your skill exchange requests</p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : swaps.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No swap requests</h3>
              <p className="mt-1 text-gray-500">You don't have any swap requests yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {swaps.map((swap) => (
                <div key={swap._id} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {swap.fromUser?._id === currentUserId ? (
                            <>Your request to <span className="font-semibold">{swap.toUser?.name}</span></>
                          ) : (
                            <>Request from <span className="font-semibold">{swap.fromUser?.name}</span></>
                          )}
                        </h3>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(swap.status)}`}>
                        {swap.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <h4 className="text-sm font-medium text-blue-800 mb-1">Offered Skill</h4>
                        <p className="text-gray-900 font-medium">{swap.offeredSkill}</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <h4 className="text-sm font-medium text-green-800 mb-1">Wanted Skill</h4>
                        <p className="text-gray-900 font-medium">{swap.wantedSkill}</p>
                      </div>
                    </div>

                    {swap.message && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Message</h4>
                        <p className="text-gray-700">{swap.message}</p>
                      </div>
                    )}

                    <div className="mt-6 flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                      {swap.toUser?._id === currentUserId && swap.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => updateSwapStatus(swap._id, 'Accepted')}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Accept
                          </button>
                          <button
                            onClick={() => updateSwapStatus(swap._id, 'Rejected')}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Reject
                          </button>
                        </>
                      )}
                      {(swap.fromUser?._id === currentUserId || swap.toUser?._id === currentUserId) && (
                        <button
                          onClick={() => deleteSwap(swap._id)}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SwapInboxPage;