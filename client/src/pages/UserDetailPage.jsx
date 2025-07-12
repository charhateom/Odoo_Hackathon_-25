import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';

const UserDetailPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/users/${id}`)
      .then(res => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(err => {
        alert('User not found');
        setLoading(false);
      });
  }, [id]

);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <div style={{ maxWidth: '700px', margin: 'auto' }}>
      <h2>User Profile</h2>

      {user.profilePhoto && (
        <img
          src={user.profilePhoto}
          alt="Profile"
          style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover' }}
        />
      )}

      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Location:</strong> {user.location || 'N/A'}</p>
      <p><strong>Availability:</strong> {user.availability || 'N/A'}</p>
      <p><strong>Profile Visibility:</strong> {user.profileVisibility}</p>
      <p><strong>Rating:</strong> {user.rating?.toFixed(1) || 0}/5</p>

      <p><strong>Skills Offered:</strong> {user.skillsOffered?.join(', ') || 'N/A'}</p>
      <p><strong>Skills Wanted:</strong> {user.skillsWanted?.join(', ') || 'N/A'}</p>

      <h3>Feedbacks</h3>
      {user.feedbacks?.length === 0 && <p>No feedbacks yet.</p>}
      {user.feedbacks?.map((fb, i) => (
        <div key={i} style={{ border: '1px solid #ddd', padding: 10, marginBottom: 8 }}>
          <p><strong>From:</strong> {fb.userId}</p>
          <p>{fb.feedback}</p>
        </div>
      ))}
    </div>
  );
};

export default UserDetailPage;
