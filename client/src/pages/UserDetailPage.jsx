import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import Header from '../components/Header.jsx';
const UserDetailPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const defaultAvatar = 'https://www.w3schools.com/howto/img_avatar.png'; 

useEffect(() => {
  api.get(`/users/${id}`)
    .then(res => {
      setUser(res.data);
      setLoading(false);
    })
    .catch(() => {
      alert('User not found');
      setLoading(false);
    });
}, [id]);


  if (loading) return <p style={styles.loading}>Loading...</p>;
  if (!user) return <p style={styles.error}>User not found.</p>;

  return (
    <><Header/>
    <div style={styles.container}>
      <h2 style={styles.title}>👤 User Profile</h2>

      {/* Avatar Container */}
      <div style={styles.avatarWrapper}>
        <img
          src={user.profilePhoto || defaultAvatar}
          alt="Profile"
          style={styles.profileImage}
        />
      </div>

      <div style={styles.infoCard}>
        <p><span style={styles.label}>Name:</span> {user.name}</p>
        <p><span style={styles.label}>Email:</span> {user.email}</p>
        <p><span style={styles.label}>Location:</span> {user.location || 'N/A'}</p>
        <p><span style={styles.label}>Availability:</span> {user.availability || 'N/A'}</p>
        <p><span style={styles.label}>Profile Visibility:</span> {user.profileVisibility}</p>
        <p><span style={styles.label}>Rating:</span> {user.rating ? user.rating.toFixed(1) : '0'}/5</p>
        <p><span style={styles.label}>Skills Offered:</span> {user.skillsOffered?.join(', ') || 'N/A'}</p>
        <p><span style={styles.label}>Skills Wanted:</span> {user.skillsWanted?.join(', ') || 'N/A'}</p>
      </div>

      <h3 style={styles.feedbackTitle}>📝 Feedback</h3>
      {user.feedbacks?.length === 0 ? (
        <p style={styles.noFeedback}>No feedback yet.</p>
      ) : (
        user.feedbacks.map((fb, i) => (
          <div key={i} style={styles.feedbackCard}>
            <p style={styles.feedbackFrom}><strong>From:</strong> {fb.userId}</p>
            <p style={styles.feedbackText}>{fb.feedback}</p>
          </div>
        ))
      )}
    </div></>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '32px',
    backgroundColor: '#F4F7FA',
    borderRadius: '12px',
    fontFamily: 'sans-serif',
    color: '#212121',
  },
  title: {
    textAlign: 'center',
    fontSize: '28px',
    color: '#212121',
    marginBottom: '24px',
  },
  avatarWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '24px',
  },
  profileImage: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    border: '4px solid #2979FF', // Primary Accent Border
    objectFit: 'cover',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    padding: '24px',
    borderRadius: '10px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
    marginBottom: '32px',
  },
  label: {
    color: '#757575',
    fontWeight: '500',
  },
  feedbackTitle: {
    fontSize: '20px',
    color: '#212121',
    marginBottom: '16px',
  },
  feedbackCard: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E0E0E0',
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '12px',
  },
  feedbackFrom: {
    color: '#2979FF',
    fontWeight: '600',
    marginBottom: '8px',
  },
  feedbackText: {
    color: '#212121',
  },
  noFeedback: {
    color: '#757575',
    fontStyle: 'italic',
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#2979FF',
  },
  error: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#F44336',
  },
};

export default UserDetailPage;