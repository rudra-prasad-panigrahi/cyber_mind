import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainSOC from './pages/MainSOC';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('soc_token'));

  // Check authentication status on mount and when component updates
  useEffect(() => {
    const token = localStorage.getItem('soc_token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={isAuthenticated ? <MainSOC /> : <Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;