import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import AdminHero from '../view/adminview/DriverHero';
import DriverList from '../view/adminview/DriverList';

const Admin = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

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
  console.log("Attempting to fetch drivers..."); // Add this
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
      <AdminHero count={drivers.length} />
      {loading ? (
        <div style={loaderStyle}>⌛ Accessing Fleet Database...</div>
      ) : (
        <DriverList drivers={drivers} onDelete={handleDelete} />
      )}
    </div>
  );
};

const pageWrapper = {
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '20px'
};

const loaderStyle = {
  color: '#f1c40f',
  textAlign: 'center',
  padding: '50px',
  fontSize: '1.2rem',
  fontWeight: '500'
};

export default Admin;