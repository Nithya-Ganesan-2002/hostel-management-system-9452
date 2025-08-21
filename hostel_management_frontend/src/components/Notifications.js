import React from 'react';
import './Notifications.css';

function Notifications({ notifications }) {
  return (
    <div className="notifications-widget">
      <h3 className="notifications-title">Recent Notifications</h3>
      {notifications.length > 0 ? (
        <ul className="notifications-list">
          {notifications.map(notification => (
            <li key={notification.id} className="notification-item">
              <p className="notification-message">{notification.message}</p>
              <span className="notification-timestamp">
                {new Date(notification.created_at).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-notifications">No new notifications.</p>
      )}
    </div>
  );
}

export default Notifications;
