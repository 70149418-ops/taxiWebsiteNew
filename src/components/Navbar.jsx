import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Update layout when screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsOpen(false); // Close sidebar on resize
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActive = (path) => location.pathname === path;
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav style={navStyle}>
      <div style={navContainer}>
        {/* Logo Section */}
        <div style={logoWrapper}>
          <Link to="/" style={logoLink} onClick={() => setIsOpen(false)}>
            <span style={taxiIcon}>🚖</span>
            <span style={logoText}>TAXI<span style={adminText}>ADMIN</span></span>
          </Link>
        </div>

        {/* Desktop Links - Hidden on Mobile */}
        {!isMobile && (
          <ul style={ulStyle}>
            <li><Link to="/" style={isActive('/') ? activeLinkStyle : linkStyle}>Home</Link></li>
            <li><Link to="/admin" style={isActive('/admin') ? activeLinkStyle : linkStyle}>Dashboard</Link></li>
            <li>
              <Link to="/create" style={createButtonStyle}>
                <span style={{ marginRight: '5px' }}>+</span> Register Driver
              </Link>
            </li>
          </ul>
        )}

        {/* Hamburger Icon - Visible on Mobile Only */}
        {isMobile && (
          <button onClick={toggleMenu} style={hamburgerBtn}>
            {isOpen ? '✕' : '☰'}
          </button>
        )}
      </div>

      {/* Sidebar - Slide out menu */}
      <div style={{
        ...sidebarStyle,
        right: isOpen ? '0' : '-100%'
      }}>
        <ul style={mobileUlStyle}>
          <li><Link to="/" style={isActive('/') ? activeLinkStyle : linkStyle} onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/admin" style={isActive('/admin') ? activeLinkStyle : linkStyle} onClick={toggleMenu}>Dashboard</Link></li>
          <li>
            <Link to="/create" style={{...createButtonStyle, display: 'block', textAlign: 'center'}} onClick={toggleMenu}>
              Register Driver
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay - Closes sidebar when clicking outside */}
      {isOpen && <div onClick={toggleMenu} style={overlayStyle} />}
    </nav>
  );
};

// --- Styles ---
const navStyle = {
  width: '100%', // Changed from 100vw to avoid scrollbars
  height: '80px',
  backgroundColor: 'rgba(22, 23, 29, 0.8)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid #2e303a',
  display: 'flex',
  alignItems: 'center',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  boxSizing: 'border-box'
};

const navContainer = {
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 24px',
};

// ... (logoWrapper, logoLink, taxiIcon, logoText, adminText, ulStyle, linkStyle, activeLinkStyle, createButtonStyle from your previous code stay exactly the same)
const logoWrapper = { display: 'flex', alignItems: 'center' };
const logoLink = { textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' };
const taxiIcon = { fontSize: '1.8rem' };
const logoText = { color: '#f3f4f6', fontSize: '1.3rem', fontWeight: '800', letterSpacing: '1px' };
const adminText = { color: '#f1c40f', fontWeight: '300' };
const ulStyle = { display: 'flex', listStyle: 'none', gap: '32px', alignItems: 'center', margin: 0, padding: 0 };
const linkStyle = { color: '#9ca3af', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500' };
const activeLinkStyle = { ...linkStyle, color: '#f1c40f' };
const createButtonStyle = { backgroundColor: '#f1c40f', color: '#08060d', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.9rem' };

// --- NEW MOBILE STYLES ---
const hamburgerBtn = {
  background: 'none',
  border: 'none',
  color: '#f1c40f',
  fontSize: '2rem',
  cursor: 'pointer',
  zIndex: 1100
};

const sidebarStyle = {
  position: 'fixed',
  top: 0,
  width: '280px',
  height: '100vh',
  backgroundColor: '#16171d',
  zIndex: 1050,
  transition: 'right 0.3s ease-in-out',
  display: 'flex',
  flexDirection: 'column',
  padding: '100px 30px',
  boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
};

const mobileUlStyle = {
  listStyle: 'none',
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '30px'
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.6)',
  zIndex: 1040
};

export default Navbar;