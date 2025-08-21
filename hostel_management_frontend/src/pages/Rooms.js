import React, { useState, useEffect } from 'react';
import RoomList from '../components/RoomList';
import Modal from '../components/Modal';
import RoomForm from '../components/RoomForm';
import { getRooms, createRoom, updateRoom, deleteRoom } from '../services/api';
import '../components/ActionableList.css';
import '../components/Form.css';

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await getRooms();
      setRooms(response.data);
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
    }
  };

  const handleAdd = () => {
    setEditingRoom(null);
    setIsModalOpen(true);
  };

  const handleEdit = room => {
    setEditingRoom(room);
    setIsModalOpen(true);
  };

  const handleDelete = async room => {
    if (window.confirm(`Are you sure you want to delete room ${room.room_number}?`)) {
      try {
        await deleteRoom(room.id);
        fetchRooms();
      } catch (error) {
        console.error('Failed to delete room:', error);
      }
    }
  };

  const handleSave = async roomData => {
    try {
      if (editingRoom) {
        await updateRoom(editingRoom.id, roomData);
      } else {
        await createRoom(roomData);
      }
      fetchRooms();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save room:', error);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Rooms</h1>
        <button className="action-button" onClick={handleAdd}>
          Add Room
        </button>
      </div>
      <RoomList rooms={rooms} onEdit={handleEdit} onDelete={handleDelete} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <RoomForm room={editingRoom} onSave={handleSave} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}

export default Rooms;
