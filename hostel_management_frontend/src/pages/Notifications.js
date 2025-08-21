import React, { useState, useEffect } from 'react';
import Notifications from '../components/Notifications';
import { getNotifications } from '../services/api';

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getNotifications();
        setNotifications(response.data);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="page-title">All Notifications</h1>
      <Notifications notifications={notifications} />
    </div>
  );
}

export default NotificationsPage;
