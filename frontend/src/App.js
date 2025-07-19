// src/App.js
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateAssignment from './pages/CreateAssignment';
import SubmitAssignment from './pages/SubmitAssignment';
import ViewSubmissions from './pages/ViewSubmissions';
import Navbar from './components/Navbar';
import React from 'react';

function LayoutWithNavbar({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';

  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <>
      {!hideNavbar && <Navbar role={role} onLogout={handleLogout} />}
      {children}
    </>
  );
}

function AppRoutes() {
  return (
    <LayoutWithNavbar>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create-assignment" element={<CreateAssignment />} />
        <Route path="/submit-assignment" element={<SubmitAssignment />} />
        <Route path="/submissions" element={<ViewSubmissions />} />
      </Routes>
    </LayoutWithNavbar>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;