import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

const DriverDetails = () => {
  const { id } = useParams();
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
      <div style={cardStyle}>
        {/* Header with Icon */}
        <div style={headerSection}>
          <div style={profileIcon}>🚖</div>
          <h1 style={titleStyle}>Driver Profile</h1>
          <p style={idLabel}>System ID: {id.substring(0, 8)}...</p>
        </div>

        <div style={infoGrid}>
          <div style={infoRow}>
            <span style={labelStyle}>Full Name</span>
            <span style={valueStyle}>{driver.name}</span>
          </div>

          <div style={infoRow}>
            <span style={labelStyle}>Current Rating</span>
            <span style={valueStyle}>⭐ {driver.rating} <small style={{color: '#4b5563'}}>/ 5.0</small></span>
          </div>

          <div style={infoRow}>
            <span style={labelStyle}>Price Per KM</span>
            <span style={valueStyle}>${driver.pricePerKm}</span>
          </div>

          <div style={infoRow}>
            <span style={labelStyle}>Status</span>
            <span style={statusBadge}>Active Fleet</span>
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

// --- Modern Dark Styles ---
const pageContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '80vh',
  padding: '20px',
};

const cardStyle = {
  backgroundColor: '#1f2028',
  border: '1px solid #2e303a',
  borderRadius: '24px',
  padding: '40px',
  width: '100%',
  maxWidth: '480px',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  textAlign: 'center',
};

const headerSection = {
  marginBottom: '30px',
};

const profileIcon = {
  fontSize: '3rem',
  backgroundColor: 'rgba(241, 196, 15, 0.1)',
  width: '80px',
  height: '80px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 15px',
  borderRadius: '50%',
  border: '1px solid #f1c40f',
};

const titleStyle = {
  color: '#f3f4f6',
  fontSize: '1.8rem',
  margin: 0,
};

const idLabel = {
  color: '#6b7280',
  fontSize: '0.8rem',
  marginTop: '5px',
};

const infoGrid = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  marginBottom: '35px',
};

const infoRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '15px',
  backgroundColor: '#16171d',
  borderRadius: '12px',
  border: '1px solid #2e303a',
};

const labelStyle = {
  color: '#9ca3af',
  fontSize: '0.8rem',
  textTransform: 'uppercase',
  fontWeight: '600',
  letterSpacing: '0.5px',
};

const valueStyle = {
  color: '#f3f4f6',
  fontSize: '1.1rem',
  fontWeight: '500',
};

const statusBadge = {
  color: '#10b981',
  fontWeight: 'bold',
  fontSize: '0.9rem',
};

const buttonGroup = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

const editBtn = {
  backgroundColor: '#f1c40f',
  color: '#08060d',
  padding: '14px',
  borderRadius: '10px',
  textDecoration: 'none',
  fontWeight: '800',
  fontSize: '1rem',
  transition: '0.2s',
};

const backBtn = {
  background: 'none',
  border: 'none',
  color: '#6b7280',
  cursor: 'pointer',
  fontSize: '0.9rem',
};

const loaderStyle = {
  color: '#f1c40f',
  textAlign: 'center',
  marginTop: '100px',
  fontSize: '1.2rem',
};

export default DriverDetails;