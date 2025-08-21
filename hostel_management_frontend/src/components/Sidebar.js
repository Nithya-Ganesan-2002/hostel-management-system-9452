import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

// PUBLIC_INTERFACE
function Sidebar() {
  return (
    <div className="sidebar">
      <h1 className="sidebar-title">Hostel Mgmt</h1>
      <nav className="sidebar-nav">
        <NavLink to="/" className="sidebar-link" end>
          Dashboard
        </NavLink>
        <NavLink to="/rooms" className="sidebar-link">
          Rooms
        </NavLink>
        <NavLink to="/students" className="sidebar-link">
          Students
        </NavLink>
        <NavLink to="/payments" className="sidebar-link">
          Payments
        </NavLink>
        <NavLink to="/attendance" className="sidebar-link">
          Attendance
        </NavLink>
        <NavLink to="/reports" className="sidebar-link">
          Reports
        </NavLink>
        <NavLink to="/profile" className="sidebar-link">
          Profile
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
