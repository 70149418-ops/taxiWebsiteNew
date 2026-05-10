import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={footerContainer}>
        
        {/* Brand Section */}
        <div style={columnStyle}>
          <h3 style={brandStyle}>🚖 TAXI-ADMIN</h3>
          <p style={descStyle}>
            Next-gen fleet management system. <br />
            Monitor, manage, and scale your taxi service.
          </p>
        </div>

        {/* Quick Links Section */}
        <div style={columnStyle}>
          <h4 style={headingStyle}>Navigation</h4>
          <ul style={listStyle}>
            <li><Link to="/" style={footerLink}>Home</Link></li>
            <li><Link to="/admin" style={footerLink}>Dashboard</Link></li>
            <li><Link to="/create" style={footerLink}>Register Driver</Link></li>
          </ul>
        </div>

        {/* System Info Section */}
        <div style={columnStyle}>
          <h4 style={headingStyle}>System Status</h4>
          <div style={statusWrapper}>
            <span style={dotStyle}></span>
            <span style={statusText}>Firestore: Connected</span>
          </div>
          <p style={descStyle}>v2.0.4 - Production Ready</p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div style={bottomBar}>
        <p>© {new Date().getFullYear()} Taxi-Admin Portal. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

// --- Modern Styles ---
const footerStyle = {
  backgroundColor: '#111111', // Deep black
  color: '#9ca3af',
  paddingTop: '60px',
  borderTop: '1px solid #2e303a',
  marginTop: 'auto',
  width: '100vw',
};

const footerContainer = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  padding: '0 20px 40px 20px',
  gap: '40px'
};

const columnStyle = {
  flex: '1',
  minWidth: '200px'
};

const brandStyle = {
  color: '#f1c40f', // Taxi Yellow
  fontSize: '1.4rem',
  marginBottom: '15px'
};

const headingStyle = {
  color: '#f3f4f6',
  fontSize: '1.1rem',
  marginBottom: '20px',
  fontWeight: '600'
};

const descStyle = {
  fontSize: '0.9rem',
  lineHeight: '1.6',
  color: '#6b7280'
};

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0
};

const footerLink = {
  color: '#9ca3af',
  textDecoration: 'none',
  fontSize: '0.9rem',
  lineHeight: '2.5',
  transition: 'color 0.2s ease',
};

// Interactive Hover Effect Logic would go in a separate CSS file, 
// but for inline, we keep it simple and clean.

const statusWrapper = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '10px'
};

const dotStyle = {
  width: '8px',
  height: '8px',
  backgroundColor: '#10b981', // Emerald green
  borderRadius: '50%',
  boxShadow: '0 0 8px #10b981'
};

const statusText = {
  fontSize: '0.85rem',
  color: '#10b981'
};

const bottomBar = {
  borderTop: '1px solid #2e303a',
  padding: '25px 20px',
  textAlign: 'center',
  fontSize: '0.8rem',
  color: '#4b5563'
};

export default Footer;