import React, { useState } from 'react';
import api from '../api/api';

const SwapPage = () => {
  const [form, setForm] = useState({
    toUserId: '',
    offeredSkill: '',
    wantedSkill: '',
    message: ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await api.post('/swaps', form);
      alert('Swap request sent!');
    } catch (err) {
      alert('Failed to send swap');
    }
  };

  return (
    <div>
      <h2>Send Swap Request</h2>
      <input name="toUserId" placeholder="Recipient User ID" onChange={handleChange} />
      <input name="offeredSkill" placeholder="Offered Skill" onChange={handleChange} />
      <input name="wantedSkill" placeholder="Wanted Skill" onChange={handleChange} />
      <textarea name="message" placeholder="Message" onChange={handleChange}></textarea>
      <button onClick={handleSubmit}>Send</button>
    </div>
  );
};

export default SwapPage;
