import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/api';

const SwapPage = () => {
  const location = useLocation();

  const [form, setForm] = useState({
    toUserId: location.state?.toUserId || '', 
    offeredSkill: '',
    wantedSkill: '',
    message: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/swaps', form);
      alert('Swap request sent!');
      setForm({
        toUserId: '',
        offeredSkill: '',
        wantedSkill: '',
        message: ''
      });
    } catch (err) {
      alert('Failed to send swap');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Send Swap Request</h2>
      <form onSubmit={handleSubmit}>
        <label>To User ID:</label><br />
        <input
          name="toUserId"
          value={form.toUserId}
          onChange={handleChange}
          placeholder="Recipient User ID"
          required
        /><br /><br />

        <label>Your Offered Skill:</label><br />
        <input
          name="offeredSkill"
          value={form.offeredSkill}
          onChange={handleChange}
          required
        /><br /><br />

        <label>Wanted Skill:</label><br />
        <input
          name="wantedSkill"
          value={form.wantedSkill}
          onChange={handleChange}
          required
        /><br /><br />

        <label>Message (optional):</label><br />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
        /><br /><br />

        <button type="submit">Send Request</button>
      </form>
    </div>
  );
};

export default SwapPage;
