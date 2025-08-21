import React, { useState, useEffect } from 'react';
import StudentList from '../components/StudentList';
import Modal from '../components/Modal';
import StudentForm from '../components/StudentForm';
import { getStudents, createStudent, updateStudent, deleteStudent, getRooms } from '../services/api';
import '../components/ActionableList.css';
import '../components/Form.css';

function Students() {
  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
    fetchRooms();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await getStudents();
      setStudents(response.data);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await getRooms();
      setRooms(response.data.filter(room => room.status === 'available'));
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
    }
  };

  const handleAdd = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const handleEdit = student => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleDelete = async student => {
    if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
      try {
        await deleteStudent(student.id);
        fetchStudents();
      } catch (error) {
        console.error('Failed to delete student:', error);
      }
    }
  };

  const handleSave = async studentData => {
    try {
      if (editingStudent) {
        await updateStudent(editingStudent.id, studentData);
      } else {
        await createStudent(studentData);
      }
      fetchStudents();
      fetchRooms(); // Refresh rooms in case one was taken
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save student:', error);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Students</h1>
        <button className="action-button" onClick={handleAdd}>
          Add Student
        </button>
      </div>
      <StudentList students={students} onEdit={handleEdit} onDelete={handleDelete} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <StudentForm
          student={editingStudent}
          rooms={rooms}
          onSave={handleSave}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default Students;
