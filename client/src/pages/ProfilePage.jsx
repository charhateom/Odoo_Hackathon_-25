// import React, { useEffect, useState } from 'react';
// import api from '../api/api';

// const ProfilePage = () => {
//   const [form, setForm] = useState({});

//   // Fetch profile on load
//   useEffect(() => {
//     api.get('/users/profile')
//       .then(res => {
//         const userData = res.data;
//         setForm({
//           ...userData,
//           skillsOffered: userData.skillsOffered?.join(', ') || '',
//           skillsWanted: userData.skillsWanted?.join(', ') || ''
//         });
//       })
//       .catch(err => {
//         alert('Failed to load profile');
//       });
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSave = async () => {
//     try {
//       const updateData = {
//         ...form,
//         skillsOffered: form.skillsOffered.split(',').map(skill => skill.trim()),
//         skillsWanted: form.skillsWanted.split(',').map(skill => skill.trim()),
//       };
//       await api.put('/users/profile', updateData);
//       alert('Profile updated successfully');
//     } catch (err) {
//       alert('Update failed');
//     }
//   };

//   return (
//     <div style={{ maxWidth: '600px', margin: 'auto' }}>
//       <h2>Edit Profile</h2>
//       <input name="name" placeholder="Name" value={form.name || ''} onChange={handleChange} /><br />
//       <input name="location" placeholder="Location" value={form.location || ''} onChange={handleChange} /><br />
//       <input name="availability" placeholder="Availability" value={form.availability || ''} onChange={handleChange} /><br />
//       <input
//         name="skillsOffered"
//         placeholder="Skills Offered (comma separated)"
//         value={form.skillsOffered || ''}
//         onChange={handleChange}
//       /><br />
//       <input
//         name="skillsWanted"
//         placeholder="Skills Wanted (comma separated)"
//         value={form.skillsWanted || ''}
//         onChange={handleChange}
//       /><br />
//       <select name="profileVisibility" value={form.profileVisibility || 'Public'} onChange={handleChange}>
//         <option value="Public">Public</option>
//         <option value="Private">Private</option>
//       </select><br /><br />
//       <button onClick={handleSave}>Save</button>
//     </div>
//   );
// };

// export default ProfilePage;



import React, { useEffect, useState } from 'react';
import api from '../api/api';

const ProfilePage = () => {
  const [form, setForm] = useState({});
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch profile on mount
  useEffect(() => {
    api.get('/users/profile')
      .then(res => {
        const userData = res.data;
        setForm({
          ...userData,
          skillsOffered: userData.skillsOffered?.join(', ') || '',
          skillsWanted: userData.skillsWanted?.join(', ') || ''
        });
        setFeedbacks(userData.feedbacks || []);
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

      {/* Profile Photo */}
      {form.profilePhoto && (
        <img
          src={form.profilePhoto}
          alt="Profile"
          style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', marginBottom: 10 }}
        />
      )}

      {/* Email (read-only) */}
      <p><strong>Email:</strong> {form.email}</p>

      {/* Rating */}
      <p><strong>Rating:</strong> {form.rating?.toFixed(1) || 0}/5</p>

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

      {/* Feedback Section */}
      <div style={{ marginTop: '30px' }}>
        <h3>Feedbacks</h3>
        {feedbacks.length === 0 && <p>No feedbacks yet.</p>}
        {feedbacks.map((fb, idx) => (
          <div key={idx} style={{ border: '1px solid #ccc', marginBottom: 8, padding: 8 }}>
            <p><strong>From:</strong> {fb.userId}</p>
            <p>{fb.feedback}</p>
          </div>
        ))}
      </div>
      
    </div>
    
  );
};

export default ProfilePage;
