import React, { useState } from 'react';
import './Form.css';

function AttendanceMarker({ students, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    student_id: '',
    date: new Date().toISOString().split('T')[0], // a YYYY-MM-DD string
    status: 'present',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form-title">Mark Attendance</h2>
      <div className="form-group">
        <label>Student</label>
        <select
          name="student_id"
          value={formData.student_id}
          onChange={handleChange}
          required
        >
          <option value="">Select a student</option>
          {students.map(student => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="submit-btn">
          Save Attendance
        </button>
      </div>
    </form>
  );
}

export default AttendanceMarker;
