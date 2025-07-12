import React, { useEffect, useState } from 'react';
import api from '../api/api';

const ProfilePage = () => {
  const [form, setForm] = useState({});

  // Fetch profile on load
  useEffect(() => {
    api.get('/users/profile')
      .then(res => {
        const userData = res.data;
        setForm({
          ...userData,
          skillsOffered: userData.skillsOffered?.join(', ') || '',
          skillsWanted: userData.skillsWanted?.join(', ') || ''
        });
      })
      .catch(err => {
        alert('Failed to load profile');
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
    } catch (err) {
      alert('Update failed');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Edit Profile</h2>
      <input name="name" placeholder="Name" value={form.name || ''} onChange={handleChange} /><br />
      <input name="location" placeholder="Location" value={form.location || ''} onChange={handleChange} /><br />
      <input name="availability" placeholder="Availability" value={form.availability || ''} onChange={handleChange} /><br />
      <input
        name="skillsOffered"
        placeholder="Skills Offered (comma separated)"
        value={form.skillsOffered || ''}
        onChange={handleChange}
      /><br />
      <input
        name="skillsWanted"
        placeholder="Skills Wanted (comma separated)"
        value={form.skillsWanted || ''}
        onChange={handleChange}
      /><br />
      <select name="profileVisibility" value={form.profileVisibility || 'Public'} onChange={handleChange}>
        <option value="Public">Public</option>
        <option value="Private">Private</option>
      </select><br /><br />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default ProfilePage;
