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
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      <h2>Search Skills / Browse Public Profiles</h2>
      <input
        placeholder="Search skill (e.g., Photoshop)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div style={{ marginTop: '20px' }}>
        {results.map(user => (
          <div key={user._id} style={{ border: '1px solid #ddd', margin: '10px 0', padding: '10px' }}>
            <h4>{user.name}</h4>
            <p><strong>Location:</strong> {user.location || 'N/A'}</p>
            <p><strong>Availability:</strong> {user.availability}</p>
            <p><strong>Skills Offered:</strong> {user.skillsOffered.join(', ')}</p>
            <p><strong>Skills Wanted:</strong> {user.skillsWanted.join(', ')}</p>
            <button onClick={() => navigate('/swap', { state: { toUserId: user._id } })}>
              Send Swap Request
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
