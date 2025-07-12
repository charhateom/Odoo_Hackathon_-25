
// import React, { useState } from 'react';
// import api from '../api/api';
// import { useNavigate } from 'react-router-dom';

// const LoginPage = () => {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await api.post('/users/login', form);
//       localStorage.setItem('token', data.token);
//       navigate('/profile');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <div style={styles.page}>
//       <form onSubmit={handleSubmit} style={styles.form}>
//         <h2 style={styles.title}>Login</h2>

//         <input
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           required
//           style={styles.input}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           required
//           style={styles.input}
//         />

//         {error && <div style={styles.error}>{error}</div>}

//         <button type="submit" style={styles.button}>Login</button>
//       </form>
//     </div>
//   );
// };

// const styles = {
//   page: {
//     backgroundColor: '#F4F7FA', // Neutral Background
//     minHeight: '100vh',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   form: {
//     backgroundColor: '#FFFFFF', // Surface/Containers
//     padding: '40px',
//     borderRadius: '12px',
//     boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
//     display: 'flex',
//     flexDirection: 'column',
//     width: '320px',
//   },
//   title: {
//     color: '#212121', // Text Primary
//     marginBottom: '24px',
//     fontSize: '24px',
//     textAlign: 'center',
//   },
//   input: {
//     marginBottom: '16px',
//     padding: '12px',
//     fontSize: '16px',
//     borderRadius: '6px',
//     border: '1px solid #ccc',
//     outlineColor: '#2979FF', // Primary Accent
//     color: '#212121',
//   },
//   button: {
//     padding: '12px',
//     fontSize: '16px',
//     backgroundColor: '#2979FF', // Primary Accent
//     color: '#FFFFFF',
//     border: 'none',
//     borderRadius: '6px',
//     cursor: 'pointer',
//     transition: 'background 0.3s',
//   },
//   error: {
//     color: '#F44336', // Alert Error
//     fontSize: '14px',
//     marginBottom: '12px',
//     textAlign: 'center',
//   },
// };

// export default LoginPage;


import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '../assets/OnlineLearning.json'; // ✅ adjust path if needed

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/users/login', form);
      localStorage.setItem('token', data.token);
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.left}>
        <Player
          autoplay
          loop
          src={animationData}
          style={{ height: '80%', width: '80%' }}
        />
      </div>
      <div style={styles.right}>
        <h1 style={styles.heading}>Welcome to the Skill Swap Platform</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.title}>Login</h2>

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            style={styles.input}
          />

          {error && <div style={styles.error}>{error}</div>}

          <button type="submit" style={styles.button}>Login</button>
          <button
            type="button"
            onClick={() => navigate('/register')}
            style={{ ...styles.button, backgroundColor: '#FFC107', color: '#212121', marginTop: '12px' }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#F4F7FA',
  },
  left: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
  },
  right: {
    flex: 1,
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#F4F7FA',
  },
  heading: {
    color: '#2979FF', // Primary accent
    fontSize: '28px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  form: {
    backgroundColor: '#FFFFFF',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    color: '#212121',
    marginBottom: '20px',
    fontSize: '22px',
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
  },
  error: {
    color: '#F44336',
    fontSize: '14px',
    marginBottom: '12px',
    textAlign: 'center',
  },
};

export default LoginPage;