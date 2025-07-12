import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const linkStyle = ({ isActive }) => ({
    marginRight: '10px',
    textDecoration: isActive ? 'underline' : 'none',
    color: isActive ? 'blue' : 'black'
  });

  return (
    <nav style={{ marginBottom: '20px' }}>
      <NavLink to="/search" style={linkStyle}>Search</NavLink>
      <NavLink to="/profile" style={linkStyle}>Profile</NavLink>
      <NavLink to="/swap" style={linkStyle}>Send Swap</NavLink>
      <NavLink to="/inbox" style={linkStyle}>Inbox</NavLink>
      <button onClick={handleLogout} style={{ marginLeft: '10px', color: 'red' }}>
        Logout
      </button>
    </nav>
  );
};

export default Header;
