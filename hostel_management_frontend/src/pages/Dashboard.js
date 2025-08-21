import React, { useState, useEffect } from 'react';
import Notifications from '../components/Notifications';
import { getNotifications } from '../services/api';
import './Dashboard.css';

// PUBLIC_INTERFACE
function Dashboard() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentNotifications = async () => {
      try {
        const response = await getNotifications({ limit: 5 });
        setNotifications(response.data);
      } catch (error) {
        console.error('Failed to fetch recent notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentNotifications();
  }, []);

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Dashboard</h1>
      <p>Welcome to the hostel management dashboard.</p>
      
      <div className="dashboard-section">
        {loading ? (
          <p>Loading notifications...</p>
        ) : (
          <Notifications notifications={notifications} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
