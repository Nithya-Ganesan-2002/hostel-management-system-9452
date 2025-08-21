import React from 'react';
import './ItemList.css';

function RoomList({ rooms, onEdit, onDelete }) {
  return (
    <div className="item-list">
      <table>
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Capacity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map(room => (
            <tr key={room.id}>
              <td>{room.room_number}</td>
              <td>{room.capacity}</td>
              <td>{room.status}</td>
              <td>
                <button className="edit-btn" onClick={() => onEdit(room)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => onDelete(room)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RoomList;
