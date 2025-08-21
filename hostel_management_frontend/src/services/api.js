import axios from 'axios';
import authService from './authService';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(config => {
  const user = authService.getCurrentUser();
  if (user && user.token) {
    config.headers['Authorization'] = `Bearer ${user.token}`;
  }
  return config;
});

// Room management
export const getRooms = () => api.get('/rooms');
export const createRoom = (roomData) => api.post('/rooms', roomData);
export const updateRoom = (id, roomData) => api.put(`/rooms/${id}`, roomData);
export const deleteRoom = (id) => api.delete(`/rooms/${id}`);

// Student management
export const getStudents = () => api.get('/students');
export const createStudent = (studentData) => api.post('/students', studentData);
export const updateStudent = (id, studentData) => api.put(`/students/${id}`, studentData);
export const deleteStudent = (id) => api.delete(`/students/${id}`);

// Fee-Payment management
export const getPayments = () => api.get('/payments');
export const createPayment = (paymentData) => api.post('/payments', paymentData);

// Attendance management
export const getAttendance = (params) => api.get('/attendance', { params });
export const markAttendance = (attendanceData) => api.post('/attendance', attendanceData);

export default api;
