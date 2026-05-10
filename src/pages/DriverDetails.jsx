import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

const DriverDetails = () => {
  const { id } = useParams();
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  // Handle responsiveness logic
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchSingleDriver = async () => {
      try {
        const docRef = doc(db, "drivers", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDriver(docSnap.data());
        } else {
          alert("Driver not found in registry");
          navigate('/admin');
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching driver:", error);
        setLoading(false);
      }
    };
    fetchSingleDriver();
  }, [id, navigate]);

  if (loading) return <div style={loaderStyle}>⌛ Accessing Driver Profile...</div>;
  if (!driver) return <div style={loaderStyle}>Driver not found.</div>;

  return (
    <div style={pageContainer}>
      <div style={{
        ...cardStyle, 
        padding: isMobile ? '25px 15px' : '40px', // Shrink padding on mobile
        borderRadius: isMobile ? '16px' : '24px'
      }}>
        {/* Header with Icon */}
        <div style={headerSection}>
          <div style={{
            ...profileIcon, 
            width: isMobile ? '60px' : '80px', 
            height: isMobile ? '60px' : '80px',
            fontSize: isMobile ? '2rem' : '3rem'
          }}>🚖</div>
          <h1 style={{...titleStyle, fontSize: isMobile ? '1.5rem' : '1.8rem'}}>Driver Profile</h1>
          <p style={idLabel}>System ID: {id.substring(0, 8)}...</p>
        </div>

        <div style={infoGrid}>
          {/* We use flexWrap and column-on-mobile logic for the rows */}
          <div style={{...infoRow, flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center'}}>
            <span style={labelStyle}>Full Name</span>
            <span style={{...valueStyle, marginTop: isMobile ? '4px' : '0'}}>{driver.name}</span>
          </div>

          <div style={{...infoRow, flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center'}}>
            <span style={labelStyle}>Current Rating</span>
            <span style={{...valueStyle, marginTop: isMobile ? '4px' : '0'}}>
              ⭐ {driver.rating} <small style={{color: '#4b5563'}}>/ 5.0</small>
            </span>
          </div>

          <div style={{...infoRow, flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center'}}>
            <span style={labelStyle}>Price Per KM</span>
            <span style={{...valueStyle, marginTop: isMobile ? '4px' : '0'}}>${driver.pricePerKm}</span>
          </div>

          <div style={{...infoRow, flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center'}}>
            <span style={labelStyle}>Status</span>
            <span style={{...statusBadge, marginTop: isMobile ? '4px' : '0'}}>Active Fleet</span>
          </div>
        </div>

        <div style={buttonGroup}>
          <Link to={`/edit/${id}`} style={editBtn}>
            Adjust Rating / Price
          </Link>
          <button onClick={() => navigate('/admin')} style={backBtn}>
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Styles (Maintained & Optimized) ---
const pageContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '80vh',
  padding: '20px',
  boxSizing: 'border-box',
};

const cardStyle = {
  backgroundColor: '#1f2028',
  border: '1px solid #2e303a',
  width: '100%',
  maxWidth: '480px',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  textAlign: 'center',
  boxSizing: 'border-box',
};

const headerSection = { marginBottom: '30px' };

const profileIcon = {
  backgroundColor: 'rgba(241, 196, 15, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 15px',
  borderRadius: '50%',
  border: '1px solid #f1c40f',
};

const titleStyle = { color: '#f3f4f6', margin: 0, fontWeight: '800' };

const idLabel = { color: '#6b7280', fontSize: '0.8rem', marginTop: '5px' };

const infoGrid = { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '35px' };

const infoRow = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '15px',
  backgroundColor: '#16171d',
  borderRadius: '12px',
  border: '1px solid #2e303a',
};

const labelStyle = {
  color: '#9ca3af',
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  fontWeight: '600',
  letterSpacing: '0.5px',
};

const valueStyle = { color: '#f3f4f6', fontSize: '1.1rem', fontWeight: '500' };

const statusBadge = { color: '#10b981', fontWeight: 'bold', fontSize: '0.9rem' };

const buttonGroup = { display: 'flex', flexDirection: 'column', gap: '12px' };

const editBtn = {
  backgroundColor: '#f1c40f',
  color: '#08060d',
  padding: '14px',
  borderRadius: '10px',
  textDecoration: 'none',
  fontWeight: '800',
  fontSize: '1rem',
};

const backBtn = {
  background: 'none',
  border: 'none',
  color: '#6b7280',
  cursor: 'pointer',
  fontSize: '0.9rem',
  padding: '10px'
};

const loaderStyle = { color: '#f1c40f', textAlign: 'center', marginTop: '100px', fontSize: '1.2rem' };

export default DriverDetails;