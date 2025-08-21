import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import './App.css';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Rooms from './pages/Rooms';
import Students from './pages/Students';
import Payments from './pages/Payments';
import Attendance from './pages/Attendance';
import Profile from './pages/Profile';
import Reports from './pages/Reports';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';

// PUBLIC_INTERFACE
/**
 * Main application component.
 * It sets up the theme and routing for the application.
 */
function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  const DashboardLayout = () => (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-content">
        <Outlet /> {/* Child routes will render here */}
      </main>
    </div>
  );


  return (
    <Router>
      <div className="App">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/students" element={<Students />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/reports" element={<Reports />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
