import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users/register', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Create Account</h2>

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={styles.input}
        />

        {error && <div style={styles.error}>{error}</div>}

        <button type="submit" style={styles.button}>
          Register
        </button>

        <p style={styles.note}>
          Already have an account?{' '}
          <a href="/login" style={styles.link}>Login here</a>
        </p>
      </form>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: '#F4F7FA',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    backgroundColor: '#FFFFFF',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    width: '320px',
  },
  title: {
    color: '#212121',
    marginBottom: '24px',
    fontSize: '24px',
    textAlign: 'center',
  },
  input: {
    marginBottom: '16px',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outlineColor: '#2979FF',
    color: '#212121',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#2979FF',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  error: {
    color: '#F44336',
    fontSize: '14px',
    marginBottom: '12px',
    textAlign: 'center',
  },
  note: {
    fontSize: '14px',
    textAlign: 'center',
    marginTop: '16px',
    color: '#666',
  },
  link: {
    color: '#2979FF',
    textDecoration: 'none',
    fontWeight: '500',
  },
};

export default RegisterPage;
