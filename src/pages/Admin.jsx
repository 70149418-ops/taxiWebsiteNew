import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import AdminHero from '../view/adminview/DriverHero';
import DriverList from '../view/adminview/DriverList';

const Admin = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Track screen size for responsive adjustments
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchDrivers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "drivers"));
      const driverData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setDrivers(driverData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching drivers: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this driver?")) {
      await deleteDoc(doc(db, "drivers", id));
      setDrivers(drivers.filter(driver => driver.id !== id));
    }
  };

  return (
    <div style={pageWrapper}>
      {/* Passing isMobile to children in case they need to adjust internal layouts */}
      <AdminHero count={drivers.length} isMobile={isMobile} />
      
      {loading ? (
        <div style={loaderStyle}>⌛ Accessing Fleet Database...</div>
      ) : (
        <div style={listContainer}>
          <DriverList drivers={drivers} onDelete={handleDelete} isMobile={isMobile} />
        </div>
      )}
    </div>
  );
};

// --- Responsive Styles ---
const pageWrapper = {
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '20px',
  boxSizing: 'border-box', // Essential to prevent padding from causing overflow
  minHeight: '100vh',
};

const listContainer = {
  width: '100%',
  marginTop: '20px',
  overflowX: 'auto', // Allows the list/table to scroll horizontally on very small screens instead of breaking the page
  WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
};

const loaderStyle = {
  color: '#f1c40f',
  textAlign: 'center',
  padding: '100px 20px',
  fontSize: '1.2rem',
  fontWeight: '500'
};

export default Admin;