import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  // Helper to highlight the active page
  const isActive = (path) => location.pathname === path;

  return (
    <nav style={navStyle}>
      <div style={navContainer}>
        {/* Logo Section */}
        <div style={logoWrapper}>
          <Link to="/" style={logoLink}>
            <span style={taxiIcon}>🚖</span>
            <span style={logoText}>TAXI<span style={adminText}>ADMIN</span></span>
          </Link>
        </div>

        {/* Navigation Links */}
        <ul style={ulStyle}>
          <li>
            <Link to="/" style={isActive('/') ? activeLinkStyle : linkStyle}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/admin" style={isActive('/admin') ? activeLinkStyle : linkStyle}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/create" style={createButtonStyle}>
              <span style={{ marginRight: '5px' }}>+</span> Register Driver
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

// --- Modern Glassmorphism Styles ---
const navStyle = {
  width: '100vw',
  height: '80px',
  backgroundColor: 'rgba(22, 23, 29, 0.8)', // Semi-transparent dark
  backdropFilter: 'blur(10px)', // Glass effect
  borderBottom: '1px solid #2e303a',
  display: 'flex',
  alignItems: 'center',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
};

const navContainer = {
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 24px',
};

const logoWrapper = {
  display: 'flex',
  alignItems: 'center',
};

const logoLink = {
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const taxiIcon = {
  fontSize: '1.8rem',
};

const logoText = {
  color: '#f3f4f6',
  fontSize: '1.3rem',
  fontWeight: '800',
  letterSpacing: '1px',
};

const adminText = {
  color: '#f1c40f', // Taxi Yellow
  fontWeight: '300',
};

const ulStyle = {
  display: 'flex',
  listStyle: 'none',
  gap: '32px',
  alignItems: 'center',
  margin: 0,
  padding: 0,
};

const linkStyle = {
  color: '#9ca3af',
  textDecoration: 'none',
  fontSize: '0.95rem',
  fontWeight: '500',
  transition: 'all 0.3s ease',
};

const activeLinkStyle = {
  ...linkStyle,
  color: '#f1c40f',
};

const createButtonStyle = {
  backgroundColor: '#f1c40f',
  color: '#08060d',
  padding: '10px 20px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: '700',
  fontSize: '0.9rem',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  boxShadow: '0 4px 15px rgba(241, 196, 15, 0.2)',
};

export default Navbar;