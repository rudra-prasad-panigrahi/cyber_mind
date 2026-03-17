import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainSOC from './pages/MainSOC';

function App() {
  const isAuthenticated = !!localStorage.getItem('soc_token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={isAuthenticated ? <MainSOC /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;