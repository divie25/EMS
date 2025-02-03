import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navStyle = {
    backgroundColor: '#4CAF50',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#fff',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#fff',
    margin: '0 10px',
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/analytics', label: 'Analytics' },
    { path: '/articles', label: 'Articles' },
    { path: '/events', label: 'Events' },
    { path: '/contact', label: 'Contact' },
    { path: '/about', label: 'About' },
  ];

  const isLoggedIn = false; // Replace with actual authentication logic
  const userName = "John Doe"; // Replace with actual user data

  return (
    <nav style={navStyle}>
      <h1 style={{ margin: 0 }}>EcoApp</h1>
      <div>
        {navItems.map((item) => (
          <Link key={item.path} to={item.path} style={linkStyle}>
            {item.label}
          </Link>
        ))}
        {isLoggedIn ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>Welcome, {userName}</span>
            <button
              style={{
                padding: '5px 10px',
                backgroundColor: '#ff5722',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
              onClick={() => alert('Logged out successfully!')}
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link to="/login" style={{ ...linkStyle, marginRight: '10px' }}>Login</Link>
            <Link to="/register" style={linkStyle}>Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
