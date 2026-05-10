import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DriverList = ({ drivers, onDelete }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 480);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={gridStyle}>
      {drivers.map(driver => (
        <div key={driver.id} style={{
          ...cardStyle,
          padding: isMobile ? '16px' : '24px' // Less padding on tiny screens
        }}>
          <h3 style={nameStyle}>{driver.name}</h3>
          <div style={metaStyle}>
            <span>⭐ {driver.rating}</span>
            <span>💳 ${driver.pricePerKm}/km</span>
          </div>
          
          {/* Stack buttons vertically on very small screens, keep row on larger */}
          <div style={{
            ...buttonGroup,
            flexDirection: isMobile ? 'column' : 'row'
          }}>
            <Link to={`/driver/${driver.id}`} style={viewBtn}>Details</Link>
            <div style={{ display: 'flex', gap: '8px', flex: 1 }}>
               <Link to={`/edit/${driver.id}`} style={editBtn}>Edit</Link>
               <button onClick={() => onDelete(driver.id)} style={delBtn}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- Styles ---
const gridStyle = {
  display: 'grid',
  // minmax(250px) allows for slightly smaller cards on tiny phones
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '20px',
  width: '100%',
  boxSizing: 'border-box'
};

const cardStyle = {
  backgroundColor: '#1f2028',
  borderRadius: '12px',
  border: '1px solid #2e303a',
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box'
};

const nameStyle = { 
  color: '#f3f4f6', 
  margin: '0 0 10px 0',
  fontSize: '1.2rem',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis' // Prevents long names from breaking the card
};

const metaStyle = { 
  color: '#9ca3af', 
  display: 'flex', 
  gap: '15px', 
  marginBottom: '20px', 
  fontSize: '0.9rem' 
};

const buttonGroup = { 
  display: 'flex', 
  gap: '8px',
  width: '100%' 
};

const btnBase = {
  flex: 1,
  padding: '10px 8px', // Increased padding for better touch
  borderRadius: '8px',
  textDecoration: 'none',
  textAlign: 'center',
  fontSize: '0.85rem',
  fontWeight: 'bold',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const viewBtn = { ...btnBase, backgroundColor: '#2e303a', color: '#fff' };
const editBtn = { ...btnBase, backgroundColor: 'rgba(241, 196, 15, 0.1)', color: '#f1c40f' };
const delBtn = { ...btnBase, backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' };

export default DriverList;