// import React from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';

// const Header = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate('/login');
//   };

//   const linkStyle = ({ isActive }) => ({
//     marginRight: '10px',
//     textDecoration: isActive ? 'underline' : 'none',
//     color: isActive ? 'blue' : 'black'
//   });

//   return (
//     <nav style={{ marginBottom: '20px' }}>
//       <NavLink to="/search" style={linkStyle}>Search</NavLink>
//       <NavLink to="/profile" style={linkStyle}>Profile</NavLink>
//       <NavLink to="/swap" style={linkStyle}>Send Swap</NavLink>
//       <NavLink to="/inbox" style={linkStyle}>Inbox</NavLink>
//       <button onClick={handleLogout} style={{ marginLeft: '10px', color: 'red' }}>
//         Logout
//       </button>
//     </nav>
//   );
// };

// export default Header;


// import React from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';

// const Header = () => {
//    const [userId, setUserId] = useState(null);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate('/login');
//   };

//   const linkStyle = ({ isActive }) => ({
//     marginRight: '16px',
//     textDecoration: isActive ? 'underline' : 'none',
//     color: isActive ? '#2979FF' : '#212121', // Blue if active, Deep Gray otherwise
//     fontWeight: isActive ? '600' : '500',
//     fontSize: '16px',
//   });

 


//   useEffect(() => {
//     api.get('/users/profile')
//       .then(res => setUserId(res.data._id))
//       .catch(err => {
//         console.error('Not logged in');
//         setUserId(null);
//       });
//   }, []);


//   return (
//     <nav style={styles.navbar}>
//       <div style={styles.navLinks}>
//         <NavLink to="/search" style={linkStyle}>Search</NavLink>
//         <NavLink to="/profile" style={linkStyle}>Profile</NavLink>
//         <NavLink to="/swap" style={linkStyle}>Send Swap</NavLink>
//         <NavLink to="/inbox" style={linkStyle}>Inbox</NavLink>
//          {userId && (
//         <NavLink to={/users/${userId}}>View Profile</NavLink>
//       )}
//       </div>
      
//       <button onClick={handleLogout} style={styles.logout}>
//         Logout
//       </button>
//     </nav>
//   );
// };

// const styles = {
//   navbar: {
//     backgroundColor: '#FFFFFF', // Surface/Container
//     padding: '16px 24px',
//     display: 'flex',
//     justifyContent: 'space-between',
//     borderBottom: '1px solid #E0E0E0',
//     alignItems: 'center',
//   },
//   navLinks: {
//     display: 'flex',
//     alignItems: 'center',
//   },
//   logout: {
//     background: 'none',
//     border: 'none',
//     color: '#F44336', // Red for logout
//     fontSize: '16px',
//     cursor: 'pointer',
//     fontWeight: '500',
//   },
// };

// export default Header;

import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import api from '../api/api';

const Header = () => {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const linkStyle = ({ isActive }) => ({
    marginRight: '16px',
    textDecoration: isActive ? 'underline' : 'none',
    color: isActive ? '#2979FF' : '#212121', // Blue if active, Deep Gray otherwise
    fontWeight: isActive ? '600' : '500',
    fontSize: '16px',
  });

  useEffect(() => {
    api.get('/users/profile')
      .then(res => setUserId(res.data._id))
      .catch(err => {
        console.error('Not logged in');
        setUserId(null);
      });
  }, []);

  return (
    <nav style={styles.navbar}>
      <div style={styles.navLinks}>
        <NavLink to="/search" style={linkStyle}>Search</NavLink>
        <NavLink to="/profile" style={linkStyle}>Profile</NavLink>
        <NavLink to="/swap" style={linkStyle}>Send Swap</NavLink>
        <NavLink to="/inbox" style={linkStyle}>Inbox</NavLink>
        {userId && (
          <NavLink to={`/users/${userId}`} style={linkStyle}>
            View Profile
          </NavLink>
        )}
      </div>
      
      <button onClick={handleLogout} style={styles.logout}>
        Logout
      </button>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#FFFFFF', // Surface/Container
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #E0E0E0',
    alignItems: 'center',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
  },
  logout: {
    background: 'none',
    border: 'none',
    color: '#F44336', // Red for logout
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: '500',
  },
};

export default Header;
 