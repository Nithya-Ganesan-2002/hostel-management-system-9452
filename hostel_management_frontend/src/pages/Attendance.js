import React, { useState, useEffect, useCallback } from 'react';
import AttendanceList from '../components/AttendanceList';
import Modal from '../components/Modal';
import AttendanceMarker from '../components/AttendanceMarker';
import { getAttendance, markAttendance, getStudents } from '../services/api';
import authService from '../services/authService';
import '../components/ActionableList.css';

function Attendance() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStudents = useCallback(async () => {
    try {
      const response = await getStudents();
      setStudents(response.data);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  }, []);

  const fetchAttendance = useCallback(async (currentUser) => {
    try {
      if (!currentUser) return;
      const params = currentUser.role === 'student' ? { student_id: currentUser.id } : {};
      const response = await getAttendance(params);
      setAttendanceRecords(response.data);
    } catch (error) {
      console.error('Failed to fetch attendance:', error);
    }
  }, []);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (user) {
        setLoading(true);
        await fetchAttendance(user);
        if (user.role === 'admin') {
          await fetchStudents();
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    loadData();
  }, [user, fetchAttendance, fetchStudents]);
  
  const handleMarkAttendance = () => {
    setIsModalOpen(true);
  };

  const handleSaveAttendance = async (attendanceData) => {
    try {
      await markAttendance(attendanceData);
      if (user) {
        await fetchAttendance(user);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save attendance:', error);
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  const pageTitle = user && user.role === 'admin' ? 'Manage Attendance' : 'My Attendance';

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">{pageTitle}</h1>
        {user && user.role === 'admin' && (
          <button className="action-button" onClick={handleMarkAttendance}>
            Mark Attendance
          </button>
        )}
      </div>
      <AttendanceList attendanceRecords={attendanceRecords} user={user} />
      {user && user.role === 'admin' && (
         <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <AttendanceMarker 
            students={students}
            onSave={handleSaveAttendance} 
            onCancel={() => setIsModalOpen(false)} 
          />
        </Modal>
      )}
    </div>
  );
}

export default Attendance;
