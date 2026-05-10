import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page Components
import Home from './pages/Home';
import Admin from './pages/Admin';
import CreateDriver from './pages/CreateDriver';
import DriverDetails from './pages/DriverDetails';
import EditDriver from './pages/EditDriver';

function App() {
  return (
    <div style={appContainer}>
      {/* 1. Navbar is outside Routes so it stays consistent on all pages */}
      <Navbar />

      {/* 2. Main content area that swaps based on URL */}
      <main style={mainContent}>
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Home />} />

          {/* View All Items (Task 2b) */}
          <Route path="/admin" element={<Admin />} />

          {/* Create Item (Task 2a) */}
          <Route path="/create" element={<CreateDriver />} />

          {/* View Single Item - Dynamic Route (Task 2c) */}
          <Route path="/driver/:id" element={<DriverDetails />} />

          {/* Edit Item - Dynamic Route (Task 2d) */}
          <Route path="/edit/:id" element={<EditDriver />} />
        </Routes>
      </main>

      {/* 3. Footer stays consistent across all routes */}
      <Footer />
    </div>
  );
}

// --- Basic Layout Styles ---
const appContainer = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh', // Ensures the footer stays at the bottom
};

const mainContent = {
  flex: '1', // This grows to fill space, pushing footer down
  paddingBottom: '40px'
};

export default App;