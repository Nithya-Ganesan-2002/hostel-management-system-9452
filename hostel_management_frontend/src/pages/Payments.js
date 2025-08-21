import React, { useState, useEffect, useCallback } from 'react';
import PaymentList from '../components/PaymentList';
import Modal from '../components/Modal';
import PaymentForm from '../components/PaymentForm';
import { getPayments, createPayment, getStudents } from '../services/api';
import authService from '../services/authService';
import '../components/ActionableList.css';

function Payments() {
  const [payments, setPayments] = useState([]);
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

  const fetchPayments = useCallback(async (currentUser) => {
    try {
      if (!currentUser) return;
      const response = await getPayments();
      if (currentUser.role === 'student') {
        setPayments(response.data.filter(p => p.student_id === currentUser.id));
      } else {
        setPayments(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch payments:', error);
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
        await fetchPayments(user);
        if (user.role === 'admin') {
          await fetchStudents();
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    loadData();
  }, [user, fetchPayments, fetchStudents]);

  const handleAddPayment = () => {
    setIsModalOpen(true);
  };

  const handleSavePayment = async (paymentData) => {
    try {
      await createPayment(paymentData);
      if (user) {
        await fetchPayments(user);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save payment:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const pageTitle = user && user.role === 'admin' ? 'Manage Payments' : 'My Payment History';
  const buttonText = user && user.role === 'admin' ? 'Add Payment' : 'Make a Payment';

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">{pageTitle}</h1>
        {user && (
          <button className="action-button" onClick={handleAddPayment}>
            {buttonText}
          </button>
        )}
      </div>
      <PaymentList payments={payments} user={user} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <PaymentForm
          onSave={handleSavePayment}
          onCancel={() => setIsModalOpen(false)}
          user={user}
          students={students}
        />
      </Modal>
    </div>
  );
}

export default Payments;
