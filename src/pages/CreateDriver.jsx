import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import DriverForm from '../view/adminview/DriverForm';

const CreateDriver = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    rating: '',
    pricePerKm: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const driversCollection = collection(db, "drivers");
      
      // Task 2a: Store form data in Firebase Firestore
      await addDoc(driversCollection, {
        name: formData.name,
        rating: Number(formData.rating), 
        pricePerKm: Number(formData.pricePerKm),
        createdAt: new Date() 
      });

      // Navigate back to the Admin Dashboard (Task 1 SPA Navigation)
      navigate('/admin');
    } catch (error) {
      console.error("Error adding driver: ", error);
      alert("Failed to add driver. Check console.");
    }
  };

  return (
    <div style={pageWrapper}>
      <div style={headerSection}>
        <h1 style={titleStyle}>Onboard Driver</h1>
        <p style={subtitleStyle}>Enter driver credentials to update the fleet registry.</p>
      </div>

      <div style={cardContainer}>
        {/* Reusing your modular form component */}
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
          ← Cancel and Return to Dashboard
        </button>
      </div>
    </div>
  );
};

// --- Modern Layout Styles ---
const pageWrapper = {
  width: '100%',
  minHeight: '80vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 20px',
};

const headerSection = {
  textAlign: 'center',
  marginBottom: '32px',
};

const titleStyle = {
  color: '#f3f4f6',
  fontSize: '2.5rem',
  fontWeight: '800',
  marginBottom: '8px',
};

const subtitleStyle = {
  color: '#9ca3af',
  fontSize: '1rem',
};

const cardContainer = {
  width: '100%',
  maxWidth: '500px',
  backgroundColor: '#1f2028',
  padding: '40px',
  borderRadius: '24px',
  border: '1px solid #2e303a',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
};

const backButtonStyle = {
  marginTop: '24px',
  width: '100%',
  background: 'none',
  border: 'none',
  color: '#6b7280',
  cursor: 'pointer',
  fontSize: '0.9rem',
  transition: 'color 0.2s',
};

export default CreateDriver;