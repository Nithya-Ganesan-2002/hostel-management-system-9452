import React, { useState, useEffect } from 'react';
import './Form.css';

function RoomForm({ room, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    room_number: '',
    capacity: '',
    status: 'available',
  });

  useEffect(() => {
    if (room) {
      setFormData(room);
    } else {
      setFormData({ room_number: '', capacity: '', status: 'available' });
    }
  }, [room]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form-title">{room ? 'Edit Room' : 'Add Room'}</h2>
      <div className="form-group">
        <label>Room Number</label>
        <input
          type="text"
          name="room_number"
          value={formData.room_number}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Capacity</label>
        <input
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="available">Available</option>
          <option value="occupied">Occupied</option>
          <option value="maintenance">Maintenance</option>
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

export default RoomForm;
