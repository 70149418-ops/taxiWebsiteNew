// src/view/adminview/DriverHero.jsx
const DriverHero = ({ count }) => (
  <header style={heroStyle}>
    <div>
      <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '10px' }}>Fleet Command</h1>
      <p style={{ color: '#9ca3af' }}>Real-time monitoring of {count} active units.</p>
    </div>
    <div style={statusBadge}>System Operational</div>
  </header>
);

const heroStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  padding: '40px 0',
  borderBottom: '1px solid #2e303a',
  marginBottom: '30px'
};

const statusBadge = {
  backgroundColor: 'rgba(16, 185, 129, 0.1)',
  color: '#10b981',
  padding: '8px 16px',
  borderRadius: '20px',
  fontSize: '0.8rem',
  fontWeight: 'bold',
  border: '1px solid rgba(16, 185, 129, 0.2)'
};

export default DriverHero;