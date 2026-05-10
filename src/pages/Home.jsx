import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  // Logic to detect mobile screen size
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={containerStyle}>
      {/* Hero Section */}
      <section style={heroSection}>
        {/* Dynamic font size for the title */}
        <h1 style={{...titleStyle, fontSize: isMobile ? '2.5rem' : '4rem'}}>
          Manage Your Fleet <br /> 
          <span style={highlightText}>With Precision.</span>
        </h1>
        <p style={{...subtitleStyle, fontSize: isMobile ? '1rem' : '1.2rem'}}>
          The all-in-one terminal for modern taxi administration. 
          Track drivers, manage pricing, and optimize your service 
          through our real-time Firestore integration.
        </p>

        {/* Dynamic layout for buttons: row on desktop, column on mobile */}
        <div style={{
          ...buttonGroup, 
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center'
        }}>
          <Link to="/admin" style={{...primaryBtn, width: isMobile ? '100%' : 'auto'}}>
            Enter Dashboard
          </Link>
          <Link to="/create" style={{...secondaryBtn, width: isMobile ? '100%' : 'auto'}}>
            Register New Driver
          </Link>
        </div>
      </section>

      {/* Stats Section: Stack vertically on mobile */}
      <section style={{
        ...statsSection, 
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '40px' : '40px',
        paddingTop: isMobile ? '40px' : '60px'
      }}>
        <div style={statCard}>
          <h2 style={statNumber}>∞</h2>
          <p style={statLabel}>Real-time Sync</p>
        </div>
        <div style={statCard}>
          <h2 style={statNumber}>24/7</h2>
          <p style={statLabel}>System Uptime</p>
        </div>
        <div style={statCard}>
          <h2 style={statNumber}>0ms</h2>
          <p style={statLabel}>Latency Design</p>
        </div>
      </section>
    </div>
  );
};

// --- Modern Home Styles ---
const containerStyle = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '60px 20px',
  boxSizing: 'border-box', // Prevents padding from causing horizontal scroll
  overflowX: 'hidden'
};

const heroSection = {
  textAlign: 'center',
  width: '100%',
  maxWidth: '800px',
  marginBottom: '80px',
};

const titleStyle = {
  lineHeight: '1.1',
  color: '#f3f4f6',
  marginBottom: '24px',
  fontWeight: '800',
};

const highlightText = {
  color: '#f1c40f',
};

const subtitleStyle = {
  color: '#9ca3af',
  lineHeight: '1.6',
  marginBottom: '40px',
};

const buttonGroup = {
  display: 'flex',
  gap: '16px',
  justifyContent: 'center',
};

const primaryBtn = {
  padding: '16px 32px',
  backgroundColor: '#f1c40f',
  color: '#111',
  textDecoration: 'none',
  borderRadius: '12px',
  fontWeight: '700',
  fontSize: '1rem',
  textAlign: 'center',
  boxShadow: '0 10px 20px rgba(241, 196, 15, 0.2)',
};

const secondaryBtn = {
  padding: '16px 32px',
  backgroundColor: 'transparent',
  color: '#f3f4f6',
  textDecoration: 'none',
  borderRadius: '12px',
  fontWeight: '600',
  fontSize: '1rem',
  border: '1px solid #2e303a',
  textAlign: 'center',
};

const statsSection = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  maxWidth: '900px',
  borderTop: '1px solid #2e303a',
};

const statCard = {
  textAlign: 'center',
  flex: 1,
};

const statNumber = {
  fontSize: '2.5rem',
  color: '#f3f4f6',
  marginBottom: '8px',
};

const statLabel = {
  color: '#6b7280',
  fontSize: '0.9rem',
  textTransform: 'uppercase',
  letterSpacing: '1px',
};

export default Home;