import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import DriverForm from '../view/adminview/DriverForm';

const CreateDriver = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Track screen size for responsive adjustments
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const [formData, setFormData] = useState({
    name: '',
    rating: '',
    pricePerKm: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const driversCollection = collection(db, "drivers");
      await addDoc(driversCollection, {
        name: formData.name,
        rating: Number(formData.rating), 
        pricePerKm: Number(formData.pricePerKm),
        createdAt: new Date() 
      });
      navigate('/admin');
    } catch (error) {
      console.error("Error adding driver: ", error);
      alert("Failed to add driver.");
    }
  };

  return (
    <div style={pageWrapper}>
      <div style={headerSection}>
        {/* Responsive Font Size */}
        <h1 style={{...titleStyle, fontSize: isMobile ? '1.8rem' : '2.5rem'}}>
          Onboard Driver
        </h1>
        <p style={subtitleStyle}>Enter driver credentials to update the fleet registry.</p>
      </div>

      <div style={{
        ...cardContainer, 
        padding: isMobile ? '25px' : '40px', // Less padding on mobile to save space
        borderRadius: isMobile ? '16px' : '24px'
      }}>
        <DriverForm 
          title="Fleet Registration Form"
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
        />
        
        <button 
          onClick={() => navigate('/admin')}
          style={backButtonStyle}
        >
          ← Cancel and Return
        </button>
      </div>
    </div>
  );
};

// --- Styles ---
const pageWrapper = {
  width: '100%',
  minHeight: '80vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 20px',
  boxSizing: 'border-box' // Essential for mobile padding
};

const headerSection = {
  textAlign: 'center',
  marginBottom: '32px',
};

const titleStyle = {
  color: '#f3f4f6',
  fontWeight: '800',
  marginBottom: '8px',
};

const subtitleStyle = {
  color: '#9ca3af',
  fontSize: '0.95rem',
  maxWidth: '300px', // Keeps text centered and readable on mobile
  margin: '0 auto'
};

const cardContainer = {
  width: '100%',
  maxWidth: '500px',
  backgroundColor: '#1f2028',
  border: '1px solid #2e303a',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  boxSizing: 'border-box'
};

const backButtonStyle = {
  marginTop: '24px',
  width: '100%',
  background: 'none',
  border: 'none',
  color: '#6b7280',
  cursor: 'pointer',
  fontSize: '0.9rem',
  padding: '10px' // Larger tap target for mobile
};

export default CreateDriver;