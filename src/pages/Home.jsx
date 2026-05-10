import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={containerStyle}>
      {/* Hero Section */}
      <section style={heroSection}>
        <h1 style={titleStyle}>
          Manage Your Fleet <br /> 
          <span style={highlightText}>With Precision.</span>
        </h1>
        <p style={subtitleStyle}>
          The all-in-one terminal for modern taxi administration. 
          Track drivers, manage pricing, and optimize your service 
          through our real-time Firestore integration.
        </p>

        <div style={buttonGroup}>
          <Link to="/admin" style={primaryBtn}>
            Enter Dashboard
          </Link>
          <Link to="/create" style={secondaryBtn}>
            Register New Driver
          </Link>
        </div>
      </section>

      {/* Stats / Features Preview */}
      <section style={statsSection}>
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
  animation: 'fadeIn 0.8s ease-out',
};

const heroSection = {
  textAlign: 'center',
  maxWidth: '800px',
  marginBottom: '80px',
};

const badgeStyle = {
  display: 'inline-block',
  padding: '6px 14px',
  backgroundColor: 'rgba(241, 196, 15, 0.1)',
  color: '#f1c40f',
  borderRadius: '20px',
  fontSize: '0.85rem',
  fontWeight: '600',
  marginBottom: '20px',
  border: '1px solid rgba(241, 196, 15, 0.3)',
};

const titleStyle = {
  fontSize: '4rem',
  lineHeight: '1.1',
  color: '#f3f4f6',
  marginBottom: '24px',
  fontWeight: '800',
};

const highlightText = {
  color: '#f1c40f',
};

const subtitleStyle = {
  fontSize: '1.2rem',
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
  transition: 'transform 0.2s',
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
  transition: 'background 0.2s',
};

const statsSection = {
  display: 'flex',
  gap: '40px',
  justifyContent: 'center',
  width: '100%',
  maxWidth: '900px',
  borderTop: '1px solid #2e303a',
  paddingTop: '60px',
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