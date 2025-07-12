// import React, { useState, useEffect } from 'react';
// import api from '../api/api';
// import { useNavigate } from 'react-router-dom';

// const SearchPage = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [results, setResults] = useState([]);
//   const navigate = useNavigate();

//   const fetchProfiles = async () => {
//     try {
//       const { data } = await api.get('/users/public');
//       setResults(data);
//     } catch (err) {
//       alert('Failed to fetch profiles');
//     }
//   };

//   const handleSearch = () => {
//     if (!searchTerm.trim()) {
//       fetchProfiles();
//       return;
//     }

//     const filtered = results.filter(profile =>
//       (profile.skillsOffered || []).some(skill =>
//         skill.toLowerCase().includes(searchTerm.toLowerCase())
//       ) ||
//       (profile.skillsWanted || []).some(skill =>
//         skill.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );
//     setResults(filtered);
//   };

//   useEffect(() => {
//     fetchProfiles();
//   }, []);

//   return (
//     <div style={{ maxWidth: '800px', margin: 'auto' }}>
//       <h2>Search Skills / Browse Public Profiles</h2>
//       <input
//         placeholder="Search skill (e.g., Photoshop)"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <button onClick={handleSearch}>Search</button>

//       <div style={{ marginTop: '20px' }}>
//         {results.map(user => (
//           <div key={user._id} style={{ border: '1px solid #ddd', margin: '10px 0', padding: '10px' }}>
//             <h4>{user.name}</h4>
//             <p><strong>Location:</strong> {user.location || 'N/A'}</p>
//             <p><strong>Availability:</strong> {user.availability}</p>
//             <p><strong>Skills Offered:</strong> {user.skillsOffered.join(', ')}</p>
//             <p><strong>Skills Wanted:</strong> {user.skillsWanted.join(', ')}</p>
//             <button onClick={() => navigate('/swap', { state: { toUserId: user._id } })}>
//               Send Swap Request
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SearchPage;


import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const fetchProfiles = async () => {
    try {
      const { data } = await api.get('/users/public');
      setResults(data);
    } catch (err) {
      alert('Failed to fetch profiles');
    }
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      fetchProfiles();
      return;
    }

    const filtered = results.filter(profile =>
      (profile.skillsOffered || []).some(skill =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      (profile.skillsWanted || []).some(skill =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setResults(filtered);
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>🔍 Search Skills / Browse Public Profiles</h2>

      <div style={styles.searchBox}>
        <input
          placeholder="Search skill (e.g., Photoshop)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>Search</button>
      </div>

      <div style={styles.resultList}>
        {results.map(user => (
          <div key={user._id} style={styles.card}>
            <h4 style={styles.cardTitle}>{user.name}</h4>
            <p><strong style={styles.label}>Location:</strong> {user.location || 'N/A'}</p>
            <p><strong style={styles.label}>Availability:</strong> {user.availability}</p>
            <p><strong style={styles.label}>Skills Offered:</strong> {user.skillsOffered.join(', ')}</p>
            <p><strong style={styles.label}>Skills Wanted:</strong> {user.skillsWanted.join(', ')}</p>
            <button
              onClick={() => navigate('/swap', { state: { toUserId: user._id } })}
              style={styles.swapButton}
            >
              Send Swap Request
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  page: {
    maxWidth: '900px',
    margin: 'auto',
    padding: '24px',
    backgroundColor: '#F4F7FA', // Neutral background
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    color: '#212121', // Primary text
    marginBottom: '24px',
  },
  searchBox: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    width: '300px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    marginRight: '10px',
    outlineColor: '#2979FF', // Primary Accent
  },
  button: {
    padding: '10px 16px',
    backgroundColor: '#2979FF',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  resultList: {
    marginTop: '20px',
  },
  card: {
    backgroundColor: '#FFFFFF', // Surface
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  cardTitle: {
    color: '#212121',
    marginBottom: '10px',
  },
  label: {
    color: '#757575', // Secondary text
  },
  swapButton: {
    marginTop: '10px',
    backgroundColor: '#FFC107', // Secondary Accent (CTA)
    color: '#212121',
    border: 'none',
    padding: '10px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
  },
};

export default SearchPage;
