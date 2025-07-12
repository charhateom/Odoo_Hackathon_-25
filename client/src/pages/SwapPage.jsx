import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/api';

const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    backgroundColor: '#FFFFFF', // Surface/Container
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
  },
  heading: {
    color: '#212121', // Text Primary
    fontSize: '24px',
    marginBottom: '20px'
  },
  label: {
    color: '#757575', // Text Secondary
    fontWeight: '500',
    marginBottom: '6px',
    display: 'block'
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '16px'
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '16px',
    resize: 'vertical',
    minHeight: '80px',
    marginBottom: '20px'
  },
  button: {
    backgroundColor: '#2979FF', // Primary Accent
    color: '#FFFFFF',
    padding: '12px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.3s'
  },
  buttonHover: {
    backgroundColor: '#1565C0'
  }
};

const SwapPage = () => {
  const location = useLocation();
  const [hover, setHover] = useState(false);

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
      alert(' Swap request sent!', { backgroundColor: '#4CAF50' }); // Success color
      setForm({
        toUserId: '',
        offeredSkill: '',
        wantedSkill: '',
        message: ''
      });
    } catch (err) {
      alert(' Failed to send swap', { backgroundColor: '#F44336' }); // Error color
    }
  };

  return (
    <div style={{ backgroundColor: '#F4F7FA', minHeight: '100vh', padding: '20px' }}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Send Swap Request</h2>
        <form onSubmit={handleSubmit}>
          <label style={styles.label}>To User ID:</label>
          <input
            name="toUserId"
            value={form.toUserId}
            onChange={handleChange}
            style={styles.input}
            placeholder="Recipient User ID"
            required
          />

          <label style={styles.label}>Your Offered Skill:</label>
          <input
            name="offeredSkill"
            value={form.offeredSkill}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <label style={styles.label}>Wanted Skill:</label>
          <input
            name="wantedSkill"
            value={form.wantedSkill}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <label style={styles.label}>Message (optional):</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            style={styles.textarea}
          />

          <button
            type="submit"
            style={hover ? { ...styles.button, ...styles.buttonHover } : styles.button}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Send Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default SwapPage;