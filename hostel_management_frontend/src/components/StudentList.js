import React from 'react';
import './ItemList.css';

function StudentList({ students, onEdit, onDelete }) {
  return (
    <div className="item-list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Room</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.room ? student.room.room_number : 'N/A'}</td>
              <td>
                <button className="edit-btn" onClick={() => onEdit(student)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => onDelete(student)}>
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

export default StudentList;
