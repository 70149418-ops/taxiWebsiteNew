import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import DriverForm from '../view/adminview/DriverForm';

const EditDriver = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    rating: '',
    pricePerKm: ''
  });

  const [loading, setLoading] = useState(true);

  // 1. Fetch existing data (Task 2d)
  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const docRef = doc(db, "drivers", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFormData(docSnap.data());
        } else {
          navigate('/admin'); 
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching driver:", error);
      }
    };

    fetchDriver();
  }, [id, navigate]);

  // 2. Save changes (Task 2d Update)
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "drivers", id);
      await updateDoc(docRef, {
        name: formData.name,
        rating: Number(formData.rating),
        pricePerKm: Number(formData.pricePerKm)
      });
      
      navigate('/admin'); 
    } catch (error) {
      console.error("Error updating driver:", error);
    }
  };

  if (loading) return <div style={statusMsg}>⌛ Fetching Registry Data...</div>;

  return (
    <div style={pageWrapper}>
      {/* Header Section */}
      <div style={headerSection}>
        <h1 style={titleStyle}>Adjust Credentials</h1>
        <p style={subtitleStyle}>Updating profile for Unit ID: {id.substring(0, 8)}</p>
      </div>

      {/* The Modern Card Container */}
      <div style={cardContainer}>
        <DriverForm 
          title="Fleet Modification"
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleUpdate}
        />
        
        <button 
          onClick={() => navigate('/admin')} 
          style={cancelBtnStyle}
        >
          Cancel and Discard Changes
        </button>
      </div>
    </div>
  );
};

// --- Modern Layout Styles ---
const pageWrapper = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '80vh',
  padding: '40px 20px',
};

const headerSection = {
  textAlign: 'center',
  marginBottom: '32px',
};

const titleStyle = {
  color: '#f3f4f6',
  fontSize: '2.4rem',
  fontWeight: '800',
  marginBottom: '8px',
};

const subtitleStyle = {
  color: '#9ca3af',
  fontSize: '1rem',
};

const cardContainer = {
  width: '100%',
  maxWidth: '520px', // Prevents the stretched look
  backgroundColor: '#1f2028',
  padding: '40px',
  borderRadius: '24px',
  border: '1px solid #2e303a',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
};

const cancelBtnStyle = {
  marginTop: '20px',
  width: '100%',
  background: 'none',
  border: 'none',
  color: '#6b7280',
  cursor: 'pointer',
  fontSize: '0.9rem',
  textDecoration: 'underline',
};

const statusMsg = {
  textAlign: 'center',
  marginTop: '100px',
  color: '#f1c40f',
  fontSize: '1.2rem'
};

export default EditDriver;