import React, { useState, useEffect } from 'react';

const DriverHero = ({ count }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header style={{
      ...heroStyle,
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'flex-start' : 'flex-end',
      gap: isMobile ? '20px' : '0'
    }}>
      <div>
        <h1 style={{ 
          color: '#fff', 
          fontSize: isMobile ? '2rem' : '2.5rem', 
          marginBottom: '10px',
          lineHeight: '1.2' 
        }}>
          Fleet Command
        </h1>
        <p style={{ color: '#9ca3af', margin: 0 }}>
          Real-time monitoring of <span style={{ color: '#f1c40f', fontWeight: 'bold' }}>{count}</span> active units.
        </p>
      </div>
      
      <div style={{
        ...statusBadge,
        alignSelf: isMobile ? 'flex-start' : 'auto'
      }}>
        <span style={dotStyle}></span> System Operational
      </div>
    </header>
  );
};

// --- Styles ---
const heroStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '40px 0',
  borderBottom: '1px solid #2e303a',
  marginBottom: '30px',
  width: '100%',
};

const statusBadge = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: 'rgba(16, 185, 129, 0.1)',
  color: '#10b981',
  padding: '8px 16px',
  borderRadius: '20px',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  border: '1px solid rgba(16, 185, 129, 0.2)',
  whiteSpace: 'nowrap'
};

const dotStyle = {
  width: '6px',
  height: '6px',
  backgroundColor: '#10b981',
  borderRadius: '50%',
  display: 'inline-block',
  boxShadow: '0 0 8px #10b981'
};

export default DriverHero;