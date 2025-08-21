import React, { useState, useEffect } from 'react';
import './Form.css';

function StudentForm({ student, rooms, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    room_id: '',
  });

  useEffect(() => {
    if (student) {
      setFormData({ ...student, room_id: student.room?.id || '' });
    } else {
      setFormData({ name: '', email: '', password: '', room_id: '' });
    }
  }, [student]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form-title">{student ? 'Edit Student' : 'Add Student'}</h2>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder={student ? 'Leave blank to keep current password' : ''}
        />
      </div>
      <div className="form-group">
        <label>Assign Room</label>
        <select name="room_id" value={formData.room_id} onChange={handleChange}>
          <option value="">No Room</option>
          {rooms.map(room => (
            <option key={room.id} value={room.id}>
              {room.room_number}
            </option>
          ))}
        </select>
      </div>
      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="submit-btn">
          Save
        </button>
      </div>
    </form>
  );
}

export default StudentForm;
