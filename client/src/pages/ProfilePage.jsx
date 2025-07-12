import React, { useEffect, useState } from 'react';
import api from '../api/api';

const ProfilePage = () => {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/users/profile')
      .then(res => {
        const userData = res.data;
        setForm({
          ...userData,
          skillsOffered: userData.skillsOffered?.join(', ') || '',
          skillsWanted: userData.skillsWanted?.join(', ') || ''
        });
        setLoading(false);
      })
      .catch(() => {
        alert('Failed to load profile');
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const updateData = {
        ...form,
        skillsOffered: form.skillsOffered.split(',').map(skill => skill.trim()),
        skillsWanted: form.skillsWanted.split(',').map(skill => skill.trim()),
      };
      await api.put('/users/profile', updateData);
      alert('Profile updated successfully');
    } catch {
      alert('Update failed');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Edit Profile</h2>

      <input
        name="name"
        placeholder="Name"
        value={form.name || ''}
        onChange={handleChange}
        style={styles.input}
      />

      <input
        name="location"
        placeholder="Location"
        value={form.location || ''}
        onChange={handleChange}
        style={styles.input}
      />

      <input
        name="availability"
        placeholder="Availability (e.g., Weekends)"
        value={form.availability || ''}
        onChange={handleChange}
        style={styles.input}
      />

      <input
        name="skillsOffered"
        placeholder="Skills Offered (comma separated)"
        value={form.skillsOffered || ''}
        onChange={handleChange}
        style={styles.input}
      />

      <input
        name="skillsWanted"
        placeholder="Skills Wanted (comma separated)"
        value={form.skillsWanted || ''}
        onChange={handleChange}
        style={styles.input}
      />

      <select
        name="profileVisibility"
        value={form.profileVisibility || 'Public'}
        onChange={handleChange}
        style={styles.select}
      >
        <option value="Public">Public</option>
        <option value="Private">Private</option>
      </select>

      <button onClick={handleSave} style={styles.button}>
        Save Profile
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '30px',
    backgroundColor: '#F4F7FA',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
  },
  title: {
    textAlign: 'center',
    color: '#212121',
    marginBottom: '20px',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
    outlineColor: '#2979FF',
  },
  select: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outlineColor: '#2979FF',
  },
  button: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#2979FF',
    color: '#FFF',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
  },
};

export default ProfilePage;