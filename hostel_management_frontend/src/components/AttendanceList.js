import React from 'react';
import './ItemList.css';

function AttendanceList({ attendanceRecords, user }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="item-list">
      <table>
        <thead>
          <tr>
            {user && user.role === 'admin' && <th>Student</th>}
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.length > 0 ? (
            attendanceRecords.map(record => (
              <tr key={record.id}>
                {user && user.role === 'admin' && <td>{record.student?.name || 'N/A'}</td>}
                <td>{formatDate(record.date)}</td>
                <td>{record.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={user && user.role === 'admin' ? 3 : 2} style={{ textAlign: 'center' }}>
                No attendance records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceList;
