// src/view/adminview/DriverList.jsx
import { Link } from 'react-router-dom';

const DriverList = ({ drivers, onDelete }) => (
  <div style={gridStyle}>
    {drivers.map(driver => (
      <div key={driver.id} style={cardStyle}>
        <h3 style={nameStyle}>{driver.name}</h3>
        <div style={metaStyle}>
          <span>⭐ {driver.rating}</span>
          <span>💳 ${driver.pricePerKm}/km</span>
        </div>
        
        <div style={buttonGroup}>
          <Link to={`/driver/${driver.id}`} style={viewBtn}>Details</Link>
          <Link to={`/edit/${driver.id}`} style={editBtn}>Edit</Link>
          <button onClick={() => onDelete(driver.id)} style={delBtn}>Delete</button>
        </div>
      </div>
    ))}
  </div>
);

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '20px'
};

const cardStyle = {
  backgroundColor: '#1f2028',
  padding: '24px',
  borderRadius: '12px',
  border: '1px solid #2e303a',
  transition: '0.3s'
};

const nameStyle = { color: '#f3f4f6', margin: '0 0 10px 0' };
const metaStyle = { color: '#9ca3af', display: 'flex', gap: '15px', marginBottom: '20px', fontSize: '0.9rem' };

const buttonGroup = { display: 'flex', gap: '8px' };

const btnBase = {
  flex: 1,
  padding: '8px',
  borderRadius: '6px',
  textDecoration: 'none',
  textAlign: 'center',
  fontSize: '0.8rem',
  fontWeight: 'bold',
  border: 'none',
  cursor: 'pointer'
};

const viewBtn = { ...btnBase, backgroundColor: '#2e303a', color: '#fff' };
const editBtn = { ...btnBase, backgroundColor: 'rgba(241, 196, 15, 0.1)', color: '#f1c40f' };
const delBtn = { ...btnBase, backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' };

export default DriverList;