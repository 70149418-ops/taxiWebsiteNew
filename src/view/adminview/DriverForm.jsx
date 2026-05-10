import React, { useState, useEffect } from 'react';

const DriverForm = ({ formData, setFormData, onSubmit, title }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={formWrapper}>
      {/* Dynamic Title Size */}
      <h2 style={{...titleStyle, fontSize: isMobile ? '1.25rem' : '1.5rem'}}>{title}</h2>
      
      <form onSubmit={onSubmit} style={formStyle}>
        {/* Driver Name Input */}
        <div style={inputGroup}>
          <label style={labelStyle}>Driver Name</label>
          <input 
            style={inputStyle}
            type="text" 
            placeholder="Enter full name"
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            required 
          />
        </div>
        
        {/* Rating Input */}
        <div style={inputGroup}>
          <label style={labelStyle}>Service Rating (0.0 - 5.0)</label>
          <input 
            style={inputStyle}
            type="number" 
            step="0.1" 
            min="0"
            max="5"
            placeholder="4.5"
            value={formData.rating} 
            onChange={(e) => setFormData({...formData, rating: e.target.value})} 
            required 
          />
        </div>
        
        {/* Price Input */}
        <div style={inputGroup}>
          <label style={labelStyle}>Price Per KM ($)</label>
          <input 
            style={inputStyle}
            type="number" 
            step="0.01"
            placeholder="2.50"
            value={formData.pricePerKm} 
            onChange={(e) => setFormData({...formData, pricePerKm: e.target.value})} 
            required 
          />
        </div>
        
        {/* Submit Button - Larger padding for thumbs on mobile */}
        <button type="submit" style={{
          ...submitButtonStyle, 
          padding: isMobile ? '16px' : '14px',
          fontSize: isMobile ? '0.95rem' : '1rem'
        }}>
          Save Driver to Fleet
        </button>
      </form>
    </div>
  );
};

// --- Modern Form Styles ---
const formWrapper = {
  width: '100%',
  boxSizing: 'border-box',
};

const titleStyle = {
  color: '#f3f4f6',
  fontWeight: '700',
  marginBottom: '25px',
  textAlign: 'center',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

const inputGroup = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const labelStyle = {
  color: '#9ca3af',
  fontSize: '0.8rem', // Slightly smaller labels look cleaner on mobile
  fontWeight: '600',
  textAlign: 'left',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const inputStyle = {
  padding: '12px 16px',
  backgroundColor: '#16171d',
  border: '1px solid #2e303a',
  borderRadius: '8px',
  color: '#f3f4f6',
  fontSize: '1rem',
  outline: 'none',
  width: '100%', // Ensure inputs never overflow the card
  boxSizing: 'border-box',
};

const submitButtonStyle = {
  marginTop: '10px',
  backgroundColor: '#f1c40f',
  color: '#08060d',
  border: 'none',
  borderRadius: '10px',
  fontWeight: '800',
  cursor: 'pointer',
  boxShadow: '0 4px 12px rgba(241, 196, 15, 0.2)',
};

export default DriverForm;